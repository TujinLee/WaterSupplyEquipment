import { message } from 'antd';
import { parse } from 'querystring';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { history as umiHistory } from 'umi';

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

//判断是否为空对象
export const hasKeys = (obj: object) => Object.keys(obj).length > 0;

//"{"泵站流量":"259m³/h-86400m³/h","有效容积":"0.4m³-128.6m³"}"
export function handleParams(params:string,nums=2){
  const parseParams = JSON.parse(params);
  return Object.entries(parseParams).slice(0,nums)
}

export function historyPush(path){
  window.scrollTo(0,0);
  return umiHistory.push(path);
}

export function isMobile(){
	if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
	)return true;
	return false;
}

/**
 * 人性化时间处理 传入时间戳
 */
export function beautify_time(dateTime){  
  const dateTimeStamp = new Date(dateTime).getTime();
  let minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
  let hour = minute * 60;
  let day = hour * 24;
  let week = day * 7;
  let halfamonth = day * 15;
  let month = day * 30;
  let now = new Date().getTime();   //获取当前时间毫秒
  // console.log(now)
  let diffValue = now - dateTimeStamp;//时间差

  if(diffValue < 0){
      return;
  }
  let minC = diffValue/minute;  //计算时间差的分，时，天，周，月
  let hourC = diffValue/hour;
  let dayC = diffValue/day;
  let weekC = diffValue/week;
  let monthC = diffValue/month;
  let result = '刚刚';
  if(monthC >= 1 && monthC <= 3){
      result = " " + parseInt(monthC) + "月前"
  }else if(weekC >= 1 && weekC <= 3){
      result = " " + parseInt(weekC) + "周前"
  }else if(dayC >= 1 && dayC <= 6){
      result = " " + parseInt(dayC) + "天前"
  }else if(hourC >= 1 && hourC <= 23){
      result = " " + parseInt(hourC) + "小时前"
  }else if(minC >= 1 && minC <= 59){
      result =" " + parseInt(minC) + "分钟前"
  }else if(diffValue >= 0 && diffValue <= minute){
      result = "刚刚"
  }else {
      let datetime = new Date();
      datetime.setTime(dateTimeStamp);
      let Nyear = datetime.getFullYear();
      let Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
      let Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
      let Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
      let Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
      let Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
      result = Nyear + "-" + Nmonth + "-" + Ndate
  }
  return result;
}

/*
     工具包
*/
export const Utils={
  /*
      单位
  */
  units: '个十百千万@#%亿^&~' ,
  /*
      字符
  */
  chars: '零一二三四五六七八九' ,
  /*
      数字转中文
      @number {Integer} 形如123的数字
      @return {String} 返回转换成的形如 一百二十三 的字符串            
  */
  numberToChinese: function (number){
      var  a=(number+ '' ).split( '' ),s=[],t= this ;
      if (a.length>12){
          throw  new  Error( 'too big' );
      } else {
          for ( var  i=0,j=a.length-1;i<=j;i++){
              if (j==1||j==5||j==9){ //两位数 处理特殊的 1*
                  if (i==0){
                      if (a[i]!= '1' )s.push(t.chars.charAt(a[i]));
                  } else {
                      s.push(t.chars.charAt(a[i]));
                  }
              } else {
                  s.push(t.chars.charAt(a[i]));
              }
              if (i!=j){
                  s.push(t.units.charAt(j-i));
              }
          }
      }
      //return s;
      return  s.join( '' ).replace(/零([十百千万亿@ #%^&~])/g,function(m,d,b){//优先处理 零百 零千 等
          b=t.units.indexOf(d);
          if (b!=-1){
              if (d== '亿' ) return  d;
              if (d== '万' ) return  d;
              if (a[j-b]== '0' ) return  '零'
          }
          return  '' ;
      }).replace(/零+/g, '零' ).replace(/零([万亿])/g, function (m,b){ // 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
          return  b;
      }).replace(/亿[万千百]/g, '亿' ).replace(/[零]$/, '' ).replace(/[@ #%^&~]/g,function(m){
          return  { '@' : '十' , '#' : '百' , '%' : '千' , '^' : '十' , '&' : '百' , '~' : '千' }[m];
      }).replace(/([亿万])([一-九])/g, function (m,d,b,c){
          c=t.units.indexOf(d);
          if (c!=-1){
              if (a[j-c]== '0' ) return  d+ '零' +b
          }
          return  m;
      });
  }
};