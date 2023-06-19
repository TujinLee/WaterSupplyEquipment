import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import React from 'react';
import styles from './VerticalTab.less';

const VerticalTab = (props: TabsProps) => {
    const { children } = props;
    return (
        <div className={styles.myTabs}>
            <Tabs tabPosition="left" {...props}>
                {children}
            </Tabs>
        </div>
    )
}

export default VerticalTab;