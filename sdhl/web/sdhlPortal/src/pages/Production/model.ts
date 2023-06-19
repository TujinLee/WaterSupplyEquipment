import { messageHandler } from '@/utils/utils';
import { queryProductionInfo, queryProductionList } from './service';

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
        *queryProductionInfo({ payload: { queryType, productionId } }, { call, put, }) {
            const { Message = {}, Content = [] } = yield call(queryProductionInfo, queryType, productionId);
            if (messageHandler(Message)({
                success: false,
                fail: '查询产品详情失败',
            })) {
                yield put({
                    type: 'updateProductionInfo',
                    payload: Content.Data[0] || {},
                });
            }
            return Content.Data[0] || {};
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
