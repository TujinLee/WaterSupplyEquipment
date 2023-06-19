import { messageHandler } from '@/utils/utils';
import { addOrUdateUserInfo, queryAdminList } from './service';

const ProductModel = {
    namespace: 'authority',

    state: {
        userList: [],  // 管理列表
    },

    effects: {
        *queryAdminList({ payload: { userInfo } }, { call, put, }) {
            const { Message, Content = [] } = yield call(queryAdminList, userInfo);
            if (messageHandler(Message)({
                success: false,
                fail: '查询管理员列表失败',
            })) {
                yield put({
                    type: 'updateList',
                    payload: Content.Data,
                });
            }
        },
        *addOrUdateUserInfo({ payload: { params } }, { call, put, }) {
            const { Message } = yield call(addOrUdateUserInfo, params);
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
                userList: payload,
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
