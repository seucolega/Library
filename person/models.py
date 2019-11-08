from django.db import models


class PersonType(models.Model):
    name = models.CharField(max_length=30)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    # nickname = models.CharField(max_length=30)
    # date_of_birth = models.DateField()
    type = models.ManyToManyField(PersonType)

    class Meta:
        ordering = ['first_name']

    @property
    def name(self):
        return f'{self.first_name} {self.last_name}'

    def __str__(self):
        return self.name
