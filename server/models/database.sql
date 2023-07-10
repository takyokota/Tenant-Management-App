-- for PostgreSQL

CREATE DATABASE tenant_db;

CREATE TABLE tenant (
    id SERIAL NOT NULL PRIMARY KEY,
    lname VARCHAR(128) NOT NULL,
    fname VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    aptno VARCHAR(128) NOT NULL
); 

CREATE TABLE sort_option (
    id SERIAL NOT NULL PRIMARY KEY,
    soption VARCHAR(128)
);