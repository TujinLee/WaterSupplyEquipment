'use strict'
const express = require('express');
const router = express.Router();
const dbClient = require('../../db/db');

const {ERRORCODE} = require('../../utils');

/*查询产品列表*/
router.get('/queryProductionList',(req, res, next) => {
    let querySql = 'SELECT * FROM `productionInfo`';
    let sqlParams = [];
    let queryType = req ? parseInt(req.query.queryType) : 1; //1 展示所有 2 展示 3 未展示
    if(isNaN(queryType))
        queryType = 1;
    if(queryType > 3 || queryType < 0) {
        queryType = 1;
    }
    if(queryType === 1){
        // querySql = `${querySql} WHERE \`show\` = ?`;
        // sqlParams.push(1);
    }
    else if(queryType === 2){
        querySql = `${querySql} WHERE \`show\` = ?`;
        sqlParams.push(1);
    }
    else if(queryType === 3){
        querySql = `${querySql} WHERE \`show\` = ?`;
        sqlParams.push(0);
    }
    if(queryType === 1){
        querySql = querySql + ' WHERE \`unused\` = 0 order by id desc';
    }
    else{
        querySql = querySql + ' AND \`unused\` = 0 order by id desc';
    }

    dbClient.exec({
        sql: querySql,
        params: sqlParams,
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

/*获取产品信息*/
router.get('/queryProductionInfo',(req, res, next) => {
    let queryType = req ? parseInt(req.query.queryType) : 1; //1 :产品简介 2：产品详情
    if(queryType < 0 || queryType > 2){
        queryType = 1;
    }
    let productionId = req ? parseInt(req.query.productionId) : undefined;
    if(productionId === undefined || productionId < 0){
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
        let querySql;
        let sqlParams = [productionId];
        if(1 === queryType){
            querySql = 'SELECT `listimg`,`topimg`,`series`,`type`, `model`, `name`,`params` from productionInfo WHERE id = ?';
        }
        else{
            querySql = 'SELECT `name`,`description`,`field`,`explain`,`params`,`productionimg`,`feature`,`tecimg`,`topimg` from productionInfo WHERE id = ?';
        }
        dbClient.exec({
            sql: querySql,
            params: sqlParams,
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
                response.Message.msg = ERRORCODE.DB_INSERT_FAILED.msg;
            }
            else {
                response.Content.Data = result;
            }
            res.json(response);
        });
    }
});

/*新增产品信息*/
router.post('/addOrUdateProductionInfo',(req, res, next) =>{
    let productInfo = req ? req.body : undefined;
    console.log("addOrUdateProductionInfo:",JSON.stringify(req.body));
    if(productInfo){
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
        //更新产品信息
        if(productInfo.id){
            let updateSql = `UPDATE productionInfo set `;
            let sqlParams = [];
            if(productInfo.series){
                updateSql = updateSql + '`series` = ?,';
                sqlParams.push(productInfo.series);
            }
            if(productInfo.name){
                updateSql = updateSql + '`name` = ?,';
                sqlParams.push(productInfo.name);
            }
            if(productInfo.type){
                updateSql = updateSql + '`type` = ?,';
                sqlParams.push(productInfo.type);
            }
            if(productInfo.model){
                updateSql = updateSql + '`model` = ?,';
                sqlParams.push(productInfo.model);
            }
            if(productInfo.description){
                updateSql = updateSql + '`description` = ?,';
                sqlParams.push(productInfo.description);
            }
            if(productInfo.field){
                updateSql = updateSql + '`field` = ?,';
                sqlParams.push(productInfo.field);
            }
            if(productInfo.explain){
                updateSql = updateSql + '`explain` = ?,';
                sqlParams.push(productInfo.explain);
            }
            if(productInfo.tecimg){
                updateSql = updateSql + '`tecimg` = ?,';
                sqlParams.push(productInfo.tecimg);
            }
            if(productInfo.listimg){
                updateSql = updateSql  + '`listimg` = ?,';
                sqlParams.push(productInfo.listimg);
            }
            if(productInfo.topimg){
                updateSql = updateSql + '`topimg` = ?,';
                sqlParams.push(productInfo.topimg);
            }
            if(productInfo.productionimg){
                updateSql = updateSql  + '`productionimg` = ?,';
                sqlParams.push(productInfo.productionimg);
            }
            if(productInfo.params){
                updateSql = updateSql  + '`params` = ?,';
                sqlParams.push(productInfo.params);
            }
            if(productInfo.feature){
                updateSql = updateSql  + '`feature` = ?,';
                sqlParams.push(productInfo.feature);
            }
            if(productInfo.hasOwnProperty("show") && !isNaN(parseInt(productInfo.show))){
                updateSql = updateSql  + '`show` = ?,';
                sqlParams.push(parseInt(productInfo.show));
            }
            if(productInfo.hasOwnProperty("unused") && !isNaN(parseInt(productInfo.unused))){
                updateSql = updateSql  + '`unused` = ?';
                sqlParams.push(parseInt(productInfo.unused));
            }
            let idx1 = updateSql.lastIndexOf('=');
            let idx2 = updateSql.lastIndexOf(',');
            if(idx1 !== -1 && idx2 !== -1 && idx2 > idx1){
                updateSql =  updateSql.substring(0,idx2) + updateSql.substring(idx2 + 1,updateSql.length);
            }
            updateSql = updateSql + " WHERE id = ?"
            console.log("updateSql",updateSql);
            sqlParams.push(productInfo.id);
            dbClient.exec({
                sql: updateSql,
                params: sqlParams
            },(err,result) => {
                if(err){
                    console.log(err);
                    response.Content.Data = false;
                    response.Message.code = ERRORCODE.DB_UPDATE_FAILED.code;
                    response.Message.msg = ERRORCODE.DB_UPDATE_FAILED.msg;
                }
                response.Content.Data = true;
                res.json(response);
            });
        }
        else{ //新增新产品信息
            dbClient.exec({
                sql: 'INSERT INTO productionInfo(`series`,`name`,`type`,`model`,`description`,`field`,`explain`,`tecimg`,`listimg`,`topimg`,`productionimg`,`params`,`feature`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',
                params: [productInfo.series,productInfo.name,productInfo.type,productInfo.model,productInfo.description,productInfo.field,productInfo.explain, productInfo.tecimg,productInfo.listimg,productInfo.topimg,productInfo.productionimg,productInfo.params,productInfo.feature],
            },(err,result) => {
                if(err){
                    console.log(err);
                    response.Content.Data= false;
                    response.Message.code = ERRORCODE.DB_INSERT_FAILED.code;
                    response.Message.msg = ERRORCODE.DB_INSERT_FAILED.msg;
                    if(err.code === 'ER_DUP_ENTRY'){
                        response.Message.code = ERRORCODE.DB_DUP_LIMIT.code;
                        response.Message.msg = ERRORCODE.DB_DUP_LIMIT.msg;
                    }
                    res.json(response);
                }
                else {
                    console.log(result);
                    response.Content.Data = true;
                    res.json(response);
                    //查询一下返回产品信息
                    // dbClient.exec({
                    //     sql:'SELECT * FROM `productionInfo` where name = ?',
                    //     params: [productInfo.name],
                    // },(err,result) => {
                    //     if(err){
                    //         console.log(err);
                    //         response.Message.code = ERRORCODE.DB_QUERY_FAILED.code;
                    //         response.Message.msg = ERRORCODE.DB_QUERY_FAILED.msg;
                    //     }
                    //     else{
                    //         response.Content.Data = result;
                    //     }
                    //     res.json(response);
                    // });
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



// const dbclient = require('./db/db');
// dbclient.exec({
//   sql: 'select * from test where id = 1',
//   params: [],
// },(err,result) => {
//    if(err){
//      console.log(err);
//    }
//    else {
//      console.log(result);
//    }
// });


/*新增参数解释与说明*/
router.post('/addProductionParams',(req, res, next) => {
    let productParamsExplain = req ? req.body.roductParamsExplain : undefined;
    if(productParamsExplain){
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
        dbClient.exec({
            sql: 'INSERT INTO params(`explain`) VALUES(?)',
            params: [productParamsExplain],
        },(err,result) => {
            if(err){
                console.log(err);
                response.Message.code = ERRORCODE.DB_INSERT_FAILED.code;
                response.Message.msg = ERRORCODE.DB_INSERT_FAILED.code;
            }
            else {
                console.log(result);
            }
            res.json(response);
        });
    }
    else {
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

/*新增参数解释与说明*/
router.post('/addProductionParams',(req, res, next) => {
    let productParamsExplain = req ? req.body.roductParamsExplain : undefined;
    if(productParamsExplain){
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
        dbClient.exec({
            sql: 'INSERT INTO params(`explain`) VALUES(?)',
            params: [productParamsExplain],
        },(err,result) => {
            if(err){
                console.log(err);
                response.Message.code = ERRORCODE.DB_INSERT_FAILED.code;
                response.Message.msg = ERRORCODE.DB_INSERT_FAILED.code;
            }
            else {
                console.log(result);
            }
            res.json(response);
        });
    }
    else {
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

/*查询参数列表 Method:GET*/
router.get('/queryParamsList',(req, res, next) => {
    dbClient.exec({
        sql:'SELECT * FROM `params`',
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

/*复制产品信息*/
router.post('/copyProductionInfo',(req, res, next) =>{
    let productInfo = req ? req.body : undefined;
    console.log("copyProductionInfo:",JSON.stringify(req.body));
    if(productInfo && productInfo.id){
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
    //复制产品信息
        dbClient.exec({
            sql:'SELECT * from productionInfo WHERE `id` = ?',
            params:[productInfo.id]
        },(err,result) => {
            console.log(result);
            if(result.length > 0){
                //查询名称匹配的数量
                let index = result[0].series.lastIndexOf('副本');
                let originSeriesName = result[0].series;
                let originProductionInfo = result[0];
                if(index !== -1){
                    originSeriesName = result[0].series.substring(0,index);
                }
                dbClient.exec({
                   sql:'SELECT COUNT(1) FROM `productionInfo` WHERE `series` LIKE ? ',
                   params:[`${originSeriesName}%`],
                },(err,result) => {
                    if(err){
                        response.Content.Data = false;
                        response.Message.code = ERRORCODE.DB_QUERY_FAILED.code;
                        response.Message.msg = ERRORCODE.DB_QUERY_FAILED.msg;
                        res.json(response);
                    }
                    else{
                        let duplicateCount = result[0]['COUNT(1)'];
                        let duplicateName = `${originSeriesName}副本${duplicateCount}`;
                        //插入副本
                        dbClient.exec({
                            sql: 'INSERT INTO productionInfo(`series`,`name`,`type`,`model`,`description`,`field`,`explain`,`tecimg`,`listimg`,`topimg`,`productionimg`,`params`,`feature`,`show`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                            params: [duplicateName,originProductionInfo.name,originProductionInfo.type,originProductionInfo.model,originProductionInfo.description,originProductionInfo.field,originProductionInfo.explain, originProductionInfo.tecimg,originProductionInfo.listimg,originProductionInfo.topimg,originProductionInfo.productionimg,originProductionInfo.params,originProductionInfo.feature,0],
                        },(err,result) => {
                            if(err){
                                console.log(err);
                                response.Content.Data = false;
                                response.Message.code = ERRORCODE.DB_INSERT_FAILED.code;
                                response.Message.msg = ERRORCODE.DB_INSERT_FAILED.msg;
                                if(err.code === 'ER_DUP_ENTRY'){
                                    response.Message.code = ERRORCODE.DB_DUP_LIMIT.code;
                                    response.Message.msg = ERRORCODE.DB_DUP_LIMIT.msg;
                                }
                                res.json(response);
                            }
                            else {
                                console.log(result);
                                response.Content.Data = true;
                                res.json(response);
                            }
                        });
                    }
                });
            }
            else{
                response.Content.Data = false;
                response.Message.code = ERRORCODE.DB_QUERY_EMPTY.code;
                response.Message.msg = ERRORCODE.DB_QUERY_EMPTY.msg;
                res.json(response);

            }
        });
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

/*查询产品文案*/
router.get('/queryProductionDocumentList',(req, res, next) => {
    let querySql = 'SELECT * FROM `productionDocument` ORDER BY `type` ASC';
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

/*添加或者更新产品文案*/
router.post('/addOrUpdateProductionDocument',(req, res, next) => {
    let productionDocuments = req ? req.body : undefined;
    if(productionDocuments && productionDocuments.length > 0){
        // let UpdateSqls = "";
        // let InsertSqls = "";
        let sqlPromises = [];
        productionDocuments.forEach((productionDocument,index) => {
           if(productionDocument.id){ //更新
               let updateSql = `UPDATE productionDocument set `;
               let sqlParams = [];
               if(!isNaN(parseInt(productionDocument.type))){
                   updateSql = updateSql + '`type` = ?,';
                   sqlParams.push(productionDocument.type);
               }
               if(productionDocument.feature){
                   updateSql = updateSql + '`feature` = ?,';
                   sqlParams.push(JSON.stringify(productionDocument.feature));
               }
               let idx1 = updateSql.lastIndexOf('=');
               let idx2 = updateSql.lastIndexOf(',');
               if(idx1 !== -1 && idx2 !== -1 && idx2 > idx1){
                   updateSql =  updateSql.substring(0,idx2) + updateSql.substring(idx2 + 1,updateSql.length);
               }
               updateSql = updateSql + " WHERE id = ?"
               sqlParams.push(productionDocument.id);
               let updatePromise = new Promise((resolve, reject) => {
                   dbClient.exec({
                       sql: updateSql,
                       params: sqlParams
                   },(err,result) => {
                       if(err){
                          resolve({index:index,result:false});
                       }
                       else{
                           resolve({index:index,result:true});
                       }
                   });
               });
               sqlPromises.push(updatePromise);
           }
           else{ //插入
               let insertPromise = new Promise((resolve, reject) =>{
                   dbClient.exec({
                       sql: 'INSERT INTO productionDocument(`type`,`feature`) VALUES(?,?)',
                       params: [productionDocument.type,JSON.stringify(productionDocument.feature) || ""],
                   },(err,result) => {
                       if(err){
                           resolve({index:index,result:false});
                       }
                       else {
                           resolve({index:index,result:true});
                       }
                   });
               });
               sqlPromises.push(insertPromise);
           }
        });
        Promise.all(sqlPromises)
            .then((result) => {
                let response = {
                    Content:{
                        Data:result,
                        PageInfo: null,
                    },
                    Message:{
                        code:ERRORCODE.SUCCESS.code,
                        msg: ERRORCODE.SUCCESS.msg,
                    }
                };
                res.json(response);
            })
            .catch((err)=>{
                res.json({
                    Content:{
                        Data:[],
                        PageInfo: null,
                    },
                    Message:{
                        code:ERRORCODE.SYSTYME_ERROR.code,
                        msg: ERRORCODE.SYSTYME_ERROR.msg,
                    }
                });
            })
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