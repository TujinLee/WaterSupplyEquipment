/* eslint-disable react/react-in-jsx-scope */
import { webApi } from '@/common/constants';
import { imgSort } from '@/common/enums';
import UploadButton from '@/components/UploadButton';
import globalStyles from '@/global.less';
import { beforeUpload, createUploadFile, getBase64Promise, normFile, useMyDispatch } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import { useMount } from "ahooks";
import { Button, Divider, Form, Image, Input, Modal, Select, Spin, Table, Tabs, Upload } from 'antd';
import classnames from 'classnames';
import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'umi';
import styles from './index.less';


const { TabPane } = Tabs;
const { TextArea } = Input;

export default () => {
    //
    const [formOpen, setFormOpen] = useState(false);
    const [editInfo, setEditInfo] = useState(null);
    const [form] = Form.useForm();
    const [previewVisible, setPreviewVisible] = useState(false); //预览
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    // store state
    const { homeBannerList = [] } = useSelector(state => state.banner);
    // store action
    const [queryLoading, queryHomeBannerList] = useMyDispatch('banner/queryHomeBannerList');
    const [saveLoading, addOrUdateHomeBanner] = useMyDispatch('banner/addOrUdateHomeBanner');

    const allLoading = queryLoading || saveLoading;

    useMount(() => {
        queryHomeBannerList();
    })
    // 新增or更新
    const saveBannerInfo = (entity) => {
        console.log('提交', entity);
        addOrUdateHomeBanner({
            params: entity
        }).then((res) => {
            if (res) {
                queryHomeBannerList();
                setEditInfo(null);
                setFormOpen(false);
                form.resetFields();
            }
        });
    }

    const displayTable = () => {
        const columns = [
            {
                title: '#',
                dataIndex: 'id',
                key: 'id',
                width: 50,
            },
            {
                title: 'Banner图',
                dataIndex: 'img',
                key: 'img',
                width: 100,
                render: (text) => text ? <Image width={100} src={`${webApi.api}${text}`} /> : ''
            },
            {
                title: '文字',
                dataIndex: 'type',
                key: 'type',
                render: (text, record) => <>
                    <div>{record.mainheading}</div>
                    <div>{record.subheading}</div>
                </>
            },
            {
                title: '有无链接',
                dataIndex: 'link',
                key: 'link',
                width: 100,
                render: (text) => text ? '有' : '无'
            },
            {
                title: '发布时间',
                dataIndex: 'pubdate',
                key: 'pubdate',
                width: 180,
                render: (text) => moment(text).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                title: '排序',
                dataIndex: 'position',
                key: 'position',
                width: 80,
                render: (text) => `0${text}`,
            },
            {
                title: '操作',
                dataIndex: 'id',
                key: 'id',
                width: 120,
                render: (text, record) => {
                    const { unused, img, position } = record;
                    return (
                        <>
                            <div>
                                <a
                                    className={classnames(globalStyles.redlink)}
                                    onClick={() => {
                                        const editInfo = { ...record, position: `0${position}` };
                                        setEditInfo(editInfo);
                                        setFileList([{ //item为每个图片的相对路径
                                            uid: `${Math.random()}`,
                                            name: 'image.png',
                                            status: 'done',
                                            url: `${webApi.api}${img}`,
                                        }]);
                                        form.setFieldsValue({
                                            ...editInfo,
                                            img: [new createUploadFile({ uid: `${Math.random()}`, name: 'image.png', relativeUrl: `${img}`, })]
                                        })
                                        setFormOpen(true);
                                    }}>编辑</a>
                                {!unused && <>
                                    <Divider type="vertical" />
                                    <a className={classnames(globalStyles.graylink)}
                                        onClick={() => saveBannerInfo({ id: text, unused: 1 })}>删除</a>
                                </>}
                            </div>
                        </>
                    )
                }
            },
        ];
        return (
            <>
                <Table dataSource={homeBannerList} columns={columns} pagination={false} />
            </>
        );
    }

    const productForm = () => {
        //上传附件后的回调函数
        const uploadCallBack = (fileList: []) => {
            console.log('fileList', fileList);
            setFileList(fileList);
        }
        const handlePreview = async file => {
            if (!file.url && !file.preview) {
                file.preview = await getBase64Promise(file.originFileObj);
            }
            setPreviewImage(file.url || file.preview);
            setPreviewVisible(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        };
        return (
            <Modal
                visible={formOpen}
                title="添加Banner图"
                okText="保存"
                cancelText="取消"
                onCancel={() => { setFormOpen(false); form.resetFields(); }}
                wrapClassName="bannerform"
                confirmLoading={saveLoading}
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            // form.resetFields();
                            console.log(values);
                            const { img } = values;
                            let realImg = img[0].response.Content.Data[0].fileURL;
                            saveBannerInfo({ ...values, id: editInfo ? editInfo.id : undefined, img: realImg });
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="banner"
                    requiredMark={false}
                >
                    <Form.Item
                        style={{ flex: 1 }}
                        name="img"
                        rules={[{ required: true, message: '请上传图片' }]}
                        valuePropName="fileList"
                        getValueFromEvent={(e) => normFile(e, uploadCallBack)}
                    >
                        <Upload
                            name="image"
                            action={webApi.fileApi}
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            beforeUpload={beforeUpload}
                        >
                            {fileList.length >= 1 ? null : <UploadButton btnText="点击上传Banner图" />}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="图片排序"
                        name="position"
                        rules={[{ required: true, message: '请选择' }]}
                    >
                        <Select placeholder="请选择" allowClear>
                            {imgSort.map(item =>
                                <Select.Option value={item.value}>
                                    {item.label}
                                </Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="添加链接"
                        name="link"
                        rules={[{ required: false }]}
                    >
                        <Input placeholder="请输入点击banner图后跳转的链接" />
                    </Form.Item>
                    <Form.Item
                        label="配图主标题"
                        name="mainheading"
                        rules={[{ required: false, message: '请输入' }]}
                    >
                        <Input placeholder="请输入配图主标题（显示在图片上的文字）" />
                    </Form.Item>
                    <Form.Item
                        label="配图副标题"
                        name="subheading"
                        rules={[{ required: false, message: '请输入' }]}
                    >
                        <TextArea placeholder="请输入配图副标题（主标题下方的文字）"/>
                    </Form.Item>
                </Form>
            </Modal >
        )
    }
    return (
        <Spin spinning={allLoading}>
            <div className={styles.wrap}>
                <div className={styles.title}>Banner图</div>
                <Tabs defaultActiveKey="1" tabBarExtraContent={<Button type='primary' onClick={() => setFormOpen(true)}><PlusOutlined />banner图</Button>}>
                    <TabPane tab="Banner图" key="1">
                        <div className={styles.table}>{displayTable()}</div>
                    </TabPane>
                </Tabs>
                <>{productForm()}</>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={() => setPreviewVisible(false)}
                >
                    <img alt="图片" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        </Spin>
    );
};
