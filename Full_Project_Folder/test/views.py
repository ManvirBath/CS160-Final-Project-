# from __future__ import unicode_literals

from django.core import serializers
from django.shortcuts import render, HttpResponse
from .forms import Form
from .models import Client
import hashlib


from rest_framework import status, viewsets
from rest_framework import permissions
from django.shortcuts import render, HttpResponse
from django.http import HttpResponse, HttpResponseNotFound

from rest_framework.response import Response
from .serializers import ClientSerializer, AccountSerializer, TransactionSerializer, BillPaymentSerializer
from .models import Client, Account, Transaction, BillPayment
from .managers import ClientManager
from django.db import IntegrityError, transaction
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.views import APIView
from random import randint
from background_task import background
from django.db.models import Q
from django.utils import timezone
import time
import json

"""
Automatic One Time External Transfer (THIS IS AN EXAMPLE OF AUTOMATED BILL PAYMENT)
"""
@background(schedule=30)
def automated_bill():
    time.sleep(5)
    queryset = BillPayment.objects.all()
    for i in range(len(queryset)):
        cur_bill_pay = queryset[i]
        account = cur_bill_pay.account

        if cur_bill_pay.status != 'active':
            print("processed")
            continue

        if timezone.now().date() >= cur_bill_pay.date and account.balance >= cur_bill_pay.amount:
            try:
                with transaction.atomic():
                    amount_for_transfer = cur_bill_pay.amount # need to have this as part of posting in API --> tell front end!!!
                    location_transfer = 'Online' # make sure to put validator of Bill Payments though!!
                    
                    account.balance = account.balance - amount_for_transfer
                    account.save()

                    transaction_entry = Transaction(
                        account = account,
                        amount = amount_for_transfer,
                        trans_type = 'External Transfer',
                        location = location_transfer,
                        memo = "Bill Payment" + " (External Transfer To Routing Number- {}, To Account Number- {})".format(cur_bill_pay.routing_num, cur_bill_pay.to_account_num)
                    )
                    transaction_entry.save()

                    cur_bill_pay.status = 'processed'
                    cur_bill_pay.save()
            except IntegrityError as ex:
                return Response({'error': str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return 
    


@api_view(['GET'])
def bank_statistics(request):
    """
    Used by bank staff to get the total number of clients, accounts, and transactions in the bank
    Expected External Transfer JSON API:
    {
        "num_clients" : the total number of clients in the bank,
        "num_accounts" : the total number of accounts in the bank
        "num_transactions" : the total number of transactions in the bank
    }
    """
    if request.user.is_staff:
        num_clients = Client.objects.count()
        num_accounts = Account.objects.count()
        num_transactions = Transaction.objects.count()
        return Response({'num_clients' : num_clients,
                         'num_accounts' : num_accounts,
                         'num_transactions' : num_transactions},
                         status=status.HTTP_200_OK)
    else:
        return HttpResponse('Unauthorized', status=403)

@api_view(['GET'])
def client_account_statistics(request):
    """
    Used by bank staff to view all of the clients, their account balances, and their transactions
    Expected External Transfer JSON API:
    [
        {
            "email" : client's email
            "accounts" :
                [
                    {
                        "account_id" : id of the account
                        "account_balance" : balance of the account
                        "account_type" : type of the account (either checking or savings)
                        "transactions" :
                            [
                                {
                                    "transaction_amount" : (string) amount for this transaction
                                    "transaction_date" : when the transaction took place
                                    "transaction_type" : the type of the transaction
                                },
                                ...
                            ]
                    },
                    ...
                ]
        },
        ...
    ]
    """
    if request.user.is_staff:
        bank_data = []
        for client in Client.objects.all():
            client_data = {}
            bank_data.append(client_data)

            client_data['email'] = client.email

            client_accounts = []
            client_data['accounts'] = client_accounts

            for account in Account.objects.all():
                account_data = {}
                client_accounts.append(account_data)

                account_data['account_id'] = account.account_num
                account_data['account_balance'] = account.balance
                account_data['account_type'] = account.account_type

                account_transactions = []
                account_data['transactions'] = account_transactions

                for transaction in Transaction.objects.all():
                    transaction_data = {}
                    account_transactions.append(transaction_data)

                    transaction_data['transaction_amount'] = transaction.amount
                    transaction_data['transaction_date'] = transaction.date
                    transaction_data['transaction_type'] = transaction.trans_type

        return Response(bank_data, status=status.HTTP_200_OK)

    else:
        HttpResponse('Unauthorized', status=403)

# Create your views here.
@api_view(['GET'])
def all_accounts(request):  # not including user's accounts
    account_queryset = Account.objects.all()
    try:
        accounts = account_queryset.filter(~Q(client=request.user))
        # data = serializers.serialize('json', list(client))
        serialized_accounts = AccountSerializer(accounts, many=True, context={'request' : request})
        # print(list(client))
        return Response(serialized_accounts.data)
    except IntegrityError as ex:
        return HttpResponse('Unauthorized', status=403)
        
@api_view(['POST'])
def register(request):
    """
    POST url (example): http://127.0.0.1:8000/register/
    Postman JSON example:
    {
        "email": "hola@hola.com",
        "first_name": "91919191",
        "last_name": "123456780",
        "password": "ohyeahhahahaha",
        "address": "666 Nobuena Drive",
        "city": "San Jose",
        "state": "CA",
        "zipcode": "95051",
        "phone_num": "408-999-9899",
        "birthday": "1998-09-21"
    }
    """
    serializer = ClientSerializer(data=request.data)
    if serializer.is_valid():
        try:
            with transaction.atomic():
                created_first_name = serializer.data['first_name'] # need to have this as part of posting in API --> tell front end!!!
                created_last_name = serializer.data['last_name']
                created_email = serializer.data['email']

                created_address        = serializer.data['address']
                created_city           = serializer.data['city']
                created_state          = serializer.data['state']
                created_zipcode        = serializer.data['zipcode']
                created_phone_num      = serializer.data['phone_num']
                created_birthday       = serializer.data['birthday']
                created_password = request.data['password']
                
                client_entry = Client(
                    email = created_email,
                    first_name = created_first_name,
                    last_name = created_last_name,

                    address        = created_address,
                    city           = created_city,
                    state          = created_state,
                    zipcode        = created_zipcode,
                    phone_num      = created_phone_num,
                    birthday       = created_birthday,

                    is_staff = False,
                    is_superuser = False
                )

                client_entry.set_password(created_password)
                client_entry.save()

        except IntegrityError as ex:
            return Response({'error': str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({'status': 'Register successful'})
    else:
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def reset_password(request):
    """
    POST url (example): http://127.0.0.1:8000/reset_password/
    Postman JSON example:
    {
        "email": "ralphstevendc@gmail.com",
        "password": "forthewintouchdown"
    }
    """
    try:
        client = Client.objects.get(email=request.data['email'])
    except Client.DoesNotExist:
        return Response({'status': 'Client does not exist'})

    try:
        with transaction.atomic():
            created_password = request.data['password']
            client = Client.objects.get(email=request.data['email'])
            client.set_password(created_password)
            client.save()
            print(client.password)

    except IntegrityError as ex:
        return Response({'error': str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({'status': 'Reset Password successful'})

class ClientViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Client.objects.all()
    account_queryset = Account.objects.all()
    serializer_class = ClientSerializer
    pagination_class = None
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['post'])
    def edit_client(self, request, pk=None):
        """
        POST url (example): http://127.0.0.1:8000/clients/3/edit_client/
        Postman Example JSON:
        {
            "email": "np@no.com",
            "first_name": "91919191",
            "last_name": "123456780",
            "address": "666 Nobueno Drive",
            "city": "San Jose",
            "state": "CA",
            "zipcode": "95051",
            "phone_num": "408-999-9999",
            "birthday": "1998-09-21"
        }
        """
        client_now = self.get_object()
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            try:
                with transaction.atomic():
                    client_now.email = serializer.data['email']
                    client_now.first_name = serializer.data['first_name']
                    client_now.last_name = serializer.data['last_name']

                    client_now.address        = serializer.data['address']
                    client_now.city           = serializer.data['city']
                    client_now.state          = serializer.data['state']
                    client_now.zipcode        = serializer.data['zipcode']
                    client_now.phone_num      = serializer.data['phone_num']
                    client_now.birthday       = serializer.data['birthday']
                    client_now.save()

                return Response({'status': 'Edit user successful'})
            except IntegrityError as ex:
                return Response({'error': str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def create_account(self, request, pk=None):
        """
        POST url (example): http://127.0.0.1:8000/clients/2/create_account/

        Postman Example JSON:
        {
            "account_type": "checking"
        }
        """
        client_now = self.get_object()
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            try:
                with transaction.atomic():
                    submitted_type = serializer.data['account_type']

                    account_entry = Account(
                            account_num = randint(10000000, 99999999), # doesn't check if they're the same one.
                            account_type = submitted_type,
                            client = client_now,
                            status = 'active'
                        )
                    account_entry.save()
            
            except IntegrityError as ex:
                return Response({'error': str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'status': 'create account successful'})
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def create_bill_payment(self, request, pk=None):
        """
        POST url (example): http://127.0.0.1:8000/clients/2/create_bill_payment/
        Postman Example JSON:
        {
            "from_account_num": "149192", <---- (Make SURE IT'S CHARACTERS, NOT OBJECT ACCOUNT ITSELF!!)
            "routing_num": "123456790",
            "to_account_num": "11111111",
            "amount": 5.00,
            "date": "2020-10-27"
        }
        """
        serializer = BillPaymentSerializer(data=request.data)
        if serializer.is_valid():
            try:
                with transaction.atomic():
                    acc_num = request.data["from_account_num"]
                    from_account = self.account_queryset.filter(account_num=acc_num)[0]

                    bill_payment_entry = BillPayment(
                            account = from_account,
                            routing_num = serializer.data['routing_num'],
                            to_account_num = serializer.data['to_account_num'],
                            amount = serializer.data['amount'],
                            date   = serializer.data['date'],
                            status = 'active'
                    )

                    bill_payment_entry.save()
            
            except IntegrityError as ex:
                return Response({'error': str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'status': 'create bill payment successful'})
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, pk=None):
        """
        Gets client that belongs to the authenticated user making this API call
        """

        try:
            client = list(self.queryset.filter(email=request.user.email))
            serializer = self.serializer_class(client, many=True, context={'request' : request})
            return Response(serializer.data[0])
        except IntegrityError as ex:
            return HttpResponse('Unauthorized', status=403)

    def retrieve(self, request, pk=None):
        client = self.queryset.get(pk=pk)

        if client == request.user:
            serializer = ClientSerializer(client, context={'request' : request})
            return Response(serializer.data)
        else:
            return HttpResponse('Unauthorized', status=403)

class AccountViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows accounts to be viewed or edited.
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    pagination_class = None
    permission_classes = [permissions.IsAuthenticated]

    # WILL ONLY GET ACTIVE ACCOUNTS. 
    def list(self, request):
        """
        Gets all of the accounts that belong to the authenticated user making this API call
        """
        accounts = list(self.queryset.filter(client=request.user).filter(status='active'))
        serializer = self.serializer_class(accounts, many=True, context={'request' : request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        """
        Gets an account from the given account number
        """
        account = self.queryset.filter(client=request.user)[0]
        serializer = self.serializer_class(account, context={'request' : request})
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def transactions(self, request, pk=None):
        """
        Gets all of the transactions for the provided account number assuming the requesting user is authorized for it
        """
        if pk is not None:
            #TODO: look into the security vulnerability where malicious actors time how long it takes to get a response to see if an account # is valid
            account = self.queryset.get(account_num=pk)

            if account is None:
                return Response(status=status.HTTP_404_NOT_FOUND)

            elif account.client == request.user:
                transaction_set = Transaction.objects.all()
                transactions = list(transaction_set.filter(account=account))

                serializer = TransactionSerializer(transactions, many=True, context={'request' : request})
                return Response(serializer.data)

            else:
                print(account.client)
                print(request.user)
                # choosing to return not found so that people can't search for account #s by looking at the response
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error' : 'Expected account number'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def close_account(self, request, pk=None):
        """
        POST url (example): http://127.0.0.1:8000/accounts/91882878/close_account/
        Postman Example JSON:
        {
            "location": "Online",
            "memo": "Closed - Client is mad"
        }
        """
        account = self.get_object()
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            try:
                with transaction.atomic():
                    amount_for_withdraw = account.balance # need to have this as part of posting in API --> tell front end!!!
                    location_withdrawn = serializer.data['location']
                    memo_on_withdrawn = serializer.data['memo']
                    
                    account.balance = account.balance - amount_for_withdraw
                    account.status = 'inactive'
                    account.save()
                    
                    transaction_entry = Transaction(
                        account = account,
                        amount = amount_for_withdraw,
                        trans_type = 'Withdraw - ACCOUNT CLOSED',
                        location = location_withdrawn,
                        memo = memo_on_withdrawn
                    )
                    transaction_entry.save()
            except IntegrityError as ex:
                return Response({'error': str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'status': 'Closing Account successful'})
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
        

    @action(detail=True, methods=['post'])
    def transfer_internal(self, request, pk=None):
        """
        POST url (example): http://127.0.0.1:8000/accounts/91919191/transfer_internal/
        Postman Example JSON:
        {
            "to_account_number": "149192",
            "amount": 10.00,
            "location": "Online",
            "memo": "For you loser"
        }
        """
        account = self.get_object()
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            try:
                transfer_to_acc_num = request.data["to_account_number"]
                transfer_to_account = self.queryset.filter(account_num=transfer_to_acc_num)[0]

                with transaction.atomic():
                    amount_for_transfer = serializer.data['amount'] # need to have this as part of posting in API --> tell front end!!!
                    if amount_for_transfer > account.balance:
                        return Response({'error': 'Transfer over the balance. '}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    if amount_for_transfer < 0:
                        return Response({'error': 'Transfer cannot be negative '}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    location_deposited = serializer.data['location']
                    memo_on_deposit = serializer.data['memo'] # for memos, make sure to have default value from front end
                    
                    # FROM
                    account.balance = account.balance - amount_for_transfer
                    account.save()

                    transaction_one = Transaction(
                        account = account,
                        amount = amount_for_transfer,
                        trans_type = 'Withdraw - Internal Transfer',
                        location = location_deposited,
                        memo = memo_on_deposit
                    )
                    transaction_one.save()

                    # TO
                    transfer_to_account.balance = transfer_to_account.balance + amount_for_transfer
                    transfer_to_account.save()

                    transaction_two = Transaction(
                        account = transfer_to_account,
                        amount = amount_for_transfer,
                        trans_type = 'Deposit - Internal Transfer',
                        location = location_deposited,
                        memo = 'TO YOU: Internal Transfer'
                    )
                    transaction_two.save()

            except IntegrityError as ex:
                return Response({'error': str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'status': 'internal transfer successful'})
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def deposit(self, request, pk=None):
        """
        POST url (example): http://127.0.0.1:8000/accounts/91919191/deposit/
        Postman Example JSON:
        {
            "amount": 5.00, 
            "location": "Online", 
            "memo": "Deposit #1" 
        }
        """
        account = self.get_object()
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            try:
                with transaction.atomic():
                    amount_for_deposit = serializer.data['amount'] # need to have this as part of posting in API --> tell front end!!!
                    if amount_for_deposit < 0:
                        return Response({'error': 'Deposit cannot be negative '}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    location_deposited = serializer.data['location']
                    memo_on_deposit = serializer.data['memo'] # for memos, make sure to have default value from front end
                    check_path_confirmed = serializer.data['check_path']

                    account.balance = account.balance + amount_for_deposit
                    account.save()
                    transaction_entry = Transaction(
                        account = account,
                        amount = amount_for_deposit,
                        check_path = check_path_confirmed,
                        trans_type = 'Deposit',
                        location = location_deposited,
                        memo = memo_on_deposit
                    )
                    transaction_entry.save()

            except IntegrityError as ex:
                return Response({'error': str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'status': 'deposit successful'})
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def withdraw(self, request, pk=None):
        """
        POST url (example): http://127.0.0.1:8000/accounts/91919191/withdraw/
        Postman Example JSON:
        {
            "amount": 5.00, 
            "location": "Online", 
            "memo": "Withdraw #1" 
        }
        """
        account = self.get_object()
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            try:
                with transaction.atomic():
                    amount_for_withdraw = serializer.data['amount'] # need to have this as part of posting in API --> tell front end!!!
                    if amount_for_withdraw > account.balance:
                        return Response({'error': 'withdraw over the balance. '}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    elif amount_for_withdraw < 0:
                        return Response({'error': 'withdraw cannot be negative '}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    location_withdrawn = serializer.data['location']
                    memo_on_withdrawn = serializer.data['memo']

                    account.balance = account.balance - amount_for_withdraw
                    account.save()
                    transaction_entry = Transaction(
                        account = account,
                        amount = amount_for_withdraw,
                        trans_type = 'Withdraw #1',
                        location = location_withdrawn,
                        memo = memo_on_withdrawn
                    )
                    transaction_entry.save()
            except IntegrityError as ex:
                return Response({'error': str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'status': 'withdraw successful'})
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=True, methods=['post'])
    def transfer_external(self, request, pk=None):
        """
        POST url (example): http://127.0.0.1:8000/accounts/91919191/transfer_external/
        Expected External Transfer JSON API:
        {
            "amount": 10.00,
            "location": "Online",
            "routing_num": "123456789",
            "to_account_num": "999999",
            "memo": "External Transfer #1"
        }
        """

        account = self.get_object()
        serializer = TransactionSerializer(data={key:request.data[key] for key in ['amount', 'location', 'memo']})

        if serializer.is_valid():
            try:
                with transaction.atomic():
                    amount_for_transfer = serializer.data['amount'] # need to have this as part of posting in API --> tell front end!!!
                    if amount_for_transfer > account.balance:
                        return Response({'error': 'Transfer over the balance. '}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    elif amount_for_transfer < 0:
                        return Response({'error': 'Transfer cannot be negative '}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    location_transfer = serializer.data['location']
                    memo_on_transfer = serializer.data['memo']
                    
                    account.balance = account.balance - amount_for_transfer
                    account.save()

                    transaction_entry = Transaction(
                        account = account,
                        amount = amount_for_transfer,
                        trans_type = 'External Transfer',
                        location = location_transfer,
                        memo = memo_on_transfer + " (External Transfer To Routing Number- {}, To Account Number- {})".format(request.data['routing_num'], request.data['to_account_num'])
                    )
                    transaction_entry.save()
            except IntegrityError as ex:
                return Response({'error': str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'status': 'External transfer successful'})
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
                



class TransactionViewSet(viewsets.ModelViewSet):
    """
    API endpoint for list of transactions
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    pagination_class = None
    # permission_classes = [permissions.IsAuthenticated]

class BillPaymentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for client's bill payments
    """
    queryset = BillPayment.objects.all()
    account_queryset = Account.objects.all()
    serializer_class = BillPaymentSerializer
    pagination_class = None
    permission_classes = [permissions.IsAuthenticated]

    # WILL ONLY GET ACTIVE BILL PAYMENTS FOR AUTHENTICATED USER
    def list(self, request):
        """
        Gets all of the accounts that belong to the authenticated user making this API call
        """
        our_list = [item.pk for item in self.account_queryset.filter(client=request.user)]        
        payments = list(self.queryset.filter(account__in=our_list).filter((~Q(status='processed'))).filter((~Q(status='cancelled'))))
        serializer = self.serializer_class(payments, many=True, context={'request' : request})
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def edit_bill_payment(self, request, pk=None):
        """
        POST url (example): http://127.0.0.1:8000/bill_payments/2/edit_bill_payment/
        Expected External Transfer JSON API:
        {
            "from_account_num": "149192",
            "routing_num": "123456785",
            "to_account_num": "11111112",
            "amount": 10.00,
            "date": "2020-10-25"
        }
        """
        bill_payment = self.get_object()
        serializer = BillPaymentSerializer(data=request.data)
        if serializer.is_valid():
            try:
                with transaction.atomic():
                    acc_num = request.data["from_account_num"]
                    from_account = self.account_queryset.filter(account_num=acc_num)[0]

                    bill_payment.account = from_account
                    bill_payment.routing_num = serializer.data['routing_num']
                    bill_payment.to_account_num = serializer.data['to_account_num']
                    bill_payment.amount = serializer.data['amount']
                    bill_payment.date = serializer.data['date']
                    bill_payment.save()

                    bill_payment.save()
            
            except IntegrityError as ex:
                return Response({'error': str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'status': 'edit bill payment successful'})
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def cancel_bill_payment(self, request, pk=None):
        """
        JUST THE URL --> POST url (example): http://127.0.0.1:8000/bill_payments/2/cancel_bill_payment/
        Expected External Transfer JSON API:
        """
        bill_payment = self.get_object()
        try:
            with transaction.atomic():
                bill_payment.status = 'cancelled'
                bill_payment.save()

                bill_payment.save()
        
        except IntegrityError as ex:
            return Response({'error': str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'status': 'cancel bill payment successful'})



# TO DO LIST
"""
- Create Transfer External API $$$
- Edit Register API (create address and other fields) Edits For Addresses, Phone Numbers, ZipCode, etc. (For User) $$$
- Create Automation to do Transfer External Every 5 seconds (Just for one time payment)
- Do Create, Edit and Delete (Just Making It Cancelled) of Bill Payments $$$
- NO Deletions for Rest Of the Model. $$$
- Validating of the forms inputted.
- Connecting backend with frontends.
---> Optimize Django queries (After semester is over.)
"""
