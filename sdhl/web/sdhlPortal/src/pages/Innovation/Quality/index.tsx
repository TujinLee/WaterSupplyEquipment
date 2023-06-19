import chuchang from '@/assets/chuchang.png';
import flowChart from '@/assets/flowChart.png';
import healthQuality from '@/assets/healthQuality.png';
import hege from '@/assets/hege.png';
import productionQuality from '@/assets/productionQuality.png';
import qualificationCircle from '@/assets/qualificationCircle.png';
import qualityControl from '@/assets/qualityControl.png';
import shengchan from '@/assets/shengchan.png';
import React from 'react';
import './index.less';

export default () => {
    return (
        <div className="quality">
            <div className="qualification">
                <div className="firstTitle">认证资质</div>
                <div className="secondTitle">质量是企业的生命，牢牢把握质量管理，生产高品质产品</div>
                <div className="company">
                    <div className="qualityControl">
                        <img src={qualityControl} alt="质量管理" style={{ width: '60%' }} />
                    </div>
                    <div className="imgGroups">
                        <div className="left">
                            <img src={productionQuality} alt="产品管理" style={{ height: '85%' }} />
                        </div>
                        <div className="middle">
                            <img src={qualificationCircle} alt="企业认证" />
                        </div>
                        <div className="right">
                            <img src={healthQuality} alt="健康管理" style={{ height: '85%' }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="control">
                <div className="firstTitle">品质管控</div>
                <div className="secondTitle">持之以恒地进行研发投入和团队建设，开发创新性产品，引领行业进步与变革</div>
                <div className="photos">
                    <div className="left">
                        <img src={flowChart} alt="流程图" />
                    </div>
                    <div className="right">
                        <img src={shengchan} alt="生产规范" />
                        <img src={hege} alt="合格测试" />
                        <img src={chuchang} alt="出厂" />
                    </div>
                </div>
            </div>
        </div>
    )
}