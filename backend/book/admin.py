from django.contrib import admin

from .models import (
    AgeClassification,
    Book,
    Person,
    PersonProfile,
    PersonType,
    Publisher,
    TextualClassification,
)

admin.site.register(Publisher)
admin.site.register(AgeClassification)
admin.site.register(TextualClassification)
admin.site.register(Book)
admin.site.register(PersonType)
admin.site.register(PersonProfile)
admin.site.register(Person)
# admin.site.register(BookPersonAuthorship)
# admin.site.register(BookPersonIllustration)
# admin.site.register(BookPersonTranslation)
# admin.site.register(BookPersonOrganization)
# admin.site.register(BookCollection)
