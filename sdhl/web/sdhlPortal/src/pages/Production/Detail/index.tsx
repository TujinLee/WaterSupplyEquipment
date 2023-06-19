import contactPhone from '@/assets/contactPhone.png';
import detailBorder from '@/assets/detailBorder.png';
import { webApi } from '@/common/constants';
import LogoFooter from '@/pages/Home/HomeFooter/LogoFooter';
import TextFooter from '@/pages/Home/HomeFooter/TextFooter';
import HomeHeader from '@/pages/Home/HomeHeader';
import { useMyDispatch } from '@/utils/utils';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'umi';
import PageFooter from '../Footer';
import './index.less';


const tabKey = [{
    key: '产品说明',
    value: '产品说明',
    anchor: '#a01',
}, {
    key: '产品特点',
    value: '产品特点',
    anchor: '#a02',
}, {
    key: '技术说明',
    value: '技术说明',
    anchor: '#a03',
}]

const tabKeyMore = [{
    key: '产品说明',
    value: '产品说明',
    anchor: '#a01',
}, {
    key: '产品特点',
    value: '产品特点',
    anchor: '#a02',
}, {
    key: '技术参数',
    value: '技术参数',
    anchor: '#a04',
}, {
    key: '技术说明',
    value: '技术说明',
    anchor: '#a03',
},
    // {
    //     key: '工程案例',
    //     value: '工程案例',
    //     anchor: '#a05',
    // }
]

export default (props) => {
    const { id, from } = props.history.location.query;
    console.log(from);
    const [featureList, setFeatureList] = useState([]);//产品特点
    const [paramsList, setParamsList] = useState([]);//产品参数   
    const [techimgList, setTechimgList] = useState([]);//技术说明图
    const [activeKey, setActiveKey] = useState('产品说明')
    const { productionInfo = {} } = useSelector(state => state.product);
    const [queryLoading, queryProductionInfo] = useMyDispatch('product/queryProductionInfo');
    useEffect(() => {
        queryProductionInfo({
            queryType: 2,
            productionId: id
        }).then((info) => {
            if (Object.keys(info).length) {
                const { feature, tecimg, params } = info;
                const list = Object.entries(JSON.parse(params));
                if (list.length % 2) { //奇数
                    list.push(['', ''])
                }
                setFeatureList(Object.entries(JSON.parse(feature)));
                setParamsList(list);
                setTechimgList(JSON.parse(tecimg) || []);
            }
        });
    }, []);
    const onScrollToDom = (id) => {
        location.href = id;
    }
    const fromWaterSupply = (from === 'waterSupply');
    return (
        <div className="productDetail">
            <div className="main">
                <div className="header">
                    <HomeHeader />
                    <div className="info">
                        <div className="left">
                            <img src={detailBorder} className="border" />
                            <img src={`${webApi.api}${productionInfo.topimg}`} className="showimg" alt="图片" />
                            <div className="textInfo">
                                <span className="text">60S人工响应</span>
                                <span className="text">30Min内给予技术回复</span>
                                <span className="text">24H免费提供方案</span>
                            </div>
                        </div>
                        <div className="right">
                            <div className="title">
                                {productionInfo.name || 'xx设备'}
                            </div>
                            <div className="subTittle">
                                {productionInfo.description}
                            </div>
                            <div className="feture">
                                {paramsList.slice(0, 3).map(item => (
                                    <div className="item">
                                        <div className="small">
                                            {item[0].toString()}
                                        </div>
                                        <div className="big">
                                            {item[1].toString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="field">{`应用领域：${productionInfo.field || '无'}`}</div>
                            <div className="contact">
                                <img src={contactPhone} alt="联系电话" />
                                <div className='right'>
                                    <div className="small">咨询电话</div>
                                    <div className="big">0536-3162791</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="middle">
                    <div className={fromWaterSupply ? 'mix' : 'mix2'}>
                        <div className="anchorButton">
                            {(from === "waterSupply" ? tabKeyMore : tabKey).map(item => (
                                <div
                                    className={classNames('item', { itemActive: item.key === activeKey })}
                                    onClick={() => { setActiveKey(item.key); onScrollToDom(item.anchor); }}
                                >
                                    {item.value}
                                </div>
                            ))}
                        </div>
                        <div className="fetureWrap">
                            <div className="title" style={{ marginTop: 0 }} id="a01">
                                产品说明
                            </div>
                            <div className="explain">
                                <div className="left">{productionInfo.explain}</div>
                                <div className="right">
                                    <div className="border">

                                    </div>
                                    <img src={`${webApi.api}${productionInfo.productionimg}`} alt="图片" />
                                </div>
                            </div>
                            <div className="title" id="a02">
                                产品特点
                            </div>
                            <div className="characteristic">
                                {featureList.map((item, index) => (
                                    <div className="item">
                                        <div className="no">{`0${index + 1}`}</div>
                                        <div className="head">
                                            {item[0].toString()}
                                        </div>
                                        <div className="content">
                                            {item[1].toString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* 供排水需要展示技术参数 */}
                            {fromWaterSupply && <>
                                <div className="title" id="a04" style={{ color: '#ffffff' }}>
                                    技术参数
                                </div>
                                <div className="argumentTable">
                                    {paramsList.length < 9 ? (
                                        <div className="argumentList" style={{ width: '68%' }}>
                                            <div className="item item1">参数名称</div>
                                            <div className="item item2">参数值</div>
                                            {paramsList.map(pa => (
                                                <>
                                                    <div className="item ">{pa[0]}</div>
                                                    <div className="item ">{pa[1]}</div>
                                                </>
                                            ))}
                                        </div>
                                    ) : (
                                            <>
                                                <div className="argumentList">
                                                    <div className="item item1">参数名称</div>
                                                    <div className="item item2">参数值</div>
                                                    {paramsList.slice(0, paramsList.length / 2).map(pa => (
                                                        <>
                                                            <div className="item ">{pa[0]}</div>
                                                            <div className="item ">{pa[1]}</div>
                                                        </>
                                                    ))}
                                                </div>
                                                <div className="argumentList">
                                                    <div className="item item1">参数名称</div>
                                                    <div className="item item2">参数值</div>
                                                    {paramsList.slice(paramsList.length / 2).map(pa => (
                                                        <>
                                                            <div className="item ">{pa[0]}</div>
                                                            <div className="item ">{pa[1]}</div>
                                                        </>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                </div>
                            </>}
                            <div className="title" id="a03" style={fromWaterSupply ? { marginTop: 240 } : {}}>
                                技术说明
                            </div>
                            <div className="techImg">
                                {techimgList.map(item => (
                                    <img className="eachimg" src={`${webApi.api}${item}`} alt="图片" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {PageFooter('持严谨态度  走精品路线', '华立凭借精湛的生产工艺、先进的技术水平、完善的服务体系，赢得客户信赖', { fontSize: '40px', marginBottom: '15px' }, { fontSize: '20px' })}
            <LogoFooter />
            <TextFooter />
        </div>
    )
}