

drop table if exists card_transaction;
drop table if exists checking_transaction;
drop table if exists savings_transaction;
drop table if exists checking_debit;
drop table if exists cust_checking;
drop table if exists cust_savings;
drop table if exists transactions;
drop table if exists debit_card;
drop table if exists checking_acct;
drop table if exists savings_acct;
drop table if exists customer;
drop table if exists manager;

create table manager(
manager_id int not null auto_increment primary key,
mgr_username varchar(25) unique not null,
mgr_pwd varchar(25) not null
);

create table customer (
customer_id int not null auto_increment primary key,
username varchar(36) unique not null,
password varchar(45) not null,
first_name varchar(36) not null,
last_name varchar(36) not null,
address varchar(100) not null,
city varchar(35) not null,
state varchar(5) not null,
zipcode varchar(5) not null,
phone_num       varchar(13) not null,
email_addr      varchar(255) not null,
birthday        DATE not null
);

create table savings_acct (
savings_acct_num varchar(10) not null primary key,
savings_balance float not null,
status varchar(6) not null,
routing_num varchar(9) not null	
);

create table checking_acct(
checking_acct_num varchar(10) not null primary key,
checking_balance float not null,
status varchar(6) not null,
routing_num varchar(9) not null		
);

create table debit_card (
debit_card_num varchar(16) not null primary key,
expiration varchar(8) not null,
CVV varchar(3) not null,
pin_num int not null
);

create table transactions (
transaction_id varchar(12) not null primary key,
amount	 float not null,
trans_date DATE not null,
trans_type varchar(25) not null,
location varchar(25) not null,
check_path varchar(255) unique,
memo varchar(255)		
);

create table cust_savings (
customer_id int not null,
savings_acct_num varchar(10) not null,
foreign key (customer_id) references customer(customer_id) on delete cascade,
foreign key (savings_acct_num) references savings_acct(savings_acct_num) on delete cascade
);

create table cust_checking (
customer_id int not null,
checking_acct_num varchar(10) not null,
foreign key(checking_acct_num) references checking_acct(checking_acct_num) on delete cascade,
foreign key(customer_id) references customer(customer_id) on delete cascade
);

create table checking_debit (
checking_acct_num varchar(10) not null,
debit_card_num varchar(16) not null,
foreign key(checking_acct_num) references checking_acct(checking_acct_num) on delete 
cascade,
foreign key(debit_card_num) references debit_card(debit_card_num) on delete cascade
);

create table savings_transaction (
savings_acct_num varchar(10) not null,
transaction_id varchar(12) not null,
foreign key(savings_acct_num) references savings_acct(savings_acct_num) on delete cascade,
foreign key(transaction_id) references transactions(transaction_id) on delete cascade
);

create table checking_transaction (
checking_acct_num varchar(10) not null,
transaction_id varchar(12) not null,
foreign key(checking_acct_num) references checking_acct(checking_acct_num) on delete cascade,
foreign key(transaction_id) references transactions(transaction_id) on delete cascade
);

create table card_transaction (
debit_card_num varchar(16) not null, 
transaction_id varchar(12) not null,
foreign key(debit_card_num) references debit_card(debit_card_num) on delete cascade,
foreign key(transaction_id) references transactions(transaction_id) on delete cascade
);

ALTER TABLE cust_savings ADD INDEX(customer_id);
ALTER TABLE savings_transaction ADD INDEX(savings_acct_num);
ALTER TABLE checking_transaction ADD INDEX(checking_acct_num);
ALTER TABLE card_transaction ADD INDEX(debit_card_num);

insert into manager(mgr_username, mgr_pwd) values('dlbmgr2021','itssp00kyszn');

