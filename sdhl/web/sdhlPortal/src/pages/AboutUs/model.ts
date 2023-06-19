import { messageHandler } from '@/utils/utils';
import { queryRecruitmentInfo, queryRecruitmentList } from './service';

const ProductModel = {
    namespace: 'recruit',

    state: {
        recruitList: [],  // 列表
        recruitInfo: {},  // 信息
    },

    effects: {
        *queryRecruitmentList(_, { call, put, }) {
            const { Message, Content = [] } = yield call(queryRecruitmentList);
            if (messageHandler(Message)({
                success: false,
                fail: '查询招聘列表失败',
            })) {
                yield put({
                    type: 'updateList',
                    payload: Content.Data,
                });
            }
        },
        *queryRecruitmentInfo({ payload: { recruitmentId } }, { call, put, }) {
            const { Message, Content = [] } = yield call(queryRecruitmentInfo, recruitmentId);
            if (messageHandler(Message)({
                success: false,
                fail: false,
            })) {
                yield put({
                    type: 'updateInfo',
                    payload: Content.Data,
                });
            }
        },
    },

    reducers: {
        updateList(state, { payload }) {
            return {
                ...state,
                recruitList: payload,
            };
        },
        updateInfo(state, { payload }) {
            return {
                ...state,
                recruitInfo: payload,
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
