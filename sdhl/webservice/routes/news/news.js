'use strict'
const express = require('express');
const router = express.Router();
const dbClient = require('../../db/db');

const moment = require('moment');

const {ERRORCODE} = require('../../utils');

/*查询资讯列表*/
router.get('/queryInformationList',(req, res, next) => {
    //queryType 1: 已发布 2：归档
    let PageIndex = req ? parseInt(req.query.pageIndex) : 1; //从 1开始
    let PageSize = req ? parseInt(req.query.pageSize) : 50;
    let queryType = req ? parseInt(req.query.queryType) : 1;
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
    if(1 === queryType){ //查询已发布文章
        if(1 === PageIndex){ //如果是第一页，先查询推荐的文章，再查询非推荐的文章
            //先查询推荐的文章列表
            let queryRecPosSql = "SELECT * FROM `information` WHERE ((`homerecommendpos` >= 1 AND `homerecommendpos` <=5) OR (`infocentercommendpos` >= 1 AND `infocentercommendpos` <=5)) AND `archiving` = 0 AND `unused` = 0 ORDER BY `homerecommendpos` ASC";
            dbClient.exec({
                sql: queryRecPosSql,
                params: [],
            },(err,result) => {
                if(err){
                    console.log(err);
                    response.Message.code = ERRORCODE.DB_INSERT_FAILED.code;
                    response.Message.msg = ERRORCODE.DB_INSERT_FAILED.code;
                    res.json(response);
                }
                else {
                    let queryRecPosCount = result.length || 0;
                    let restQueryCount = PageSize - queryRecPosCount;
                    response.Content.Data = result;
                    //分页查询非推荐列表
                    // SELECT * FROM `information`  WHERE `id` <= (SELECT `id` from `information` WHERE `homerecommendpos` = 0  AND `archiving` = 0  ORDER BY `id` DESC limit 0 , 1) AND  `homerecommendpos` = 0 AND `archiving` = 0 ORDER BY `id` DESC LIMIT 2;
                    let querySql = "SELECT COUNT(*) FROM `information` WHERE `archiving` = 0; SELECT * FROM `information` ";
                    querySql = `${querySql}  WHERE \`id\` <= (SELECT \`id\` from \`information\` WHERE \`homerecommendpos\` = 0 AND \`infocentercommendpos\` = 0 AND \`archiving\` = 0 AND \`unused\` = 0  ORDER BY \`id\` DESC limit ${(PageIndex - 1) * restQueryCount} , 1) AND  \`homerecommendpos\` = 0 AND \`infocentercommendpos\` = 0 AND \`archiving\` = 0 AND \`unused\` = 0 ORDER BY \`id\` DESC LIMIT ${restQueryCount};`;
                    console.log(querySql);
                    dbClient.exec({
                        sql: querySql,
                        params: [],
                    },(err,result) => {
                        if(err){
                            console.log(err);
                            response.Message.code = ERRORCODE.DB_INSERT_FAILED.code;
                            response.Message.msg = ERRORCODE.DB_INSERT_FAILED.code;
                        }
                        else {
                            let totalcount = parseInt(result[0][0]['COUNT(*)']) + queryRecPosCount;
                            response.Content.Data.push.apply(response.Content.Data,result[1]);
                            response.Content.PageInfo = {
                                PageIndex: PageIndex,
                                PageSize: PageSize,
                                PageCount: Math.ceil(totalcount / PageSize),
                                TotalCount: totalcount ,
                                OrderBy: 'id',
                            };
                        }
                        res.json(response);
                    });
                }
            });
        }
        else{
            //分页查询非推荐列表
            let querySql = "SELECT COUNT(*) FROM `information` WHERE `archiving` = 0; SELECT * FROM `information` ";
            querySql = `${querySql} WHERE \`id\` <= (SELECT \`id\` from \`information\` WHERE \`homerecommendpos\` = 0 AND \`infocentercommendpos\` = 0 AND \`archiving\` = 0 AND \`unused\` = 0  ORDER BY \`id\` DESC LIMIT ${(PageIndex - 1) * PageSize} , 1) AND \`homerecommendpos\` = 0 AND \`infocentercommendpos\` = 0 AND \`archiving\` = 0 AND \`unused\` = 0 ORDER BY \`id\` DESC LIMIT ${PageSize};`;
            dbClient.exec({
                sql: querySql,
                params: [],
            },(err,result) => {
                if(err){
                    console.log(err);
                    response.Message.code = ERRORCODE.DB_INSERT_FAILED.code;
                    response.Message.msg = ERRORCODE.DB_INSERT_FAILED.code;
                }
                else {
                    let totalcount = parseInt(result[0][0]['COUNT(*)']);
                    response.Content.Data[0] = result[1];
                    response.Content.PageInfo = {
                        PageIndex: PageIndex,
                        PageSize: PageSize,
                        PageCount: Math.ceil(totalcount / PageSize),
                        TotalCount: totalcount ,
                        OrderBy: 'id',
                    };
                }
                res.json(response);
            });
        }
    }
    else{
        //分页查询非推荐列表
        let querySql = "SELECT COUNT(*) FROM `information` WHERE `archiving` = 1; SELECT * FROM `information` ";
        querySql = `${querySql}  WHERE \`id\` <= (SELECT \`id\` from \`information\` WHERE \`archiving\` = 1 AND \`unused\` = 0  ORDER BY \`id\` DESC  limit ${(PageIndex - 1) * PageSize} , 1) AND \`archiving\` = 1  AND \`unused\` = 0 ORDER BY \`id\` DESC LIMIT ${PageSize};`;
        dbClient.exec({
            sql: querySql,
            params: [],
        },(err,result) => {
            if(err){
                console.log(err);
                response.Message.code = ERRORCODE.DB_INSERT_FAILED.code;
                response.Message.msg = ERRORCODE.DB_INSERT_FAILED.code;
            }
            else {
                let totalcount = parseInt(result[0][0]['COUNT(*)']);
                response.Content.Data = result[1];
                response.Content.PageInfo = {
                    PageIndex: PageIndex,
                    PageSize: PageSize,
                    PageCount: Math.ceil(totalcount / PageSize),
                    TotalCount: totalcount ,
                    OrderBy: 'id',
                };
            }
            res.json(response);
        });
    }
});

