/* eslint-disable react/react-in-jsx-scope */
import { webApi } from '@/common/constants';
import { areaType, industryType } from '@/common/enums';
import UploadButton from '@/components/UploadButton';
import globalStyles from '@/global.less';
import { beforeUpload, createUploadFile, getBase64Promise, normFile, useMyDispatch } from '@/utils/utils';
import { useMount } from "ahooks";
import { Button, Divider, Form, Image, Input, Modal, Radio, Select, Spin, Table, Upload } from 'antd';
import classnames from 'classnames';
import React, { useState } from 'react';
import { useSelector } from 'umi';
import styles from './index.less';


const SelectOption = Select.Option;

export default () => {
    //
    const [formOpen, setFormOpen] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false); //预览
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [editInfo, setEditInfo] = useState(null);// 编辑实体
    const [form] = Form.useForm();
    const [queryLoading, queryList] = useMyDispatch('projectCases/queryProjectList');
    const [, queryProductionList] = useMyDispatch('product/queryProductionList');
    const [, addOrUdateProjectInfo] = useMyDispatch('projectCases/addOrUdateProjectInfo');
    const [copyLoading, copyProjectInfo] = useMyDispatch('projectCases/copyProjectInfo');
    // store state
    const { projectList = [], pageInfo = {} } = useSelector(state => state.projectCases);
    const { productionList = [] } = useSelector(state => state.product);
    const productionSeries = productionList.map(item => item.series); // 产品系列
    const [pageIndex, setPageIndex] = useState(1);// 分页信息

    useMount(() => {
        queryList({
            pageInfo: {
                pageIndex:pageIndex,
                pageSize: 20,
            }
        });
        queryProductionList({
            queryType: 1,
        })
    })

    const changeProjectInfo = (entity) => {
        console.log('提交', entity);
        addOrUdateProjectInfo({
            params: entity
        }).then((res) => {
            if (res) {
                setFormOpen(false);
                queryList({
                    pageInfo: {
                        pageIndex: pageIndex,
                        pageSize: 20,
                    }
                });
                form.resetFields();
            }
        })
    }

    // 编辑详情
    const editDetail = (info) => {
        const { caseimg, equipment } = info;
        if (equipment) {
            // info.equipment = equipment.split(';');
            info.equipment = equipment;
        } else {
            //info.equipment = [];
            info.equipment = ""
        }
        setEditInfo(info);
        setFileList([{ //item为每个图片的相对路径
            uid: `${Math.random()}`,
            name: '工程案例图',
            status: 'done',
            url: `${webApi.api}${caseimg}`,
        }]);
        form.setFieldsValue({
            ...info,

            caseimg: [new createUploadFile({ uid: `${Math.random()}`, name: 'image.png', relativeUrl: `${caseimg}`, })]
        })
        setFormOpen(true);
    }

    const onPageChange = (pagination, filtersArg, sorter) => {
        console.log("onPageChange:", pagination);
        setPageIndex(pagination.current);
        queryList({
            pageInfo: {
                pageIndex: pagination.current || 1,
                pageSize: 20,
            }

        });
        queryProductionList({
            queryType: 1,
        })

    }


    const displayTable = () => {
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id',
                width: 80,
            },
            {
                title: '案例名称',
                dataIndex: 'casename',
                key: 'casename',
            },
            {
                title: '案例图片',
                dataIndex: 'caseimg',
                key: 'caseimg',
                render: (text) => text ? <Image width={100} src={`${webApi.api}${text}`} /> : ''
            },
            // {
            //     title: '客户名称',
            //     dataIndex: 'customername',
            //     key: 'customername',
            // },
            {
                title: '区域属性',
                dataIndex: 'area',
                key: 'area',
                width: 100,
                render: (text, record) => `${text}-${record.city}`
            },
            {
                title: '行业属性',
                dataIndex: 'industry',
                key: 'industry',
                width: 100,
            },
            {
                title: '使用主要设备',
                dataIndex: 'equipment',
                key: 'equipment',
            },
            {
                title: '操作',
                dataIndex: 'show',
                key: 'show',
                width: 180,
                render: (text, record) => {
                    return (
                        <>
                            <div style={{ textAlign: 'center' }}>
                                <a
                                    className={classnames(globalStyles.redlink)}
                                    onClick={() => {
                                        editDetail(record);
                                    }}>编辑详情</a>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <a
                                    className={classnames(globalStyles.graylink)}
                                    onClick={() => copyProjectInfo({ params: { id: record.id } }).then(() => {
                                        queryList({
                                            pageInfo: {
                                                pageIndex: 1,
                                                pageSize: 20,
                                            }
                                        })
                                    })}>复制该条</a>
                                <Divider type="vertical" />
                                <a
                                    className={classnames(text ? globalStyles.graylink : globalStyles.bluelink)}
                                    onClick={() => changeProjectInfo({ ...record, show: text ? 0 : 1 })}>{`${text ? '停止' : '开启'}展示`}</a>
                                <Divider type="vertical" />
                                <a className={classnames(globalStyles.redlink)}
                                    onClick={() => { changeProjectInfo({ ...record, unused: 1 }); }}>删除</a>
                            </div>
                        </>
                    )
                }
            },
        ];
        // @ts-ignore
        return (
            <>
                <div className={styles.tableHead}>
                    <div className={styles.left}>
                        <div className={styles.tableTitle}>项目列表</div>
                        <div>{`项目总数量：${pageInfo.TotalCount || 0}`}</div>
                    </div>
                </div>
                <Table dataSource={projectList} columns={columns} pagination={{ position: ["bottomCenter"], pageSize: 20, total: pageInfo.TotalCount || 0 }} onChange={
                    onPageChange} />
            </>
        );
    }

    const projectForm = () => {
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
                title="录入项目信息"
                okText="保存"
                cancelText="取消"
                wrapClassName="projectForm"
                onCancel={() => { setFormOpen(false); form.resetFields(); }}
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            // form.resetFields();
                            console.log(values);
                            const entity = { ...values, id: editInfo && editInfo.id || undefined, type: values.type || 0 };
                            // if (entity.equipment) {
                            //     entity.equipment = entity.equipment.join(';')
                            // }
                            entity.caseimg = values.caseimg[0].response.Content.Data[0].fileURL;
                            changeProjectInfo(entity);
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="projectForm"
                >
                    <Form.Item
                        style={{ flex: 1 }}
                        name="caseimg"
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
                            {fileList.length >= 1 ? null : <UploadButton btnText="点击上传工程案例图" />}
                        </Upload>
                    </Form.Item>
                    <Form.Item label="输入项目名称，并选择所属行业" style={{ marginBottom: 0 }}>
                        <Form.Item
                            name="casename"
                            rules={[{ required: true, message: '请输入' }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                        >
                            <Input placeholder="请输入项目名称" />
                        </Form.Item>
                        <Form.Item
                            name="industry"
                            rules={[{ required: true, message: '请选择' }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Select placeholder="请选择项目所属行业" allowClear>
                                {industryType.map(item =>
                                    <SelectOption value={item.value}>
                                        {item.label}
                                    </SelectOption>)}
                            </Select>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        label="标识项目"
                        name="type"
                        rules={[{ required: false, message: '请选择' }]}
                    >
                        <Radio.Group>
                            <Radio value={1}>经典重大工程</Radio>
                            <Radio value={2}>高难度项目</Radio>
                            <Radio value={0}>普通项目</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="请选择项目所属区域" style={{ marginBottom: 0 }}>
                        <Form.Item
                            name="area"
                            rules={[{ required: true, message: '请输入' }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: 16 }}
                        >
                            <Select placeholder="请选择项目所属行业" allowClear>
                                {areaType.map(item =>
                                    <SelectOption value={item.value}>
                                        {item.label}
                                    </SelectOption>)}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="city"
                            rules={[{ required: false, message: '请选择' }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Input placeholder="请输入城市名称（选填）" />
                        </Form.Item>
                    </Form.Item>
                    {/*<Form.Item*/}
                    {/*    label="请输入客户名称"*/}
                    {/*    name="customername"*/}
                    {/*    rules={[{ required: true, message: '请输入' }]}*/}
                    {/*>*/}
                    {/*    <Input placeholder="请输入客户名称" />*/}
                    {/*</Form.Item>*/}
                    <Form.Item label="请输入项目使用主要设备" name="equipment">
                        {/*<Select placeholder="请选择设备（选填）" allowClear mode="multiple">*/}
                        {/*    {productionSeries.map(item =>*/}
                        {/*        <SelectOption value={item}>*/}
                        {/*            {item}*/}
                        {/*        </SelectOption>)}*/}
                        {/*</Select>*/}
                        <Input placeholder="请输入项目使用主要设备（选填）" />
                    </Form.Item>
                </Form>
            </Modal >
        )
    }
    return (
        <Spin spinning={queryLoading || copyLoading}>
            <div className={styles.wrap}>
                <h2 className={styles.title}>项目列表</h2>
                <Button type='primary' onClick={() => { setFileList([]); setFormOpen(true) }}>新增项目</Button>
                <div className={styles.table}>{displayTable()}</div>
                <>{projectForm()}</>
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
