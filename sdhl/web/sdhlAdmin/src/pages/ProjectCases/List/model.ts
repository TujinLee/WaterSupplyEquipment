import { messageHandler } from '@/utils/utils';
import { addOrUdateProjectInfo, copyProjectInfo, queryProjectList } from './service';

const ProductModel = {
    namespace: 'projectCases',

    state: {
        projectList: [],  // 项目列表
        pageInfo:{},//分页信息
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
                yield put({
                    type: 'updateProjectPage',
                    payload: Content.PageInfo,
                });
            }
        },
        *addOrUdateProjectInfo({ payload: { params } }, { call, put, }) {
            const { Message = {}, Content = [] } = yield call(addOrUdateProjectInfo, params);
            return messageHandler(Message)({
                success: '保存成功',
                fail: '保存失败',
            });
        },
        *copyProjectInfo({ payload: { params } }, { call, put, }) {
            const { Message = {}, Content = [] } = yield call(copyProjectInfo, params);
            return messageHandler(Message)({
                success: '复制成功',
                fail: '复制失败',
            });
        },
    },

    reducers: {
        updateProjectList(state, { payload }) {
            return {
                ...state,
                projectList: payload,
            };
        },
        updateProjectPage(state, { payload }) {
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

export default ProductModel;
