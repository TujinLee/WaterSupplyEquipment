import classNames from 'classnames';
import React, { ReactNode } from 'react';
import './index.less';

interface props {
    children: ReactNode;
    className?: string | undefined;
    style?: object | undefined;
    onClick?: Function;
}

export default (props: props) => {
    const { children, className, style, ...rest } = props;
    return (
        <div className={classNames('anchorButton', className)} style={style}  {...rest}>
            {children}
        </div>
    )
}