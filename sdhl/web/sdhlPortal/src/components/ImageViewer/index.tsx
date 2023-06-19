import { CloseOutlined } from "@ant-design/icons";
import { Modal } from 'antd';
import React, { useState } from "react";
import './index.less';

interface Props {
    src: string;
    alt?: string;
    className?: string;
    style?: React.CSSProperties;
}
export default (props: Props) => {
    const { src, alt = "图片", className, style } = props;
    const [showImg, setShowImg] = useState<boolean>(false);
    return (
        <>
            <img src={src} alt={alt} className={className} style={style} onClick={() => setShowImg(true)} />
            {showImg ?
                <Modal
                    visible={showImg}
                    onCancel={() => { setShowImg(false); }}
                    footer={null}
                    closeIcon={<div className="myIcon"><CloseOutlined style={{ fontSize: 40 }} /></div>}
                    centered
                    destroyOnClose
                    getContainer={false}
                >
                    <img src={src} className="caseimg" />
                </Modal>
                : ''}
        </>
    )
}