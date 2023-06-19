import classNames from 'classnames';
import React, { ReactNode } from 'react';
import styles from './index.less';


interface BandProps {
    imgSrc: string;
    children: ReactNode;
    className?: string | undefined;
    style?: object | undefined;
}

export default (props: BandProps) => {
    const { imgSrc, children, className, style } = props;
    return (
        <div className={classNames(styles.band, className)} style={style}>
            <img src={imgSrc} className={styles.img} alt="图片" />
            <div className={styles.text}>
                {children}
            </div>
        </div>
    )
}