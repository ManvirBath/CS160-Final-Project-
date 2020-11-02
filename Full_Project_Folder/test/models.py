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

from django.core.exceptions import ValidationError
from .validators import validate_email, validate_names, validate_city, validate_state, validate_zipcode, validate_phone_num, \
                        validate_birthday, validate_amount

class Client(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True, null=False, validators=[validate_email])
    first_name = models.CharField(_('first name'), max_length=40, null=False, validators=[validate_names])
    last_name = models.CharField(_('last name'), max_length=40, null=False, validators=[validate_names])
    is_active = models.BooleanField(_('active'), default=True)

    address        = models.CharField(max_length=100, null=False)
    city           = models.CharField(max_length=36, null=False, validators=[validate_city])
    state          = models.CharField(max_length=2, null=False, validators=[validate_state])
    zipcode        = models.CharField(max_length=5, null=False, validators=[validate_zipcode])
    phone_num      = models.CharField(max_length=13, null=False, validators=[validate_phone_num])
    birthday       = models.DateField(null=True, validators=[validate_birthday])

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
    balance     = models.FloatField(null=False, default=0.0, validators=[validate_amount])
    STATUS = (
        ('inactive', 'inactive'),
        ('active', 'active'),
    )
    status      = models.CharField(max_length=8, null=False, choices=STATUS)


class Transaction(models.Model):
    amount      = models.FloatField(null=False, default=0.0, validators=[validate_amount])
    date        = models.DateField(null=False, default=timezone.now)
    trans_type  = models.CharField(max_length=25, null=False)

    LOCATION = (
        ('Online', 'Online'),
        ('ATM', 'ATM')
    )
    location    = models.CharField(max_length=255, null=False, choices=LOCATION)
    check_path  = models.CharField(max_length=255, null=True)
    memo        = models.CharField(max_length=255, null=True) 
    account     = models.ForeignKey(Account, on_delete=models.CASCADE)

class BillPayment(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    routing_num = models.CharField(max_length=10, null=False)
    to_account_num = models.CharField(max_length=10, null=False)
    amount = models.FloatField(null=False, default=0.00, validators=[validate_amount])
    date   = models.DateField(null=False, default=timezone.now)
    STATUS = (
        ('active', 'active'), # background tasks look for ones that are active. Due for like that day
        ('cancelled', 'cancelled'),
        ('processed', 'processed'),
    )
    status = models.CharField(max_length=10, default='active', null=False, choices=STATUS)



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
