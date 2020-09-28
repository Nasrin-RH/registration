create database register;
create table users1(
    -- user_id serial primary key,
    -- name varchar(20) not null,
    -- company varchar(100) not null,
    -- department varchar(50) not null,
    -- designation varchar(5) not null,
    -- contact varchar(15) not null,
    -- email text unique not null,
    -- password varchar(20) not null

    id serial primary key,
    name varchar(100) not null,
    company varchar(100) not null,
    department varchar(100) not null,
    designation varchar(100) not null,
    contact varchar(100) not null,
    email varchar(100) unique not null,
    password varchar(100) not null
);