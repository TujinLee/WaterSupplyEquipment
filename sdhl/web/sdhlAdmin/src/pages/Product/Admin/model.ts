import { messageHandler } from '@/utils/utils';
import { addOrUdateProductionInfo, copyProductionInfo, queryProductionInfo, queryProductionList } from './service';

const ProductModel = {
    namespace: 'product',

    state: {
        productionList: [],  // 产品列表
        productionInfo: {}, // 产品信息
    },

    effects: {
        *queryProductionList({ payload: { queryType } }, { call, put, }) {
            const { Message, Content = [] } = yield call(queryProductionList, queryType);
            if (messageHandler(Message)({
                success: false,
                fail: '查询产品列表失败',
            })) {
                yield put({
                    type: 'updateProductionList',
                    payload: Content.Data,
                });
            }
        },
        *addOrUdateProductionInfo({ payload: { params } }, { call, put, }) {
            const { Message } = yield call(addOrUdateProductionInfo, params);
            return messageHandler(Message)({
                success: '保存成功',
                fail: '保存失败',
            });
        },
        *copyProductionInfo({ payload: { params } }, { call, put, }) {
            const { Message = {}, Content = [] } = yield call(copyProductionInfo, params);
            return messageHandler(Message)({
                success: '保存成功',
                fail: '保存失败',
            });
        },
        *queryProductionInfo({ payload: { queryType, productionId } }, { call, put, }) {
            const { Message = {}, Content = [] } = yield call(queryProductionInfo, queryType, productionId);
            if (messageHandler(Message)({
                success: false,
                fail: '查询产品详情失败',
            })) {
                yield put({
                    type: 'updateProductionInfo',
                    payload: Content.Data,
                });
            }
            return Content.Data || [];
        },
    },

    reducers: {
        updateProductionList(state, { payload }) {
            return {
                ...state,
                productionList: payload,
            };
        },
        updateProductionInfo(state, { payload }) {
            return {
                ...state,
                productionInfo: payload,
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
