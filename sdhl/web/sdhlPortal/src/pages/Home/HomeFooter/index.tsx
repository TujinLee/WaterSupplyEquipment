import Right from '@/assets/rightLink.png';
import { productBtnAndPath } from '@/common/enums';
import { historyPush } from '@/utils/utils';
import React from 'react';
import "./index.less";

export default () => {
  return (
    <div className="footerWarper">
      <div className="logo" />
      <div className="text">
        <div className="companyintroduce">
          <div className="title">
            山东华立供水设备有限公司
         </div>
          <div className="content">
            山东华立深耕水务行业十二年，业务涵盖供排水设备、水泵、污水处理设备、净水设备、数字化水务平台全领域,是集方案设计、研发制造、产品销售、安装调试、售后服务于一体的高新技术企业。<br />
            公司拥有世界先进水平的自动化生产技术，实行严格的标准化、精细化、制度化管理,注重生产工艺的每一个细微环节，持续稳定的为客户提供品质卓越的系列产品。
          </div>
          <div className="more" onClick={() => historyPush('/about')}>
            <span className="moreText">了解更多</span>
            <img src={Right} alt="右" />
          </div>
        </div>
        <div className="item">
          <div className="title">
            产品中心
          </div>
          {productBtnAndPath.map(item => (
            <div className="content" onClick={() => historyPush(item.path)}>
              {item.title}
            </div>
          ))}
        </div>
        <div className="middle">
          <div className="bigTitle" onClick={() => historyPush('/service')}>
            服务中心
          </div>
          <div className="bigTitle" onClick={() => historyPush('/projectCase')}>
            工程案例
          </div>
          <div className="bigTitle" onClick={() => historyPush('/innovation')}>
            研发创新
          </div>
          <div className="bigTitle" onClick={() => historyPush('/news')}>
            资讯中心
          </div>
          <div className="bigTitle" onClick={() => historyPush('/about')}>
            关于我们
          </div>
        </div>
        <div className="item">
          <div className="title">
            联系我们
          </div>
          <div className="content1">
            地址：青州市昭德路与南环路交叉口西100米
          </div>
          <div className="content1">
            电话：0536-3162791
          </div>
          <div className="content1">
            传真：0536-3162792
          </div>
          <div className="content1">
            售后服务：0536-3162790
          </div>
          <div className="content1">
            网址：www.sdhualigongshui.com
          </div>
        </div>
        <div className="qcodec">
          <div className="qcodeimg" />
          <div className="textS">
            扫描关注公众号
          </div>
        </div>
      </div>

      <div className="companyaddress">
        山东华立供水设备有限公司   总部地址：青州市昭德路与南环路交叉口西100米
      </div>
    </div>
  );
}
