// import Quality from './Quality';
// import Tech from './Tech';
import bofang from '@/assets/bofang.png';
import zucheng from '@/assets/zucheng.png';
import { CapsuleTab } from '@/components/Tab';
import HomeHeader from '@/pages/Home/HomeHeader';
import PageFooter from '@/pages/Production/Footer';
import { historyPush } from '@/utils/utils';
import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import Enterprise from './Enterprise';
import './index.less';
import Talents from './Talents';
const { TabPane } = Tabs;


export default (props: any) => {
    const { location } = props;
    const { hash } = location;
    const [tabkey, setTabKey] = useState('#Enterprise');
    useEffect(() => {
        if (hash) {
            setTabKey(hash);
        }
    }, [hash]);
    return (
        <div className="about">
            <div className="header">
                <HomeHeader />
                <img src={bofang} className="titlewrap" onClick={() => window.open('https://2040m3fmj.720think.com/t/2040m3fmj', "_blank")} />
                <img src={zucheng} className="imgWrap" alt="zucheng" />
            </div>
            <div className="main">
                <CapsuleTab animated onChange={(activeKey) => { setTabKey(activeKey); historyPush(activeKey); }} activeKey={tabkey}>
                    <TabPane tab="企业风采" key="#Enterprise">
                        <Enterprise />
                    </TabPane>
                    <TabPane tab='人才中心' key='#Talents'>
                        <Talents />
                    </TabPane>
                </CapsuleTab>
            </div>
            <div className="footer">
                {PageFooter('坚定创新 引领变革', '用创新为用户带来更好的服务与体验', { fontSize: 40, marginBottom: 15 }, { fontSize: 20 })}
                <div className="address">
                    山东华立供水设备有限公司       总部地址：青州市昭德路与南环路交叉口西100米
                </div>
            </div>
        </div>
    )
}