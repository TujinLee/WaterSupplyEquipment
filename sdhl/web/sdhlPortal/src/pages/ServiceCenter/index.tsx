import { CapsuleTab } from '@/components/Tab';
import HomeHeader from '@/pages/Home/HomeHeader';
import Footer from '@/pages/Production/Footer';
import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import AfterSale from './AfterSale';
import Flow from './Flow';
import './index.less';
import System from './System';
const { TabPane } = Tabs;


export default (props: any) => {
    const { location } = props;
    const { hash } = location;
    const [tabkey, setTabKey] = useState('#System');
    useEffect(() => {
        if (hash) {
            setTabKey(hash);
        }
    }, [hash]);
    return (
        <div className="services">
            <div className="header">
                <HomeHeader />
                <div className="text">
                    <div className="title">服务成就口碑</div>
                    <div className="subTitle">
                        销售、技术和售后服务团队365天全天候为您提供涵盖“售前-售中-售后”的全流程专业服务，您的满意是我们坚定达成的目标与承诺
                    </div>
                </div>
            </div>
            <div className="main">
                <CapsuleTab animated onChange={(activeKey) => { setTabKey(activeKey); history.push(activeKey); }} activeKey={tabkey}>
                    <TabPane tab="服务体系" key="#System">
                        <System />
                    </TabPane>
                    <TabPane tab='服务流程' key='#Flow'>
                        <Flow />
                    </TabPane>
                    <TabPane tab='售后服务' key='#AfterSale'>
                        <AfterSale />
                    </TabPane>
                </CapsuleTab>
            </div>
            <div className="footer">
                {Footer('我们用一颗炽热的心，真诚服务每一位客户，为客户排忧解难，解决各种问题。', '时间记录了华立的品质，服务成就华立的口碑', { fontSize: '40px', marginBottom: '15px' }, { fontSize: '20px' })}
                <div className="address">
                    山东华立供水设备有限公司       总部地址：青州市昭德路与南环路交叉口西100米
                </div>
            </div>
        </div>
    )
}