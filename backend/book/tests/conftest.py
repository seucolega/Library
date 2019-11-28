import pytest

from book.models import PersonProfile, PersonType, AgeClassification, TextualClassification, Book, \
    Publisher, Person


@pytest.fixture
def supply_book_publisher():
    return Publisher(name='name 1')


@pytest.fixture
def supply_book_age_classification():
    return AgeClassification(name='name 1')


@pytest.fixture
def supply_book_textual_classification():
    return TextualClassification(name='name 1')


@pytest.fixture
def supply_book_person_profile():
    return PersonProfile(first_name='first_name 1', last_name='last_name 1')


@pytest.fixture
def supply_book_person_profile_2():
    return PersonProfile(first_name='first_name 2', last_name='last_name 2')


@pytest.fixture
def supply_book_person_type():
    return PersonType(name='type 1')


@pytest.fixture
def supply_book(supply_book_publisher, supply_book_age_classification, supply_book_textual_classification):
    supply_book_publisher.save()
    supply_book_age_classification.save()
    supply_book_textual_classification.save()
    book = Book(
        title='title 1',
        original_title='original title 1',
        publisher=supply_book_publisher,
    )
    book.save()
    book.age_classification.add(supply_book_age_classification)
    book.textual_classification.add(supply_book_textual_classification)
    return book


# @pytest.fixture
# def supply_book_person(supply_book, supply_book_person_profile, supply_book_person_type):
#     return BookPerson(
#         book=supply_book,
#         person=supply_book_person_profile,
#         type=supply_book_person_type
#     )
