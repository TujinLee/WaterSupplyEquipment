import cangku from '@/assets/cangku.png';
import downArrow from '@/assets/downArrow.png';
import hanjie from '@/assets/hanjie.png';
import jiguang from '@/assets/jiguang.png';
import tiaoshizhongxin from '@/assets/tiaoshizhongxin.png';
import hometec3 from '@/assets/zhengtuBg.jpg';
import zhizaozhongxin from '@/assets/zhizaozhongxin.png';
import Location from '@/pages/ServiceCenter/Location';
import { Utils } from '@/utils/utils';
import classNames from 'classnames';
import moment from 'moment';
import React, { useState } from 'react';
import './index.less';

const battle = [{
    year: '2008年',
    event: '2008年公司推出自主研发的具有“多变量模糊控制”专利技术的WHG系列-无负压供水设备，通过多恒压控制技术解决了节能和高峰期供水压力平衡问题，引领了二次供水行业的新方向'
}, {
    year: '2009年',
    event: '2009年推出“双路全变频”无负压供水设备，带动了行业双变频和全变频控制技术的推广应用，极大提高了供水安全性及稳定性'
}, {
    year: '2010年',
    event: '2010年成功研发“一体化带载调试平台”，大幅提高设备质量，缩短设备安装、调试时间；华立控制系统创新性的增加了远程监控功能，实时反馈用户用水安全及设备使用状态'
}, {
    year: '2012年',
    event: '2012年“高密封及高灵敏性”的负压补偿器问世，让负压控制技术上了一个新的台阶'
}, {
    year: '2013年',
    event: '2013年青州生产基地正式投产使用'
}, {
    year: '2014年',
    event: '2014年开发出“具有漏水检测功能的二次供水系统”，有效改善行业内长久以来能量损耗巨大、水源浪费严重的局面'
}, {
    year: '2015年',
    event: '2015年推出“全时节能型”无负压供水设备，对整个二次供水行业的节能做了新的定义。同年9月，成功设计承建日供水量超8万吨的加压泵站，利用一个月时间完成青岛两处单泵功率260KW的大型泵站建设'
}, {
    year: '2017年',
    event: '2017年对“全时节能型设备”做重大升级，再次引领行业节能发展方向'
}, {
    year: '2018年',
    event: '2018年华立平台技术帮助用户实现手机端对设备的远程监控，实时传输运行数据，及时了解设备运行状态，提升用户体验，保障供水安全'
}, {
    year: '2019年',
    event: '2019年获得多项发明专利，重新定义新时代节能、安全供水新标准'
}, {
    year: '2020年',
    event: '2020年华立在全国各省市增设办事处多达130+，搭建了庞大的营销服务网络和完善的售后服务体系'
}];

//margin-top: -220px;
export default () => {
    const [indexYear, setIndexYear] = useState<number>(0);
    const [isScroll, setIsScroll] = useState<boolean>(false);
    return (
        <div className="enterprise">
            <div className="company">
                <div className="text">
                    <div className="textDes">
                        <div className="scrollTxt" style={isScroll ? { marginTop: '-220px' } : { marginTop: '0px' }}>
                            山东华立供水设备有限公司创立于2008年，注册资金1.05亿元，占地7万多平，多年来深耕水务行业，是集方案设计、研发制造、产品销售、安装调试、售后服务于一体的高新技术企业。<br />
                            业务包括“水处理及供排水项目解决方案，硬件设备，技术服务，数字化水务管理云平台”。华立自主研发生产的硬件设备有供排水、水泵、污水处理、原水净化等四大类产品，年生产能力达5000多套。<br />
                            华立拥有数十项专利技术，获得山东省著名商标、IS09001国际质量体系认证、AAA级资信等级认证、质量管理体系认证等资质，及中国绿色节能环保品牌、全国诚信企业、全国给排水行业质量领军企业、全国科技创新示范单位等称号。参与编写了“国标管网叠压供水设备”，现正在与中国工程建设标准化协会共同主编“绿色建材评价标准”，同时是“中国制造业品牌建设标准”的主编起草单位。<br />
                            公司凭借强大的科研实力、精益求精的生产工艺、定制化的解决方案、完善的售后体系，确立了领先的行业地位，赢得了广大客户的认可和信赖。<br />
                        </div>
                    </div>
                    <img src={downArrow} onClick={() => setIsScroll(!isScroll)} className="img" alt="downArrow" style={isScroll ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' }} />
                </div>

            </div>
            {/* 生产制造能力 */}
            <div className="product">
                <div className="firstTitle">生产制造能力</div>
                <div className="card" style={{ marginTop: '4em' }}>
                    <div className="left">
                        <img src={jiguang} alt="jiguang" />
                        <div className="tag">全自动激光切割中心</div>
                    </div>
                    <div className="right">
                        <div className="text">
                            公司配套有现代化机械车间、电气车间、立体化大型仓储库、射线探伤、研发中心、整机检测中心、远程监控中心等先进设施，是集方案设计、研发制造、产品销售、安装调试、售后服务于一体的高新技术企业。公司拥有世界先进水平的自动化生产技术，实行严格的标准化、精细化、制度化管理，注重生产工艺的每一个细微环节，持续稳定的为客户提供品质卓越的系列产品。
                        </div>
                        <div className="textimg">
                            <img src={zhizaozhongxin} alt="zhizaozhongxin" />
                        </div>
                        <div className="tag">生产制造中心</div>
                    </div>
                </div>
                <div className="card" style={{ marginTop: '2em' }}>
                    <div className="left">
                        <img src={tiaoshizhongxin} alt="tiaoshizhongxin" />
                        <div className="tag"> 一体化带载调试中心</div>
                    </div>
                    <div className="right">
                        <div className="img">
                            <div className="each">
                                <img src={hanjie} alt="hanjie" />
                                <div className="tag tagred">全自动无尘机械焊接中心</div>
                            </div>
                            <div className="each">
                                <img src={cangku} alt="cangku" />
                                <div className="tag">立体化大型仓储库</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="twelveYears">
                <div className="firstTitle">{`${Utils.numberToChinese(moment().format('YYYY') - 2008)}年征途`}</div>
                <div className="secondTitle">我们始终不忘初心、专注推进与引领供水行业进步</div>
                <div className="content">
                    <img src={hometec3} className="img" />
                    <div className="text">
                        {battle[indexYear].event}
                    </div>
                    <div className="next" onClick={() => setIndexYear(indexYear === battle.length - 1 ? 0 : indexYear + 1)}>
                        下一程 >>
                    </div>
                    <div className="timeLine">
                        {battle.map((item, index) => <div onClick={() => setIndexYear(index)} className={classNames("item blue", { red: index === indexYear })}>
                            <div className={classNames('blueCenter', { redCenter: index === indexYear })}></div>
                            <div className="year">{item.year}</div>
                        </div>)}
                    </div>
                </div>
            </div>
            <Location />
        </div>
    )
}