insert into customer(username,password,first_name,last_name,address,city,state,zipcode,phone_num,email_addr,birthday) values('sherlock.holmes','Gr8estdetective!', 'Sherlock', 'Holmes', '77 Ocean Road', 'San Carlos', 'CA', 30809, '(711)265-9193', 'sherlock.holmes@gmail.com', '1980-12-25');
insert into customer(username,password,first_name,last_name,address,city,state,zipcode,phone_num,email_addr,birthday) values('lizbennet','britlit1sfun', 'Elizabeth', 'Bennet', '8493 Ryan Drive', 'Leland', 'CA', 95112, '(675)844-7400', 'elizabethbennet@yahoo.com', '1990-04-18');
insert into customer(username,password,first_name,last_name,address,city,state,zipcode,phone_num,email_addr,birthday) values('peter_parker','marvel4life', 'Peter', 'Parker', '20 Ingram Street', 'New York City', 'NY', 87345, '(813)786-0100', 'parkerpeter101@gmail.com', '2001-08-10');
insert into customer(username,password,first_name,last_name,address,city,state,zipcode,phone_num,email_addr,birthday) values('bruce.wayne','idontsmile00', 'Bruce', 'Wayne', '1007 Mountain Drive', 'Gotham', 'NJ', 34897, '(340)102-7778', 'bruce.wayne@gmail.com', '1978-04-18');
insert into customer(username,password,first_name,last_name,address,city,state,zipcode,phone_num,email_addr,birthday) values('ellewoods1','lik3itshard?', 'Elle', 'Woods', '1100 N Canon Dr', 'Beverly Hills', 'CA', 90210, '(424) 238-8710', 'ellewoodslaw@gmail.com', '1992-10-09');
insert into customer(username,password,first_name,last_name,address,city,state,zipcode,phone_num,email_addr,birthday) values('jomarch','iluvwriting333', 'Jo', 'March', '2973 Walkman Court', 'Reno', 'NV', 78345, '(908)877-8970', 'jo.march.writes@gmail.com', '1989-01-01');

insert into checking_acct values('4495610253',10056.87,'active', 265323074);
insert into checking_acct values('3486107813',547.00,'active',265323074);
insert into checking_acct values('3713322887',89.34,'active',265323074);
insert into checking_acct values('8458641605',1234567.89,'active',265323074);
insert into checking_acct values('6382249707',50000.00,'active',265323074);
insert into checking_acct values('2678867874',250.00,'active',265323074);

insert into debit_card values('6143485064446901','08/2024',123,7890);
insert into debit_card values('8622345666728780','11/2023',345,8765);
insert into debit_card values('0658571821818546','09/2024',567,4332);
insert into debit_card values('6855483415684734','10/2021',789,1010);
insert into debit_card values('9402970241218315','01/2023',901,0978);
insert into debit_card values('2337990709367116','05/2022',234,1357);

insert into cust_checking values(1,'4495610253');
insert into cust_checking values(2,'3486107813');
insert into cust_checking values(3,'3713322887');
insert into cust_checking values(4,'8458641605');
insert into cust_checking values(5,'6382249707');
insert into cust_checking values(6,'2678867874');

insert into checking_debit values('4495610253','6143485064446901');
insert into checking_debit values('3486107813','8622345666728780');
insert into checking_debit values('3713322887','0658571821818546');
insert into checking_debit values('8458641605','6855483415684734');
insert into checking_debit values('6382249707','9402970241218315');
insert into checking_debit values('2678867874','2337990709367116');

insert into savings_acct values('6355184615',783.90,'active',265323074);
insert into savings_acct values('9636929761',800.00,'active',265323074);
insert into savings_acct values('2716389696',345678.89,'active',265323074);

insert into cust_savings values(2,'6355184615');
insert into cust_savings values(3,'9636929761');
insert into cust_savings values(4,'2716389696');

insert into transactions(transaction_id,amount,trans_date,trans_type,location) values('RXT55D8CKYSF',-100.00,'2020-09-24','withdraw','n/a');
insert into transactions(transaction_id,amount,trans_date,trans_type,location) values('LR9F7YI7BCFE',-26.34,'2020-08-02','other','n/a');
insert into transactions(transaction_id,amount,trans_date,trans_type,location) values('58XK7YZ7FM9K',-250.00,'2020-04-18','send','internal');
insert into transactions(transaction_id,amount,trans_date,trans_type,location,memo) values('GOEI9F904PLU',300.00,'2020-09-01','deposit','n/a','Deposit paycheck');
insert into transactions(transaction_id,amount,trans_date,trans_type,location) values('R9V14WQALO0B',-30.91,'2020-05-12','withdraw','n/a');

insert into checking_transaction values('4495610253','RXT55D8CKYSF');
insert into savings_transaction values('2716389696','58XK7YZ7FM9K');
insert into savings_transaction values('6355184615','GOEI9F904PLU');
insert into checking_transaction values('2678867874','R9V14WQALO0B');
insert into savings_transaction values('2716389696','LR9F7YI7BCFE');

