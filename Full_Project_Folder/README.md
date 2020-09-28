# CS160-Final-Project- Online Banking Team 1

Problem statement – A new online only bank is being kickoff.  We need a web-based application server to handle normal banking transaction requests.  For example, we need to able to process account open/close, cash deposit/withdraw via ATM or check deposit with image, account transfer to/from internal or external accounts, setup automated bill payments.  You are responsible to develop the website where customer can connect via web browser as a client.  Mobile client is not required for this project.  However you are required to provide an API (e.g. web service) for remote client to credit or debit their account.  This new bank will partner with Chase bank to use their ATM machine for free of charge.  You will need to able to search all the Chase ATM locations given a starting address.Besides the customer actions, the bank manager requires a dashboard page to query or generate reports based on customer and/or account attributes (e.g. balance, zip code, ...).

BEFORE RUNNING AND TESTING BACK-END:
1) Make sure to install pipenv to create the Python virtual environment.
   a) For Mac, type in Terminal: 'brew install pipenv'
2) Before running the full project, type in Terminal:
       'pipenv install'
3) Now, the project should be in a virtual environment. 
4) To run the project, type: pipenv run (name of the file to run)