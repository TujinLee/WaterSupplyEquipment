import { messageHandler } from '@/utils/utils';
import { queryHomeBannerList, queryProductionDocumentList } from './service';

const ProductModel = {
    namespace: 'home',

    state: {
        homeBannerList: [],  // 列表
        productionDocumentList: JSON.parse(window.localStorage.getItem('homeBannerList'))||[],
    },

    effects: {
        *queryHomeBannerList(_, { call, put, }) {
            const { Message, Content = [] } = yield call(queryHomeBannerList);
            if (messageHandler(Message)({
                success: false,
                fail: '查询失败',
            })) {
                window.localStorage.setItem('homeBannerList',JSON.stringify(Content.Data))
                yield put({
                    type: 'updateHomeBannerList',
                    payload: Content.Data,
                });
                return Content.Data || []
            }
        },
        *queryProductionDocumentList(_, { call, put, }) {
            const { Message, Content = [] } = yield call(queryProductionDocumentList);
            if (messageHandler(Message)({
                success: false,
                fail: '查询失败',
            })) {
                yield put({
                    type: 'updateIntrodutionList',
                    payload: Content.Data,
                });
            }
            return Content.Data;
        },
    },

    reducers: {
        updateHomeBannerList(state, { payload }) {
            return {
                ...state,
                homeBannerList: payload,
            };
        },
        updateIntrodutionList(state, { payload }) {
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
