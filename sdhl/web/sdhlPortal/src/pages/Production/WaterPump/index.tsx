//水泵
import { webApi } from '@/common/constants';
import HeadButton from '@/components/HeadButton';
import ProductCard from '@/components/ProductCard';
import ViewButton from '@/components/ViewButton';
import { handleParams } from '@/utils/utils';
import React from 'react';
import { history, useSelector } from 'umi';
import './index.less';
const { Content, Footer } = ProductCard;

export default () => {
    const { productionList = [] } = useSelector(state => state.product);
    const showList = productionList.filter(item => item.type == '华立水泵');
    console.log(showList);
    return (
        <div className="waterPump">
            <div className="equimentList">
                {showList.map((item) => (
                    <div className="eachWrap" key={item.id}>
                        <HeadButton className="headTitle">{item.series}</HeadButton>
                        <ProductCard className="each">
                            <Content className="cardContent">
                                <img src={`${webApi.api}${item.listimg}`} className="img" alt="图片" />
                            </Content>
                            <Footer className="cardFoot">
                                <>
                                    <div className="title">{item.model}</div>
                                    <div className="subTittle">{handleParams(item.params).map(p => (
                                        <div className="param">{`${p[0]}: ${p[1]}`}</div>
                                    ))}</div>
                                    <ViewButton className="detailBtn" onClick={() => history.push(`/production/detail?id=${item.id}`)}>查看详情</ViewButton>
                                </>
                            </Footer>
                        </ProductCard>
                    </div>
                ))}
            </div>
        </div>
    )
}