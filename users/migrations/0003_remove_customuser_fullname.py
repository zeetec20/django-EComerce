# Generated by Django 2.2.5 on 2019-10-19 21:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_customuser_fullname'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='fullname',
        ),
    ]
