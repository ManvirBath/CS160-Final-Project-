from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager

class ClientManager(BaseUserManager):
    def create_user(self, email, password):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(email_addr = self.normalize_email(email))
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, email, password):
        user = self.create(email, password)
        user.is_superuser = True
        user.save(using=self.db)
        return user

class Client(AbstractBaseUser):
    client_id    = models.AutoField(primary_key=True)
    client_id    = models.IntegerField(null=False)
    email_addr = models.CharField(max_length=255, unique=True, null=False)
    password = models.CharField(max_length=64, null=False)

    is_staff       = models.BooleanField(null=False)
    is_superuser   = models.BooleanField(null=False)

    first_name     = models.CharField(max_length=36, null=False)
    last_name      = models.CharField(max_length=36, null=False)
    address        = models.CharField(max_length=100, null=False)
    city           = models.CharField(max_length=36, null=False)
    state          = models.CharField(max_length=5, null=False)
    zipcode        = models.CharField(max_length=5, null=False)
    phone_num      = models.CharField(max_length=13, null=False)
    birthday       = models.DateField(null=False)

    objects = ClientManager()
    USERNAME_FIELD = 'email_addr'
    EMAIL_FIELD = 'email_addr'


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
    Client_id       = models.IntegerField(null=False, db_index=True)
    savings_acct_num  = models.CharField(max_length=10, null=False)
    client_id       = models.ForeignKey('Client', on_delete=models.CASCADE)
    savings_acct_num  = models.ForeignKey('SavingsAccount', on_delete=models.CASCADE)


class ClientChecking(models.Model):
    client_id       = models.IntegerField(null=False)
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

