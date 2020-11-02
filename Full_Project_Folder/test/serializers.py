# THIS IS WHERE WE TURN DATA INTO JSON. 
from rest_framework import serializers

# SERIALIZE EACH OF THE MODELS FIRST
from .models import Client, Account, Transaction, BillPayment
from .validators import validate_email, validate_names, validate_city, validate_state, validate_zipcode, validate_phone_num, \
                        validate_birthday, validate_password, \
                        validate_bill_acc_num, validate_bank_num, validate_amount, validate_auto_date

class ClientSerializer(serializers.HyperlinkedModelSerializer):
    email = serializers.EmailField(validators=[validate_email], required=False)
    password = serializers.CharField(validators=[validate_password], required=False, write_only=True)
    first_name = serializers.CharField(validators=[validate_names], required=False)
    last_name = serializers.CharField(validators=[validate_names], required=False)
    city = serializers.CharField(validators=[validate_city], required=False)
    state = serializers.CharField(validators=[validate_state], required=False)
    zipcode = serializers.CharField(validators=[validate_zipcode], required=False)
    phone_num = serializers.CharField(validators=[validate_phone_num], required=False)
    birthday = serializers.DateField(validators=[validate_birthday], required=False)

    
    class Meta:
        model = Client
        optional_fields = ['email', 'password', 'first_name', 'last_name', 'is_active', 'address', \
                  'city', 'state', 'zipcode', 'phone_num', 'birthday','is_staff', 'is_superuser']
        fields = ('id','email', 'password', 'first_name', 'last_name', 'is_active', 'address', \
                  'city', 'state', 'zipcode', 'phone_num', 'birthday','is_staff', 'is_superuser')
        extra_kwargs =  {'email': {'required': False} , 
                        'first_name': {'required': False},
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
    amount         = serializers.FloatField(validators=[validate_amount], required=False)
    to_account_num = serializers.CharField(validators=[validate_bank_num], required=False)
    routing_num    = serializers.CharField(validators=[validate_bank_num], required=False)

    class Meta:
        model = Transaction
        fields = ('amount', 'routing_num','to_account_num', 'date', 'trans_type', \
                  'location', 'check_path', 'memo', 'account')
        
        extra_kwargs = {'trans_type': {'required': False},
                        'account': {'required': False } ,
                        'check_path': {'required': False},
                        'location': {'required': False},
                        'memo': {'required': False} }

class BillPaymentSerializer(serializers.HyperlinkedModelSerializer):
    from_account_num      = serializers.CharField(validators=[validate_bill_acc_num], required=False)
    routing_num    = serializers.CharField(validators=[validate_bank_num], required=False)
    to_account_num = serializers.CharField(validators=[validate_bank_num], required=False)
    amount         = serializers.FloatField(validators=[validate_amount], required=False)
    date           = serializers.DateField(validators=[validate_auto_date], required=False)

    class Meta:
        model = BillPayment

        fields = ('account', 'from_account_num', 'routing_num', 'to_account_num', 'amount', 'date', 'status')

        extra_kwargs = { 'account': {'required': False},
                        'status': {'required': False} }
