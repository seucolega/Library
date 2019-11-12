from django.db import models

from person.models import Person


class BookPublisher(models.Model):
    class Meta:
        verbose_name = 'Publisher'
        verbose_name_plural = 'Publishers'
        ordering = ['name']

    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class BookAgeClassification(models.Model):
    class Meta:
        verbose_name = 'Age Classification'
        verbose_name_plural = 'Age Classifications'
        ordering = ['name']

    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class BookTextualClassification(models.Model):
    class Meta:
        verbose_name = 'Textual Classification'
        verbose_name_plural = 'Textual Classifications'
        ordering = ['name']

    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class BookPersonType(models.Model):
    class Meta:
        verbose_name = 'Person Type'
        verbose_name_plural = 'Person Types'
        ordering = ['name']

    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class BookPersonProfile(models.Model):
    class Meta:
        verbose_name = 'Person'
        verbose_name_plural = 'People'
        ordering = ['first_name', 'last_name']

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

    @property
    def name(self):
        return f'{self.first_name} {self.last_name}'

    def __str__(self):
        return self.name


class Book(models.Model):
    class Meta:
        verbose_name = 'Book'
        verbose_name_plural = 'Books'
        ordering = ['title']

    title = models.CharField(max_length=100)
    original_title = models.CharField(max_length=100)
    publisher = models.ForeignKey(BookPublisher, on_delete=models.PROTECT)
    age_classification = models.ManyToManyField(BookAgeClassification)
    textual_classification = models.ManyToManyField(BookTextualClassification)

    # cover_image = models.ImageField()
    # estoque

    def __str__(self):
        return self.title


class BookPerson(models.Model):
    class Meta:
        verbose_name = 'Person (Book)'
        verbose_name_plural = 'People (Book)'
        ordering = ['person__first_name', 'person__last_name']

    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    person = models.ForeignKey(BookPersonProfile, on_delete=models.PROTECT)
    type = models.ManyToManyField(BookPersonType)

    @property
    def name(self):
        return f'{self.person.first_name} {self.person.last_name} ({self.type.name})'

    def __str__(self):
        return self.name
