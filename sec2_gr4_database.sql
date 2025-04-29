CREATE DATABASE  IF NOT EXISTS `figuro` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `figuro`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: figuro
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `accID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(250) NOT NULL,
  `fName` varchar(100) DEFAULT NULL,
  `lName` varchar(100) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `tel` varchar(25) DEFAULT NULL,
  `email` varchar(250) NOT NULL,
  `acc_password` varchar(250) NOT NULL,
  `lineID` varchar(100) DEFAULT NULL,
  `address` varchar(400) DEFAULT NULL,
  `roles` enum('Customer','Admin') NOT NULL,
  `createdDT` datetime DEFAULT CURRENT_TIMESTAMP,
  `lastestLogin` datetime DEFAULT NULL,
  PRIMARY KEY (`accID`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `accounts_chk_1` CHECK ((char_length(`acc_password`) >= 6))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'admin01','Admin','User',35,'0899999999','admin@figuro.com','adminpass',NULL,NULL,'Admin','2025-04-29 12:13:48',NULL),(2,'chipiChirpy','Chris','Pine',32,'0812345678','chris.p@gmail.com','AB12312345678','chrispiney','123 Sukhumvit, Bangkok','Customer','2025-04-29 12:13:48',NULL),(3,'TOndon','Samantha','Wong',29,'0823456789','thegame@yahoo.com','Passw0rd1','samanthaw2004','456 Silom, Bangkok','Customer','2025-04-29 12:13:48',NULL),(4,'drinkBanana','Tony','Stark',25,'0834567890','notsteelman@hotmail.com','steeln0tBesteeling','whyiamherejusttosuffer','789 Wireless Rd, Bangkok','Customer','2025-04-29 12:13:48',NULL),(5,'jane_d','Jane','Doe',27,'0845678901','jane.doeagain@gmail.com','gotPaidforThis222',NULL,'12/5 Rama IX, Bangkok','Customer','2025-04-29 12:13:48',NULL),(6,'WnessiLee','Bruce','Wayne',14,'0856789012','happihappihappi@gmail.com','Wdarkkn1ght',NULL,'1 Gotham Alley, Bangkok','Customer','2025-04-29 12:13:48',NULL),(7,'Closel','Steven','Chan',22,'0867890123','steven.chanchanwoo@hotmail.com','CCW4862','stevenceeee79','88 Sathorn, Bangkok','Customer','2025-04-29 12:13:48',NULL),(8,'_Lisa_','Lisa','Manoban',28,'0878901234','donut.deli@gmail.com','lalalisa','lisa061205','555 Asok, Bangkok','Customer','2025-04-29 12:13:48',NULL),(9,'awowowo','David','Guetta',29,'0889012345','lukalukanightfever@musicmail.com','4EverLK',NULL,'77 RCA, Bangkok','Customer','2025-04-29 12:13:48',NULL),(10,'unoverify_00','Natasha','Romanoff',36,'0890123456','oiiaio@gmail.com','blacK999Widow','sharrySky668','99 Sukhumvit 11, Bangkok','Customer','2025-04-29 12:13:48',NULL);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cartID` int NOT NULL AUTO_INCREMENT,
  `accID` int NOT NULL,
  `totalPrice` decimal(10,2) DEFAULT NULL,
  `createdDT` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedDT` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('Active','Abandoned','Completed') DEFAULT 'Active',
  PRIMARY KEY (`cartID`),
  KEY `accID` (`accID`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`accID`) REFERENCES `accounts` (`accID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,2,400.00,'2025-04-29 12:13:48','2025-04-29 12:13:48','Completed'),(2,6,350.00,'2025-04-29 12:13:48','2025-04-29 12:13:48','Completed'),(3,4,220.00,'2025-04-29 12:13:48','2025-04-29 12:13:48','Completed'),(4,5,150.00,'2025-04-29 12:13:48','2025-04-29 12:13:48','Completed'),(5,7,315.00,'2025-04-29 12:13:48','2025-04-29 12:13:48','Completed'),(6,3,150.00,'2025-04-29 12:13:48','2025-04-29 12:13:48','Abandoned'),(7,8,400.00,'2025-04-29 12:13:48','2025-04-29 12:13:48','Abandoned'),(8,9,65.00,'2025-04-29 12:13:48','2025-04-29 12:13:48','Abandoned'),(9,10,300.00,'2025-04-29 12:13:48','2025-04-29 12:13:48','Active'),(10,5,350.00,'2025-04-29 12:13:48','2025-04-29 12:13:48','Active');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cartItemID` int NOT NULL AUTO_INCREMENT,
  `cartID` int NOT NULL,
  `SKU` char(8) NOT NULL,
  `quantity` int DEFAULT '1',
  `price` decimal(10,2) NOT NULL,
  `createdDT` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedDT` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cartItemID`),
  KEY `cartID` (`cartID`),
  KEY `SKU` (`SKU`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cartID`) REFERENCES `cart` (`cartID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`SKU`) REFERENCES `products` (`SKU`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (1,1,'PRD00002',1,200.00,'2025-04-29 12:13:48','2025-04-29 12:13:48'),(2,1,'PRD00003',1,200.00,'2025-04-29 12:13:48','2025-04-29 12:13:48'),(3,2,'PRD00011',1,350.00,'2025-04-29 12:13:48','2025-04-29 12:13:48'),(4,3,'PRD00010',1,220.00,'2025-04-29 12:13:48','2025-04-29 12:13:48'),(5,4,'PRD00005',1,150.00,'2025-04-29 12:13:48','2025-04-29 12:13:48'),(6,5,'PRD00008',1,250.00,'2025-04-29 12:13:48','2025-04-29 12:13:48'),(7,5,'PRD00009',1,65.00,'2025-04-29 12:13:48','2025-04-29 12:13:48'),(8,9,'PRD00005',1,150.00,'2025-04-29 12:13:48','2025-04-29 12:13:48'),(9,9,'PRD00004',1,150.00,'2025-04-29 12:13:48','2025-04-29 12:13:48'),(10,10,'PRD00011',1,350.00,'2025-04-29 12:13:48','2025-04-29 12:13:48');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `catID` int NOT NULL AUTO_INCREMENT,
  `catName` varchar(150) NOT NULL,
  PRIMARY KEY (`catID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Customization Request'),(2,'Demon Set'),(3,'Liquidary Set'),(4,'Cyan Trail Set'),(5,'Meowing Out Set'),(6,'StrangerDaze Set'),(7,'Underfantasy Set'),(8,'Glossy Over Set'),(9,'Cutie Biting Pie Set'),(10,'Twins Boll Set'),(11,'Unnone Set');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customization`
--

DROP TABLE IF EXISTS `customization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customization` (
  `customID` int NOT NULL AUTO_INCREMENT,
  `orderID` int NOT NULL,
  `customTheme` varchar(100) NOT NULL,
  `customDetail` text NOT NULL,
  `productType` enum('Figure','Art toy') NOT NULL,
  `packageType` enum('Standard','Premium') NOT NULL,
  `customStatus` enum('Pending','2D','3D','In production','Completed','Delivered','Shipped') NOT NULL,
  `createdDT` datetime DEFAULT CURRENT_TIMESTAMP,
  `filepath` varchar(300) DEFAULT NULL,
  `createdBy` int NOT NULL,
  PRIMARY KEY (`customID`),
  KEY `orderID` (`orderID`),
  KEY `createdBy` (`createdBy`),
  CONSTRAINT `customization_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `customization_ibfk_2` FOREIGN KEY (`createdBy`) REFERENCES `accounts` (`accID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customization`
--

LOCK TABLES `customization` WRITE;
/*!40000 ALTER TABLE `customization` DISABLE KEYS */;
INSERT INTO `customization` VALUES (1,8,'Mafia Cutie Boy','A sharp-dressed, suave figure with a pastel-colored suit, slicked-back hair, and a mischievous smirk. Add gold chain accessories and a tailored fedora for that mob boss charm.','Figure','Premium','Delivered','2025-04-29 12:13:48',NULL,9),(2,9,'Sweet Candy Pink Lolita','A delicate and pastel-themed figure dressed in a pink frilly dress, lace stockings, and a bow headband. Soft, baby-blue eyes and a sweet lollipop accessory complete the look.','Figure','Standard','Delivered','2025-04-29 12:13:48',NULL,10),(3,10,'Furry Fantasy Bear','A cuddly, anthropomorphic bear character with soft fur textures, large fluffy ears, and a whimsical outfit inspired by woodland creatures. Add playful animal paws and a flower crown.','Art toy','Premium','2D','2025-04-29 12:13:48',NULL,2),(4,11,'Cyberpunk Street Samurai','A sleek, futuristic warrior with glowing neon tattoos, chrome-plated armor, and a katana. The figure will have glowing red eyes, and a jacket with holographic patterns.','Figure','Standard','Completed','2025-04-29 12:13:48',NULL,9),(5,12,'Gothic Angel Punk','A mix of goth and angel aesthetics: black feathered wings, torn fishnet stockings, a spiked collar, and dark makeup. An ethereal presence with a rebellious, edgy vibe.','Figure','Premium','Shipped','2025-04-29 12:13:48',NULL,8),(6,13,'Holo-Tech Princess','A tech-inspired princess with a glowing holographic dress and floating, digital tiara. Metallic accents shine through her royal attire, and she has a futuristic handheld device.','Art toy','Premium','Pending','2025-04-29 12:13:48',NULL,2),(7,14,'Rocker Alien Queen','A bold, fierce alien queen with neon green skin, spiky purple hair, and a leather jacket adorned with silver studs. Alien tattoos cover her arms, and she wields an electric guitar as her weapon.','Figure','Standard','3D','2025-04-29 12:13:48',NULL,9),(8,15,'Retro Space Explorer','A vintage-inspired space explorer with a retro spacesuit, complete with a bubble helmet. The figure includes a raygun and a small pet alien companion, both in vibrant neon colors.','Figure','Premium','Shipped','2025-04-29 12:13:48',NULL,10),(9,16,'Victorian Tea Party Duchess','A refined, elegant figure in a Victorian-style gown with intricate lace, ruffled sleeves, and a delicate teacup in hand. She has a soft, graceful expression and a bonnet with floral details.','Figure','Premium','In production','2025-04-29 12:13:48',NULL,2),(10,17,'Neon Rebel Skater Girl','A rebellious skater girl with rainbow-colored hair, graffiti spray cans in hand, and a neon green hoodie. She wears ripped jeans and has oversized sneakers with a glowing skateboard.','Art toy','Premium','Completed','2025-04-29 12:13:48',NULL,3);
/*!40000 ALTER TABLE `customization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modified_history`
--

DROP TABLE IF EXISTS `modified_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modified_history` (
  `modID` int NOT NULL AUTO_INCREMENT,
  `SKU` char(8) DEFAULT NULL,
  `accID` int DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`modID`),
  KEY `SKU` (`SKU`),
  KEY `accID` (`accID`),
  CONSTRAINT `modified_history_ibfk_1` FOREIGN KEY (`SKU`) REFERENCES `products` (`SKU`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `modified_history_ibfk_2` FOREIGN KEY (`accID`) REFERENCES `accounts` (`accID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modified_history`
--

LOCK TABLES `modified_history` WRITE;
/*!40000 ALTER TABLE `modified_history` DISABLE KEYS */;
INSERT INTO `modified_history` VALUES (1,'PRD00001',1,'2025-04-29 12:13:48'),(2,'PRD00002',1,'2025-04-29 12:13:48'),(3,'PRD00003',1,'2025-04-29 12:13:48'),(4,'PRD00004',1,'2025-04-29 12:13:48'),(5,'PRD00005',1,'2025-04-29 12:13:48'),(6,'PRD00006',1,'2025-04-29 12:13:48'),(7,'PRD00007',1,'2025-04-29 12:13:48'),(8,'PRD00008',1,'2025-04-29 12:13:48'),(9,'PRD00009',1,'2025-04-29 12:13:48'),(10,'PRD00010',1,'2025-04-29 12:13:48'),(11,'PRD00011',1,'2025-04-29 12:13:48');
/*!40000 ALTER TABLE `modified_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitems`
--

DROP TABLE IF EXISTS `orderitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitems` (
  `orderItemsID` int NOT NULL AUTO_INCREMENT,
  `orderID` int NOT NULL,
  `SKU` char(8) NOT NULL,
  `quantity` int DEFAULT '0',
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`orderItemsID`),
  KEY `orderID` (`orderID`),
  KEY `SKU` (`SKU`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`SKU`) REFERENCES `products` (`SKU`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitems`
--

LOCK TABLES `orderitems` WRITE;
/*!40000 ALTER TABLE `orderitems` DISABLE KEYS */;
INSERT INTO `orderitems` VALUES (1,1,'PRD00002',1,200.00),(2,1,'PRD00003',1,200.00),(3,2,'PRD00006',1,180.00),(4,2,'PRD00007',1,60.00),(5,3,'PRD00011',1,350.00),(6,4,'PRD00010',1,220.00),(7,5,'PRD00005',1,150.00),(8,6,'PRD00002',1,200.00),(9,7,'PRD00008',1,250.00),(10,7,'PRD00009',1,65.00),(11,8,'PRD00001',1,450.00),(12,9,'PRD00001',1,570.00),(13,10,'PRD00001',1,1400.00),(14,11,'PRD00001',1,900.00),(15,12,'PRD00001',1,600.00),(16,13,'PRD00001',1,1250.00),(17,14,'PRD00001',1,760.00),(18,15,'PRD00001',1,500.00),(19,16,'PRD00001',1,1000.00),(20,17,'PRD00001',1,950.00),(21,18,'PRD00011',1,350.00),(22,19,'PRD00010',1,220.00);
/*!40000 ALTER TABLE `orderitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderID` int NOT NULL AUTO_INCREMENT,
  `accID` int NOT NULL,
  `totalPrice` decimal(10,2) NOT NULL,
  `orders_status` enum('Pending','Shipped','Delivered','Cancelled') DEFAULT NULL,
  `createdDT` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderID`),
  KEY `accID` (`accID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`accID`) REFERENCES `accounts` (`accID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,400.00,'Delivered','2025-04-29 12:13:48'),(2,2,240.00,'Delivered','2025-04-29 12:13:48'),(3,6,350.00,'Delivered','2025-04-29 12:13:48'),(4,4,220.00,'Pending','2025-04-29 12:13:48'),(5,5,150.00,'Delivered','2025-04-29 12:13:48'),(6,7,200.00,'Delivered','2025-04-29 12:13:48'),(7,8,315.00,'Pending','2025-04-29 12:13:48'),(8,9,450.00,'Delivered','2025-04-29 12:13:48'),(9,10,570.00,'Shipped','2025-04-29 12:13:48'),(10,2,1400.00,'Pending','2025-04-29 12:13:48'),(11,9,900.00,'Delivered','2025-04-29 12:13:48'),(12,8,600.00,'Shipped','2025-04-29 12:13:48'),(13,2,1250.00,'Pending','2025-04-29 12:13:48'),(14,9,760.00,'Pending','2025-04-29 12:13:48'),(15,10,500.00,'Shipped','2025-04-29 12:13:48'),(16,2,1000.00,'Pending','2025-04-29 12:13:48'),(17,3,950.00,'Delivered','2025-04-29 12:13:48'),(18,2,350.00,'Delivered','2025-04-29 12:13:48'),(19,2,220.00,'Delivered','2025-04-29 12:13:48');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productionimage`
--

DROP TABLE IF EXISTS `productionimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productionimage` (
  `imgID` int NOT NULL AUTO_INCREMENT,
  `SKU` char(8) NOT NULL,
  `imgpath` varchar(300) NOT NULL,
  PRIMARY KEY (`imgID`),
  KEY `SKU` (`SKU`),
  CONSTRAINT `productionimage_ibfk_1` FOREIGN KEY (`SKU`) REFERENCES `products` (`SKU`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productionimage`
--

LOCK TABLES `productionimage` WRITE;
/*!40000 ALTER TABLE `productionimage` DISABLE KEYS */;
INSERT INTO `productionimage` VALUES (1,'PRD00002','assets/Product/design1.png'),(2,'PRD00003','assets/Product/design2.png'),(3,'PRD00004','assets/Product/design3.png'),(4,'PRD00005','assets/Product/design4.png'),(5,'PRD00006','assets/Product/design5.jpeg'),(6,'PRD00007','assets/Product/design6.jpeg'),(7,'PRD00008','assets/Product/design7.jpeg'),(8,'PRD00009','assets/Product/design8.jpeg'),(9,'PRD00010','assets/Product/design9.jpeg'),(10,'PRD00011','assets/Product/design10.jpeg');
/*!40000 ALTER TABLE `productionimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `SKU` char(8) NOT NULL,
  `pName` varchar(100) NOT NULL,
  `desc` text NOT NULL,
  `pType` enum('Figure','Art toy','Accessory') NOT NULL,
  `stock` int DEFAULT '0',
  `price` decimal(10,2) NOT NULL,
  `releaseDT` datetime DEFAULT CURRENT_TIMESTAMP,
  `catID` int NOT NULL,
  `createdBy` int NOT NULL,
  `lastestModified` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`SKU`),
  KEY `catID` (`catID`),
  KEY `createdBy` (`createdBy`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`catID`) REFERENCES `categories` (`catID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`createdBy`) REFERENCES `accounts` (`accID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('PRD00001','Customization Request','Customization Request','Figure',1,0.00,'2025-04-29 12:13:48',1,1,'2025-04-29 12:13:48'),('PRD00002','Red Demon','A round, glossy red demon figure with minimalistic dot eyes and a tiny mischievous grin. Despite the fierce theme, its soft edges and shiny finish make it irresistibly cute.','Figure',10,200.00,'2025-04-29 12:13:48',2,1,'2025-04-29 12:13:48'),('PRD00003','White Demon','A pure white version of the round demon figure. With glossy smoothness and small shimmering horns, it represents the innocence hidden within chaos, perfect for collectors who love contrasts.','Figure',5,200.00,'2025-04-29 12:13:48',2,1,'2025-04-29 12:13:48'),('PRD00004','Rainbow Floppy','A colorful figure from the Liquidary Set featuring a bendable rainbow body with rippling liquid-like arms and legs. Its vibrant surface shifts hues slightly under light, creating a magical aura.','Figure',25,150.00,'2025-04-29 12:13:48',3,1,'2025-04-29 12:13:48'),('PRD00005','Black Seldo','A dark, liquid-like character with a sleek elongated body, jet-black coloring, and glossy finish. Designed to embody the concept of \"silent movement,\" Seldo feels like a shadow given form.','Figure',8,150.00,'2025-04-29 12:13:48',3,1,'2025-04-29 12:13:48'),('PRD00006','Highline','A fashion-forward art toy inspired by urban skylines and minimalism. With clean cuts, muted colors, and high-gloss accents, Highline embodies the spirit of a futuristic metropolis.','Art toy',6,180.00,'2025-04-29 12:13:48',4,1,'2025-04-29 12:13:48'),('PRD00007','Hattery','a stylish accessory designed specifically for the Highline figure, forming part of the Cyan Trail Set. It features a sleek, modern design with intricate detailing that gives it a unique and fashionable look. Made to perfectly complement the Highline figure.','Accessory',11,60.00,'2025-04-29 12:13:48',4,1,'2025-04-29 12:13:48'),('PRD00008','Maowi','A fluffy, oversized cat-inspired art toy with huge paws and a cheeky smile. Maowi loves mischief, always looking ready to pounce or play with its favorite yarn ball.','Art toy',12,250.00,'2025-04-29 12:13:48',5,1,'2025-04-29 12:13:48'),('PRD00009','Leeto','A curious kitten-shaped figure standing on two legs, wearing a playful smirk. Leeto’s light, soft texture and dynamic pose scream adventure and cuteness. (Meowing Set)','Figure',20,65.00,'2025-04-29 12:13:48',5,1,'2025-04-29 12:13:48'),('PRD00010','Skydir','A tall, slender figure dressed in a crooked top hat and long coat, with subtle clockwork details woven into its design. Skydir carries the mystique of an old London detective wandering foggy streets, chasing secrets.','Figure',4,220.00,'2025-04-29 12:13:48',6,1,'2025-04-29 12:13:48'),('PRD00011','Wonder','A mysterious childlike figure in worn-out shoes and a fluttering cloak, gazing into the distance with dreamy eyes. Wonder feels like a lost storybook character drifting between the real and the magical.','Art toy',2,350.00,'2025-04-29 12:13:48',6,1,'2025-04-29 12:13:48');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `reviewID` int NOT NULL AUTO_INCREMENT,
  `accID` int NOT NULL,
  `SKU` char(8) NOT NULL,
  `rating` int NOT NULL,
  `comment` text,
  `createdDT` datetime DEFAULT CURRENT_TIMESTAMP,
  `imgpath` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`reviewID`),
  KEY `accID` (`accID`),
  KEY `SKU` (`SKU`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`accID`) REFERENCES `accounts` (`accID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`SKU`) REFERENCES `products` (`SKU`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,2,'PRD00002',5,'Amazing details and great quality!','2025-04-29 12:13:48',NULL),(2,2,'PRD00003',4,'Really love the design!','2025-04-29 12:13:48',NULL),(3,6,'PRD00011',5,'This is epic!','2025-04-29 12:13:48',NULL),(4,4,'PRD00010',4,'Good build. Good quality.','2025-04-29 12:13:48',NULL),(5,5,'PRD00005',5,'Looks so fierce!','2025-04-29 12:13:48',NULL),(6,7,'PRD00002',4,'My lovely boi is great.','2025-04-29 12:13:48',NULL),(7,8,'PRD00008',5,'Very useful display case.','2025-04-29 12:13:48',NULL),(8,8,'PRD00009',5,'Those eyes feels real!','2025-04-29 12:13:48',NULL),(9,2,'PRD00011',5,'This is is is a masterpiece.','2025-04-29 12:13:48',NULL),(10,2,'PRD00010',4,'Good Master statue.','2025-04-29 12:13:48',NULL);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'figuro'
--

--
-- Dumping routines for database 'figuro'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-29 19:14:59
