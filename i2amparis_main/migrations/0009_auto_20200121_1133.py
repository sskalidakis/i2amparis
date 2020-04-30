# Generated by Django 2.2.5 on 2020-01-21 11:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('i2amparis_main', '0008_auto_20191216_1043'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='emissions',
            name='model_name',
        ),
        migrations.RemoveField(
            model_name='mitigations',
            name='model_name',
        ),
        migrations.RemoveField(
            model_name='policies',
            name='model_name',
        ),
        migrations.RemoveField(
            model_name='sdgs',
            name='model_name',
        ),
        migrations.RemoveField(
            model_name='sectors',
            name='model_name',
        ),
        migrations.RemoveField(
            model_name='socioecons',
            name='model_name',
        ),
        migrations.DeleteModel(
            name='Adaptation',
        ),
        migrations.DeleteModel(
            name='Emissions',
        ),
        migrations.DeleteModel(
            name='Mitigations',
        ),
        migrations.DeleteModel(
            name='Policies',
        ),
        migrations.DeleteModel(
            name='Sdgs',
        ),
        migrations.DeleteModel(
            name='Sectors',
        ),
        migrations.DeleteModel(
            name='Socioecons',
        ),
    ]