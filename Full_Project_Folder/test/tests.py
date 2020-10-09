from django.test import TestCase
from selenium import webdriver
from .forms import Form
import hashlib 
from .models import Client

# # these tests describe something that a user wants to do
# class FunctionalTestCase(TestCase):
#     def setUp(self):
#         self.browser = webdriver.Firefox()
    
#     # put the word test first to have django run the test
#     def test_there_is_homepage(self):
#         self.browser.get('http://localhost:8000')
#         self.assertIn('Enter hash here: ', self.browser.page_source)
    

#     def test_hash_of_hello(self):
#         self.browser.get('http://localhost:8000')
#         text = self.browser.find_element_by_id('id_text')
#         text.send_keys('hello')
#         self.browser.find_element_by_name('submit').click()
#         self.assertIn('123613681094890128349012849012839041', self.browser.page_source)
    
#     # what happens after we run all our tests
#     def tearDown(self):
#         self.browser.quit()  # closes down the browser

class UnitTestCase(TestCase):
    def test_home_homepage_template(self):
        response = self.client.get('/') # get response of homepage
        self.assertTemplateUsed(response, 'test/home.html')
    
    def test_form(self):
        form = Form(data={'text': 'hello'}) # should be able to make form
        self.assertTrue(form.is_valid())

    def test_hash_func_works(self):
        text_hash = hashlib.sha256('hello'.encode('utf-8')).hexdigest()
        self.assertEqual('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', text_hash)

    # DATABASE TESTING
    # for password
    def test_hash_object(self):
        hash = Client()
        text = 'hello'
        hash.password = '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
        hash.save()
        pulled_hash = Client.objects.get(password='2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824')
        self.assertEqual(text, pulled_hash.password)