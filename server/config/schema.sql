DROP DATABASE IF EXISTS SilverSurfer1;

CREATE DATABASE `SilverSurfer1`;

USE SilverSurfer1;

CREATE TABLE `Users` (
    `userId` INT NOT NULL AUTO_INCREMENT,
    `googleNickname` VARCHAR(50) NOT NULL,
    `googleEmail` VARCHAR(50) NOT NULL,
    `googleProfileImagePath` VARCHAR(200) NULL,
    `joinDate` Datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `scrapCount` INT NULL,
    PRIMARY KEY(userId)
);

CREATE TABLE `Session` (
    `userId` INT NOT NULL AUTO_INCREMENT,
    `accessToken` VARCHAR(500) NOT NULL,
    PRIMARY KEY (`userId`)
);

CREATE TABLE `Contributes` (
    `contributeId` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(10) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `content` TEXT NOT NULL,
    `isChecked` TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`contributeId`)
);

CREATE TABLE `Contents` (
    `postId` INT NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(20) NULL,
    `title` VARCHAR(200) NULL,
    `content` TEXT NULL,
    `publishDate` Datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `viewCount` INT NOT NULL DEFAULT 0,
    `scrapCount` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (`postId`)
);

CREATE TABLE `Contents_Code` (
    `codeId` INT NOT NULL AUTO_INCREMENT,
    `paragraphId` INT NOT NULL,
    `postId` INT NOT NULL,
    `codeContent` TEXT NOT NULL,
    `language` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`codeId`, `paragraphId`, `postId`)
);

CREATE TABLE `Contents_Paragraph` (
    `paragraphId` INT NOT NULL AUTO_INCREMENT,
    `postId` INT NOT NULL,
    `subTitle` VARCHAR(200) NOT NULL,
    `content` TEXT NOT NULL,
    `feature` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`paragraphId`, `postId`)
);

CREATE TABLE `Contents_Image` (
    `imageId` INT NOT NULL AUTO_INCREMENT,
    `postId` INT NOT NULL,
    `imagePath` Varchar(200) NOT NULL,
    `detail` Varchar(200) NULL,
    PRIMARY KEY (`imageId`, `postId`)
);

CREATE TABLE `Scrap` (
    `scrapId` INT NOT NULL AUTO_INCREMENT,
    `userId` INT NOT NULL,
    `postId` INT NOT NULL,
    `scrapDate` Datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`scrapId`, `userId`, `postId`)
);

ALTER TABLE
    `Session`
ADD
    CONSTRAINT `FK_Users_TO_Session_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`);

ALTER TABLE
    `Contents_Paragraph`
ADD
    CONSTRAINT `FK_Contents_TO_Contents_Paragraph_1` FOREIGN KEY (`postId`) REFERENCES `Contents` (`postId`);

ALTER TABLE
    `Contents_Code`
ADD
    CONSTRAINT `FK_Contents_Paragraph_TO_Contents_Code_1` FOREIGN KEY (`paragraphId`) REFERENCES `Contents_Paragraph` (`paragraphId`);

ALTER TABLE
    `Contents_Code`
ADD
    CONSTRAINT `FK_Contents_Paragraph_TO_Contents_Code_2` FOREIGN KEY (`postId`) REFERENCES `Contents_Paragraph` (`postId`);

ALTER TABLE
    `Contents_Image`
ADD
    CONSTRAINT `FK_Contents_TO_Contents_Image_1` FOREIGN KEY (`postId`) REFERENCES `Contents` (`postId`);

ALTER TABLE
    `Scrap`
ADD
    CONSTRAINT `FK_Users_TO_Scrap_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`);

ALTER TABLE
    `Scrap`
ADD
    CONSTRAINT `FK_Contents_TO_Scrap_1` FOREIGN KEY (`postId`) REFERENCES `Contents` (`postId`);