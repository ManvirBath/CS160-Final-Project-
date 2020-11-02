# Generated by Django 3.1.2 on 2020-11-01 17:19

from django.db import migrations, models
import test.validators


class Migration(migrations.Migration):

    dependencies = [
        ('test', '0013_auto_20201101_1702'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='birthday',
            field=models.DateField(null=True, validators=[test.validators.validate_phone_num]),
        ),
    ]
