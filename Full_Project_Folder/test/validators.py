from django.core.exceptions import ValidationError
from django.utils import timezone
import datetime
from django.utils.translation import ugettext_lazy as _
import re

def validate_email(value):
    """
    Let's validate the email 
    """
    from .models import Client

    condition = re.match(r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$', value)
    existing_clients = Client.objects.filter(email=value)

    if len(existing_clients) > 0:
        raise ValidationError(_("Email address has already been taken."))
    if len(value) < 2 or len(value) > 40:
        raise ValidationError(_("Email address has to be b/w 2 and 40 characters"))
    elif not condition:  
        raise ValidationError(_("Not valid email"))

def validate_password(value):
    if len(value) < 5 or len(value) > 40:
        raise ValidationError(_("Password has to be b/w 5 and 40 characters"))
    
def validate_names(value):
    condition = re.match(r'^[a-zA-Z]{2,40}$', value)
    if not condition:
        raise ValidationError(_("Not valid name: Only letters. Length b/w 2 and 40 chars allowed."))

def validate_city(value):
    condition = re.match(r'^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']{2,40}$', value)
    if not condition:
        raise ValidationError(_("Not valid city: Only language based letters. Length b/w 2 and 40 chars allowed."))

def validate_state(value):
    condition = re.match(r'^[A-Z]{2,2}$', value)
    if not condition:
        raise ValidationError(_("Not valid state: Only capital letters and length of 2"))

def validate_zipcode(value):
    condition = re.match(r'^[0-9]{5,5}$', value)
    if not condition:
        raise ValidationError(_("Not valid zipcode: Only numbers and length of 5"))

def validate_phone_num(value):
    condition = re.match(r'^[0-9]{3,3}-[0-9]{3,3}-[0-9]{4,4}$', value)
    if not condition:
        raise ValidationError(_("Not valid phone number: Format should be XXX-XXX-XXXX and numbers only"))

def validate_birthday(value):
    condition = timezone.now().date() - value
    if condition.days < 6575: # 6574.365 Days (Rounded to 6575) is how many days to be 18 years old (Leap Year won't count)
        raise ValidationError(_("You have to be at least 18 years old to get an account."))

def validate_bill_acc_num(value):
    from .models import Account, Client

    existing_matched_acc = Account.objects.filter(account_num=value)

    if len(existing_matched_acc) == 0:
        raise ValidationError(_("Not an existing account."))

def validate_bank_num(value):
    condition = re.match(r'^[0-9]{8,8}$', value)
    if not condition:
        raise ValidationError(_("Input number should have 8 digits"))

def validate_amount(value):
    if value < 0:
        raise ValidationError(_("Amount can't be negative"))

def validate_auto_date(value):
    if value < timezone.now().date():
        raise ValidationError(_("Can't have past date."))
