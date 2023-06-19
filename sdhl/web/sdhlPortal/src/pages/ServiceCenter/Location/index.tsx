import React from 'react';
import { Map, Marker } from 'react-amap';
import './index.less';
export default () => {
  return (
    <div className="welcome">
      <div className="firstTitle">华立热忱欢迎您来</div>
      <div className="secondTitle">
        洽谈合作、深度交流、指导业务
            </div>
      <div className='hualiLocation'>
        <Map amapkey='9266811a51859205cb7052159697dd03' zoom={5} center={{ longitude: 118.518402, latitude: 36.634507 }} >
          <Marker position={{ longitude: 118.523879, latitude: 36.641796 }} className="customize" >
            <img src='http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png' alt="定位" style={{ width: 40, height: 40 }} />
            <div className="card">
              <div className="title">山东华立供水设备有限公司</div>
              <div>
                公司地址：青州市昭德路与南环路交叉口西100米<br />
                办公室电话：0536-3162791 0536-3162792<br />
                售后服务：0536-3162790<br />
              </div>
            </div>
          </Marker>
        </Map>
      </div>
    </div>

  )
}