/**只返回id的版本*
 */
/*查询资讯列表*/
router.get('/queryInformationListForFront',(req, res, next) => {
    //queryType 1: 已发布 2：归档
    let PageIndex = req ? parseInt(req.query.pageIndex) : 1; //从 1开始
    let PageSize = req ? parseInt(req.query.pageSize) : 50;
    let queryType = req ? parseInt(req.query.queryType) : 1;
    let columnists = req && req.query.columnists ? parseInt(req.query.columnists) : 0; //1:企业动态 2：媒体报道 3：行业动态
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
    if(1 === queryType){ //查询已发布文章
        //分页查询非推荐列表
        let querySql = `SELECT COUNT(*) FROM \`information\` WHERE \`archiving\` = 0 AND \`unused\` = 0`;
        if(columnists === 1){
            querySql = `${querySql} AND \`columnists\` = '企业动态'`;
        }
        else if(columnists === 2){
            querySql = `${querySql} AND \`columnists\` = '媒体报道'`
        }
        else if(columnists === 3){
            querySql = `${querySql} AND \`columnists\`= '行业动态'`;
        }
        querySql = `${querySql};SELECT \`id\`,\`archiving\`,\`articlelink\`,\`category\`,\`columnists\`,\`headimg\`,\`homerecommendpos\`,\`infocentercommendpos\`,\`keyword\`,\`origin\`,\`pubdate\`,\`readingcount\`,\`summary\`,\`title\`,\`unused\` FROM \`information\` `
        if(columnists === 1){
            querySql = `${querySql} WHERE \`id\` <= (SELECT \`id\` from \`information\` WHERE \`archiving\` = 0 AND \`unused\` = 0 AND \`columnists\` = '企业动态' ORDER BY \`id\` DESC LIMIT ${(PageIndex - 1) * PageSize} , 1) AND \`archiving\` = 0 AND \`unused\` = 0 AND \`columnists\` = '企业动态' ORDER BY \`id\` DESC LIMIT ${PageSize};`;
        }
        else if(columnists === 2){
            querySql = `${querySql} WHERE \`id\` <= (SELECT \`id\` from \`information\` WHERE \`archiving\` = 0 AND \`unused\` = 0 AND \`columnists\` = '媒体报道' ORDER BY \`id\` DESC LIMIT ${(PageIndex - 1) * PageSize} , 1) AND \`archiving\` = 0 AND \`unused\` = 0 AND \`columnists\` = '媒体报道' ORDER BY \`id\` DESC LIMIT ${PageSize};`;

        }
        else if(columnists === 3){
            querySql = `${querySql} WHERE \`id\` <= (SELECT \`id\` from \`information\` WHERE \`archiving\` = 0 AND \`unused\` = 0 AND \`columnists\` = '行业动态' ORDER BY \`id\` DESC LIMIT ${(PageIndex - 1) * PageSize} , 1) AND \`archiving\` = 0 AND \`unused\` = 0 AND \`columnists\` = '行业动态' ORDER BY \`id\` DESC LIMIT ${PageSize};`;
        }
        else{
            querySql = `${querySql} WHERE \`id\` <= (SELECT \`id\` from \`information\` WHERE \`archiving\` = 0 AND \`unused\` = 0 ORDER BY \`id\` DESC LIMIT ${(PageIndex - 1) * PageSize} , 1) AND \`archiving\` = 0 AND \`unused\` = 0 ORDER BY \`id\` DESC LIMIT ${PageSize};`;
        }
        dbClient.exec({
            sql: querySql,
            params: [],
        },(err,result) => {
            if(err){
                console.log(err);
                response.Message.code = ERRORCODE.DB_INSERT_FAILED.code;
                response.Message.msg = ERRORCODE.DB_INSERT_FAILED.code;
            }
            else {
                let totalcount = parseInt(result[0][0]['COUNT(*)']);
                response.Content.Data = result[1];
                response.Content.PageInfo = {
                    PageIndex: PageIndex,
                    PageSize: PageSize,
                    PageCount: Math.ceil(totalcount / PageSize),
                    TotalCount: totalcount ,
                    OrderBy: 'id',
                };
            }
            res.json(response);
        });
    }
    else{
        //分页查询非推荐列表
        let querySql = "SELECT COUNT(*) FROM `information` WHERE `archiving` = 1; SELECT `id`,`archiving`,`articlelink`,`category`,`columnists`,`headimg`,`homerecommendpos`,`infocentercommendpos`,`keyword`,`origin`,`pubdate`,`readingcount`,`summary`,`title`,`unused` FROM `information` ";
        querySql = `${querySql}  WHERE \`id\` <= (SELECT \`id\` from \`information\` WHERE \`archiving\` = 1 AND \`unused\` = 0  ORDER BY \`id\` DESC  limit ${(PageIndex - 1) * PageSize} , 1) AND \`archiving\` = 1  AND \`unused\` = 0 ORDER BY \`id\` DESC LIMIT ${PageSize};`;
        dbClient.exec({
            sql: querySql,
            params: [],
        },(err,result) => {
            if(err){
                console.log(err);
                response.Message.code = ERRORCODE.DB_INSERT_FAILED.code;
                response.Message.msg = ERRORCODE.DB_INSERT_FAILED.code;
            }
            else {
                let totalcount = parseInt(result[0][0]['COUNT(*)']);
                response.Content.Data = result[1];
                response.Content.PageInfo = {
                    PageIndex: PageIndex,
                    PageSize: PageSize,
                    PageCount: Math.ceil(totalcount / PageSize),
                    TotalCount: totalcount ,
                    OrderBy: 'id',
                };
            }
            res.json(response);
        });
    }
});


