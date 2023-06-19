'use strict'
const express = require('express');
const router = express.Router();
const dbClient = require('../../db/db');

const {ERRORCODE} = require('../../utils');

/*查询产品列表*/
/*

{PageIndex:2,PageSize:50 }这样
PageInfo:{
    PageIndex:1,//第一页
    PageSize:20,//一页20条
    PageCount:100,//总页数，
    TotalCount：1111,//总条数
    OrderBy:'',//排序字段
}

* 查询项目列表*/
router.get('/queryProjectList',(req, res, next) => {
    let PageIndex = req ? parseInt(req.query.pageIndex) : 1; //从 1开始
    let PageSize = req ? parseInt(req.query.pageSize) : 50;

    //  SELECT id from projectInfo ORDE BY id desc limit PageIndex * PageSize;
    //SELECT COUNT(*) FROM projectInfo ORDER BY `id` DESC;SELECT * FROM `projectInfo` WHERE `id` <= (SELECT `id` from projectInfo ORDER BY `id` DESC limit 0 , 1) ORDER BY `id` DESC LIMIT 2;
    let querySql = "SELECT COUNT(*) FROM `projectInfo` WHERE \`unused\` = 0 ORDER BY `id` DESC; SELECT * FROM `projectInfo`";
    querySql = `${querySql}  WHERE \`unused\` = 0 AND \`id\` <= (SELECT \`id\` from \`projectInfo\` WHERE \`unused\` = 0 ORDER BY \`id\` DESC limit ${(PageIndex - 1) * PageSize} , 1) ORDER BY \`id\` DESC LIMIT ${PageSize};`;
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
});

