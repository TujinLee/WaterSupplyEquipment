import { DeleteOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import React from 'react';
import styles from './index.less';

interface Props {
    width?: number | string;
    height?: number | string;
    src: string;
    onDelete?: Function;
    alt?: string | undefined;
}

const UploadImage: React.FC<Props> = (props) => {
    const { width = '100%', height = "100%", src, onDelete, alt = '图片' } = props;
    return (
        <div className={styles.uploadImg} onClick={(event) => { event.stopPropagation(); }}>
            <div className={styles.imgWrap}>
                <DeleteOutlined
                    onClick={(event) => { event.stopPropagation(); onDelete && onDelete(); }}
                    className={`${styles.icon} ${styles.transFadeOut} ${styles.iconFadeOut}`}
                    title='点击删除'
                />
                <Image
                    className={styles.img}
                    width={width}
                    src={src}
                    height={height}
                    alt={alt}
                    title='点击预览'
                />
            </div>
        </div>
    );
}
export default UploadImage;