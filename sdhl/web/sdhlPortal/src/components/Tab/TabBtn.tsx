import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import React from 'react';
import styles from './TabBtn.less';

const TabBtn = (props: TabsProps) => {
    const { children } = props;
    return (
        <div className={styles.myTabs}>
            <Tabs tabPosition="top" {...props}>
                {children}
            </Tabs>
        </div>
    )
}

export default TabBtn;