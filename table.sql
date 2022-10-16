use mysql;
drop database if exists kasmigration;
create database kasmigration;
use kasmigration;
create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(250),
    status varchar(20)
    role varchar(20),
    UNIQUE (email)
);

create table address(
    id int primary key AUTO_INCREMENT,
    primaryField  varchar(250),
    secondaryField varchar(250),
    city varchar(30),
    state varchar(30),
    postCode varchar(8),
    associatedUser int,
    UNIQUE(associatedUser)
);

insert into user(name,contactNumber, email, password, status,role) values('Admin','+61410624268','chiragchaplot@gmail.com','admin
','true','admin')

insert into user(name,contactNumber, email, password, status,role) values('Chirag Chaplot','+61410624268','cchaplot@students.federation.edu.au','admin
','true','admin')