//原水净化设备

import hlgs from "@/assets/hlgs.jpg";
import { Col, Divider, Row } from 'antd';
import React from 'react';
import './index.less';
export default () => {
    return (
        <div className="waterAffairs">
            <Row className="content">
                <Col flex={4}></Col>
                <Col flex={2}>
                    <div className="introductionText">数字化水务平台</div>
                </Col>
                <Col flex={4}></Col>
            </Row>
            <Divider orientation="left" />
            <Row className="hlgsWrap">
                <img className="hlgs" src={hlgs} />
            </Row>
            <div className="foot">
                <div className="detail">
                    <span className="title">
                        Huali H2O Platform
                    </span>
                    <span className="subTitle">
                        聚焦基础设施和智能终端，基于工业互联网理念，通过云端、网络、应用、终端和边缘的一体化协同，连接水务应用和相关数据，实现实时监测、信息传输、数据分析、远程操控等功能，节水节能、提升水务运营质量和效率
                    </span>
                    <div className="swdetail" onClick={() => window.open('https://cloud.ecsiot.com/index/', '_blank')}>查看详情</div>
                </div>
            </div>
        </div>
    )
}