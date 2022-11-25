DROP DATABASE IF EXISTS M326;
CREATE DATABASE IF NOT EXISTS M326;
USE M326;

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
    firstName varchar(50) NOT NULL,
    lastName varchar(100) NOT NULL,
    Primary Key (userId)
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
("Test1"),
("Test2");