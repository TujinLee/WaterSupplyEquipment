import { webApi } from '@/common/constants';
import { message } from 'antd';
import { parse } from 'querystring';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);


interface AsyncProps {
  type: string;
  dispatch?: Function
  loading?: {
    [propName: string]: any
  }
}

export const useMyDispatch = (props: AsyncProps | string) => {
  const dispatch = typeof props === 'object' && props.dispatch ? props.dispatch : useDispatch();
  const loading = typeof props === 'object' && props.loading
    ? props.loading.effects[props.type] || false
    : useSelector((state: any) => state.loading.effects[typeof props === 'object' ? props.type : props] || false);

  const asyncRequest: (payload: any) => Promise<unknown> = useCallback((payload) => {
    return dispatch({
      type: typeof props === 'object' ? props.type : props,
      payload,
    });
  }, [dispatch, typeof props === 'object' ? props.type : props]);

  return [loading, asyncRequest];
};


export const beforeUpload = (file) => {
  const isImage = file.type.includes('image');
  if (!isImage) {
    message.error('只能上传图片!');
  }
  return isImage;
}

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export const getBase64Promise = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

/**
 * @description 消息提示函数封装
 * @param {Object} Message 包含返回结果Code及提示内容Msg
 * @param {Object} msg 包含fail和success,若为false则不提示，否则提示
 */
export function messageHandler(Message) {
  if (!Message) {
    return false;
  }
  return function (msg = {
    success: '操作成功',
    fail: '操作失败',
  }) {
    const isSuccess = Message && Message.code === 0; // code为表示成功
    if (isSuccess) {
      if (msg.success) {
        message.success(msg.success);
      }
    } else if (msg.fail) {
      message.error(msg.fail);
    }
    return isSuccess;
  };
}

export const hasKeys = (obj: object) => Object.keys(obj).length > 0;

export function createUploadFile({ uid, name, relativeUrl }: { uid: string; name: string; relativeUrl: string }) {
  // this.uid: `${index}`,
  // name: 'image.png',
  // status: 'done',
  // url: `${webApi.api}
  this.uid = uid;
  this.name = name;
  this.url = `${webApi.api}${relativeUrl}`;
  this.response = {
    Content: {
      Data: [
        {
          fileURL: relativeUrl
        }
      ]
    },
    Message: {
      code: 0,
      msg: "upload success"
    }
  }
}

//从上传事件返回的数据绑定到Form上面
export const normFile = (e: any, callback?: Function | undefined) => {
  // console.log('Upload event:', e);
  if (Array.isArray(e)) {
    callback && callback(e);
    return e;
  } else {
    callback && callback((e && e.fileList) || []);
    return e && e.fileList;
  }
};