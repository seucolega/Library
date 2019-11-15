from django.contrib import admin

from .models import Book, BookPublisher, BookAgeClassification, BookTextualClassification, BookPersonProfile, \
    BookPersonType, BookPerson

admin.site.register(BookPublisher)
admin.site.register(BookAgeClassification)
admin.site.register(BookTextualClassification)
admin.site.register(Book)
admin.site.register(BookPersonType)
admin.site.register(BookPersonProfile)
admin.site.register(BookPerson)
# admin.site.register(BookPersonAuthorship)
# admin.site.register(BookPersonIllustration)
# admin.site.register(BookPersonTranslation)
# admin.site.register(BookPersonOrganization)
# admin.site.register(BookCollection)
