import { Table } from 'antd';
import React from 'react';
import styles from './index.less';

const MyTable = (props) => {
    return (
        <div className={styles.myTable}>
            <Table {...props} />
        </div>
    )
}

export default MyTable;