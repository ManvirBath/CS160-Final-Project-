# Generated by Django 3.1.2 on 2020-11-01 07:28

from django.db import migrations, models
import test.validators


class Migration(migrations.Migration):

    dependencies = [
        ('test', '0008_auto_20201030_1917'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='email',
            field=models.EmailField(max_length=254, unique=True, validators=[test.validators.validate_email], verbose_name='email address'),
        ),
    ]
