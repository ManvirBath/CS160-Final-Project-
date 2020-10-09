from django.core import serializers
from django.shortcuts import render
from .forms import Form
from .models import Client
import hashlib 

from django.contrib.auth.models import User, Group
from rest_framework import status, viewsets
from rest_framework import permissions

from rest_framework.response import Response
from .serializers import ClientSerializer, AccountSerializer, TransactionSerializer
from .models import Client, Account, Transaction
from django.db import IntegrityError, transaction
from rest_framework.decorators import action

# Create your views here.
# from django.http import HttpResponse


# def index(request):
#     return HttpResponse("Congrats! You got something working!")

# GOAL IS TO RETURN TEMPLATE
def home(request):
    if request.method == 'POST':
        filled_form = Client(request.POST)
        if filled_form.is_valid():
            password = filled_form.cleaned_data['text']
            password = hashlib.sha256(password.encode('utf-8')).hexdigest()
            try:
                Hash.objects.get(password=password)
            except Form.DoesNotExist: # if the object doesn't exist, then make a new object
                form = Form()
                form.password = password
                form.save()

    form = Form()
    return render(request, 'test/home.html', {'form': form})

class ClientViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [permissions.IsAuthenticated]

class AccountViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows accounts to be viewed or edited.
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    # permission_classes = [permissions.IsAuthenticated]

    
    @action(detail=True, methods=['post'])
    def deposit(self, request, pk=None):
        """
        Expecting this JSON structure example: {'amount': 5.00, 'location': 'Online', 'memo': 'Deposit #1' }
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
                    memo_on_deposit = serializer.data['memo']
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
        Expecting this JSON structure example: {'amount': 5.00, 'location': 'Online', 'check_path': '1', 'memo': 'withdraw #1' }
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
                


class TransactionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

# TO DO LIST
  # AUTOMATED BILL PAYMENTS
# reset password - API
    # enter new password in
# create user - API
# login  - API
