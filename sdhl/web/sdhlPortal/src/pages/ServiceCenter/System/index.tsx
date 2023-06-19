import fuwujingshen from '@/assets/fuwujingshen.png';
import fuwukouhao from '@/assets/fuwukouhao.png';
import fuwulinian from '@/assets/fuwulinian.png';
import fuwuyaoqiu from '@/assets/fuwuyaoqiu.png';
// import fuwuzongzhi from '@/assets/fuwuzongzhi.png';
import teamPhotos from '@/assets/teamPhotos.png';
import React from 'react';
import Location from '../Location';
import './index.less';

export default () => {
    return (
        <div className="system">
            {/* 服务内核 */}
            <div className="connotation">
                <div className="firstTitle">服务内涵</div>
                <div className="secondTitle">
                    华立始终坚持精品和长久之路，<br />
                是一家视质量为生命、视客户为伙伴、视服务为价值的最佳合作企业
                </div>
                <div className="photoList">
                    <div className="card">
                        <img src={fuwulinian} alt="服务理念" />
                        <div className="redTitle">
                            服务理念
                        </div>
                        <div className="title">
                            客户至上，诚实经营
                        </div>
                    </div>
                    {/* <div className="card">
                        <img src={fuwuzongzhi} alt="服务宗旨" />
                        <div className="redTitle">
                            服务宗旨
                        </div>
                        <div className="title">
                            为客户创造价值
                        </div>
                    </div> */}
                    <div className="card">
                        <img src={fuwukouhao} alt="服务口号" />
                        <div className="redTitle">
                            服务口号
                        </div>
                        <div className="title">
                            快速反应，精益求精
                        </div>
                    </div>
                    <div className="card">
                        <img src={fuwujingshen} alt="服务精神" />
                        <div className="redTitle">
                            服务精神
                        </div>
                        <div className="title">
                            热情专注，严谨踏实
                        </div>
                    </div>
                    <div className="card">
                        <img src={fuwuyaoqiu} alt="服务要求" />
                        <div className="redTitle">
                            服务要求
                        </div>
                        <div className="title">
                            让客户百分百满意
                        </div>
                    </div>
                </div>
            </div>
            {/* 销售服务网络 */}
            <div className="saleService">
                <div className="firstTitle">销售服务网络</div>
                <div className="secondTitle">华立服务网点遍布全国20多个省、市、自治区，百余名精通产品、经验丰富的工程师整装待发，随时为您提供专业的售前售后服务。</div>
            </div>
            {/* 技术团队 */}
            <div className="techTeam">
                <div className="firstTitle">精湛的技术专家服务团队</div>
                <div className="secondTitle">
                    高素质、专业化的服务团队，标准化的服务流程，多样化的服务途径，完善的客户回访管理机制，全面、系统的培训体系，
                    为广大客户提供全面的技术支持，确保客户所有项目都能长久平稳运行
                </div>
                <img className="img" src={teamPhotos} alt="合照" />
            </div>
            {/* 欢迎 */}
            <Location />
        </div>
    )
}