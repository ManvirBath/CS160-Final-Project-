# Generated by Django 3.1.2 on 2020-10-07 00:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('client_id', models.IntegerField(primary_key=True, serialize=False)),
                ('email', models.EmailField(default=uuid.UUID('c8a4c78e-382e-4b87-8483-a748a18a4db2'), max_length=255, unique=True)),
                ('password', models.CharField(max_length=64)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('first_name', models.CharField(max_length=36)),
                ('last_name', models.CharField(max_length=36)),
                ('address', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=36)),
                ('state', models.CharField(max_length=5)),
                ('zipcode', models.CharField(max_length=5)),
                ('phone_num', models.CharField(max_length=13)),
                ('birthday', models.DateField(default=django.utils.timezone.now)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='CheckingAccount',
            fields=[
                ('checking_acct_num', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('checking_balance', models.FloatField()),
                ('status', models.CharField(max_length=6)),
                ('routing_num', models.CharField(max_length=9)),
            ],
        ),
        migrations.CreateModel(
            name='DebitCard',
            fields=[
                ('debit_card_num', models.CharField(max_length=16, primary_key=True, serialize=False)),
                ('expiration', models.CharField(max_length=8)),
                ('CVV', models.CharField(max_length=8)),
                ('pin_num', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='SavingsAccount',
            fields=[
                ('savings_acct_num', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('savings_balance', models.FloatField()),
                ('status', models.CharField(max_length=6)),
                ('routing_num', models.CharField(max_length=9)),
            ],
        ),
        migrations.CreateModel(
            name='Transactions',
            fields=[
                ('transaction_id', models.CharField(max_length=12, primary_key=True, serialize=False)),
                ('amount', models.FloatField()),
                ('trans_date', models.DateField()),
                ('trans_type', models.CharField(max_length=25)),
                ('location', models.CharField(max_length=25)),
                ('check_path', models.CharField(max_length=25, unique=True)),
                ('memo', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='SavingsTransaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('savings_acct_num', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='test.savingsaccount')),
                ('transaction_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='test.transactions')),
            ],
        ),
        migrations.CreateModel(
            name='ClientSavings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('client_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('savings_acct_num', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='test.savingsaccount')),
            ],
        ),
        migrations.CreateModel(
            name='ClientChecking',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('checking_acct_num', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='test.checkingaccount')),
                ('client_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CheckingTransaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('checking_acct_num', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='test.checkingaccount')),
                ('transaction_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='test.transactions')),
            ],
        ),
        migrations.CreateModel(
            name='CheckingDebit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('checking_acct_num', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='test.checkingaccount')),
                ('debit_card_num', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='test.debitcard')),
            ],
        ),
        migrations.CreateModel(
            name='CardTransaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('debit_card_num', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='test.debitcard')),
                ('transaction_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='test.transactions')),
            ],
        ),
    ]
