const fileFilter = (req, file, cb) => {
    if (file && (file.mimetype.indexOf('image') !== -1 || file.mimeType.indexOf('jpeg')) !== -1)
    {
        cb(null,true);
    }
    else {
        cb(null,false);
    }
}

const ERRORCODE = {
    SUCCESS: {code: 0, msg: 'success'},
    UPLOAD_FAILED: {code: 10000, msg: '图片上传失败'},
    INVALID_PARAMS:{code: 10001, msg: '请求参数无效'},
    DB_INSERT_FAILED: {code: 10002, msg: '数据库插入失败'},
    DB_QUERY_FAILED: {code: 10003, msg: '数据库查询失败'},
    DB_UPDATE_FAILED: {code: 10004, msg: '数据库更新失败'},
    RECOMMEND_POS_EXISTS: {code: 10004, msg: '推荐已存在'},
    NO_AUTH_OPERATION:{code: 10005, msg: '操作未认证'},
    LOGIN_PASSWORD_ERROR:{code: 10006, msg: '密码不正确'},
    HOME_BANNER_LIMIT:{code: 10007, msg: 'banner图数量已达上限'},
    DB_DUP_LIMIT:{code: 10008, msg: '已有重复记录'},
    DB_QUERY_EMPTY:{code: 10009, msg: '没有该记录'},
    SYSTYME_ERROR:{code: 99999, msg: '系统错误'},
    RECRUITMENT_BANNER_LIMIT:{code: 10010, msg: '招聘数量已达上限'},
}

const utils = {
    fileFilter: fileFilter,
    ERRORCODE : ERRORCODE,
};

module.exports = utils;