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
    account_num = models.CharField(max_length=10, null=False, primary_key=True)
    client      = models.ForeignKey(Client, on_delete=models.CASCADE)
    balance     = models.FloatField(null=False, default=0.0)
    STATUS = (
        ('inactive', 'inactive'),
        ('active', 'active'),
    )
    status      = models.CharField(max_length=6, null=False, choices=STATUS)

class CheckingAccount(models.Model):
    account_num = models.CharField(max_length=10, null=False, primary_key=True)
    client      = models.ForeignKey(Client, on_delete=models.CASCADE)
    balance     = models.FloatField(null=False, default=0.0)
    STATUS = (
        ('inactive', 'inactive'),
        ('active', 'active'),
    )
    status      = models.CharField(max_length=6, null=False, choices=STATUS)

class DebitCard(models.Model):
    card_num    = models.CharField(max_length=16, null=False, primary_key=True)
    client      = models.ForeignKey(Client, on_delete=models.CASCADE)
    expiration  = models.CharField(max_length=5, null=False)
    CVV         = models.CharField(max_length=3, null=False)
    pin         = models.IntegerField(null=False)

class Transaction(models.Model):
    amount      = models.FloatField(null=False, default=0.0)
    date        = models.DateField(null=False, default=timezone.now)
    TYPE = (
        ('Deposit', 'Deposit'),
        ('Withdraw', 'Withdraw'),
        ('Transfer Internally', 'Transfer Internally'),
    )
    trans_type  = models.CharField(max_length=25, null=False, choices=TYPE)
    location    = models.CharField(max_length=255, null=False)
    check_path  = models.CharField(max_length=255, unique=True, null=False)
    memo        = models.CharField(max_length=255, null=False)


""" RECEIVED Transaction """
class SavingsTransaction(models.Model):
    savings_acct =  models.OneToOneField(
                    SavingsAccount,
                    on_delete=models.CASCADE,
                    primary_key=True,
                )
    Transaction    = models.ForeignKey('Transaction', on_delete=models.CASCADE)

class CheckingTransaction(models.Model):
    checking_acct = models.OneToOneField(
                    CheckingAccount,
                    on_delete=models.CASCADE,
                    primary_key=True,
                )
    Transaction    = models.ForeignKey('Transaction', on_delete=models.CASCADE)

class CardTransaction(models.Model):
    debit_card = models.OneToOneField(
                DebitCard,
                on_delete=models.CASCADE,
                primary_key=True,
    )

    Transaction    = models.ForeignKey('Transaction', on_delete=models.CASCADE)