/*查询资讯详情*/
router.get('/queryInformationDetail',(req, res, next) => {
    let informationId = req ? parseInt(req.query.informationId) : undefined;
    if(informationId === undefined || informationId < 0){
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
            sql: 'SELECT * FROM `information` where id = ?',
            params: [informationId],
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

/*`headimg` '头图', `title`  '标题', `columnists`  '专栏', `origin` '文章来源',
`pubdate` '发布时间',`category`  '文章类别',`archiving`  '归档 0 发布 1归档',`keyword`  '关键词',
`readingcount`  '阅读量',`content`  '文章内容',`homerecommendpos` '推荐位置',
`unused`  '是否使用，前端删除操作，为1 为删除',
* */
/*新增或者更新资讯信息*/
router.post('/addOrUdateInformation',(req, res, next) =>{
    let Information = req ? req.body : undefined;
    if(Information && Information !== {}){
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
        //更新项目信息 允许更新的字段   headimg  title columnists origin pubdate category keyword content
        if(Information.id){
            let updateProjectInfoSql = `UPDATE information set \`archiving\` = 0, `;
            let sqlParams = [];
            if(Information.headimg){
                updateProjectInfoSql = updateProjectInfoSql + 'headimg = ?,';``
                sqlParams.push(Information.headimg);
            }
            if(Information.title){
                updateProjectInfoSql = updateProjectInfoSql + 'title = ?,';``
                sqlParams.push(Information.title);
            }
            if(Information.columnists){
                updateProjectInfoSql = updateProjectInfoSql + 'columnists = ?,';``
                sqlParams.push(Information.columnists);
            }
            if(Information.origin !== undefined){
                updateProjectInfoSql = updateProjectInfoSql + 'origin = ?,';``
                sqlParams.push(Information.origin);
            }
            if(Information.pubdate){
                updateProjectInfoSql = updateProjectInfoSql + 'pubdate = ?,';``
                sqlParams.push(Information.pubdate && Information.pubdate.length > 0 ? Information.pubdate : moment().format("YYYY/MM/DD HH:mm:ss"));
            }
            if(Information.category){
                updateProjectInfoSql = updateProjectInfoSql + 'category = ?,';``
                sqlParams.push(Information.category);
            }
            if(Information.keyword){
                updateProjectInfoSql = updateProjectInfoSql + 'keyword = ?,';``
                sqlParams.push(Information.keyword);
            }
            if(Information.content){
                updateProjectInfoSql = updateProjectInfoSql + 'content = ?,';``
                sqlParams.push(Information.content);
            }
            if(Information.summary){
                updateProjectInfoSql = updateProjectInfoSql + 'summary = ?,';``
                sqlParams.push(Information.summary);
            }
            if(Information.articlelink){
                updateProjectInfoSql = updateProjectInfoSql + 'articlelink = ?,';``
                sqlParams.push(Information.articlelink);
            }
            if(Information.hasOwnProperty("unused") && !isNaN(parseInt(Information.unused))){
                updateProjectInfoSql = updateProjectInfoSql  + '`unused` = ?';
                sqlParams.push(parseInt(Information.unused));
            }
            let idx1 = updateProjectInfoSql.lastIndexOf('=');
            let idx2 = updateProjectInfoSql.lastIndexOf(',');
            if(idx1 !== -1 && idx2 !== -1 && idx2 > idx1){
                updateProjectInfoSql =  updateProjectInfoSql.substring(0,idx2) + updateProjectInfoSql.substring(idx2 + 1,updateProjectInfoSql.length);
            }
            updateProjectInfoSql = updateProjectInfoSql + " WHERE id = ?"
            sqlParams.push(Information.id);
            dbClient.exec({
                sql: updateProjectInfoSql,
                params: sqlParams
            },(err,result) => {
                if(err){
                    console.log(err);
                    response.Message.code = ERRORCODE.DB_UPDATE_FAILED.code;
                    response.Message.msg = ERRORCODE.DB_UPDATE_FAILED.msg;
                }
                res.json(response);
            });
        }
        else{
            dbClient.exec({
                sql: 'INSERT INTO information(`headimg`,`title`,`columnists`,`origin`,`pubdate`,`category`,`keyword`,`content`,`summary`,`articlelink`) VALUES(?,?,?,?,?,?,?,?,?,?)',
                params: [Information.headimg,Information.title,Information.columnists,Information.origin,Information.pubdate && Information.pubdate.length > 0 ? Information.pubdate : moment().format('YYYY/MM/DD HH:mm:ss'),Information.category,Information.keyword,Information.content,Information.summary,Information.articlelinkj],
            },(err,result) => {
                if(err){
                    response.Content.Data = false;
                    response.Message.code = ERRORCODE.DB_INSERT_FAILED.code;
                    response.Message.msg = ERRORCODE.DB_INSERT_FAILED.msg;
                }
                else {
                    response.Content.Data = true;
                    console.log(result);
                }
                res.json(response);
            });
        }
    }
});

/*取消推荐*/
router.post('/cancelRecommend',(req, res, next) => {
    let informationId = req ? parseInt(req.body.informationId) : undefined;
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
    if(informationId) {
        let updateProjectInfoSql = 'UPDATE information set `homerecommendpos` = 0, `infocentercommendpos` = 0 WHERE id = ?';
        dbClient.exec({
            sql: updateProjectInfoSql,
            params: [informationId]
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
    }
    else{
        response.Message.code = ERRORCODE.INVALID_PARAMS.code;
        response.Message.msg = ERRORCODE.INVALID_PARAMS.msg;
        res.json(response);
    }
});

/*更新推荐位置*/
router.post('/recommendposUpdate',(req, res, next) => {
    let informationId = req ? parseInt(req.body.informationId) : undefined;
    let homerecommendpos = req && req.body.homerecommendpos ? parseInt(req.body.homerecommendpos) : null;
    let infocentercommendpos = req && req.body.infocentercommendpos ? parseInt(req.body.infocentercommendpos) : null;
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
    if(informationId && (homerecommendpos && homerecommendpos >= 0 && homerecommendpos <= 5 ||
        infocentercommendpos && infocentercommendpos >= 0 && infocentercommendpos <= 5)) {
        if(homerecommendpos === 0 && infocentercommendpos === 0){
            let updateProjectInfoSql = 'UPDATE information set `homerecommendpos` = 0, `infocentercommendpos` = 0 WHERE id = ?';
            dbClient.exec({
                sql: updateProjectInfoSql,
                params: [informationId]
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
            return;
        }
        let execsql = 'SELECT id,homerecommendpos,infocentercommendpos from information WHERE ';
        let sqlparams = [];
        if(homerecommendpos > 0){
            execsql += 'homerecommendpos = ?';
            sqlparams.push(homerecommendpos);
        }
        if(infocentercommendpos > 0){
            if(homerecommendpos > 0){
                execsql += " OR infocentercommendpos = ?";
            }
            else{
                execsql += "infocentercommendpos = ?";
            }
            sqlparams.push(infocentercommendpos);
        }
        //console.log("update pos homerecommendpos:",homerecommendpos,",infocentercommendpos",infocentercommendpos);
        dbClient.exec({
            sql: execsql,
            params: sqlparams
        },(err,result) => {
            if(err){
                console.log(err);
                response.Content.Data = false;
                response.Message.code = ERRORCODE.DB_UPDATE_FAILED.code;
                response.Message.msg = ERRORCODE.DB_UPDATE_FAILED.msg;
                res.json(response);
                return ;
            }
            //console.log("update pos result:",result);
            if(result.length > 0 && (result[0]['id'] !== informationId && (result[1] ? result[1]['id'] !== informationId : true))){
                response.Content.Data = false;
                response.Message.code = ERRORCODE.RECOMMEND_POS_EXISTS.code;
                response.Message.msg = ERRORCODE.RECOMMEND_POS_EXISTS.msg;
                res.json(response);
            }
            else{
                if(homerecommendpos === null || homerecommendpos < 0 || homerecommendpos > 5){
                    homerecommendpos = 0;
                }
                if(infocentercommendpos === null || infocentercommendpos < 0 || infocentercommendpos > 5){
                    infocentercommendpos = 0;
                }

                if(result[0] && result[0]['id'] !== informationId){
                    homerecommendpos = result[0]['homerecommendpos'] === homerecommendpos ? 0 : homerecommendpos;
                    infocentercommendpos = result[0]['infocentercommendpos'] === infocentercommendpos ? 0 : infocentercommendpos;
                }
                if(result[1] && result[1]['id'] !== informationId){
                    homerecommendpos = result[0]['homerecommendpos'] === homerecommendpos ? 0 : homerecommendpos;
                    infocentercommendpos = result[0]['infocentercommendpos'] === infocentercommendpos ? 0 : infocentercommendpos;
                }
                let updateProjectInfoSql = 'UPDATE information set ';
                let sqlParams = [];
                if(homerecommendpos > 0){
                    updateProjectInfoSql += '`homerecommendpos` = ?';
                    sqlParams.push(homerecommendpos);
                }
                if(infocentercommendpos > 0){
                    if(homerecommendpos > 0){
                        updateProjectInfoSql += ",infocentercommendpos = ?";
                    }
                    else{
                        updateProjectInfoSql += "infocentercommendpos = ?";
                    }
                    sqlParams.push(infocentercommendpos);
                }
                updateProjectInfoSql += ' WHERE id = ?';
                sqlParams.push(informationId);
                dbClient.exec({
                    sql: updateProjectInfoSql,
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
            }
        });
    }
    else{
        response.Message.code = ERRORCODE.INVALID_PARAMS.code;
        response.Message.msg = ERRORCODE.INVALID_PARAMS.msg;
        res.json(response);
    }
});
/* 查询已存在的推荐位置*/
router.get('/queryExistRecommendpos',(req, res, next) => {
    let querySql = 'SELECT `homerecommendpos` FROM `information` WHERE `unused` = 0 AND `archiving` = 0 AND `homerecommendpos` >= 1 AND `homerecommendpos` <=5  ORDER BY `homerecommendpos` ASC; SELECT `infocentercommendpos` FROM `information` WHERE `unused` = 0 AND `archiving` = 0 AND `infocentercommendpos` >= 1 AND `infocentercommendpos` <=5  ORDER BY `infocentercommendpos` ASC';
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
            let selectedHomePos = [];
            let selectedInfoPos = [];
            result[0].forEach((value,index) => {
                selectedHomePos.push(value.homerecommendpos);
            });
            result[1].forEach((value,index) => {
                selectedInfoPos.push(value.infocentercommendpos);
            });
            response.Content.Data.push(selectedHomePos);
            response.Content.Data.push(selectedInfoPos);
        }
        res.json(response);
    });
});


/*归档文章*/
router.post('/archiving',(req, res, next) => {
    let informationId = req ? parseInt(req.body.informationId) : undefined;
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
    if(informationId) {
        let updateProjectInfoSql = 'UPDATE information set `archiving` = 1, `homerecommendpos` = 0, infocentercommendpos = 0 WHERE id = ?';
        let sqlParams = [informationId];
        dbClient.exec({
            sql: updateProjectInfoSql,
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
    }
    else{
        response.Content.Data = false;
        response.Message.code = ERRORCODE.INVALID_PARAMS.code;
        response.Message.msg = ERRORCODE.INVALID_PARAMS.msg;
        res.json(response);
    }
});

/*更新阅读量*/
router.post('/updateReadingCount',(req, res, next) => {
    let informationId = req ? parseInt(req.body.informationId) : undefined;
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
    if(informationId) {
        let updateProjectInfoSql = 'UPDATE information set `readingcount` = `readingcount` + 1 WHERE id = ?';
        let sqlParams = [informationId];
        dbClient.exec({
            sql: updateProjectInfoSql,
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
    }
    else{
        response.Content.Data = false;
        response.Message.code = ERRORCODE.INVALID_PARAMS.code;
        response.Message.msg = ERRORCODE.INVALID_PARAMS.msg;
        res.json(response);
    }
});


/*上一篇或者下一篇*/
router.get('/getPreOrNextNew',(req, res, next) => {
    let informationId = req ? parseInt(req.query.informationId) : undefined; //当前id
    let type = req ? parseInt(req.query.type) : 1; //1 上一篇 2 下一篇
    if(isNaN(type)){
        type = 2;
    }

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
    if(informationId) {
        let updateProjectInfoSql = type === 1? 'SELECT * from information WHERE id > ? limit 1' : 'SELECT * from information WHERE id < ? limit 1';
        let sqlParams = [informationId];
        dbClient.exec({
            sql: updateProjectInfoSql,
            params: sqlParams
        }, (err, result) => {
            if (err) {
                console.log(err);
                response.Message.code = ERRORCODE.DB_UPDATE_FAILED.code;
                response.Message.msg = ERRORCODE.DB_UPDATE_FAILED.msg;
            }
            response.Content.Data = result;
            res.json(response);
        });
    }
    else{
        response.Message.code = ERRORCODE.INVALID_PARAMS.code;
        response.Message.msg = ERRORCODE.INVALID_PARAMS.msg;
        res.json(response);
    }
});


router.get('/queryRecentNews',(req, res, next) => {
    let queryType = req ? parseInt(req.query.queryType) : 1; // 1:首页资讯列表 2.资讯中心
    let queryCount = req ? parseInt(req.query.queryCount) : 3;//需要获取的数目
    if(isNaN(queryCount)){
        queryCount = 3;
    }
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
    let queryRecPosSql = "SELECT `id`,`archiving`,`articlelink`,`category`,`columnists`,`headimg`,`homerecommendpos`,`infocentercommendpos`,`keyword`,`origin`,`pubdate`,`readingcount`,`summary`,`title`,`unused` FROM `information` WHERE ";
    if(1 === queryType){
        queryRecPosSql = `${queryRecPosSql} \`homerecommendpos\`>0 ORDER BY \`homerecommendpos\` ASC LIMIT ${queryCount}`;
    }
    else{
        queryRecPosSql = `${queryRecPosSql} \`infocentercommendpos\`>0 ORDER BY \`infocentercommendpos\` ASC LIMIT ${queryCount}`;
    }
    dbClient.exec({
        sql: queryRecPosSql,
        params: [],
    },(err,result) => {
        if (err) {
            console.log(err);
            response.Message.code = ERRORCODE.DB_QUERY_FAILED.code;
            response.Message.msg = ERRORCODE.DB_QUERY_FAILED.msg;
            res.json(response);
            return ;
        }
        let restCount = 0;
        if(result){
            restCount = queryCount - result.length;
        }
        response.Content.Data = result;
        if(restCount > 0){
            let queryRecPosSql = "SELECT `id`,`archiving`,`articlelink`,`category`,`columnists`,`headimg`,`homerecommendpos`,`infocentercommendpos`,`keyword`,`origin`,`pubdate`,`readingcount`,`summary`,`title`,`unused` FROM `information` WHERE ";
            if(1 === queryType){
                queryRecPosSql = `${queryRecPosSql} \`homerecommendpos\` = 0 ORDER BY \`id\` DESC limit ${restCount}`;
            }
            else{
                queryRecPosSql = `${queryRecPosSql} \`infocentercommendpos\` = 0 ORDER BY \`id\` DESC limit ${restCount}`;
            }
            dbClient.exec({
                sql: queryRecPosSql,
                params: [],
            },(err,result) => {
                if (err) {
                    console.log(err);
                    response.Message.code = ERRORCODE.DB_QUERY_FAILED.code;
                    response.Message.msg = ERRORCODE.DB_QUERY_FAILED.msg;
                    res.json(response);
                }
                response.Content.Data = [...response.Content.Data,...result];
                res.json(response);
            });
        }
        else{
            res.json(response);
        }
    });
});


router.get('/',(req, res, next) => {
    res.json({code:999, list:[], msg: 'no such interface'});
});

module.exports = router;