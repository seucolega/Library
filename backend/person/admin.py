from django.contrib import admin

from .models import Person, PersonType

admin.site.register(Person)
admin.site.register(PersonType)
