import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';

interface Props {
    btnText?: string | undefined;
    loading?: boolean;
}

const UploadButton = (props: Props) => {
    const { btnText = '上传图片', loading = false } = props;
    return (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>{btnText}</div>
        </div>
    )
};

export default UploadButton;