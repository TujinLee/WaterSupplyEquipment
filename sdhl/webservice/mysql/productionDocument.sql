/*
 Navicat MySQL Data Transfer

 Source Server         : SDHL
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : 47.102.223.39:3306
 Source Schema         : sdhl

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 05/12/2020 16:06:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for productionDocument
-- ----------------------------
DROP TABLE IF EXISTS `productionDocument`;
CREATE TABLE `productionDocument`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinyint(1) UNSIGNED NOT NULL COMMENT '1.供排水设备2.华立水泵3.污水处理设备4.原水处理净化设备',
  `feature` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '产品特点，json保存',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `type`(`type`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
