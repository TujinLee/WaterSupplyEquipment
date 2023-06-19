import { messageHandler } from '@/utils/utils';
import { queryProjectList } from './service';

const ProductModel = {
    namespace: 'projectCases',

    state: {
        projectList: [],  // 项目列表
    },

    effects: {
        *queryProjectList({ payload: { pageInfo } }, { call, put, }) {
            const { Message = {}, Content = [] } = yield call(queryProjectList, pageInfo);
            if (messageHandler(Message)({
                success: false,
                fail: '查询项目列表失败',
            })) {
                yield put({
                    type: 'updateProjectList',
                    payload: Content.Data,
                });
            }
        },
    },

    reducers: {
        updateProjectList(state, { payload }) {
            return {
                ...state,
                projectList: payload,
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
