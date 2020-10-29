# from __future__ import unicode_literals

from django.core import serializers
from django.shortcuts import render, HttpResponse
from .forms import Form
from .models import Client
import hashlib 

from django.contrib.auth.models import User, Group
from rest_framework import status, viewsets
from rest_framework import permissions
from django.shortcuts import render, HttpResponse

from rest_framework.response import Response
from .serializers import ClientSerializer, AccountSerializer, TransactionSerializer, BillPaymentSerializer
from .models import Client, Account, Transaction, BillPayment
from .managers import ClientManager
from django.db import IntegrityError, transaction
from rest_framework.decorators import action, api_view
from rest_framework.views import APIView
from random import randint
from background_task import background

@background(schedule=5)
def automated_bill():
    print("hello")

def background_view(request):
    automated_bill()
    return HttpResponse("Hello")


# Create your views here.
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
    # permission_classes = [permissions.IsAuthenticated]

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

class AccountViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows accounts to be viewed or edited.
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    # permission_classes = [permissions.IsAuthenticated]

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
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    # permission_classes = [permissions.IsAuthenticated]

class BillPaymentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = BillPayment.objects.all()
    account_queryset = Account.objects.all()
    serializer_class = BillPaymentSerializer
    # permission_classes = [permissions.IsAuthenticated]

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
- Edit Register API (create address and other fields) Edits For Addresses, Phone Numbers, ZipCode, etc. (For User)
- Create Automation to do Transfer External Every 5 seconds (Just for one time payment)
- Do Create, Edit and Delete (Just Making It Cancelled) of Bill Payments $$$
- NO Deletions for Rest Of the Model. $$$
- Validating of the forms inputted.
- Connecting backend with frontends.
---> Optimize Django queries (After semester is over.)
"""
