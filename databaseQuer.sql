/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
DROP TABLE IF EXISTS charity;
CREATE TABLE `charity` (
  `charity_id` char(16) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `donation_count` int DEFAULT NULL,
  `charity_amount` decimal(10,2) NOT NULL,
  `collected_amount` decimal(20,6) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`charity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS contact_us;
CREATE TABLE `contact_us` (
  `inquiry_id` char(16) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`inquiry_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS donation_list;
CREATE TABLE `donation_list` (
  `donation_id` char(16) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `charity_id` char(16) DEFAULT NULL,
  `donor_name` varchar(255) NOT NULL,
  `donor_message` text,
  `donation_amount` decimal(10,2) NOT NULL,
  `donation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`donation_id`),
  KEY `user_id` (`user_id`),
  KEY `charity_id` (`charity_id`),
  CONSTRAINT `donation_list_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `donation_list_ibfk_2` FOREIGN KEY (`charity_id`) REFERENCES `charity` (`charity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS testimonials;
CREATE TABLE `testimonials` (
  `testimonial_id` char(16) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `rating` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`testimonial_id`),
  CONSTRAINT `testimonials_chk_1` CHECK (((`rating` >= 1) and (`rating` <= 5)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS users;
CREATE TABLE `users` (
  `user_id` varchar(16) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO charity(charity_id,title,description,image_url,donation_count,charity_amount,collected_amount,created_at,updated_at) VALUES('\'9739ba91d3bf11ee\'','\'Education for All\'','X\'50726f766964696e6720656475636174696f6e616c207265736f757263657320746f20756e64657270726976696c65676564206368696c6472656e2e\'','\'https://example.com/education_charity.jpg\'','2','5000.00','1000.000000','\'2024-02-25 15:08:52\'','\'2024-03-09 15:34:31\''),('\'9744804fd3bf11ee\'','\'Clean Water Initiative\'','X\'456e737572696e672061636365737320746f20636c65616e20616e642073616665206472696e6b696e6720776174657220696e2072656d6f74652061726561732e\'','\'https://example.com/clean_water_charity.jpg\'','1','3000.00','50.000000','\'2024-02-25 15:08:52\'','\'2024-03-09 15:34:38\''),('\'9744881ed3bf11ee\'','\'Food for the Hungry\'','X\'446973747269627574696e6720666f6f6420746f2074686f736520666163696e672068756e67657220616e6420666f6f6420696e73656375726974792e\'','\'https://example.com/food_charity.jpg\'','3','7000.00','60.000000','\'2024-02-25 15:08:52\'','\'2024-03-09 15:34:45\''),('\'aaa1baef969e4ef5\'','\'Omnis sed harum cons\'','X\'506f7373696d75732071756173206172636869\'','\'https://res.cloudinary.com/dcpudzejv/image/upload/v1709988487/lbjvbrb7igwtirfy66ca.jpg\'','NULL','50000.00','NULL','\'2024-03-09 18:33:08\'','\'2024-03-09 18:33:08\''),('\'b0333ee42f9a4067\'','\'Id rerum occaecat mo\'','X\'446f6c6f726520657420636f6e73657175617475\'','\'https://res.cloudinary.com/dcpudzejv/image/upload/v1709988372/nkmhjickoimcjsmfebsf.jpg\'','NULL','2500.00','NULL','\'2024-03-09 18:31:13\'','\'2024-03-09 18:31:13\''),('\'ce62c5b4a7af45b6\'','\'Updated Lahan Charity\'','X\'5468697320697320746865206465736372697074696f6e206f662063686172697479206f66206c6168616e202d2055706461746564\'','\'https://example.com/food_charity.jpg\'','20','3000.00','200.000000','\'2024-03-09 14:23:45\'','\'2024-03-09 17:30:13\''),('\'f7532d425d674a27\'','\'My Test Charity\'','X\'5468697320697320746865206465736372697074696f6e206f662063686172697479206f66204d7920546573742043686172697479\'','\'dsdd\'','5','5000.00','287.000000','\'2024-03-09 15:58:04\'','\'2024-03-09 17:21:47\'');

INSERT INTO contact_us(inquiry_id,full_name,email,subject,message,created_at) VALUES('\'035aa76f3f814fd0\'','\'Hello Contact\'','\'admin@examples.com\'','\'Test Message for website\'','X\'48656c6c6f20746573742061646d696e206d6573736167652074657374\'','\'2024-03-09 13:49:01\''),('\'086a00bcd30211ee\'','\'Jane Smith\'','\'jane.smith@example.com\'','\'Support Request\'','X\'486176696e672074726f75626c652077697468206d79206163636f756e742e20506c65617365206173736973742e\'','\'2024-02-24 16:31:57\''),('\'5a1dca95224e41cf\'','\'Hello Contact\'','\'admin@example.com\'','\'Test Message for website\'','X\'48656c6c6f20746573742061646d696e206d6573736167652074657374\'','\'2024-03-01 23:01:07\'');

INSERT INTO donation_list(donation_id,user_id,charity_id,donor_name,donor_message,donation_amount,donation_date) VALUES('\'369eb0ba783b4921\'','\'ddfd92155ee14d24\'','\'f7532d425d674a27\'','\'Nabraj Chaudhary\'','X\'48656c6c6f204e616272616a20434875414844415259\'','12.00','\'2024-03-09 16:09:45\''),('\'5f3a209b4e9340f5\'','\'ddfd92155ee14d24\'','\'f7532d425d674a27\'','\'Nabraj Chaudhary\'','X\'48656c6c6f204e616272616a20434875414844415259\'','12.00','\'2024-03-09 16:12:38\''),('\'809a228c49204696\'','\'26f59d6f9f3d4500\'','\'f7532d425d674a27\'','\'Pema Yanzom Ghale\'','X\'48656c6c6f2050656d612059616e7a6f6d204768616c65\'','75.00','\'2024-03-09 17:21:47\''),('\'a11f64ad8a5345bb\'','\'ca70ae6961c146a6\'','\'f7532d425d674a27\'','\'Nabraj Chaudhary\'','X\'48656c6c6f204e616272616a20434875414844415259\'','50.00','\'2024-03-09 16:13:49\''),('\'b6d12bf9d3c011ee\'','\'3d7197f2d30111ee\'','\'9739ba91d3bf11ee\'','\'John Doe\'','X\'5468616e6b20796f7520666f722074686520677265617420776f726b21\'','100.00','\'2024-02-25 15:16:54\''),('\'b6d16377d3c011ee\'','\'3d7197f2d30111ee\'','\'9739ba91d3bf11ee\'','\'Jane Smith\'','X\'4b656570206d616b696e67206120646966666572656e636521\'','50.00','\'2024-02-25 15:16:54\''),('\'b6d167f3d3c011ee\'','\'3d7197f2d30111ee\'','\'9744881ed3bf11ee\'','\'Bob Johnson\'','X\'486170707920746f20636f6e7472696275746521\'','200.00','\'2024-02-25 15:16:54\''),('\'cb77c0afbe3540f2\'','\'ca70ae6961c146a6\'','\'f7532d425d674a27\'','\'Nabraj Chaudhary\'','X\'48656c6c6f204e616272616a20434875414844415259\'','50.00','\'2024-03-09 16:14:03\''),('\'d17e7498f8e44704\'','\'26f59d6f9f3d4500\'','\'f7532d425d674a27\'','\'Minu Chaudhary\'','X\'48656c6c6f204e616272616a20434875414844415259\'','100.00','\'2024-03-09 17:20:33\''),('\'f2ca6a65fdf8412b\'','\'ddfd92155ee14d24\'','\'f7532d425d674a27\'','\'Nabraj Chaudhary\'','X\'48656c6c6f204e616272616a20434875414844415259\'','12.00','\'2024-03-09 16:09:24\'');

INSERT INTO testimonials(testimonial_id,customer_name,email,content,rating,created_at) VALUES('\'0a080bb5d30111ee\'','\'John Doe\'','\'john.doe@example.com\'','X\'477265617420657870657269656e63652077697468207468652070726f6475637421\'','5','\'2024-02-24 16:24:51\''),('\'0a08246bd30111ee\'','\'Jane Smith\'','\'jane.smith@example.com\'','X\'457863656c6c656e74207365727669636520616e6420737570706f72742e\'','4','\'2024-02-24 16:24:51\''),('\'0a08299ad30111ee\'','\'Bob Johnson\'','\'bob.johnson@example.com\'','X\'566572792073617469736669656420776974682074686520636f7572736520636f6e74656e742e\'','5','\'2024-02-24 16:24:51\'');
INSERT INTO users(user_id,username,password,email,role) VALUES('\'26f59d6f9f3d4500\'','\'Admin Account\'','\'$2b$10$q2xzhbtG6ExjGS1d2JE6qeASK2P2XL2wULN.TPESLawY5gyqxATQG\'','\'admin@example.com\'','\'admin\''),('\'ca70ae6961c146a6\'','\'password\'','\'$2b$10$EKfo68N4TBpndbf7EG2Uyus3ceLNtyN7L/p.C4UITHCU.n/zvzus6\'','\'nabu@example.com\'','\'user\''),('\'ddfd92155ee14d24\'','\'Test User\'','\'$2b$10$fZNqBYUI78kDQDSUKuJXp.sdR3kU60L1oTeHGqAxWysscCqt1DLiu\'','\'heroxyz@example.com\'','\'user\'');