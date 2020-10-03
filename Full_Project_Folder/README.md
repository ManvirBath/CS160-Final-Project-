# CS160-Final-Project- Online Banking Team 1

Problem statement – A new online only bank is being kickoff.  We need a web-based application server to handle normal banking transaction requests.  For example, we need to able to process account open/close, cash deposit/withdraw via ATM or check deposit with image, account transfer to/from internal or external accounts, setup automated bill payments.  You are responsible to develop the website where customer can connect via web browser as a client.  Mobile client is not required for this project.  However you are required to provide an API (e.g. web service) for remote client to credit or debit their account.  This new bank will partner with Chase bank to use their ATM machine for free of charge.  You will need to able to search all the Chase ATM locations given a starting address.Besides the customer actions, the bank manager requires a dashboard page to query or generate reports based on customer and/or account attributes (e.g. balance, zip code, ...).

BEFORE RUNNING AND TESTING BACK-END:
1) Make sure to install virtual environment package in your computer
-  pip3 install virtualenv

2) Then make sure you're in the 'CS160-Final-Project-' directory. 

3) Create a virtual environment such as '.env':
- virtualenv .env

4) Then activate the virtual environment:
- source .env/bin/activate

5) You should be in the virtual environment (it should show '(.env) on the left side of your terminal) and make sure to install these packages:
- pip install django
- pip install selenium


!!!! DO THIS BEFORE DOING ANY TESTS !!!
MIGRATING THE MODEL AND USING THE TEST DATABASE (WHILE TESTING):
1) Again, make sure you're in the 'CS160-Final-Project-/Full_Project_Folder' directory.

2) Then do the following migration commands to make the database tables:
- python manage.py makemigrations
- python manage.py migrate

TESTING
1) Make sure to run server first in the 'CS160-Final-Project-' directory:
- python manage.py runserver

2) If you want to do a test, make sure to put the word 'test' in the function in the 'tests.py' file.

3) Then in the 'CS160-Final-Project-' directory, type the following command to run tests (MAKE SURE YOU'RE IN THE VIRTUAL ENVIRONMENT TO DO THIS):

- python manage.py test
