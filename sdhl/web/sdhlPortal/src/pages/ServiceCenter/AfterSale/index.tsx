import redStar from '@/assets/redStar.png';
import saleSevenStar from '@/assets/saleSevenStar.png';
import shidapinpai from '@/assets/shidapinpai.png';
import shijiadanwei from '@/assets/shijiadanwei.png';
import React from 'react';
import Location from '../Location';
import './index.less';
export default () => {
    const lightList = [{
        title: '130+售后服务网点',
        text: '售后服务网点遍布全国各省市，全国7家分公司下设办事处130+，提供便捷快速的服务响应'
    }, {
        title: '30分钟的极速响应机制',
        text: '半小时响应，两小时达到现场'
    }, {
        title: '12个月的质保期',
        text: '质保期一年，期间每月一次巡检，出现质量问题，无偿修复或更换'
    }, {
        title: '质保期外一年2次免费巡检',
        text: '公司派技术专家每年2次兔费对设备进行全套功能的巡检，以便了解设备运营情况'
    }, {
        title: '软件终生免费升级',
        text: 'PLC控制系统终生免费升级'
    }, {
        title: '终生免费档案管理',
        text: '设备参数等档案终生免费管理'
    }, {
        title: '24h客服',
        text: '365天全年无休接受服务请求'
    }, {
        title: '免费技术培训',
        text: '定期免费为客户做维护、保养的培训工作'
    }, {
        title: '免费技术咨询',
        text: '技术专家热情提供相关技术咨询'
    }]
    return (
        <div className="saleWrap">
            <div className="aftersale">
                <div className="firstTitle">七星级售后保障</div>
                <div className="secondTitle">
                    华立搭建了专业的售后服务体系，<br />
                    诚实守信，精益求精，快速响应，立即执行，精准实施，让客户百分百满意
                </div>
                <div className="sevenStar">
                    <div className="topLeft">
                        <div className="title">
                            7星级售后服务认证
                    </div>
                        <div className="star">
                            <img src={redStar} alt="红星" />
                            <img src={redStar} alt="红星" />
                            <img src={redStar} alt="红星" />
                            <img src={redStar} alt="红星" />
                            <img src={redStar} alt="红星" />
                            <img src={redStar} alt="红星" />
                            <img src={redStar} alt="红星" />
                        </div>
                        <div className="text">
                            经 <span className="medium">全国商品售后服务评价达标认证评审委员</span> 和 <span className="medium">北京五洲天宇认证中心</span> 评审：<br /><br />
                            <span className="medium">山东华立供水设备有限公司符合</span><br />
                        CTEAS1001-2017《CTEAS售后服务体系完善程度认证评价规范》标准要求，具有完善的售后服务体系，综合评审达到<span className="medium">“七星级（卓越）”</span>。
                    </div>
                    </div>
                    <div className="topRight">
                        <img src={saleSevenStar} alt="七星售后" />
                    </div>
                    <div className="bottomLeft">
                        <div className="each">
                            <img src={shijiadanwei} alt="shijiadanwei" />
                        </div>
                        <div className="each">
                            <img src={shidapinpai} alt="shidapinpai" />
                        </div>
                    </div>
                    <div className="bottomRight">
                        <div>同时还被工商联手评为：</div>
                        <div className="medium">《全国售后服务行业十佳单位》</div>
                        <div className="medium">《全国客户满意行业十佳单位》</div>
                    </div>
                </div>
            </div>
            <div className="lightSpot">
                <div className="firstTitle">售后服务亮点</div>
                <div className="cardList">
                    {lightList.map((item, index) => (
                        <div className="card" key={index}>
                            <div className="title">{item.title}</div>
                            <div className="text">{item.text}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="techTrain">
                <div className="left">
                    <div className="title">
                        技术培训
                    </div>
                    <div className="text">
                        我公司提供免费技术培训，安装调试完毕后，在买方现场或卖方国内培训维修中心为买方操作人员进行不少于5天的技术培训，直至操作人员达到正常熟练使用该设备为止，主要的培训内容如下：
                    </div>
                    <div className="text" style={{ marginTop: '1em' }}>
                        <div>1）安装调试完成后，根据需要，在买方现场或者卖方国内培训维修中心，为买方相关人员进行操作、管理培训，直至其熟练掌握相关技能。</div>
                        <div>2）培训内容包括但不限于熟知设备功能、掌握操作步骤、了解应急预案，及进行简单故障处理等。</div>
                    </div>
                </div>
            </div>
            <Location />
        </div>
    )
}