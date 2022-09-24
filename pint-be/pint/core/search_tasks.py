from typing import List

from celery.utils.log import get_task_logger

from ..account.models import User
from ..account.search import prepare_user_search_document_value
from ..celeryconf import app
# from ..order.models import Order
# from ..order.search import prepare_order_search_vector_value
from ..initiative.models import Initiative
from ..initiative.search import (
    # INITIATIVE_FIELDS_TO_PREFETCH,
    prepare_initiative_search_vector_value,
)
from .postgres import FlatConcatSearchVector

task_logger = get_task_logger(__name__)

BATCH_SIZE = 500
# Based on local testing, 500 should be a good ballance between performance
# total time and memory usage. Should be tested after some time and adjusted by
# running the task on different thresholds and measure memory usage, total time
# and execution time of an single SQL statement.


@app.task
def set_user_search_document_values(updated_count: int = 0) -> None:
    users = list(
        User.objects.filter(search_document="")
        .prefetch_related("addresses")[:BATCH_SIZE]
        .iterator()
    )

    if not users:
        task_logger.info("No users to update.")
        return

    updated_count += set_search_document_values(
        users, prepare_user_search_document_value
    )

    task_logger.info("Updated %d users", updated_count)

    if len(users) < BATCH_SIZE:
        task_logger.info("Setting user search document values finished.")
        return

    del users

    set_user_search_document_values.delay(updated_count)


# @app.task
# def set_order_search_document_values(updated_count: int = 0) -> None:
#     orders = list(
#         Order.objects.filter(search_vector=None)
#         .prefetch_related(
#             "user",
#             "billing_address",
#             "shipping_address",
#             "payments",
#             "discounts",
#             "lines",
#         )[:BATCH_SIZE]
#         .iterator()
#     )
#
#     if not orders:
#         task_logger.info("No orders to update.")
#         return
#
#     updated_count += set_search_vector_values(orders, prepare_order_search_vector_value)
#
#     task_logger.info("Updated %d orders", updated_count)
#
#     if len(orders) < BATCH_SIZE:
#         task_logger.info("Setting order search document values finished.")
#         return
#
#     del orders
#
#     set_order_search_document_values.delay(updated_count)


@app.task
def set_initiative_search_document_values(updated_count: int = 0) -> None:
    initiatives = list(
        Initiative.objects.filter(search_vector=None)
        # .prefetch_related(*INITIATIVE_FIELDS_TO_PREFETCH)[:BATCH_SIZE]
        .iterator()
    )

    if not initiatives:
        task_logger.info("No initiatives to update.")
        return

    updated_count += set_search_vector_values(
        initiatives,
        prepare_initiative_search_vector_value,
    )

    task_logger.info("Updated %d initiatives", updated_count)

    if len(initiatives) < BATCH_SIZE:
        task_logger.info("Setting initiative search document values finished.")
        return

    del initiatives

    set_initiative_search_document_values.delay(updated_count)


def set_search_document_values(instances: List, prepare_search_document_func):
    if not instances:
        return 0
    Model = instances[0]._meta.model
    for instance in instances:
        instance.search_document = prepare_search_document_func(
            instance, already_prefetched=True
        )
    Model.objects.bulk_update(instances, ["search_document"])

    return len(instances)


def set_search_vector_values(
    instances,
    prepare_search_vector_func,
):
    Model = instances[0]._meta.model
    for instance in instances:
        instance.search_vector = FlatConcatSearchVector(
            *prepare_search_vector_func(instance, already_prefetched=True)
        )
    Model.objects.bulk_update(instances, ["search_vector"])

    return len(instances)
