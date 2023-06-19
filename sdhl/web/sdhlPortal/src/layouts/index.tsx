import React from 'react';

const BasicLayout = (props) => {
    const { children } = props;
    // console.log(props);
    return (
        <>
            {children}
        </>
    )
}

export default BasicLayout;