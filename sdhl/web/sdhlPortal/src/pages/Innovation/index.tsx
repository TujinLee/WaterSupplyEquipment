import { CapsuleTab } from '@/components/Tab';
import HomeHeader from '@/pages/Home/HomeHeader';
import Footer from '@/pages/Production/Footer';
import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import './index.less';
import Quality from './Quality';
import Tech from './Tech';

const { TabPane } = Tabs;


export default (props: any) => {
    const { location } = props;
    const { hash } = location;
    const [tabkey, setTabKey] = useState('#Tech');
    useEffect(() => {
        if (hash) {
            setTabKey(hash);
        }
    }, [hash]);
    return (
        <div className="innovation">
            <div className="header">
                <HomeHeader />
                <div className="titleWrap">
                    <div className="title">用户万分满意的产品</div>
                    <div className="subTitle">
                        源自 <span className="red">持续的科学投入</span>/<span className="red">不懈的技术研发</span>/<span className="red">严格的品质把控</span>
                    </div>
                </div>
            </div>
            <div className="main">
                <CapsuleTab animated onChange={(activeKey) => { setTabKey(activeKey); history.push(activeKey); }} activeKey={tabkey}>
                    <TabPane tab="研发创新" key="#Tech">
                        <Tech />
                    </TabPane>
                    <TabPane tab='品质管控' key='#Quality'>
                        <Quality />
                    </TabPane>
                </CapsuleTab>
            </div>
            <div className="footer">
                {Footer('坚定创新 引领变革', '用创新为用户带来更好的服务与体验', { fontSize: '40px', marginBottom: '15px' }, { fontSize: '20px' })}
                <div className="address">
                    山东华立供水设备有限公司       总部地址：青州市昭德路与南环路交叉口西100米
                </div>
            </div>
        </div>
    )
}