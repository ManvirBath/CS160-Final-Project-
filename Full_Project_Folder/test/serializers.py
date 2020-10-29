# THIS IS WHERE WE TURN DATA INTO JSON. 
from rest_framework import serializers

# SERIALIZE EACH OF THE MODELS FIRST
from .models import Client, Account, Transaction, BillPayment

class ClientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Client
        fields = ('email', 'first_name', 'last_name', 'is_active', 'address', \
                  'city', 'state', 'zipcode', 'phone_num', 'birthday','is_staff', 'is_superuser')
        extra_kwargs =  {'first_name': {'required': False},
                        'last_name': {'required': False},
                        'is_active': {'required': False},
                        'address': {'required': False } ,
                        'city': {'required': False} ,
                        'state': {'required': False} ,
                        'zipcode': {'required': False} ,
                        'phone_num': {'required': False}, 
                        'birthday':  {'required': False},
                        'is_superuser': {'required': False},}
            

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ('account_num', 'account_type', 'client', 'balance', 'status')
        extra_kwargs = {'account_num': {'required': False},
                        'client': {'required': False}, 
                        'status': {'required': False}}

class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Transaction
        fields = ('amount', 'date', 'trans_type', \
                  'location', 'check_path', 'memo', 'account')
        
        extra_kwargs = {'trans_type': {'required': False},
                        'account': {'required': False } ,
                        'check_path': {'required': False},
                        'location': {'required': False},
                        'memo': {'required': False} }

class BillPaymentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BillPayment

        fields = ('account', 'routing_num', 'to_account_num', 'amount', 'date', 'status')

        extra_kwargs = { 'account': {'required': False},
                        'status': {'required': False} }
