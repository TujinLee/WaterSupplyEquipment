import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import React from 'react';
import styles from './CapsuleTab.less';

const CapsuleTab = (props: TabsProps) => {
    const { children } = props;
    return (
        <div className={styles.myTabs}>
            <Tabs tabPosition="top" {...props}>
                {children}
            </Tabs>
        </div>
    )
}

export default CapsuleTab;