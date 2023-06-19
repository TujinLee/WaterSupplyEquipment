import months12 from '@/assets/12months.png';
import anzhuang from '@/assets/anzhuang.png';
import chejian from '@/assets/chejian.png';
import diaozhuang from '@/assets/diaozhuang.png';
import fangan from '@/assets/fangan.png';
import gongshui from '@/assets/gongshui.png';
import hour24 from '@/assets/hour24.png';
import kancha from '@/assets/kancha.png';
import peisong from '@/assets/peisong.png';
import queren from '@/assets/queren.png';
import response from '@/assets/response.png';
import shidi from '@/assets/shidi.png';
import shouhou from '@/assets/shouhou.png';
import teamPhotos from '@/assets/teamPhotos.png';
import wancheng from '@/assets/wancheng.png';
import yunshu from '@/assets/yunshu.png';
import React from 'react';
import { history } from 'umi';
import './index.less';




export default () => {
    return (
        <div className="flow">
            {/* 服务内核 */}
            <div className="major">
                <div className="firstTitle">一站式贴心的专业化服务</div>
                <div className="secondTitle">
                    华立拥有完善的一站式服务，<br />
                    涵盖实地调研、方案设计、生产配送、安装调试、售后保障全流程
                </div>
                <div className="photoList">
                    <div className="card">
                        <img src={response} alt="response" />
                        <div className="redTitle">
                            <span className="big">30</span>
                            <span className="small">Min</span>
                        </div>
                        <div className="title">
                            30分钟内快速响应给予答复
                        </div>
                    </div>
                    <div className="card">
                        <img src={teamPhotos} alt="teamPhotos" />
                        <div className="redTitle">
                            <span className="big">365</span>
                            <span className="small">Day</span>
                        </div>
                        <div className="title">
                            365天全年无休接受服务请求
                        </div>
                    </div>
                    <div className="card">
                        <img src={months12} alt="months12" />
                        <div className="redTitle">
                            <span className="big">12</span>
                            <span className="small">Month</span>
                        </div>
                        <div className="title">
                            提供12个月质保服务
                        </div>
                    </div>
                    <div className="card">
                        <img src={hour24} alt="hour24" />
                        <div className="redTitle">
                            <span className="big">24</span>
                            <span className="small">Hour</span>
                        </div>
                        <div className="title">
                            24小时内到达现场
                        </div>
                    </div>
                </div>
            </div>
            <div className="major">
                <div className="firstTitle">完善细致的服务流程</div>
                <div className="secondTitle">
                    ——以中关村万达项目为例
                </div>
                <div className="projectList">
                    <div className="card">
                        <img src={chejian} alt="chejian" />
                        <div className="main">
                            <span className="icon">01</span>
                            <span className="text">达成意向</span>
                        </div>
                        <div className="btn">
                            项目合作意向初步达成
                        </div>
                    </div>
                    <div className="card">
                        <img src={shidi} alt="shidi" />
                        <div className="main">
                            <span className="icon">02</span>
                            <span className="text">实地调研</span>
                        </div>
                        <div className="btn">
                            售前工程师第一时间进行现场勘察，了解客户需求，确认具体参数
                        </div>
                    </div>
                    <div className="card">
                        <img src={fangan} alt="fangan" />
                        <div className="main">
                            <span className="icon">03</span>
                            <span className="text">制定方案</span>
                        </div>
                        <div className="btn">
                            技术部基于调研数据及客户需求，制定项目方案，设计标准化技术图纸
                        </div>
                    </div>
                    <div className="card">
                        <img src={peisong} alt="peisong" />
                        <div className="main">
                            <span className="icon">04</span>
                            <span className="text">生产配送</span>
                        </div>
                        <div className="btn">
                            根据设计方案生产所需设备，并在出厂前进行一体化带载调试，整机检测合格后交付，专车配送
                        </div>
                    </div>
                    <div className="card">
                        <img src={anzhuang} alt="anzhuang" />
                        <div className="main">
                            <span className="icon">05</span>
                            <span className="text">安装调试</span>
                        </div>
                        <div className="btn">
                            专车将设备配送至工程现场，由工程师指导安装、现场调试，实现稳定运行
                        </div>
                    </div>
                    <div className="card">
                        <img src={shouhou} alt="shouhou" />
                        <div className="main">
                            <span className="icon">06</span>
                            <span className="text">售后服务</span>
                        </div>
                        <div className="btn">
                            完善的售后网络体系为客户提供专业的售后保障，半小时响应，两小时内奔赴现场
                        </div>
                    </div>
                </div>
                <div className="firstTitle2">高效快速的项目响应体系</div>
                <div className="secondTitle">
                    ——以雷神山医院为例
                </div>
                <div className="projectList">
                    <div className="card">
                        <img src={queren} alt="queren" />
                        <div className="main">
                            <span className="icon">01</span>
                            <span className="text">需求确认</span>
                        </div>
                        <div className="btn">
                            华立在接到雷神山医院需紧急安装管道增压泵设备的通知后，驻武汉办事处全体员工迅速整装上岗
                        </div>
                    </div>
                    <div className="card">
                        <img src={kancha} alt="kancha" />
                        <div className="main">
                            <span className="icon">02</span>
                            <span className="text">实地勘察</span>
                        </div>
                        <div className="btn">
                            我司积极配合武汉水务集团及武昌供水部，进行实地勘察，当即制定项目计划，优化设计方案
                        </div>
                    </div>
                    <div className="card">
                        <img src={yunshu} alt="yunshu" />
                        <div className="main">
                            <span className="icon">03</span>
                            <span className="text">设备运输</span>
                        </div>
                        <div className="btn">
                            高效整合资源，日夜兼程，将设备运送至雷神山医院工程现场
                        </div>
                    </div>
                    <div className="card">
                        <img src={diaozhuang} alt="diaozhuang" />
                        <div className="main">
                            <span className="icon">04</span>
                            <span className="text">设备吊装</span>
                        </div>
                        <div className="btn">
                            售前工程师及增派技术人员昼夜施工，按照设计方案迅速吊装设备
                        </div>
                    </div>
                    <div className="card">
                        <img src={gongshui} alt="gongshui" />
                        <div className="main">
                            <span className="icon">05</span>
                            <span className="text">供水调试</span>
                        </div>
                        <div className="btn">
                            第一时间进行供水调试，保障设备稳定运行
                        </div>
                    </div>
                    <div className="card">
                        <img src={wancheng} alt="wancheng" />
                        <div className="main">
                            <span className="icon">06</span>
                            <span className="text">完成所托 </span>
                        </div>
                        <div className="btn">
                            顺利投入使用，提前完成供水保障任务，为医护人员和救治同胞连通了生命水脉
                        </div>
                    </div>
                </div>
                <div className="viewMore" onClick={() => history.push('/projectCase#shuichang')}>
                    点击查看更多工程案例
                </div>
            </div>
        </div>
    )
}