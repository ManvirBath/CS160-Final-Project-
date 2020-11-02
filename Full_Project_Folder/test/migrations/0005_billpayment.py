# Generated by Django 3.1.2 on 2020-10-31 07:52

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('test', '0004_auto_20201009_0656'),
    ]

    operations = [
        migrations.CreateModel(
            name='BillPayment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('routing_num', models.CharField(max_length=10)),
                ('to_account_num', models.CharField(max_length=10)),
                ('amount', models.FloatField(default=0.01)),
                ('date', models.DateField(default=django.utils.timezone.now)),
                ('status', models.CharField(choices=[('active', 'active'), ('cancelled', 'cancelled'), ('processed', 'processed')], default='active', max_length=10)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='test.account')),
            ],
        ),
    ]
