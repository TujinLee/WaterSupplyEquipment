import gongpaishui from "@/assets/gongpaishui.png";
import hlgs from "@/assets/hlgs.jpg";
import jingshui from "@/assets/jingshui.png";
import leftArrow from '@/assets/leftArrow.png';
import rightArrow from '@/assets/rightArrow.png';
import shuibeng from "@/assets/shuibeng.png";
import tabInlineChoose from '@/assets/tabInlineChoose.png';
import wushuichuli from "@/assets/wushuichuli.png";
import { productBtnAndPath } from '@/common/enums';
import { historyPush, useMyDispatch } from '@/utils/utils';
import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useSelector } from 'umi';
import './index.less';

export default () => {
    // store state
    const { productionDocumentList = [] } = useSelector(state => state.home);
    // store action    
    const [queryLoading, queryProductionDocumentList] = useMyDispatch('home/queryProductionDocumentList');
    const [documentInfo, setDocumentInfo] = useState([]);
    const [curIndex, setCurIndex] = useState(0);
    useEffect(() => {
        queryProductionDocumentList();
    }, []);

    useEffect(() => {
        const tem = productionDocumentList.find(item => item.type == (curIndex + 1)) || {};
        if (Object.keys(tem).length) {
            const { feature } = tem;
            const featureList = Object.keys(JSON.parse(feature));
            setDocumentInfo(featureList);
        }
    }, [productionDocumentList.length, curIndex]);
    // console.log(documentInfo, curIndex);
    const sliderRef = useRef();
    const settings = {
        dots: false,
        lazyLoad: true,
        infinite: true,
        // speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplaySpeed: 5000,
        autoplay: true,
        arrows: false,
        afterChange: (index) => {
            setCurIndex(index);
        }

    };
    //跳转至
    const slickGoTo = (index) => {
        if (sliderRef && sliderRef.current) {
            sliderRef.current.slickGoTo(index);
        }
    }
    const slickPrev = () => {
        if (sliderRef && sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    }
    const slickNext = () => {
        if (sliderRef && sliderRef.current) {
            sliderRef.current.slickNext();
        }
    }
    const productBtn = ['供排水设备', '华立水泵', '污水处理设备', '原水净化设备', '数字化水务平台'];
    const bottomText = ['无负压供水设备', '潜水排污泵', '污水处理设备', '超纯水设备', 'H₂O platform'];

    return (
        <div className='bussinessWrap'>
            <div className="title">
                华立产品覆盖水务行业全流程业务
            </div>
            <div className='main'>
                <div className="tabBtnWrap">
                    {productBtn.map((item, index) =>
                        <div
                            className="tabBtn"
                            style={index == curIndex ? { backgroundImage: `url(${tabInlineChoose})`, color: '#0D193A' } : {}}
                            onClick={() => slickGoTo(index)}
                        >
                            {item}
                        </div>
                    )}
                </div>
                <img className="leftArrow" src={leftArrow} onClick={() => slickPrev()} />
                <div className="middleCircle">
                    <div className="middleText">
                        {productBtn[curIndex]}
                    </div>
                    <div className='feture leftFeature leftA'>
                        {curIndex !== 4 ? documentInfo[0] : `结合物联网、人脸识别等技术，对标准化泵房实行安全防护`}
                    </div>
                    <div className="routh routhLeftA"></div>
                    <div className='feture rightFeature rightA'>
                        {curIndex !== 4 ? documentInfo[1] : `搭载SCADA系统，对现场的运行设备进行实时监控和数据采集`}
                    </div>
                    <div className="routh routhRightA"></div>
                    <div className='feture leftFeature leftB'>
                        {curIndex !== 4 ? documentInfo[2] : `通过大数据平台系统，对数据进行分析和管理，优化能源消耗`}
                    </div>
                    <div className="routh routhLeftB"></div>
                    <div className='feture rightFeature rightB'>
                        {curIndex !== 4 ? documentInfo[3] : `内置传感器及监测装置，不断优化，实现高水平的智能化控制`}
                    </div>
                    <div className="routh routhRightB"></div>
                </div>
                <img className="rightArrow" src={rightArrow} onClick={() => slickNext()} />
                <div className="imgContent" onClick={() => { historyPush(productBtnAndPath[curIndex].path) }}>
                    <Slider {...settings} ref={sliderRef}>
                        <div className="imgOut">
                            <img className="img1" src={gongpaishui} />
                        </div>
                        <div className="imgOut">
                            <img className="img1" src={shuibeng} />
                        </div>
                        <div className="imgOut">
                            <img className="img1" src={wushuichuli} />
                        </div>
                        <div className="imgOut">
                            <img className="img1" src={jingshui} />
                        </div>
                        <div className="imgOut">
                            <img className="img1" style={{ top: 105, height: '60%' }} src={hlgs} />
                        </div>
                    </Slider>
                </div>
                <div className="viewMore">
                    <div className='productName'>{bottomText[curIndex] || `无负压供水设备`}</div>
                    <div className='link'>(点击图片查看详情)</div>
                </div>
            </div>
        </div>
    )
}