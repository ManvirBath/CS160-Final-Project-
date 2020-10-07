from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from django.utils import timezone
import datetime, uuid

class ClientManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(email = self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email, password, **extra_fields)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        user.save(using=self.db)
        return user

class Client(AbstractBaseUser):
    client_id    = models.IntegerField(null=False, primary_key=True)
    email = models.EmailField(max_length=255, null=False, unique=True, default=uuid.uuid4())
    password = models.CharField(max_length=64, null=False)

    is_staff       = models.BooleanField(null=False, default=False)
    is_superuser   = models.BooleanField(null=False, default=False)

    first_name     = models.CharField(max_length=36, null=False)
    last_name      = models.CharField(max_length=36, null=False)
    address        = models.CharField(max_length=100, null=False)
    city           = models.CharField(max_length=36, null=False)
    state          = models.CharField(max_length=5, null=False)
    zipcode        = models.CharField(max_length=5, null=False)
    phone_num      = models.CharField(max_length=13, null=False)
    birthday       = models.DateField(null=False, default=timezone.now)

    objects = ClientManager()
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'


""" ACCOUNTS """
class SavingsAccount(models.Model):
    savings_acct_num = models.CharField(max_length=10, null=False, primary_key=True)
    savings_balance  = models.FloatField(null=False)
    status           = models.CharField(max_length=6, null=False)
    routing_num      = models.CharField(max_length=9, null=False)


class CheckingAccount(models.Model):
    checking_acct_num = models.CharField(max_length=10, null=False, primary_key=True)
    checking_balance  = models.FloatField(null=False)
    status            = models.CharField(max_length=6, null=False)
    routing_num      = models.CharField(max_length=9, null=False)

class DebitCard(models.Model):
    debit_card_num    = models.CharField(max_length=16, null=False, primary_key=True)
    expiration        = models.CharField(max_length=8, null=False)
    CVV               = models.CharField(max_length=8, null=False)
    pin_num           = models.IntegerField(null=False)

class Transactions(models.Model):
    transaction_id    = models.CharField(max_length=12, null=False, primary_key=True)
    amount            = models.FloatField(null=False)
    trans_date        = models.DateField(null=False)
    trans_type        = models.CharField(max_length=25, null=False)
    location          = models.CharField(max_length=25, null=False)
    check_path        = models.CharField(max_length=25, unique=True, null=False)
    memo              = models.CharField(max_length=255, null=False)


class ClientSavings(models.Model):
    client_id       = models.IntegerField(null=False, db_index=True)
    savings_acct_num  = models.CharField(max_length=10, null=False)
    client_id       = models.ForeignKey('Client', on_delete=models.CASCADE)
    savings_acct_num  = models.ForeignKey('SavingsAccount', on_delete=models.CASCADE)


class ClientChecking(models.Model):
    client_id       = models.IntegerField(null=False, primary_key=True)
    checking_acct_num = models.CharField(max_length=10, null=False)
    client_id       = models.ForeignKey('Client', on_delete=models.CASCADE)
    checking_acct_num = models.ForeignKey('CheckingAccount', on_delete=models.CASCADE)

class CheckingDebit(models.Model):
    checking_acct_num = models.CharField(max_length=10, null=False)
    debit_card_num    = models.CharField(max_length=16, null=False)
    checking_acct_num = models.ForeignKey('CheckingAccount', on_delete=models.CASCADE)
    debit_card_num    = models.ForeignKey('DebitCard', on_delete=models.CASCADE)

""" RECEIVED TRANSACTIONS """
class SavingsTransaction(models.Model):
    savings_acct_num  = models.CharField(max_length=10, null=False, db_index=True)
    transaction_id    = models.CharField(max_length=12, null=False)
    savings_acct_num  = models.ForeignKey('SavingsAccount', on_delete=models.CASCADE)
    transaction_id    = models.ForeignKey('Transactions', on_delete=models.CASCADE)

class CheckingTransaction(models.Model):
    checking_acct_num = models.CharField(max_length=10, null=False, db_index=True)
    transaction_id    = models.CharField(max_length=12, null=False)
    checking_acct_num = models.ForeignKey('CheckingAccount', on_delete=models.CASCADE)
    transaction_id    = models.ForeignKey('Transactions', on_delete=models.CASCADE)

class CardTransaction(models.Model):
    debit_card_num    = models.CharField(max_length=16, null=False, db_index=True)
    transaction_id    = models.CharField(max_length=12, null=False)
    debit_card_num    = models.ForeignKey('DebitCard', on_delete=models.CASCADE)
    transaction_id    = models.ForeignKey('Transactions', on_delete=models.CASCADE)

