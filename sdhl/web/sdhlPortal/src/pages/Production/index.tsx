
import { TabBtn } from '@/components/Tab';
import LogoFooter from '@/pages/Home/HomeFooter/LogoFooter';
import TextFooter from '@/pages/Home/HomeFooter/TextFooter';
import HomeHeader from '@/pages/Home/HomeHeader';
import { useMyDispatch } from '@/utils/utils';
import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import Footer from './Footer';
import "./index.less";
import Purify from './Purify';
import Sewage from './Sewage';
import WaterAffairs from './WaterAffairs';
import WaterPump from './WaterPump';
import WaterSupply from './WaterSupply';

const { TabPane } = Tabs;
const tabList = [{
  key: '#WaterSupply',
  title: '供排水设备',
  value: <WaterSupply />,
}, {
  key: '#WaterPump',
  title: '华立水泵',
  value: <WaterPump />,
}, {
  key: '#Sewage',
  title: '污水处理设备',
  value: <Sewage />,
}, {
  key: '#Purify',
  title: '原水净化设备',
  value: <Purify />,
}, {
  key: '#WaterAffairs',
  title: '数字化水务平台',
  value: WaterAffairs(),
}]

export default (props: any) => {
  const { location } = props;
  const { hash } = location;
  const [tabkey, setTabKey] = useState('#WaterSupply');
  const [queryLoading, queryList] = useMyDispatch('product/queryProductionList');
  useEffect(() => {
    queryList({
      queryType: 2
    });
  }, [])
  useEffect(() => {
    if (hash) {
      setTabKey(hash);
    }
  }, [hash]);
  return (
    <div className="productionSwWarper">
      <div className="head">
        <HomeHeader />
        <span className="title">
          深耕水务行业13年
        </span>
        <span className="subTitle">
          产品涵盖水务业务全领域
        </span>
      </div>
      <div className="content">
        {/* <div className="listCircle">
          {tabList.map(item => (
            item.key == tabkey ? <div className="red">
              <img src={redcircle} />
            </div> : <div className="white">
                <img src={writecircle} />
              </div>
          ))}
        </div> */}
        <div className="tabBtn">
          <TabBtn onChange={(activeKey) => { setTabKey(activeKey); history.push(activeKey); }} activeKey={tabkey}>
            {tabList.map(item => (
              <TabPane tab={item.title} key={item.key}>
                {item.value}
              </TabPane>
            ))}
          </TabBtn>
        </div>
      </div>
      {Footer('持严谨态度  走精品路线', '华立凭借精湛的生产工艺、先进的技术水平、完善的服务体系，赢得客户信赖', { fontSize: '40px', marginBottom: '15px' }, { fontSize: '20px' })}
      <LogoFooter />
      <TextFooter />
    </div>
  );
}
