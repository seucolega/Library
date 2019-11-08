from django.contrib import admin

from .models import Book
from .models import BookAgeClassification
from .models import BookPublisher
from .models import BookTextualClassification

admin.site.register(Book)
admin.site.register(BookPublisher)
admin.site.register(BookAgeClassification)
admin.site.register(BookTextualClassification)
