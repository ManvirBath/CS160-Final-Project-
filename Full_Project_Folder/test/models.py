from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
import uuid, secrets

from django.db import models
from django.core.mail import send_mail
from django.utils.translation import ugettext_lazy as _

from .managers import ClientManager

# class Client(AbstractBaseUser):
#     client_id    = models.AutoField(primary_key=True)
#     client_id    = models.IntegerField(null=False, default=-1)
#     email_addr   = models.EmailField(max_length=255, null=False, unique=True, default=uuid.uuid4())
#     password     = models.CharField(max_length=64, null=False)

#     is_staff       = models.BooleanField(default=False, null=False)
#     is_superuser   = models.BooleanField(default=False, null=False)

#     first_name     = models.CharField(max_length=36, null=False)
#     last_name      = models.CharField(max_length=36, null=False)
#     address        = models.CharField(max_length=100, null=False)
#     city           = models.CharField(max_length=36, null=False)
#     state          = models.CharField(max_length=5, null=False)
#     zipcode        = models.CharField(max_length=5, null=False)
#     phone_num      = models.CharField(max_length=13, null=False)
#     birthday       = models.DateField(null=True)

#     objects = ClientManager()
#     USERNAME_FIELD = 'email_addr'
#     EMAIL_FIELD = 'email_addr'

class Client(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    is_active = models.BooleanField(_('active'), default=True)

    address        = models.CharField(max_length=100, null=False)
    city           = models.CharField(max_length=36, null=False)
    state          = models.CharField(max_length=5, null=False)
    zipcode        = models.CharField(max_length=5, null=False)
    phone_num      = models.CharField(max_length=13, null=False)
    birthday       = models.DateField(null=True)

    objects = ClientManager()

    is_staff       = models.BooleanField(default=False, null=False)
    is_superuser   = models.BooleanField(default=False, null=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('client')
        verbose_name_plural = _('clients')



""" ACCOUNTS """
class SavingsAccount(models.Model):
    account_num = models.CharField(max_length=10, null=False, primary_key=True)
    client      = models.ForeignKey(Client, on_delete=models.CASCADE)
    balance     = models.FloatField(null=False, default=0.0)
    STATUS = (
        ('inactive', 'inactive'),
        ('active', 'active'),
    )
    status      = models.CharField(max_length=8, null=False, choices=STATUS)

class CheckingAccount(models.Model):
    account_num = models.CharField(max_length=10, null=False, primary_key=True)
    client      = models.ForeignKey(Client, on_delete=models.CASCADE)
    balance     = models.FloatField(null=False, default=0.0)
    STATUS = (
        ('inactive', 'inactive'),
        ('active', 'active'),
    )
    status      = models.CharField(max_length=8, null=False, choices=STATUS)

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



