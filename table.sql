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
    status varchar(20),
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
    country varchar(30),
    associatedAccount varchar(10),
    status varchar(20)
);

create table application(
    id int primary key AUTO_INCREMENT,
    studentid  varchar(250),
    consultantid varchar(250),
    stage varchar(30),
    courseid varchar(30),
    status varchar(8)
);

create table courses(
    id int primary key AUTO_INCREMENT,
    universityid  varchar(10),
    level varchar(30),
    duration varchar(100),
    link varchar(250),
    cricos varchar(12),
    campusid varchar(250),
    status varchar(20)
);

create table university(
    id int primary key AUTO_INCREMENT,
    name varchar(50),
    status varchar(20)
);

create table campus(
    id int primary key AUTO_INCREMENT,
    name varchar(30),
    universityid varchar(30),
    addressid varchar(30),
    status varchar(20),
    UNIQUE (addressid)
);

insert into user(name,contactNumber, email, password, status,role) values('Admin','+61410624268','chiragchaplot@gmail.com','admin
','true','admin')

insert into user(name,contactNumber, email, password, status,role) values('Chirag Chaplot','+61410624268','cchaplot@students.federation.edu.au','admin
','true','admin')