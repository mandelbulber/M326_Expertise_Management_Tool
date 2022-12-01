DROP DATABASE IF EXISTS emt_database;
CREATE DATABASE IF NOT EXISTS emt_database;
USE emt_database;

CREATE TABLE Role(
    roleId varchar(36) DEFAULT UUID() NOT NULL,
    name varchar(50),
    Primary Key (roleId)
);

CREATE TABLE User(
    userId varchar(36) DEFAULT UUID() NOT NULL,
    fk_roleId varchar(36) NOT NULL,
    email varchar(100) NOT NULL,
    password varchar(200) NOT NULL,
    firstname varchar(50) NOT NULL,
    lastname varchar(100) NOT NULL,
    Primary Key (userId),
    UNIQUE(email)
);

CREATE TABLE Status(
    statusId varchar(36) DEFAULT UUID() NOT NULL,
    name varchar(20) NOT NULL,
    Primary Key (statusId)
);

CREATE TABLE Competence(
    competenceId varchar(36) DEFAULT UUID() NOT NULL,
    fk_statusId varchar(36) NOT NULL,
    fk_userId varchar(36) NOT NULL,
    name varchar(100) NOT NULL,
    description varchar(50) NOT NULL,
    Primary Key (competenceId)
);

CREATE TABLE Resource(
    resourceId varchar(36) DEFAULT UUID() NOT NULL,
    fk_competenceId varchar(36) NOT NULL,
    url varchar(200) NOT NULL,
    Primary Key (resourceId)
);

-- Set foreign key constraints
ALTER TABLE User
    ADD CONSTRAINT fk_UserRole
    FOREIGN KEY (fk_roleId) REFERENCES Role(roleId);

ALTER TABLE Competence
    ADD CONSTRAINT fk_CompetenceStatus
    FOREIGN KEY (fk_statusId) REFERENCES Status(statusId);

ALTER TABLE Competence
    ADD CONSTRAINT fk_CompetenceUser
    FOREIGN KEY (fk_userId) REFERENCES User(userId);

ALTER TABLE Resource
    ADD CONSTRAINT fk_ResourceCompetence
    FOREIGN KEY (fk_competenceId) REFERENCES Competence(competenceId);

-- Add test data
INSERT INTO Role (name) VALUES
("TestRole1"),
("TestRole2");

INSERT INTO Status (name) VALUES
("TestStatus1"),
("TestStatus2");

INSERT INTO User (fk_roleId, email, password, firstname, lastname) VALUES
(
    (SELECT roleId FROM Role WHERE name="TestRole1"),
    "TestEmail1@test.com",
    "$2a$10$npE.4Rdtn0wJ2i2iyrF8vegCjt9oLcO.XTjIb2w9jkKn2I475yUMO", -- TestPassword1
    "TestFirstname1",
    "TestLastname1"
),
(
    (SELECT roleId FROM Role WHERE name="TestRole2"),
    "TestEmail2@test.com",
    "$2a$10$eTU1F/UA0Mgw0nUdaMKGj.Ncra.txIAKMqUam49K/epqE4ZiQBVTW", -- TestPassword2
    "TestFirstname2",
    "TestLastname2"
);

INSERT INTO Competence (fk_statusId, fk_userId, name, description) VALUES
(
    (SELECT statusId FROM Status WHERE name="TestStatus1"),
    (SELECT userId FROM User WHERE email="TestEmail1@test.com"),
    "TestCompetence1",
    "TestDescription1"
),
(
    (SELECT statusId FROM Status WHERE name="TestStatus2"),
    (SELECT userId FROM User WHERE email="TestEmail2@test.com"),
    "TestCompetence2",
    "TestDescription2"
);

INSERT INTO Resource (fk_competenceId, url) VALUES
(
    (SELECT competenceId FROM Competence WHERE name="TestCompetence1"),
    "TestUrl1"
),
(
    (SELECT competenceId FROM Competence WHERE name="TestCompetence2"),
    "TestUrl2"
);