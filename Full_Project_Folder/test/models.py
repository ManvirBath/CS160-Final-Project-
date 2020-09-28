from django.db import models

# Create your models here.

""" ROLES """
class Manager(models.Model):

class Customer(models.Model):

""" ACCOUNTS """
class SavingsAccount(models.Model):

class CheckingAccount(models.Model):

class DebitCard(models.Model):

class Transactions(models.Model):

class CustomerSavings(models.Model):

class CustomerChecking(models.Model):

class CheckingDebit(models.Model):

""" RECEIVED TRANSACTIONS """
class SavingsTransaction(models.Model):

class CheckingTransaction(models.Model):

class CardTransaction(models.Model):

