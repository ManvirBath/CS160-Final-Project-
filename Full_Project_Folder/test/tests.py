from django.test import TestCase
from selenium import webdriver
from .forms import Form
import hashlib 
from .models import Client

import json
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.test.client import RequestFactory 
import time
from .models import Client, Account, Transaction, BillPayment

class RegistrationTestCase(APITestCase):
    def test_register(self):
        data = {
            "email": "labamba@hola.com",
            "first_name": "Ralph",
            "last_name": "Cruz",
            "password": "tellmewhy",
            "address": "676 Nobuena Drive",
            "city": "San Jose",
            "state": "CA",
            "zipcode": "95051",
            "phone_num": "408-999-9899",
            "birthday": "1998-09-21"
        }
        response = self.client.post("/api/register/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_reset_password(self):
        data = {
            "email": "labamba@hola.com",
            "password": "tellmewhy1"
        }
        response = self.client.post("/api/reset_password/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class AllTestCase(APITestCase):
    # code suppressed 
    def setUp(self):
        self.user = Client.objects.create_user(email="hello@gmail.com", password="forthewintouchdown")

    def test_login(self):
        data = {
            "email": "hello@gmail.com",
            "password": "forthewintouchdown" 
        }
        response = self.client.post("/api/token/", data)
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION="JWT " + self.token)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_all_accounts(self):
        data = {
            "email": "hello@gmail.com",
            "password": "forthewintouchdown" 
        }
        response = self.client.post("/api/token/", data)
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION="JWT " + self.token)
        response = self.client.get("/api/all_accounts/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_all_clients(self):
        data = {
            "email": "hello@gmail.com",
            "password": "forthewintouchdown" 
        }
        response = self.client.post("/api/token/", data)
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION="JWT " + self.token)
        response = self.client.get("/api/all_clients/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_all_clients(self):
        data = {
            "email": "hello@gmail.com",
            "password": "forthewintouchdown" 
        }
        response = self.client.post("/api/token/", data)
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION="JWT " + self.token)
        response = self.client.get("/api/all_clients/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_edit_client(self):
        user = {
            "email": "hello@gmail.com",
            "password": "forthewintouchdown" 
        }
        response = self.client.post("/api/token/", user)
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION="JWT " + self.token)
        data = {
            "email": "hello@gmail.com",
            "first_name": "Ralph",
            "last_name": "Cruise",
            "address": "676 Nobueno Drive",
            "city": "San Jose",
            "state": "CA",
            "zipcode": "95051",
            "phone_num": "4089999999",
            "birthday": "1998-09-21"
        }
        response = self.client.post("/api/clients/1/edit_client/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_client(self):
        user = {
            "email": "hello@gmail.com",
            "password": "forthewintouchdown" 
        }
        response = self.client.post("/api/token/", user)
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION="JWT " + self.token)
        response = self.client.get("/api/clients/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_create_account(self):
        user = {
            "email": "hello@gmail.com",
            "password": "forthewintouchdown" 
        }
        response = self.client.post("/api/token/", user)
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION="JWT " + self.token)
        data = {
            "account_type": "checking"
        }
        response = self.client.post("/api/clients/1/create_account/", data)
        print(Account.objects.select_related('client').all()[0].account_num)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def performance_test(self):
        NUM_EVAL_RUNS = 5

        print('Regular Query Calls...')
        sequential_time = 0
        for i in range(NUM_EVAL_RUNS):
            start = time.perf_counter()

            # Calls done here ...
            BillPayment.objects.all()
            Account.objects.all()
            Client.objects.all()
            Account.objects.all()
            Client.objects.all()
            Client.objects.all()
            Account.objects.all()
            Account.objects.all()
            Transaction.objects.all()
            Transaction.objects.all()
            BillPayment.objects.all()
            Account.objects.all()

            sequential_time += time.perf_counter() - start
        sequential_time /= NUM_EVAL_RUNS

        print('Select Related Query Calls...')
        parallel_time = 0
        for i in range(NUM_EVAL_RUNS):
            start = time.perf_counter()
            user_feeds()
            parallel_time += time.perf_counter() - start
        parallel_time /= NUM_EVAL_RUNS

        print('Average Time for Calls to Regular Queries using 5 Rounds of all APIs: {:.2f} ms'.format(sequential_time*1000))
        print('Average Time for Calls to Select Related Queries using 5 Rounds of all APIs: {:.2f} ms'.format(parallel_time*1000))
    

# Account.objects.select_related('client').all()

        
    # def test_login(self):
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

# class StatisticsTestCase(APITestCase):
#     def test_bank_statistics(self):
#         response = self.client.get("/api/bank_statistics/")
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

# # # these tests describe something that a user wants to do
# # class FunctionalTestCase(TestCase):
# #     def setUp(self):
# #         self.browser = webdriver.Firefox()
    
# #     # put the word test first to have django run the test
# #     def test_there_is_homepage(self):
# #         self.browser.get('http://localhost:8000')
# #         self.assertIn('Enter hash here: ', self.browser.page_source)
    

# #     def test_hash_of_hello(self):
# #         self.browser.get('http://localhost:8000')
# #         text = self.browser.find_element_by_id('id_text')
# #         text.send_keys('hello')
# #         self.browser.find_element_by_name('submit').click()
# #         self.assertIn('123613681094890128349012849012839041', self.browser.page_source)
    
# #     # what happens after we run all our tests
# #     def tearDown(self):
# #         self.browser.quit()  # closes down the browser

# class UnitTestCase(TestCase):
#     def test_home_homepage_template(self):
#         response = self.client.get('/') # get response of homepage
#         self.assertTemplateUsed(response, 'test/home.html')
    
#     def test_form(self):
#         form = Form(data={'text': 'hello'}) # should be able to make form
#         self.assertTrue(form.is_valid())

#     def test_hash_func_works(self):
#         text_hash = hashlib.sha256('hello'.encode('utf-8')).hexdigest()
#         self.assertEqual('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', text_hash)

#     # DATABASE TESTING
#     # for password
#     def test_hash_object(self):
#         hash = Client()
#         text = 'hello'
#         hash.password = '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
#         hash.save()
#         pulled_hash = Client.objects.get(password='2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824')
#         self.assertEqual(text, pulled_hash.password)