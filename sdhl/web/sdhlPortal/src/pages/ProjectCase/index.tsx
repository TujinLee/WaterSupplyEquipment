import modalLeft from '@/assets/modalLeft.png';
import modalRight from '@/assets/modalRight.png';
import whiteStar from '@/assets/whiteStar.png';
import { webApi } from '@/common/constants';
import { industryType } from '@/common/enums';
import ProductCard from '@/components/ProductCard';
import { InlineTab } from '@/components/Tab';
import HomeHeader from '@/pages/Home/HomeHeader';
import HomeFooter from '@/pages/Production/Footer';
import { useMyDispatch } from '@/utils/utils';
import { CloseOutlined } from '@ant-design/icons';
import { Modal, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { history, useSelector } from 'umi';
import LogoFooter from '../Home/HomeFooter/LogoFooter';
import TextFooter from '../Home/HomeFooter/TextFooter';
import './index.less';
const { TabPane } = Tabs;
const { Content, Footer } = ProductCard;

const type = {
    '0': '普通项目',
    '1': '经典重大工程',
    '2': '高难度项目'
}

const industryMap = {
    '#shuichang': '水厂泵站',
    '#shangye': '商业楼宇',
    '#xiaoqu': '住宅公寓',
    '#luzheng': '路政',
    '#xuexiao': '学校',
    '#yiyuan': '医院',
    '#jundui': '部队'
}

export default (props: any) => {
    const { location } = props;
    const { hash } = location;
    const [tabkey, setTabKey] = useState('#shuichang');
    const [modalOpen, setModalOpen] = useState(false);
    const [queryLoading, queryList] = useMyDispatch('projectCases/queryProjectList');
    const { projectList = [] } = useSelector(state => state.projectCases);
    const [showList, setShowList] = useState([]);
    const [showType, setShowType] = useState(-1);
    const [showItemIndex, setShowItemIndex] = useState(0);
    useEffect(() => {
        queryList({
            pageInfo: {
                pageIndex: 1,
                pageSize: 1000,
            }
        });
    }, [])
    useEffect(() => {
        if (hash) {
            setTabKey(hash);
            setShowList(projectList.filter(item => item.industry == industryMap[hash]))
        }
    }, [hash, projectList.length]);
    const gernalProject = showList.filter(item => item.type == 0);//普通项目
    const classicProject = showList.filter(item => item.type == 1);//经典项目
    const hardProject = showList.filter(item => item.type == 2);//困难项目
    let showItemList = [{
        casename: '',
        area: '',
        city: '',
        equipment: ''
    }];
    switch (showType) {
        case 0:
            showItemList = gernalProject;
            break;
        case 1:
            showItemList = classicProject;
            break;
        case 2:
            showItemList = hardProject;
            break;
        default:
            break;
    }
    return (
        <div className="projectCase">
            <div className="header">
                <HomeHeader />
                <div className="title">服务客户超过<span className="red">3000</span>家  服务项目超过<span className="red">20000</span>个</div>
                <div className="title">用心服务客户 满意100% 合作永长久</div>
            </div>
            <div className="main">
                <InlineTab animated onChange={(activeKey) => { setTabKey(activeKey); history.push(activeKey); }} activeKey={tabkey}>
                    {industryType.map(item => (
                        <TabPane tab={
                            item.label
                        } key={item.key}>
                            {classicProject.length ?
                                <>
                                    <div className="title"><img className="star" src={whiteStar} />经典重大工程</div>
                                    <div className="eachWrap">
                                        {classicProject.map((item, index) => (
                                            <ProductCard className="each" key={item.id}>
                                                <Content className="cardContent">
                                                    <img src={`${webApi.api}${item.caseimg}`} className="img" alt="图片" onClick={() => {
                                                        setShowType(1);
                                                        setShowItemIndex(index);
                                                        setModalOpen(true);
                                                    }} />
                                                </Content>
                                                <Footer className="cardFoot">
                                                    <div className="text">{item.casename}</div>
                                                </Footer>
                                            </ProductCard>
                                        ))}
                                    </div>
                                </>
                                : ''}
                            {hardProject.length ?
                                <>
                                    <div className="title"><img className="star" src={whiteStar} />高难度项目</div>
                                    <div className="eachWrap">
                                        {hardProject.map((item, index) => (
                                            <ProductCard className="each" key={item.id}>
                                                <Content className="cardContent">
                                                    <img src={`${webApi.api}${item.caseimg}`} className="img" alt="图片" onClick={() => {
                                                        setShowType(2);
                                                        setShowItemIndex(index);
                                                        setModalOpen(true);
                                                    }} />
                                                </Content>
                                                <Footer className="cardFoot">
                                                    <div className="text">{item.casename}</div>
                                                </Footer>
                                            </ProductCard>
                                        ))}
                                    </div>
                                </>
                                : ''}
                            {gernalProject.length ?
                                <>
                                    <div className="title"><img className="star" src={whiteStar} />其他经典项目</div>
                                    <div className="eachWrap">
                                        {gernalProject.map((item, index) => (
                                            <ProductCard className="each" key={item.id}>
                                                <Content className="cardContent">
                                                    <img src={`${webApi.api}${item.caseimg}`} className="img" alt="图片" onClick={() => {
                                                        setShowType(0);
                                                        setShowItemIndex(index);
                                                        setModalOpen(true);
                                                    }} />
                                                </Content>
                                                <Footer className="cardFoot">
                                                    <div className="text">{item.casename}</div>
                                                </Footer>
                                            </ProductCard>
                                        ))}
                                    </div>
                                </>
                                : ''}
                        </TabPane>
                    ))}
                </InlineTab>
            </div>
            {HomeFooter('持严谨态度  走精品路线', '华立凭借精湛的生产工艺、先进的技术水平、完善的服务体系，赢得客户信赖', { fontSize: '40px', marginBottom: '15px' }, { fontSize: '20px' })}
            <LogoFooter />
            <TextFooter />
            {/* 弹窗 */}
            <Modal
                visible={modalOpen}
                onCancel={() => { setModalOpen(false); setShowType(-1); setShowItemIndex(0) }}
                footer={null}
                closeIcon={<div className="myIcon"><CloseOutlined style={{ fontSize: 40 }} /></div>}
                centered
                destroyOnClose
                getContainer={false}
            >
                <div className="topText">
                    {`${showItemList[showItemIndex] && showItemList[showItemIndex].casename}(${showItemIndex + 1}/${showItemList.length})` || `中关村万达广场(3/14)`}
                </div>
                <img src={`${webApi.api}${showItemList[showItemIndex] && showItemList[showItemIndex].caseimg}`} className="caseimg" />
                <img src={modalLeft} className="left" onClick={() => { setShowItemIndex(showItemIndex == 0 ? showItemList.length - 1 : showItemIndex - 1) }} />
                <img src={modalRight} className="right" onClick={() => { setShowItemIndex(showItemIndex == showItemList.length - 1 ? 0 : showItemIndex + 1) }} />
                <div className="bottomText">
                    <div>{`项目所在区域：${showItemList[showItemIndex] && showItemList[showItemIndex].area}`}</div>
                    <div>{`项目所在城市：${showItemList[showItemIndex] && showItemList[showItemIndex].city}`}</div>
                    <div>{`项目使用设备：${showItemList[showItemIndex] && showItemList[showItemIndex].equipment}`}</div>
                </div>
            </Modal>
        </div>
    )
}