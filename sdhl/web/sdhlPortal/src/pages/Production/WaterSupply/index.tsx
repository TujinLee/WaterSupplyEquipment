//供排水设备
import { webApi } from '@/common/constants';
import HeadButton from '@/components/HeadButton';
import ProductCard from '@/components/ProductCard';
import ViewButton from '@/components/ViewButton';
import { handleParams } from '@/utils/utils';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { history, useSelector } from 'umi';
import './index.less';

const { Content, Footer } = ProductCard;

const WaterSupply: React.FC<{}> = () => {
    const { productionList = [] } = useSelector(state => state.product);
    const showList = productionList.filter((item: { type: string; }) => item.type == '供排水设备');
    const [seriesList, setSeriesList] = useState([]); //去重，系列名称
    const [selectSeries, setSelectSeries] = useState('');//选中的系列名称    
    const [modelList, setModelList] = useState([]); //去重，型号名称
    const [selectModel, setSelectModel] = useState('');//选中的型号名称   

    const [moreModelOfSeries, setMoreModelOfSeries] = useState([]);
    const [oneModelOfSeries, setOneModelOfSeries] = useState([]);
    const [seriesModel, setSeriesModel] = useState({});
    const [seriesSelectModel, setSeriesSelectModel] = useState({});
    useEffect(() => {
        const serieslist = [...new Set(showList.map((item: { series: any; }) => item.series))];
        const modellist = [...new Set(showList.map((item: { model: any; }) => item.model))];
        // console.log('list', modellist, serieslist);
        setSeriesList(serieslist);
        // setModelList(modellist);
        // setSelectModel(modellist[0] || ''); //型号名称       
    }, [showList.length, JSON.stringify(showList)]);

    //初始化数据
    useEffect(() => {
        const tem = {};
        seriesList.forEach(item => {
            tem[item] = showList.filter(a => (a.series == item));
        });
        const finalShowList = Object.entries(tem);
        /* 一个系列多个型号 */
        const moreModelOfSeries = finalShowList.filter(each => each[1].length > 1);
        setMoreModelOfSeries(moreModelOfSeries);
        const seriesModel = {}; //{系列：型号}
        const seriesSelectModel = {};
        moreModelOfSeries.forEach(item => {
            const seriesName = item[0] || '';
            const seriesList = item[1] || [];
            seriesModel[seriesName] = [...new Set(seriesList.map((item: { model: any; }) => item.model))];
            seriesSelectModel[seriesName] = seriesModel[seriesName][0]; //默认选中第一个型号
        });
        setSeriesModel(seriesModel);
        setSeriesSelectModel(seriesSelectModel);
        /* 一个系列一个型号 */
        const oneModelOfSeries = finalShowList.filter(each => each[1].length == 1);
        setOneModelOfSeries(oneModelOfSeries);

    }, [JSON.stringify(seriesList)])
    return (
        <div className="waterSupply">
            {/* 一个系列多个型号 */}
            {moreModelOfSeries
                .map(a => {
                    const seriesName = a[0] || 'XX系列';
                    const list = a[1]; //
                    const showItem = list.find(item => item.model == seriesSelectModel[seriesName]) || {};
                    return (<>
                        <div className='equiment'>
                            <div className="name">{seriesName}</div>
                            <div className="list">
                                <div className="inner">
                                    {seriesModel[seriesName].map(b => (
                                        <div
                                            className={classnames({ "listChild": true, "listChildActive": b == seriesSelectModel[seriesName] })}
                                            onClick={() => setSeriesSelectModel({ ...seriesSelectModel, [seriesName]: b })}
                                        >
                                            <div className="textShow">
                                                {b}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {list.length > 0 ?
                            <ProductCard className="productCard">
                                <Content className="cardContent">
                                    <img src={`${webApi.api}${showItem.listimg}`} className="img" alt="图片" />
                                </Content>
                                <Footer className="cardFoot">
                                    <>
                                        <div className="title" title={showItem.model}>{showItem.model}</div>
                                        <div className="subTittle">{handleParams(showItem.params).map(p => (
                                            <div className="param">{`${p[0]}: ${p[1]}`}</div>
                                        ))}
                                        </div>
                                        <ViewButton className="detailBtn" onClick={() => history.push(`/production/detail?id=${showItem.id}&from=waterSupply`)}>查看详情</ViewButton>
                                    </>
                                </Footer>
                            </ProductCard>
                            : ''}
                    </>)
                })
            }
            {/* 一个系列一个型号          */}
            <div className="equimentList">
                {oneModelOfSeries
                    .map(a => {
                        const item = a[1][0];
                        return (<div className="eachWrap" key={item.id}>
                            <HeadButton className="headTitle">{item.series}</HeadButton>
                            <ProductCard className="each">
                                <Content className="cardContent">
                                    <img src={`${webApi.api}${item.listimg}`} className="img" alt="图片" />
                                </Content>
                                <Footer className="cardFoot">
                                    <>
                                        <div className="title textOverflow" title={item.model}>{item.model}</div>
                                        <div className="subTittle">{handleParams(item.params).map(p => (
                                            <div className="param">{`${p[0]}: ${p[1]}`}</div>
                                        ))}
                                        </div>
                                        <ViewButton className="detailBtn" onClick={() => history.push(`/production/detail?id=${item.id}&from=waterSupply`)}>查看详情</ViewButton>
                                    </>
                                </Footer>
                            </ProductCard>
                        </div>)
                    })}
            </div>
        </div>
    )
}

export default WaterSupply;