# THIS IS WHERE WE TURN DATA INTO JSON. 
from rest_framework import serializers

# SERIALIZE EACH OF THE MODELS FIRST
from .models import Client, Account, Transaction

class ClientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Client
        fields = ('email', 'first_name', 'last_name', 'is_active', 'address', \
                  'city', 'state', 'zipcode', 'phone_num', 'birthday', 'is_superuser')
        extra_kwargs = {'is_active': {'required': False},
                        'address': {'required': False } ,
                        'city': {'required': False} ,
                        'state': {'required': False} ,
                        'zipcode': {'required': False} ,
                        'phone_num': {'required': False}, 
                        'birthday':  {'required': False} }
            

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ('account_num', 'account_type', 'client', 'balance', 'status')

class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Transaction
        fields = ('amount', 'date', 'trans_type', \
                  'location', 'check_path', 'memo', 'account')
        
        extra_kwargs = {'trans_type': {'required': False},
                        'account': {'required': False } ,
                        'check_path': {'required': False} }



