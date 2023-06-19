'use strict'

const mysql = require('mysql');

module.exports = {
    config: {
        host: '47.102.223.39',
        port: 3306,
        database: 'sdhl',
        user: 'root',
        password: 'SDHL374526#',
        useConnectionPooling: true,// 使用连接池
        multipleStatements: true,
        supportBigNumbers:false,
        bigNumberStrings:false,
        typeCast: function (field, next) {
            if (field.type === 'TINY' && field.length === 1) {
                return parseInt(field.string()); // 1 = true, 0 = false
            }
            else if(field.type === 'LONG' && field.length === 4){
                return parseInt(field.string());
            }
            else {
                return next();
            }
        },
    },
    pool: null,
    /**
     * 创建连接池
     */
    create: function () {
        const db = this;
        // 没有pool的才创建
        if (!db.pool) {
            db.pool = mysql.createPool(db.config);
        }
    },
    /**
     * 执行sql
     * @param {Object} config 操作对象
     */
    exec: function (config,callback) {
        const db = this;
        db.create();
        db.pool.getConnection((err, conn) => {
            if (err) {
                console.log('mysql pool getConnections err:' + err);
                throw err;
            } else {
                conn.query(config.sql, config.params, (err, result) => {
                    if(callback){
                        callback(err,result);
                    }
                    // 释放连接到连接池
                    conn.release();
                });
            }
        });
    }
};


