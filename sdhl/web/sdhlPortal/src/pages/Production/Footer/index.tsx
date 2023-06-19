import React from 'react';
import './index.less';
export default (mianIitle = 'A', secondTitle = "B", bigStyle = {}, smallStyle = {}) => {
    return (
        <div className="footerWrap">
            <div className="customer">
                <div className="mianIitle" style={bigStyle}>{mianIitle}</div>
                <div className="secondTitle" style={smallStyle}>{secondTitle}</div>
            </div>
        </div>
    )
}