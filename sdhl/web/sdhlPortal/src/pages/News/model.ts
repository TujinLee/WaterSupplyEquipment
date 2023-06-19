import { messageHandler } from '@/utils/utils';
import { queryInformationDetail, queryInformationListForFront, queryRecentNews, updateReadingCount } from './service';

export default {
    namespace: 'news',

    state: {
        newsDetailInfo: {},  // 详情
        newsList: [], //首页
        publishInfoList: [],  // 已发布 
        pageInfo:{},      
    },

    effects: {
        *queryInformationDetail({ payload: { id } }, { call, put, }) {
            const { Message, Content = [] } = yield call(queryInformationDetail, id);
            if (messageHandler(Message)({
                success: false,
                fail: '查询详情失败',
            })) {
                yield put({
                    type: 'updateNewsDetailInfo',
                    payload: Content.Data[0] || {},
                });
                return Content.Data;
            }
        },
        *updateReadingCount({ payload: { id } }, { call, put, }) {
            yield call(updateReadingCount, id);            
        },
        *queryRecentNews({ payload: { queryType, queryCount } }, { call, put, }) {
            const { Message, Content = [] } = yield call(queryRecentNews, queryType, queryCount);
            if (messageHandler(Message)({
                success: false,
                fail: '查询失败',
            })) {
                yield put({
                    type: 'updateNewsList',
                    payload: Content.Data || [],
                });
                return Content.Data || [];
            }
        },
        *queryInformationListForFront({ payload: { pageInfo,columnists } }, { call, put, }) {
            const { Message, Content = [] } = yield call(queryInformationListForFront, pageInfo,columnists);
            if (messageHandler(Message)({
                success: false,
                fail: '查询失败',
            })) {
                yield put({
                    type: 'updatePublishInfoList',
                    payload: Content.Data,
                });
                yield put({
                    type: 'updatePageInfo',
                    payload: Content.PageInfo||{},
                });
                return Content.Data || [];
            }
        },
    },

    reducers: {
        updateNewsDetailInfo(state, { payload }) {
            return {
                ...state,
                newsDetailInfo: payload,
            };
        },
        updateNewsList(state, { payload }) {
            return {
                ...state,
                newsList: payload,
            };
        },
        updatePublishInfoList(state, { payload }) {
            return {
                ...state,
                publishInfoList: payload,
            };
        },
        updatePageInfo(state, { payload }) {
            return {
                ...state,
                pageInfo: payload,
            };
        },
    },

    subscriptions: {
        setup({ history }): void {
            // Subscribe history(url) change, trigger `load` action if pathname is `/`
            history.listen(({ pathname, search }): void => {
                if (typeof window.ga !== 'undefined') {
                    window.ga('send', 'pageview', pathname + search);
                }
            });
        },
    },
};