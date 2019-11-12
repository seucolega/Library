# Generated by Django 2.2.7 on 2019-11-11 15:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('book', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BookPersonType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.AlterModelOptions(
            name='book',
            options={'ordering': ['title'], 'verbose_name': 'Book', 'verbose_name_plural': 'Books'},
        ),
        migrations.AlterModelOptions(
            name='bookageclassification',
            options={'ordering': ['name'], 'verbose_name': 'Age Classification',
                     'verbose_name_plural': 'Age Classifications'},
        ),
        migrations.AlterModelOptions(
            name='bookpublisher',
            options={'ordering': ['name'], 'verbose_name': 'Publisher', 'verbose_name_plural': 'Publishers'},
        ),
        migrations.AlterModelOptions(
            name='booktextualclassification',
            options={'ordering': ['name'], 'verbose_name': 'Textual Classification',
                     'verbose_name_plural': 'Textual Classifications'},
        ),
        migrations.RemoveField(
            model_name='book',
            name='person',
        ),
        migrations.CreateModel(
            name='BookPersonProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('type', models.ManyToManyField(to='book.BookPersonType')),
            ],
            options={
                'verbose_name': 'Person',
                'verbose_name_plural': 'People',
                'ordering': ['first_name', 'last_name'],
            },
        ),
        migrations.CreateModel(
            name='BookPerson',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='book.Book')),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='book.BookPersonProfile')),
                ('type', models.ManyToManyField(to='book.BookPersonType')),
            ],
            options={
                'ordering': ['person__first_name', 'person__last_name'],
            },
        ),
    ]
