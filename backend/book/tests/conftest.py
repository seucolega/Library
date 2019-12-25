import pytest


@pytest.fixture
def supply_book_publisher():
    from book.models import Publisher

    return Publisher(name='name 1')


@pytest.fixture
def supply_book_age_classification():
    from book.models import AgeClassification

    return AgeClassification(name='name 1')


@pytest.fixture
def supply_book_textual_classification():
    from book.models import TextualClassification

    return TextualClassification(name='name 1')


@pytest.fixture
def supply_book_person_profile():
    from book.models import PersonProfile

    return PersonProfile(first_name='first_name 1', last_name='last_name 1')


@pytest.fixture
def supply_book_person_profile_2():
    from book.models import PersonProfile

    return PersonProfile(first_name='first_name 2', last_name='last_name 2')


@pytest.fixture
def supply_book_person_type():
    from book.models import PersonType

    return PersonType(name='type 1')


@pytest.fixture
def supply_book(supply_book_publisher, supply_book_age_classification, supply_book_textual_classification):
    from book.models import Book

    supply_book_publisher.save()
    supply_book_age_classification.save()
    supply_book_textual_classification.save()
    book = Book(title='title 1', original_title='original title 1', publisher=supply_book_publisher,)
    book.save()
    book.age_classification.add(supply_book_age_classification)
    book.textual_classification.add(supply_book_textual_classification)
    return book


@pytest.fixture
def supply_book_person(supply_book, supply_book_person_profile, supply_book_person_type):
    from book.models import Person

    return Person(book=supply_book, person=supply_book_person_profile, type=supply_book_person_type)
