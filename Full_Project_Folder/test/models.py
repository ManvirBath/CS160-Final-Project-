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
from random import randint

class Client(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True, null=False)
    first_name = models.CharField(_('first name'), max_length=30, null=False)
    last_name = models.CharField(_('last name'), max_length=30, null=False)
    is_active = models.BooleanField(_('active'), default=True)

    address        = models.CharField(max_length=100, null=False)
    city           = models.CharField(max_length=36, null=False)
    state          = models.CharField(max_length=2, null=False)
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
class Account(models.Model):
    account_num = models.CharField(max_length=10, null=False, unique=True, primary_key=True)
    TYPE = (
        ('checking', 'checking'),
        ('savings', 'savings'),
    )
    account_type = models.CharField(max_length=10, null=False, choices=TYPE)
    client      = models.ForeignKey(Client, on_delete=models.CASCADE)
    balance     = models.FloatField(null=False, default=0.0)
    STATUS = (
        ('inactive', 'inactive'),
        ('active', 'active'),
    )
    status      = models.CharField(max_length=8, null=False, choices=STATUS)


class Transaction(models.Model):
    amount      = models.FloatField(null=False, default=0.0)
    date        = models.DateField(null=False, default=timezone.now)
    TYPE = (
        ('Deposit', 'Deposit'),
        ('Withdraw', 'Withdraw'),
    )
    trans_type  = models.CharField(max_length=25, null=False, choices=TYPE)

    LOCATION = (
        ('Online', 'Online'),
        ('ATM', 'ATM')
    )
    location    = models.CharField(max_length=255, null=False, choices=LOCATION)
    check_path  = models.CharField(max_length=255, null=True)
    memo        = models.CharField(max_length=255, null=False)
    account      = models.ForeignKey(Account, on_delete=models.CASCADE)


"""
PROVE THAT THIS IS GONNA WORK. 
POINT OUT SIMPLIFYING THE MODEL AND OVERCOMPLICATING
- I analyzed the model compared to the website

- Only thing we need is to add or subtract funds from each account --> 

- Talk about internal or external transfer, external it's like withdrawing from the bank 
and either the other bank is withdrawing it or depositing it

- However you are required to provide an API (e.g. web service) 
for remote client to credit or debit their account.

   - this is just withdrawing

JUST MAKE THE APIS THEM BEFORE THE MEETING:
   - withdrawing money
   - depositing money
        - from online
        - from ATM
   - transfer money
"""
