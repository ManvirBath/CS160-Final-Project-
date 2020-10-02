from django.db import models

class Manager(models.Model):
    manager_id     = models.AutoField(primary_key=True)
    manager_id     = models.IntegerField(null=False)
    mgr_username   = models.CharField(max_length=25, unique=True, null=False)
    mgr_pwd        = models.CharField(max_length=25, unique=True, null=False)

class Customer(models.Model):
    customer_id    = models.AutoField(primary_key=True)
    customer_id    = models.IntegerField(null=False)
    username       = models.CharField(max_length=36, unique=True, null=False)
    password       = models.CharField(max_length=64, null=False)
    first_name     = models.CharField(max_length=36, null=False)
    last_name      = models.CharField(max_length=36, null=False)
    address        = models.CharField(max_length=100, null=False)
    city           = models.CharField(max_length=36, null=False)
    state          = models.CharField(max_length=5, null=False)
    zipcode        = models.CharField(max_length=5, null=False)
    phone_num      = models.CharField(max_length=13, null=False)
    email_addr     = models.CharField(max_length=255, null=False)
    birthday       = models.DateField(null=False)


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
		
	
class CustomerSavings(models.Model):
    customer_id       = models.IntegerField(null=False, db_index=True)
    savings_acct_num  = models.CharField(max_length=10, null=False)
    customer_id       = models.ForeignKey('Customer', on_delete=models.CASCADE)
    savings_acct_num  = models.ForeignKey('SavingsAccount', on_delete=models.CASCADE)


class CustomerChecking(models.Model):
    customer_id       = models.IntegerField(null=False)
    checking_acct_num = models.CharField(max_length=10, null=False)
    customer_id       = models.ForeignKey('Customer', on_delete=models.CASCADE)
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

