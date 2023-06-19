import { messageHandler } from '@/utils/utils';
import { addOrUdateHomeBanner, queryHomeBannerList } from './service';

const ProductModel = {
    namespace: 'banner',

    state: {
        homeBannerList: [],  // 列表
    },

    effects: {
        *queryHomeBannerList(_, { call, put, }) {
            const { Message, Content = [] } = yield call(queryHomeBannerList);
            if (messageHandler(Message)({
                success: false,
                fail: '查询失败',
            })) {
                yield put({
                    type: 'updateHomeBannerList',
                    payload: Content.Data,
                });
            }
        },
        *addOrUdateHomeBanner({ payload: { params } }, { call, put, }) {
            const { Message, Content = [] } = yield call(addOrUdateHomeBanner, params);
            return messageHandler(Message)({
                success: '保存成功',
                fail: '保存失败',
            });
        },
    },

    reducers: {
        updateHomeBannerList(state, { payload }) {
            return {
                ...state,
                homeBannerList: payload,
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
