/*
 Navicat Premium Data Transfer

 Source Server         : SHHL
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : 47.102.223.39:3306
 Source Schema         : sdhl

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 06/12/2020 12:17:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for information
-- ----------------------------
DROP TABLE IF EXISTS `information`;
CREATE TABLE `information`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '资讯id',
  `headimg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头图',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标题',
  `columnists` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '专栏',
  `origin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文章来源',
  `articlelink` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文章链接',
  `pubdate` datetime(0) NOT NULL COMMENT '发布时间',
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文章类别',
  `archiving` tinyint(1) UNSIGNED NULL DEFAULT 0 COMMENT '归档 0 发布 1归档',
  `keyword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '关键词',
  `readingcount` int(4) UNSIGNED NOT NULL DEFAULT 1000 COMMENT '阅读量',
  `content` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '文章内容',
  `homerecommendpos` tinyint(1) UNSIGNED ZEROFILL NOT NULL DEFAULT 0 COMMENT '首页推荐位置',
  `infocentercommendpos` tinyint(1) NOT NULL DEFAULT 0 COMMENT '资讯中心推荐位置',
  `unused` tinyint(1) UNSIGNED ZEROFILL NOT NULL DEFAULT 0 COMMENT '是否使用，前端删除操作，为1 为删除',
  `summary` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '摘要',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE,
  INDEX `archiving`(`archiving`) USING BTREE,
  INDEX `homerecommendpos`(`homerecommendpos`) USING BTREE COMMENT '根据推荐位置查询',
  INDEX `infocentercommendpos`(`infocentercommendpos`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
