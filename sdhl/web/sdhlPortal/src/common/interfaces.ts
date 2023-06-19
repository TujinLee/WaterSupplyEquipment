import { webApi } from "./constants";

const isDev = process.env.NODE_ENV === 'development';



export const interfaces = !isDev ? {
    addOrUdateProductionInfo: webApi.api +　'/production/addOrUdateProductionInfo', // 添加或更新产品信息
    queryProductionList: webApi.api +　'/production/queryProductionList',// 产品列表查询-无分页
    queryProductionInfo: webApi.api +　'/production/queryProductionInfo',// 查询产品信息
    queryProjectList: webApi.api +　'/project/queryProjectList', // 查询项目列表
    addOrUdateProjectInfo: webApi.api +　'/project/addOrUdateProjectInfo',// 添加或更新项目信息
    queryProjectList1: webApi.api +　'/queryProjectList', // 查询产品列表
    queryInformationListForFront: webApi.api +　'/news/queryInformationListForFront', // 查询资讯列表
    addOrUdateInformation: webApi.api +　'/news/addOrUdateInformation',// 添加或者更新资讯信息
    queryProjectInfo: webApi.api +　'/project/queryProjectInfo',// 查询项目信息
    queryInformationDetail: webApi.api +　'/news/queryInformationDetail',// 查询资讯信息
    updateReadingCount: webApi.api +　'/news/updateReadingCount', // 更新阅读量
    queryRecentNews: webApi.api +　'/news/queryRecentNews',// 查询首页或者资讯中心轮播的资讯
    archiving: webApi.api +　'/news/archiving', // 归档文章
    recommendposUpdate: webApi.api +　'/news/recommendposUpdate',// 更新推荐位置
    cancelRecommend: webApi.api +　'/news/cancelRecommend',// 取消推荐
    queryAdminList: webApi.api +　'/user/queryAdminList',// 查询用户列表
    addOrUdateUserInfo: webApi.api +　'/user/addOrUdateUserInfo',// 添加或更新用户信息
    loginAdmin: webApi.api +　'/user/loginAdmin',// 管理员登录接口
    queryHomeBannerList: webApi.api +　'/homebanner/queryHomeBannerList',// 获取首页banner图列表
    queryHomeBannerInfo: webApi.api +　'/homebanner/queryHomeBannerInfo',// 查询banner信息
    addOrUdateHomeBanner: webApi.api +　'/homebanner/addOrUdateHomeBanner', // 添加或者更新banner
    copyProductionInfo: webApi.api +　'/production/copyProductionInfo',// 复制产品信息
    copyProjectInfo: webApi.api +　'/project/copyProjectInfo',// 复制项目信息
    queryProductionDocumentList: webApi.api +　'/production/queryProductionDocumentList',// 查询产品文案列表
    addOrUpdateProductionDocument: webApi.api +　'/production/addOrUpdateProductionDocument',// 添加或者更新产品文案
    queryRecruitmentList: webApi.api +　'/recruitment/queryRecruitmentList',// 获取招聘列表
    queryRecruitmentInfo: webApi.api +　'/recruitment/queryRecruitmentInfo',// 查询招聘信息
    addOrUdateRecruitment: webApi.api +　'/recruitment/addOrUdateRecruitment',// 添加或者更新招聘信息
    queryExistRecommendpos: webApi.api +　'/news/queryExistRecommendpos',// 查询已存在的推荐位置
} : {
        addOrUdateProductionInfo: '/api/production/addOrUdateProductionInfo', // 添加或更新产品信息
        queryProductionList: '/api/production/queryProductionList',// 产品列表查询-无分页
        queryProductionInfo: '/api/production/queryProductionInfo',// 查询产品信息
        queryProjectList: '/api/project/queryProjectList', // 查询项目列表
        addOrUdateProjectInfo: '/api/project/addOrUdateProjectInfo',// 添加或更新项目信息
        queryProjectList1: '/api/queryProjectList', // 查询产品列表
        queryInformationListForFront: '/api/news/queryInformationListForFront', // 查询资讯列表
        addOrUdateInformation: '/api/news/addOrUdateInformation',// 添加或者更新资讯信息
        queryProjectInfo: '/api/project/queryProjectInfo',// 查询项目信息
        queryInformationDetail: '/api/news/queryInformationDetail',// 查询资讯信息
        updateReadingCount: '/api/news/updateReadingCount', // 更新阅读量
        queryRecentNews: '/api/news/queryRecentNews',// 查询首页或者资讯中心轮播的资讯
        archiving: '/api/news/archiving', // 归档文章
        recommendposUpdate: '/api/news/recommendposUpdate',// 更新推荐位置
        cancelRecommend: '/api/news/cancelRecommend',// 取消推荐
        queryAdminList: '/api/user/queryAdminList',// 查询用户列表
        addOrUdateUserInfo: '/api/user/addOrUdateUserInfo',// 添加或更新用户信息
        loginAdmin: '/api/user/loginAdmin',// 管理员登录接口
        queryHomeBannerList: '/api/homebanner/queryHomeBannerList',// 获取首页banner图列表
        queryHomeBannerInfo: '/api/homebanner/queryHomeBannerInfo',// 查询banner信息
        addOrUdateHomeBanner: '/api/homebanner/addOrUdateHomeBanner', // 添加或者更新banner
        copyProductionInfo: '/api/production/copyProductionInfo',// 复制产品信息
        copyProjectInfo: '/api/project/copyProjectInfo',// 复制项目信息
        queryProductionDocumentList: '/api/production/queryProductionDocumentList',// 查询产品文案列表
        addOrUpdateProductionDocument: '/api/production/addOrUpdateProductionDocument',// 添加或者更新产品文案
        queryRecruitmentList: '/api/recruitment/queryRecruitmentList',// 获取招聘列表
        queryRecruitmentInfo: '/api/recruitment/queryRecruitmentInfo',// 查询招聘信息
        addOrUdateRecruitment: '/api/recruitment/addOrUdateRecruitment',// 添加或者更新招聘信息
        queryExistRecommendpos: '/api/news/queryExistRecommendpos',// 查询已存在的推荐位置
    }
