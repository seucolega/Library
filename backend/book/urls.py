from django.urls import path

from backend.book.views import book_list, book_new, book_edit, book_remove

urlpatterns = [
    path('', book_list, name='book_list'),
    path('new', book_new, name='book_new'),
    path('edit/<int:book_id>', book_edit, name='book_edit'),
    path('remove/<int:book_id>', book_remove, name='book_remove'),
    # path('list_json', book_list_json),
]
