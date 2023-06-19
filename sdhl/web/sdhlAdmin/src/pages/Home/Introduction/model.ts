import { messageHandler } from '@/utils/utils';
import { addOrUdateProductionInfo, queryProductionDocumentList } from './service';


const ProductModel = {
    namespace: 'introduction',

    state: {
        productionDocumentList: [],
    },

    effects: {
        *queryProductionDocumentList(_, { call, put, }) {
            const { Message, Content = [] } = yield call(queryProductionDocumentList);
            if (messageHandler(Message)({
                success: false,
                fail: '查询失败',
            })) {
                yield put({
                    type: 'updateList',
                    payload: Content.Data,
                });
            }
            return Content.Data;
        },
        *addOrUdateProductionInfo({ payload: { params } }, { call, put, }) {
            const { Message, Content = [] } = yield call(addOrUdateProductionInfo, params);
            return messageHandler(Message)({
                success: '保存成功',
                fail: '保存失败',
            });
        },
    },

    reducers: {
        updateList(state, { payload }) {
            return {
                ...state,
                productionDocumentList: payload,
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
