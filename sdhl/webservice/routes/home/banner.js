'use strict'
const express = require('express');
const moment = require('moment');
const router = express.Router();
const dbClient = require('../../db/db');

const {ERRORCODE} = require('../../utils');


/* 查询首页Banner图列表*/
router.get('/queryHomeBannerList',(req, res, next) => {
    let querySql = 'SELECT * FROM `homebanner` WHERE `unused` = 0 ORDER BY `position` ASC';
    dbClient.exec({
        sql: querySql,
        params: [],
    },(err,result) => {
        let response = {
            Content:{
                Data:[],
                PageInfo: null,
            },
            Message:{
                code:ERRORCODE.SUCCESS.code,
                msg: ERRORCODE.SUCCESS.msg,
            }
        };
        if(err){
            console.log(err);
            response.Message.code = ERRORCODE.DB_INSERT_FAILED.code;
            response.Message.msg = ERRORCODE.DB_INSERT_FAILED.code;
        }
        else {
            response.Content.Data = result;
        }
        res.json(response);
    });
});

/*获取首页Banner图信息*/
router.get('/queryHomeBannerInfo',(req, res, next) => {
    let homebannerId = req ? parseInt(req.query.homebannerId) : undefined;
    if(homebannerId === undefined || homebannerId < 0){
        res.json({
            Content: {
                Data: [],
                PageInfo: null,
            },
            Message: {
                code: ERRORCODE.INVALID_PARAMS.code,
                msg: ERRORCODE.INVALID_PARAMS.msg,
            }
        });
    }
    else {
        dbClient.exec({
            sql: 'SELECT * FROM `homebanner` where id = ?',
            params: [homebannerId],
        }, (err, result) => {
            let response = {
                Content: {
                    Data: [],
                    PageInfo: null,
                },
                Message: {
                    code: ERRORCODE.SUCCESS.code,
                    msg: ERRORCODE.SUCCESS.msg,
                }
            };
            if (err) {
                console.log(err);
                response.Message.code = ERRORCODE.DB_INSERT_FAILED.code;
                response.Message.msg = ERRORCODE.DB_INSERT_FAILED.code;
            } else {
                response.Content.Data = result;
            }
            res.json(response);
        });
    }
});

/*新增首页banner*/
router.post('/addOrUdateHomeBanner',(req, res, next) =>{
    let homebannerInfo = req ? req.body : undefined;
    if(homebannerInfo) {
        let response = {
            Content:{
                Data:[],
                PageInfo: null,
            },
            Message:{
                code:ERRORCODE.SUCCESS.code,
                msg: ERRORCODE.SUCCESS.msg,
            }
        };
        if (homebannerInfo.id) { //更新
            let updateSql = `UPDATE homebanner SET `;
            let sqlParams = [];
            if (homebannerInfo.img) {
                updateSql = updateSql + '`img` = ?,';
                sqlParams.push(homebannerInfo.img);
            }
            if (homebannerInfo.link) {
                updateSql = updateSql + '`link` = ?,';
                sqlParams.push(homebannerInfo.link);
            }
            if (homebannerInfo.mainheading) {
                updateSql = updateSql + '`mainheading` = ?,';
                sqlParams.push(homebannerInfo.mainheading);
            }
            if (homebannerInfo.subheading) {
                updateSql = updateSql + '`subheading` = ?,';
                sqlParams.push(homebannerInfo.subheading);
            }
            if (homebannerInfo.position) {
                homebannerInfo.position = parseInt(homebannerInfo.position) > 5 ? 5 : parseInt(homebannerInfo.position);
                updateSql = updateSql + '`position` = ?,';
                sqlParams.push(homebannerInfo.position);
            }
            if (homebannerInfo.unused) {
                updateSql = updateSql + '`unused` = ?,';
                sqlParams.push(homebannerInfo.unused);
            }
            if (homebannerInfo.pubdate) {
                updateSql = updateSql + 'pubdate = ?,';``
                sqlParams.push(homebannerInfo.pubdate && homebannerInfo.pubdate.length > 0 ? homebannerInfo.pubdate : moment().format("YYYY/MM/DD HH:mm:ss"));
            }
            let idx1 = updateSql.lastIndexOf('=');
            let idx2 = updateSql.lastIndexOf(',');
            if (idx1 !== -1 && idx2 !== -1 && idx2 > idx1) {
                updateSql = updateSql.substring(0, idx2) + updateSql.substring(idx2 + 1, updateSql.length);
            }
            updateSql = updateSql + " WHERE id = ?"
            console.log("updateSql", updateSql);
            sqlParams.push(homebannerInfo.id);
            dbClient.exec({
                sql: updateSql,
                params: sqlParams
            }, (err, result) => {
                if (err) {
                    console.log(err);
                    response.Content.Data = false;
                    response.Message.code = ERRORCODE.DB_UPDATE_FAILED.code;
                    response.Message.msg = ERRORCODE.DB_UPDATE_FAILED.msg;
                }
                response.Content.Data = true;
                res.json(response);
            });
        } else {
            //不能超过5个
            dbClient.exec({
                sql: 'SELECT COUNT(1) FROM `homebanner` WHERE `unused` = 0 ',
                params: [],
            }, (err, result) => {
                if (err) {
                    console.log(err);
                    response.Message.code = ERRORCODE.DB_QUERY_FAILED.code;
                    response.Message.msg = ERRORCODE.DB_QUERY_FAILED.msg;
                    res.json(response);
                } else {
                    if (result[0]['COUNT(1)'] >= 5) {
                        response.Message.code = ERRORCODE.HOME_BANNER_LIMIT.code;
                        response.Message.msg = ERRORCODE.HOME_BANNER_LIMIT.msg;
                        res.json(response);
                    } else {
                        dbClient.exec({
                            sql: 'INSERT INTO homebanner(`img`,`link`,`mainheading`,`subheading`,`position`,`pubdate`) VALUES(?,?,?,?,?,?)',
                            params: [homebannerInfo.img, homebannerInfo.link, homebannerInfo.mainheading, homebannerInfo.subheading, parseInt(homebannerInfo.position) > 5 ? 5 : parseInt(homebannerInfo.position),homebannerInfo.pubdate && homebannerInfo.pubdate.length > 0 ? homebannerInfo.pubdate : moment().format('YYYY/MM/DD HH:mm:ss')],
                        }, (err, result) => {
                            if (err) {
                                console.log(err);
                                response.Content.Data = false;
                                response.Message.code = ERRORCODE.DB_INSERT_FAILED.code;
                                response.Message.msg = ERRORCODE.DB_INSERT_FAILED.msg;
                                res.json(response);
                            } else {
                                console.log(result);
                                response.Content.Data = true;
                                res.json(response);
                            }
                        });
                    }
                }
            });
        }
    }
    else{
        res.json({
            Content:{
                Data:[],
                PageInfo: null,
            },
            Message:{
                code:ERRORCODE.INVALID_PARAMS.code,
                msg: ERRORCODE.INVALID_PARAMS.msg,
            }
        });
    }
});


router.get('/',(req, res, next) => {
    res.json({code:999, list:[], msg: 'no such interface'});
});

module.exports = router;