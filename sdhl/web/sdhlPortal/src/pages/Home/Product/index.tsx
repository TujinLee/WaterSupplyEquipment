import homenewstest from '@/assets/homenewstest.png';
import { industryType } from '@/common/enums';
import { VerticalTab } from '@/components/Tab';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import styles from './index.less';
const { TabPane } = Tabs;

export default () => {
    const [tabkey, setTabKey] = useState('水厂泵站');
    const renderContent = (imgSrc, text, path) => {
        return (
            <div className={styles.des}>
                <div className={styles.middle}>
                    <img src={imgSrc || homenewstest} className={styles.img} alt='图片' />
                </div>
                <div className={styles.card}>
                    <div className={styles.title}>
                        {tabkey}
                    </div>
                    <div className={styles.moreText}>
                        {text || `山东华立产品深受商业楼宇客户的信任与喜爱，已与万达集团、绿地集团等多家商业地产巨头达成战略合作伙伴关系，服务了500+商业楼宇项目。`}
                    </div>
                    <div className={styles.viewMore} onClick={() => {
                        history.push(path)
                    }}>
                        <span>查看案例</span>
                        <ArrowRightOutlined />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className={styles.productWrap}>
            <div className={styles.titleWrap}>
                <div className={styles.title}>
                    华立产品广泛应用于七大行业
                </div>
            </div>
            <div className={styles.content}>
                <VerticalTab animated={false} onChange={(activeKey) => { setTabKey(activeKey); }}>
                    {industryType.map(item => (
                        <TabPane tab={
                            <div className={styles.tabkey}>
                                <img className={styles.img} src={item.value == tabkey ? item.imgChoose : item.img} />
                                <span>{item.label}</span>
                            </div>
                        } key={item.value} >
                            {renderContent(item.middleImg, item.text, item.path)}
                        </TabPane>
                    ))}
                </VerticalTab>
            </div>
        </div>
    )
}