/*获取项目信息*/
router.get('/queryProjectInfo',(req, res, next) => {
    let projectId = req ? parseInt(req.query.projectId) : undefined;
    if(projectId === undefined || projectId < 0){
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
            sql: 'SELECT * FROM `projectInfo` where id = ?',
            params: [projectId],
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

/*新增项目信息*/
router.post('/addOrUdateProjectInfo',(req, res, next) =>{
    let projectInfo = req ? req.body : undefined;
    if(projectInfo && projectInfo !== {}){
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
        //更新项目信息
        if(projectInfo.id){
            let updateProjectInfoSql = `UPDATE projectInfo set `;
            let sqlParams = [];
            if(projectInfo.casename){
                updateProjectInfoSql = updateProjectInfoSql + 'casename = ?,';
                sqlParams.push(projectInfo.casename);
            }
            if(projectInfo.caseimg){
                updateProjectInfoSql = updateProjectInfoSql + 'caseimg = ?,';
                sqlParams.push(projectInfo.caseimg);
            }
            if(projectInfo.customername){
                updateProjectInfoSql = updateProjectInfoSql + 'customername = ?,';
                sqlParams.push(projectInfo.customername);
            }
            if(projectInfo.area){
                updateProjectInfoSql = updateProjectInfoSql + 'area = ?,';
                sqlParams.push(projectInfo.area);
            }
            if(projectInfo.city){
                updateProjectInfoSql = updateProjectInfoSql + 'city = ?,';
                sqlParams.push(projectInfo.city);
            }
            if(projectInfo.industry){
                updateProjectInfoSql = updateProjectInfoSql + 'industry = ?,';
                sqlParams.push(projectInfo.industry);
            }
            if(projectInfo.hasOwnProperty("show") && parseInt(projectInfo.show) !== NaN){
                updateProjectInfoSql = updateProjectInfoSql + '`show` = ?,';
                sqlParams.push(parseInt(projectInfo.show));
            }
            if(projectInfo.equipment){
                updateProjectInfoSql = updateProjectInfoSql + 'equipment = ?,';
                sqlParams.push(projectInfo.equipment);
            }
            if(projectInfo.hasOwnProperty('type') && parseInt(projectInfo.type) !== NaN){
                updateProjectInfoSql = updateProjectInfoSql + 'type = ?,';
                sqlParams.push(parseInt(projectInfo.type));
            }
            if(projectInfo.hasOwnProperty("unused") && !isNaN(parseInt(projectInfo.unused))){
                updateProjectInfoSql = updateProjectInfoSql  + '`unused` = ?';
                sqlParams.push(parseInt(projectInfo.unused));
            }
            let idx1 = updateProjectInfoSql.lastIndexOf('=');
            let idx2 = updateProjectInfoSql.lastIndexOf(',');
            if(idx1 !== -1 && idx2 !== -1 && idx2 > idx1){
                updateProjectInfoSql =  updateProjectInfoSql.substring(0,idx2) + updateProjectInfoSql.substring(idx2 + 1,updateProjectInfoSql.length);
            }
            updateProjectInfoSql = updateProjectInfoSql + " WHERE id = ?"
            sqlParams.push(projectInfo.id);
            dbClient.exec({
                sql: updateProjectInfoSql,
                params: sqlParams
            },(err,result) => {
                if(err){
                    console.log(err)
                    response.Content.Data = false;
                    response.Message.code = ERRORCODE.DB_UPDATE_FAILED.code;
                    response.Message.msg = ERRORCODE.DB_UPDATE_FAILED.msg;
                }
                else{
                    response.Content.Data = true;
                }
                res.json(response);
            });
        }
        else{ //新增项目信息
            dbClient.exec({
                sql: 'INSERT INTO projectInfo(`casename`,`caseimg`,`customername`,`area`,`city`,`industry`,`equipment`,`show`,`type`) VALUES(?,?,?,?,?,?,?,?,?)',
                params: [projectInfo.casename,projectInfo.caseimg,projectInfo.customername,projectInfo.area,projectInfo.city,projectInfo.industry,projectInfo.equipment,parseInt(projectInfo.show) || 0,parseInt(projectInfo.type) || 1],
            },(err,result) => {
                if(err){
                    console.log(err);
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

/*复制项目信息*/
router.post('/copyProjectInfo',(req, res, next) =>{
    let projectInfo = req ? req.body : undefined;
    console.log("copyProjectionInfo:",JSON.stringify(req.body));
    if(projectInfo && projectInfo.id){
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
            sql:'SELECT * from projectInfo WHERE `id` = ?',
            params:[projectInfo.id]
        },(err,result) => {
            console.log(result);
            if(result.length > 0){
                //查询名称匹配的数量
                let index = result[0].casename.lastIndexOf('副本');
                let originCaseName = result[0].casename;
                let originProjectInfo = result[0];
                if(index !== -1){
                    originCaseName = result[0].casename.substring(0,index);
                }
                dbClient.exec({
                    sql:'SELECT COUNT(1) FROM `projectInfo` WHERE `casename` LIKE ? ',
                    params:[`${originCaseName}%`],
                },(err,result) => {
                    if(err){
                        response.Content.Data = false;
                        response.Message.code = ERRORCODE.DB_QUERY_FAILED.code;
                        response.Message.msg = ERRORCODE.DB_QUERY_FAILED.msg;
                        res.json(response);
                    }
                    else{
                        let duplicateCount = result[0]['COUNT(1)'];
                        let duplicateName = `${originCaseName}副本${duplicateCount}`;
                        //插入副本
                        dbClient.exec({
                            sql: 'INSERT INTO projectInfo(`casename`,`caseimg`,`customername`,`area`,`city`,`industry`,`equipment`,`show`,`type`) VALUES(?,?,?,?,?,?,?,?,?)',
                            params: [duplicateName,originProjectInfo.caseimg,originProjectInfo.customername,originProjectInfo.area,originProjectInfo.city,originProjectInfo.industry,originProjectInfo.equipment,0,parseInt(originProjectInfo.type) || 1],
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

router.get('/',(req, res, next) => {
    res.json({code:999, list:[], msg: 'no such interface'});
});

module.exports = router;