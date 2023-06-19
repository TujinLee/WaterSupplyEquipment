const isDev = process.env.NODE_ENV == 'development';
export const webApi = {
    api: isDev ? '/api' : '/api',
    fileApi: isDev ? '/file_upload' : 'http://122.4.216.133:8899/file_upload',
    service: 'http://122.4.216.133:8899'
}

// const returnMsg={

// }

// SUCCESS: {code: 0, msg: 'success'},
// UPLOAD_FAILED: {code: 10000, msg: 'upload image failed'},
// INVALID_PARAMS:{code: 10001, msg: 'invalid params'},
// DB_INSERT_FAILED: {code: 10002, msg: 'insert db error'},
// DB_QUERY_FAILED: {code: 10003, msg: 'query db error'},
// DB_UPDATE_FAILED: {code: 10004, msg: 'update db error'},
// RECOMMEND_POS_EXISTS: {code: 10004, msg: 'recommend has been exist'},
// NO_AUTH_OPERATION:{code: 10005, msg: 'Unauthorized operation'},
// LOGIN_PASSWORD_ERROR:{code: 10006, msg: 'password incorrect'},
