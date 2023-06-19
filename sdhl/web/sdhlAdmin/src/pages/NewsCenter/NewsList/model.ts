import { messageHandler } from '@/utils/utils';
import { addOrUdateInformation, archiving, cancelRecommend, queryExistRecommendpos, queryInformationList, recommendposUpdate } from './service';

const ProductModel = {
    namespace: 'news',

    state: {
        publishInfoList: [],  // 已发布
        archiveInfoList: [],  // 归档
        existRecommendpos: [], // 已存在的推荐位置
    },

    effects: {
        *queryInformationList({ payload: { pageInfo, queryType } }, { call, put, }) {
            const { Message, Content = [] } = yield call(queryInformationList, pageInfo, queryType);
            if (messageHandler(Message)({
                success: false,
                fail: '查询失败',
            })) {
                yield put({
                    type: queryType == 1 ? 'updatePublishInfoList' : 'updateArchiveInfoList',
                    payload: Content.Data,
                });
            }
        },
        *addOrUdateInformation({ payload: { params } }, { call, put, }) {
            const { Message } = yield call(addOrUdateInformation, params);
            return messageHandler(Message)({
                success: '保存成功',
                fail: '保存失败',
            });
        },
        *archiving({ payload: { params } }, { call, put, }) {
            const { Message = {}, Content = [] } = yield call(archiving, params);
            return messageHandler(Message)({
                success: '归档成功',
                fail: '归档失败',
            });
        },
        *recommendposUpdate({ payload: { params } }, { call, put, }) {
            const { Message = {}, Content = [] } = yield call(recommendposUpdate, params);
            return messageHandler(Message)({
                success: '推荐成功',
                fail: '推荐失败',
            });
        },
        *cancelRecommend({ payload: { params } }, { call, put, }) {
            const { Message = {}, Content = [] } = yield call(cancelRecommend, params);
            return messageHandler(Message)({
                success: '取消推荐成功',
                fail: '取消推荐失败',
            });
        },
        *queryExistRecommendpos(_, { call, put, }) {
            const { Message, Content = [] } = yield call(queryExistRecommendpos);
            if (messageHandler(Message)({
                success: false,
                fail: '查询已存在的推荐位置失败',
            })) {
                yield put({
                    type: 'updatePos',
                    payload: Content.Data,
                });
            }
        },
    },

    reducers: {
        updatePublishInfoList(state, { payload }) {
            return {
                ...state,
                publishInfoList: payload,
            };
        },
        updateArchiveInfoList(state, { payload }) {
            return {
                ...state,
                archiveInfoList: payload,
            };
        },
        updatePos(state, { payload }) {
            return {
                ...state,
                existRecommendpos: payload,
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

export default ProductModel;
