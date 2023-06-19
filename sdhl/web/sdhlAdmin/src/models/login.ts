import { fakeAccountLogin, loginAdmin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { stringify } from 'querystring';
import { Effect, history, Reducer } from 'umi';


export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
  userInfo: object;
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
    loginAdmin: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
    userInfo: {}
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      }
    },

    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
    //登录方法
    *loginAdmin({ payload: { params } }, { call, put, }) {
      const { Message = {}, Content = [] } = yield call(loginAdmin, params);
      if (Content.Data) {
        // message.success('登录成功');
        const userInfo = Array.isArray(Content.Data) ? Content.Data[0] : Content.Data; //包含账号，角色和部门 role 1 2 3   dept 1 2 3 4
        yield put({
          type: 'updateUserInfo',
          payload: userInfo,
        });
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
        //
        const { role, department } = userInfo;
        const authority = [];
        if (role == 1) { //超管
          authority.push('superAdmin');
        } else if (role == 2) { //高级管理员
          authority.push('admin');
        } else if (role == 3) { //管理员，需要加部门来判断
          switch (department) {
            case 1: //办公室
              // authority.push()
              break;
            case 2: //产品部
              authority.push('product');
              break;
            case 3: //市场部
              authority.push('project');
              break;
            case 4: //宣传部
              authority.push('news')
              break;
            default:
              break;
          }
        }
        console.log('authority', authority);
        setAuthority(authority);
        //根据权限跳转至相应的界面
        const { pathname } = window.location; //当前的路由
        let goToPath = '/home/banner';
        if (authority.includes('superAdmin') || authority.includes('admin')) {
          goToPath = pathname !== '/user/login' ? pathname : '/home/banner';
        } else {
          if (authority.includes('product')) { //产品
            goToPath = '/product/admin';
          } else if (authority.includes('project')) {
            goToPath = '/project/list';
          } else if (authority.includes('news')) {
            goToPath = '/news/list';
          }
        }
        history.replace({
          pathname: goToPath,
        });
      } else {
        message.error(Message.msg);
      }

      return Content.Data;
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    updateUserInfo(state, { payload }) {
      return {
        ...state,
        userInfo: payload,
      };
    },
  },
};

export default Model;
