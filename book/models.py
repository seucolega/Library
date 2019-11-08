from django.db import models

from person.models import Person


class BookPublisher(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class BookAgeClassification(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class BookTextualClassification(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=100)
    original_title = models.CharField(max_length=100)
    # cover_image = models.ImageField()
    publisher = models.ForeignKey(BookPublisher, on_delete=models.PROTECT)
    age_classification = models.ManyToManyField(BookAgeClassification)
    textual_classification = models.ManyToManyField(BookTextualClassification)
    # person = models.ManyToManyField(BookPerson)
    person = models.ManyToManyField(Person)

    # author, ilustração, tradução, organização
    # estoque

    # first_name = models.CharField(max_length=30)
    # last_name = models.CharField(max_length=30)
    # nickname = models.CharField(max_length=30)
    # date_of_birth = models.DateField()
    #
    # @property
    # def name(self):
    #     return self.first_name + ' ' + self.last_name

    def __str__(self):
        return self.title
