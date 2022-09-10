from ..models import Initiative


def test_initiative(categories_tree):
    initiative = Initiative(name="foo")
    assert initiative.name == "foo"
