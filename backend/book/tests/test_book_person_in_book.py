import pytest
from attr import fields

from book.models import BookPerson


@pytest.mark.django_db
class TestBookPersonInBook:
    pass

    # def test_book_person_in_book(self, supply_book, supply_book_person_profile, supply_book_person_profile_2):
    #     supply_book.save()
    #
    #     supply_book.person = [{'person': supply_book_person_profile}]
    #     assert [supply_book.person[0].id] == [1]
    #
    #     # supply_book_person_profile.save()
    #     # book_person = BookPerson(book=None, person=supply_book_person_profile)
    #     # book_person.save()
    #     # # breakpoint()
    #     # supply_book.person = [book_person]
    #     # assert [supply_book.person[0].id] == [book_person.id]
    #     #
    #     # supply_book_person_profile_2.save()
    #     # book_person_2 = BookPerson(book=supply_book, person=supply_book_person_profile_2)
    #     # book_person_2.save()
    #     # supply_book.person = [book_person, book_person_2]
    #     # assert [supply_book.person[0].id, supply_book.person[1].id] == [book_person.id, book_person_2.id]
    #     #
    #     # supply_book.person = [book_person_2]
    #     # assert [supply_book.person[0].id] == [book_person_2.id]
