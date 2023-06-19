'use strict'
const express = require('express');
const moment = require('moment');
const router = express.Router();
const dbClient = require('../../db/db');

const {ERRORCODE} = require('../../utils');


/* 查询招聘职位列表*/
router.get('/queryRecruitmentList',(req, res, next) => {
    let isFront = req ? parseInt(req.query.isFront) : 1; //1 :前台查询 0：后台查询
    if(isNaN(isFront)){
        isFront = 1;
    }
    let querySql = 'SELECT * FROM `recruitment` WHERE `unused` = 0';
    if(isFront === 1){
        querySql = querySql + ' AND `inrecruitment` = 1';
    }
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

/*获取招聘信息*/
router.get('/queryRecruitmentInfo',(req, res, next) => {
    let recruitmentId = req ? parseInt(req.query.recruitmentId) : undefined;
    if(recruitmentId === undefined || recruitmentId < 0 || recruitmentId === NaN){
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
            sql: 'SELECT * FROM `recruitment` where id = ?',
            params: [recruitmentId],
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

/*新增或者更新招聘信息*/
router.post('/addOrUdateRecruitment',(req, res, next) =>{
    let recruitmentInfo = req ? req.body : undefined;
    if(recruitmentInfo) {
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
        if (recruitmentInfo.id) { //更新
            let updateSql = `UPDATE \`recruitment\` SET `;
            let sqlParams = [];
            if (recruitmentInfo.positiontitle) {
                updateSql = updateSql + '`positiontitle` = ?,';
                sqlParams.push(recruitmentInfo.positiontitle);
            }
            if (recruitmentInfo.recruitsnums && parseInt(recruitmentInfo.recruitsnums) !== NaN) {
                updateSql = updateSql + '`recruitsnums` = ?,';
                sqlParams.push(parseInt(recruitmentInfo.recruitsnums));
            }
            if (recruitmentInfo.jobbase) {
                updateSql = updateSql + '`jobbase` = ?,';
                sqlParams.push(recruitmentInfo.jobbase);
            }
            if (recruitmentInfo.jobresponsibilities) {
                updateSql = updateSql + '`jobresponsibilities` = ?,';
                sqlParams.push(recruitmentInfo.jobresponsibilities);
            }
            if (recruitmentInfo.jobtype) {
                updateSql = updateSql + '`jobtype` = ?,';
                sqlParams.push(recruitmentInfo.jobtype);
            }
            if (recruitmentInfo.jobnature) {
                updateSql = updateSql + '`jobnature` = ?,';
                sqlParams.push(recruitmentInfo.jobnature);
            }
            if (recruitmentInfo.salaryrange) {
                updateSql = updateSql + '`salaryrange` = ?,';
                sqlParams.push(recruitmentInfo.salaryrange);
            }
            if (recruitmentInfo.department) {
                updateSql = updateSql + 'department = ?,';``
                sqlParams.push(recruitmentInfo.department);
            }
            if (recruitmentInfo.recruitmentarea) {
                updateSql = updateSql + 'recruitmentarea = ?,';``
                sqlParams.push(recruitmentInfo.recruitmentarea);
            }
            if (recruitmentInfo.deliverymail) {
                updateSql = updateSql + 'deliverymail = ?,';``
                sqlParams.push(recruitmentInfo.deliverymail);
            }
            if (recruitmentInfo.inrecruitment !== undefined && parseInt(recruitmentInfo.inrecruitment) >= 0 && !isNaN(parseInt(recruitmentInfo.inrecruitment))) {
                updateSql = updateSql + 'inrecruitment = ?,';``
                if(recruitmentInfo.inrecruitment > 0)
                    recruitmentInfo.inrecruitment =1;
                sqlParams.push(parseInt(recruitmentInfo.inrecruitment));
            }
            if (recruitmentInfo.unused !== undefined && parseInt(recruitmentInfo.unused) >= 0 && !isNaN(parseInt(recruitmentInfo.unused))) {
                updateSql = updateSql + 'unused = ?,';
                if(recruitmentInfo.unused > 0)
                    recruitmentInfo.unused =1;
                sqlParams.push(parseInt(recruitmentInfo.unused));
            }
            updateSql = updateSql + 'opdate = ?,';
            sqlParams.push(moment().format('YYYY-DD-MM HH:mm:ss'));

            let idx1 = updateSql.lastIndexOf('=');
            let idx2 = updateSql.lastIndexOf(',');
            if (idx1 !== -1 && idx2 !== -1 && idx2 > idx1) {
                updateSql = updateSql.substring(0, idx2) + updateSql.substring(idx2 + 1, updateSql.length);
            }
            updateSql = updateSql + " WHERE id = ?"
            console.log("updateSql", updateSql);
            sqlParams.push(recruitmentInfo.id);
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
            //不能超过20个
            dbClient.exec({
                sql: 'SELECT COUNT(1) FROM `recruitment` WHERE `unused` = 0 ',
                params: [],
            }, (err, result) => {
                if (err) {
                    console.log(err);
                    response.Message.code = ERRORCODE.DB_QUERY_FAILED.code;
                    response.Message.msg = ERRORCODE.DB_QUERY_FAILED.msg;
                    res.json(response);
                } else {
                    if (result[0]['COUNT(1)'] >= 20) {
                        response.Message.code = ERRORCODE.RECRUITMENT_BANNER_LIMIT.code;
                        response.Message.msg = ERRORCODE.RECRUITMENT_BANNER_LIMIT.msg;
                        res.json(response);
                    } else {
                        let recruitsnums = isNaN(parseInt(recruitmentInfo.recruitsnums)) || parseInt(recruitmentInfo.recruitsnums) < 0 ? 0 : parseInt(recruitmentInfo.recruitsnums);
                        let inrecruitment =  recruitmentInfo.inrecruitment === undefined || isNaN(parseInt(recruitmentInfo.inrecruitment)) || parseInt(recruitmentInfo.inrecruitment) < 0 ? 0 ? parseInt(recruitmentInfo.inrecruitment) > 0 : 1 : 0;
                       console.log("recruitsnums:",recruitsnums,",inrecruitment:",inrecruitment);
                        dbClient.exec({
                            sql: 'INSERT INTO recruitment(`positiontitle`,`jobtype`,`recruitsnums`,`jobbase`,`jobresponsibilities`,`jobnature`,`salaryrange`,`department`,`recruitmentarea`,`deliverymail`,`inrecruitment`,`opdate`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
                            params: [recruitmentInfo.positiontitle,recruitmentInfo.jobtype,recruitsnums,recruitmentInfo.jobbase,recruitmentInfo.jobresponsibilities,recruitmentInfo.jobnature,recruitmentInfo.salaryrange,recruitmentInfo.department,recruitmentInfo.recruitmentarea,recruitmentInfo.deliverymail,inrecruitment,moment().format('YYYY-DD-MM HH:mm:ss')],
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