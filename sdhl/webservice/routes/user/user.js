'use strict'
const express = require('express');
const router = express.Router();
const dbClient = require('../../db/db');

const moment = require('moment');

const {ERRORCODE} = require('../../utils');

/*查询管理员列表*/
router.get('/queryAdminList',(req, res, next) => {
    //queryType 1: 已发布 2：归档
    let adminId = req ? parseInt(req.query.adminId) : undefined; //从 1开始
    let role = req ? parseInt(req.query.role) : undefined;
    let department = req ?  parseInt(req.query.department) : undefined;
    let account = req ?  parseInt(req.query.account) : undefined;
    if(adminId === undefined || role === undefined || department === undefined || account === undefined){
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
    else{
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
        //先查询角色信息，判断相应的权限，返回用户列表信息，只有超级管理员能看到所有人的信息，其他人只能看到个人信息，但是不能操作
        dbClient.exec({
            sql: 'SELECT * FROM `userInfo` WHERE `id` = ? AND `account` = ? AND `role` = ? AND `department` = ?',
            params: [parseInt(adminId),account.toString(),parseInt(role),parseInt(department)],
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
                response.Message.code = ERRORCODE.NO_AUTH_OPERATION.code;
                response.Message.msg = ERRORCODE.NO_AUTH_OPERATION.msg;
                res.json(response);
                return ;
            } else {
               if(result[0].id === adminId){
                   if(result[0].role === 1){ //查询用户列表
                       dbClient.exec({
                           sql: 'SELECT * FROM `userInfo` WHERE `deleted` = 0',
                           params: [],
                       }, (err, result) => {
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
                   else{ //只查询个人信息
                       response.Content.Data = result;
                       res.json(response);
                   }
               }
            }
        });
    }
});


/*新增或者更新资讯信息
 *只有超级管理员有此权限
*/
router.post('/addOrUdateUserInfo',(req, res, next) =>{
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
        //更新项目信息
        if(Information.adminId && Information.userInfo){
            //判断是不是超级管理员操作
            dbClient.exec({
                sql: 'SELECT `id`, `name`,`role` FROM `userInfo` where id = ?',
                params: [Information.adminId],
            }, (err, result) => {
                if(err){
                    res.json({
                        Content: {
                            Data:false,
                            PageInfo: null,
                        },
                        Message: {
                            code: ERRORCODE.DB_QUERY_FAILED.code,
                            msg: ERRORCODE.DB_QUERY_FAILED.msg,
                        }
                    });
                }
                if(result && result[0].id && parseInt(result[0].role) === 1){ //如果是超级管理员
                    //允许修改的信息有 姓名 账号 密码 角色 部门 超级管理员不能够修改自己的角色和部门
                    let userInfo = Information.userInfo;
                    if(userInfo.id){ //更新用户信息
                        let bSuperAdmin = false;
                        if(parseInt(userInfo.id) === parseInt(result[0].id)){ //超级管理员无需更改
                            bSuperAdmin = true;
                        }
                        let updateUsertInfoSql = `UPDATE userInfo set `;
                        let sqlParams = [];
                        if(userInfo.name && !bSuperAdmin){
                            updateUsertInfoSql = updateUsertInfoSql + 'name = ?,';
                            sqlParams.push(userInfo.name);
                        }
                        if(userInfo.account){
                            updateUsertInfoSql = updateUsertInfoSql + 'account = ?,';
                            sqlParams.push(userInfo.account);
                        }
                        if(userInfo.password){
                            updateUsertInfoSql = updateUsertInfoSql + 'password = ?,';
                            sqlParams.push(userInfo.password);
                        }
                        if(userInfo.role && !bSuperAdmin){
                            updateUsertInfoSql = updateUsertInfoSql + 'role = ?,';
                            sqlParams.push(userInfo.role);
                        }
                        if(userInfo.department && !bSuperAdmin){
                            updateUsertInfoSql = updateUsertInfoSql + 'department = ?,';
                            sqlParams.push(userInfo.department);
                        }
                        if(userInfo.unused !== undefined && !isNaN(parseInt(userInfo.unused)) && !bSuperAdmin){
                            updateUsertInfoSql = updateUsertInfoSql + 'unused = ?,';
                            sqlParams.push(parseInt(userInfo.unused));
                        }
                        if(userInfo.permissiondescription && !bSuperAdmin){
                            updateUsertInfoSql = updateUsertInfoSql + 'permissiondescription = ?,';
                            sqlParams.push(userInfo.permissiondescription);
                        }
                        if(userInfo.deleted !== undefined && !isNaN(parseInt(userInfo.deleted)) && !bSuperAdmin){
                            updateUsertInfoSql = updateUsertInfoSql + 'deleted = ?,';
                            sqlParams.push(parseInt(userInfo.deleted));
                        }
                        let idx1 = updateUsertInfoSql.lastIndexOf('=');
                        let idx2 = updateUsertInfoSql.lastIndexOf(',');
                        if(idx1 !== -1 && idx2 !== -1 && idx2 > idx1){
                            updateUsertInfoSql =  updateUsertInfoSql.substring(0,idx2) + updateUsertInfoSql.substring(idx2 + 1,updateUsertInfoSql.length);
                        }
                        updateUsertInfoSql = updateUsertInfoSql + " WHERE id = ?"
                        sqlParams.push(userInfo.id);
                        dbClient.exec({
                            sql: updateUsertInfoSql,
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
                    else{ //新增用户信息
                        dbClient.exec({
                            sql: 'INSERT INTO userInfo(`name`,`account`,`password`,`role`,`permissiondescription`,`department`,`unused`,`deleted`) VALUES(?,?,?,?,?,?,?,?)',
                            params: [userInfo.name,userInfo.account,userInfo.password,parseInt(userInfo.role) === 1 ? 0 : parseInt(userInfo.role),userInfo.permissiondescription,parseInt(userInfo.department),parseInt(userInfo.unused) || 0,parseInt(userInfo.deleted) || 0],
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
                        Content: {
                            Data: false,
                            PageInfo: null,
                        },
                        Message: {
                            code: ERRORCODE.NO_AUTH_OPERATION.code,
                            msg: ERRORCODE.NO_AUTH_OPERATION.msg,
                        }
                    });
                }
            });
        }
        else{
            res.json({
                Content: {
                    Data: false,
                    PageInfo: null,
                },
                Message: {
                    code: ERRORCODE.INVALID_PARAMS.code,
                    msg: ERRORCODE.INVALID_PARAMS.msg,
                }
            });
        }
    }
    else{
        res.json({
            Content: {
                Data: false,
                PageInfo: null,
            },
            Message: {
                code: ERRORCODE.INVALID_PARAMS.code,
                msg: ERRORCODE.INVALID_PARAMS.msg,
            }
        });
    }
});

/*用户登录接口*/
router.post('/loginAdmin',(req, res, next) =>{
    let LoginInfo = req ? req.body : undefined;
    if(LoginInfo.account && LoginInfo.password){
        dbClient.exec({
            sql: 'SELECT * FROM `userInfo` WHERE `account` = ?',
            params: [LoginInfo.account],
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
                response.Content.Data = false;
                response.Message.code = ERRORCODE.DB_INSERT_FAILED.code;
                response.Message.msg = ERRORCODE.DB_INSERT_FAILED.code;
            } else {
                if(result && result.length > 0 && result[0].password === LoginInfo.password){
                    response.Content.Data = result;
                }
                else{
                    response.Content.Data = false;
                    response.Message.code = ERRORCODE.LOGIN_PASSWORD_ERROR.code;
                    response.Message.msg = ERRORCODE.LOGIN_PASSWORD_ERROR.msg;
                }
            }
            res.json(response);
        });
    }
    else{
        res.json({
            Content: {
                Data: false,
                PageInfo: null,
            },
            Message: {
                code: ERRORCODE.INVALID_PARAMS.code,
                msg: ERRORCODE.INVALID_PARAMS.msg,
            }
        });
    }
});


router.get('/',(req, res, next) => {
    res.json({code:999, list:[], msg: 'no such interface'});
});

module.exports = router;