from django.contrib import admin

from .models import Book, BookPerson, BookPublisher, BookAgeClassification, BookTextualClassification, BookPersonType, \
    BookPersonProfile

admin.site.register(BookPublisher)
admin.site.register(BookAgeClassification)
admin.site.register(BookTextualClassification)
admin.site.register(Book)
admin.site.register(BookPersonType)
admin.site.register(BookPersonProfile)
admin.site.register(BookPerson)
