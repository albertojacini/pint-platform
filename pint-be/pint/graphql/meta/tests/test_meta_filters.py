import pytest

from pint.initiative.models import Initiative

from ...tests.utils import get_graphql_content

FILTER_BY_META_QUERY = """
query filterInitiativesByMetadata ($filter:InitiativeFilterInput){
  initiatives(first: 100, filter: $filter){
    edges {
      node {
        slug
        metadata {
          key
          value
        }
      }
    }
  }
}
"""


@pytest.mark.parametrize(
    "metadata, total_count",
    [
        (
            [
                {
                    "key": "A",
                    "value": "1",
                },
                {
                    "key": "B",
                    "value": "2",
                },
                {
                    "key": "C",
                    "value": "3",
                },
            ],
            1,
        ),
        (
            [
                {
                    "key": "A",
                    "value": "1",
                },
                {
                    "key": "B",
                    "value": "2",
                },
            ],
            1,
        ),
        (
            [
                {
                    "key": "C",
                    "value": "3",
                },
            ],
            2,
        ),
        (
            [
                {
                    "key": "C",
                    "value": "44",
                },
            ],
            0,
        ),
        (
            [
                {
                    "key": "C",
                    "value": None,
                },
            ],
            2,
        ),
        (
            [
                {
                    "key": "A",
                    "value": None,
                },
                {
                    "key": "B",
                },
            ],
            1,
        ),
    ],
)
def test_filter_by_meta_total_returned_objects(
    metadata, total_count, api_client, initiative_list
    # metadata, total_count, api_client, initiative_list, channel_USD
):
    initiative1, initiative2, initiative3 = initiative_list
    variables = {
        # "channel": channel_USD.slug,
        "filter": {
            "metadata": metadata,
        },
    }
    initiative1.store_value_in_metadata({"A": "1", "B": "2", "C": "3"})
    initiative2.store_value_in_metadata({"C": "3", "Z": "4"})
    Initiative.objects.bulk_update([initiative1, initiative2], ["metadata"])

    response = api_client.post_graphql(FILTER_BY_META_QUERY, variables)
    content = get_graphql_content(response)
    assert len(content["data"]["initiatives"]["edges"]) == total_count


def test_filter_by_meta_expected_initiative_for_key_and_value(
    api_client, initiative_list
    # api_client, initiative_list, channel_USD
):
    initiative = initiative_list[0]
    variables = {
        # "channel": channel_USD.slug,
        "filter": {
            "metadata": [{"key": "A", "value": "1"}],
        },
    }
    initiative.store_value_in_metadata({"A": "1", "B": "2", "C": "3"})
    initiative.save()

    # when
    response = api_client.post_graphql(FILTER_BY_META_QUERY, variables)
    content = get_graphql_content(response)

    # then
    initiative_data = content["data"]["initiatives"]["edges"][0]["node"]

    assert initiative_data["slug"] == initiative.slug


def test_filter_by_meta_expected_initiative_for_only_key(
    api_client, initiative_list
    # api_client, initiative_list, channel_USD
):
    initiative = initiative_list[0]
    variables = {
        # "channel": channel_USD.slug,
        "filter": {
            "metadata": [{"key": "A"}],
        },
    }
    initiative.store_value_in_metadata({"A": "1", "B": "2", "C": "3"})
    initiative.save(update_fields=["metadata"])

    # when
    response = api_client.post_graphql(FILTER_BY_META_QUERY, variables)
    content = get_graphql_content(response)

    # then
    initiative_data = content["data"]["initiatives"]["edges"][0]["node"]

    assert initiative_data["slug"] == initiative.slug
