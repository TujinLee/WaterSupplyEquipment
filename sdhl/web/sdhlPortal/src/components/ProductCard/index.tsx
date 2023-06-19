import classNames from 'classnames';
import React, { ReactNode } from 'react';
import styles from './index.less';


interface props {
    children: ReactNode;
    className?: string | undefined;
    style?: object | undefined;
}

const Content = (props: props) => {
    const { children, className, style } = props;
    return (
        <div className={classNames(styles.content, className)} style={style}>
            {children}
        </div>
    )
}

const Footer = (props: props) => {
    const { children, className, style } = props;
    return (
        <div className={classNames(styles.footer, className)} style={style}>
            {children}
        </div>
    )
}
const DisplayCard = (props: props) => {
    const { children, className, style } = props;
    return (
        <div className={classNames(className, styles.displayCard)} style={style}>
            {children}
        </div>
    )
}

DisplayCard.Content = Content;
DisplayCard.Footer = Footer;

export default DisplayCard;