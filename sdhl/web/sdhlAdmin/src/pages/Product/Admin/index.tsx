/* eslint-disable react/react-in-jsx-scope */
import { webApi } from '@/common/constants';
import { productType } from '@/common/enums';
import UploadButton from '@/components/UploadButton';
import globalStyles from '@/global.less';
import { beforeUpload, createUploadFile, getBase64Promise, hasKeys, normFile, useMyDispatch } from '@/utils/utils';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDynamicList, useMount } from "ahooks";
import { Button, Divider, Form, Image, Input, Modal, Radio, Select, Spin, Table, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import classnames from 'classnames';
import React, { useState } from 'react';
import { useSelector } from 'umi';
import styles from './index.less';

export default () => {
    //
    const [formOpen, setFormOpen] = useState(false);
    const [queryType, setQueryType] = useState('1');
    const [isDetail, setIsDetail] = useState(false);// 详情页
    const [fileListOfProducing, setFileListOfProducing] = useState([]); //产品说明配图
    const [uploadTecImgFileList, setUploadTecImgFileList] = useState([]); // 技术说明配图数组
    const [fileListOfList, setFileListOfList] = useState([]);
    const [fileListOfTop, setFileListOfTop] = useState([]);
    //预览图片
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [editInfo, setEditInfo] = useState(null);// 编辑简介实体
    const [productionId, setProductionId] = useState(null);// 编辑简介实体
    const { list: paramList, remove, getKey, push, resetList } = useDynamicList([{}, {}]);  // 多个产品参数
    const { list: featureList, remove: removeFeatureKey, getKey: getFeatureKey, push: pushFeatureKey, resetList: resetFeatureList } = useDynamicList([{}, {}, {}, {}, {}, {}]);  // 多个产品特出特点
    const { list: paramMoreList, remove: removeParamKey, getKey: getParamKey, push: pushParamKey, resetList: resetParamList } = useDynamicList([{}, {}, {}, {}, {}, {}]);  // 多个产品特出特点
    const [queryLoading, queryList] = useMyDispatch('product/queryProductionList');
    const [changeLoading, changeProductionInfo] = useMyDispatch('product/addOrUdateProductionInfo');
    const [copyLoading, copyProductionInfo] = useMyDispatch('product/copyProductionInfo');
    const [loadingA, queryProductionInfo] = useMyDispatch('product/queryProductionInfo');
    const [form] = Form.useForm();
    const [detailForm] = Form.useForm();// 详情表单
    // store state
    const { productionList = [], productionInfo = {} } = useSelector(state => state.product);

    const allLoading = queryLoading || changeLoading || copyLoading || loadingA;


    useMount(() => {
        queryList({
            queryType
        });
    })
    const handleFormValue = (parseFeature, key) => {
        const list = [];
        for (const entity of Object.entries(parseFeature)) {
            if (Array.isArray(entity)) {
                list.push({
                    [`${key}Key`]: entity[0],
                    [`${key}Name`]: entity[1]
                })
            }
        }
        return list;
    }
    const setFormValue = (list, key) => {
        const value = {};
        const name = {};
        list.forEach((item, index) => {
            value[index] = item[`${key}Key`];
            name[index] = item[`${key}Name`];
        })
        detailForm.setFieldsValue({
            [`${key}Key`]: value,
            [`${key}Name`]: name,
        });
    }
    // 新增or更新
    const addOrUdateProductionInfo = (entity) => {
        console.log('提交', entity);
        changeProductionInfo({
            params: entity
        }).then((res) => {
            if (res) {
                queryList({
                    queryType
                });
                setFormOpen(false);
                setEditInfo(null);
                form.resetFields();
            }
        })
    }
    // 保存详情
    const saveProductDetail = (show) => { // show true表示立即发布
        detailForm.validateFields()
            .then((values) => {
                console.log(values);
                const { paramsKey, paramsName, featureKey, featureName, tecImgs, productionimg } = values; // 设备参数，拼接成字符串
                const entity = { ...values };
                const params = {};// 产品参数
                const feature = {};// 产品特点
                if (paramsKey) {
                    for (let i = 0; i < paramsKey.length; i++) {
                        if (paramsKey[i] && paramsName[i]) {
                            params[paramsKey[i]] = paramsName[i];
                        }
                    }
                }
                if (featureKey) {
                    for (let i = 0; i < featureKey.length; i++) {
                        if (featureKey[i] && featureName[i]) {
                            feature[featureKey[i]] = featureName[i];
                        }
                    }
                }
                entity.params = JSON.stringify(params);
                entity.feature = JSON.stringify(feature);
                entity.id = productionId;
                let tecimg = []; //技术说明配图是多选的
                if (tecImgs) {
                    const { fileList = [] } = tecImgs;
                    fileList.forEach(file => {
                        const { Data = [] } = file.response.Content;
                        tecimg.push(Data[0].fileURL);
                    });
                }
                entity.show = show ? 1 : 0;
                entity.tecimg = tecimg.length ? JSON.stringify(tecimg) : '';
                entity.productionimg = entity.productionimg[0].response.Content.Data[0].fileURL;
                changeProductionInfo({
                    params: entity
                }).then((res) => {
                    console.log('提交', entity);
                    if (show) { // 立即发布
                        setIsDetail(false);
                        queryList({
                            queryType
                        });
                        setProductionId(null);
                        setFileListOfProducing([]);
                        setUploadTecImgFileList([]);
                        detailForm.resetFields();
                    } else { // 不立即发布
                        queryProjectDetail(productionId);
                    }

                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // 编辑简介
    const editAbstract = (info) => {
        const { listimg, topimg, params } = info;
        let parseParams = Object.entries(JSON.parse(params));
        if (parseParams === null || (parseParams && parseParams.length === 0)) {
            parseParams = [{}];
        }
        console.log("parseParams:", parseParams);
        const paramTem = [];
        setFileListOfList([{ //item为每个图片的相对路径
            uid: `${Math.random()}`,
            name: '列表显示图',
            status: 'done',
            url: `${webApi.api}${listimg}`,
        }]);
        setFileListOfTop([{ //item为每个图片的相对路径
            uid: `${Math.random()}`,
            name: '顶部显示图',
            status: 'done',
            url: `${webApi.api}${topimg}`,
        }]);
        for (const item of parseParams) {
            paramTem.push({
                paramsKey: item[0] || '',
                paramsName: item[1] || '',
            })
        }
        resetList(paramTem);
        setEditInfo(info);
        form.setFieldsValue({
            ...info,
            listimg: [new createUploadFile({ uid: `${Math.random()}`, name: 'image.png', relativeUrl: `${listimg}`, })],
            topimg: [new createUploadFile({ uid: `${Math.random()}`, name: 'image.png', relativeUrl: `${topimg}`, })]
        });
        setFormOpen(true);

    }

    //关闭编辑简介--清理数据
    const closeEditAbstract = () => {
        setEditInfo(null);
        form.resetFields();
        setFormOpen(false);
        setFileListOfList([]);
        setFileListOfTop([]);
    }

    // 编辑详情--查询
    const queryProjectDetail = (id) => {
        setIsDetail(true);
        setProductionId(id);
        queryProductionInfo({
            queryType: 2,
            productionId: id
        }).then((data = []) => {
            console.log(data);
            if (data.length) {
                const { params, feature, productionimg, tecimg, field, explain, description } = data[0];
                if (params) {
                    let list1 = handleFormValue(JSON.parse(params), 'params');
                    if (list1 && list1.length === 0) {
                        list1 = [{}];
                    }
                    resetParamList(list1);
                    setFormValue(list1, 'params');
                }
                if (feature) {
                    let list2 = handleFormValue(JSON.parse(feature), 'feature');
                    if (list2 && list2.length === 0) {
                        list2 = [{}];
                    }
                    resetFeatureList(list2);
                    setFormValue(list2, 'feature');
                }
                detailForm.setFieldsValue({
                    field, explain, description
                });
                if (productionimg) {
                    setFileListOfProducing([{ //item为每个图片的相对路径
                        uid: `${Math.random()}`,
                        name: 'image.png',
                        status: 'done',
                        url: `${webApi.api}${productionimg}`,
                    }])
                    detailForm.setFieldsValue({
                        productionimg: [new createUploadFile({ uid: `${Math.random()}`, name: 'image.png', relativeUrl: `${productionimg}`, })]
                    });
                }
                if (tecimg) { // 两张技术说明
                    const imgs = JSON.parse(tecimg);
                    const fileList = [];
                    const formFileList = [];
                    imgs.forEach((item, index) => {
                        fileList.push({ //item为每个图片的相对路径
                            uid: `${index}`,
                            name: 'image.png',
                            status: 'done',
                            url: `${webApi.api}${item}`,
                        });
                        formFileList.push(new createUploadFile({ uid: `${index}`, name: 'image.png', relativeUrl: `${item}`, }))

                    });
                    console.log(imgs, formFileList);
                    detailForm.setFieldsValue({
                        tecImgs: {
                            fileList: formFileList
                        }
                    });
                    setUploadTecImgFileList(formFileList); //用作展示图
                }
            }

        })
    }


    const displayTable = () => {
        const columns = [
            {
                title: '产品类别',
                dataIndex: 'type',
                key: 'type',
                width: 150,
            },
            {
                title: '产品图片',
                dataIndex: 'listimg',
                key: 'listimg',
                render: (text) => text ? <Image width={100} src={`${webApi.api}${text}`} /> : ''
            },
            {
                title: '产品系列',
                dataIndex: 'series',
                key: 'series',
            },
            {
                title: '产品型号',
                dataIndex: 'model',
                key: 'model',
            },
            {
                title: '产品名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                dataIndex: 'id',
                key: 'id',
                width: 180,
                render: (text, record) => {
                    const { show } = record;
                    return (
                        <>
                            <div>
                                <a
                                    className={classnames(globalStyles.redlink)}
                                    onClick={() => {
                                        editAbstract(record);
                                    }}>编辑简介</a>
                                <Divider type="vertical" />
                                <a
                                    className={classnames(globalStyles.redlink)}
                                    onClick={() => {
                                        queryProjectDetail(text)
                                    }}>编辑详情</a>
                            </div>
                            <div>
                                <a
                                    className={classnames(globalStyles.graylink)}
                                    onClick={() => copyProductionInfo({ params: { id: text } }).then(() => { queryList({ queryType }) })}
                                >复制该条</a>
                                <Divider type="vertical" />
                                <a className={classnames(show ? globalStyles.graylink : globalStyles.bluelink)}
                                    onClick={() => addOrUdateProductionInfo({ ...record, show: show ? 0 : 1 })}>{`${show ? '停止' : '开启'}展示`}</a>
                                <Divider type="vertical" />
                                <a className={classnames(globalStyles.redlink)}
                                    onClick={() => { addOrUdateProductionInfo({ ...record, unused: 1 }); }}>删除</a>
                            </div>
                        </>
                    )
                }
            },
        ];
        return (
            <>
                <div className={styles.tableHead}>
                    <div className={styles.left}>
                        <div className={styles.tableTitle}>产品列表</div>
                        <div>{`产品数量：${productionList.length || 0}`}</div>
                    </div>
                    <div className={styles.right}>
                        <Radio.Group defaultValue={queryType} onChange={(e) => {
                            const type = e.target.value;
                            setQueryType(type);
                            queryList({
                                queryType: type,
                            })
                        }}>
                            <Radio.Button value="1">展示全部</Radio.Button>
                            <Radio.Button value="2">隐藏未展示</Radio.Button>
                            <Radio.Button value="3">只看未展示</Radio.Button>
                        </Radio.Group>
                    </div>
                </div>
                <Table dataSource={productionList} columns={columns} pagination={false} />
            </>
        );
    }

    // 简介的form
    const productForm = () => {
        //上传附件后的回调函数
        const uploadCallBackOfList = (fileList: []) => {
            setFileListOfList(fileList);
        }
        const uploadCallBackOfTop = (fileList: []) => {
            setFileListOfTop(fileList);
        }
        const handlePreview = async file => {
            console.log(file);
            if (!file.url && !file.preview) {
                file.preview = await getBase64Promise(file.originFileObj);
            }
            setPreviewImage(file.url || file.preview);
            setPreviewVisible(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        };
        // 产品参数
        const Row = (index: number, item: any) => (
            <div className="contain" key={getKey(index)}>
                <Form.Item
                    className="left"
                    rules={[{ required: true, message: "请输入" }]}
                    name={["paramsKey", getKey(index)]}
                    initialValue={hasKeys(item) ? item.paramsKey : ''}
                >
                    <Input placeholder="参数名" />
                </Form.Item>
                <Form.Item
                    className="right"
                    rules={[{ required: true, message: "请输入" }]}
                    name={["paramsName", getKey(index)]}
                    initialValue={hasKeys(item) ? item.paramsName : ''}
                >
                    <Input placeholder="参数值" />
                </Form.Item>
                <div className="iconcontain">
                    {paramList.length > 1 && (
                        <MinusCircleOutlined
                            className="icon"
                            onClick={() => {
                                remove(index);
                            }}
                        />
                    )}
                    <PlusCircleOutlined
                        className="icon"
                        onClick={() => {
                            push({});
                        }}
                    />
                </div>
            </div>
        );
        return (
            <Modal
                visible={formOpen}
                title="产品简介"
                okText="保存"
                cancelText="取消"
                wrapClassName="productform"
                onCancel={closeEditAbstract}
                confirmLoading={allLoading}
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            console.log(values);
                            const { listimg, topimg } = values;
                            let realListimg = listimg[0].response.Content.Data[0].fileURL;
                            let realTopimg = topimg[0].response.Content.Data[0].fileURL;
                            const entity = {
                                ...values,
                                id: editInfo && editInfo.id || undefined,
                                listimg: realListimg,
                                topimg: realTopimg,
                            };
                            const { paramsKey, paramsName } = values; // 设备参数，拼接成字符串
                            const params = {};
                            for (let i = 0; i < paramsKey.length; i++) {
                                params[paramsKey[i]] = paramsName[i];
                            }
                            entity.params = JSON.stringify(params);
                            addOrUdateProductionInfo(entity);
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="productGeneral"
                >
                    <Form.Item
                        label="产品图片"
                    >
                        <div style={{ display: 'flex' }} >
                            <Form.Item
                                style={{ flex: 1 }}
                                name="listimg"
                                rules={[{ required: true, message: '请上传图片' }]}
                                valuePropName="fileList"
                                getValueFromEvent={(e) => normFile(e, uploadCallBackOfList)}
                                extra="用作产品中心产品列表图片"
                            >
                                <Upload
                                    name="image"
                                    action={webApi.fileApi}
                                    listType="picture-card"
                                    fileList={fileListOfList}
                                    onPreview={handlePreview}
                                    beforeUpload={beforeUpload}
                                >
                                    {fileListOfList.length >= 1 ? null : <UploadButton btnText="点击上传图片" />}
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                style={{ flex: 1 }}
                                name="topimg"
                                rules={[{ required: true, message: '请上传图片' }]}
                                valuePropName="fileList"
                                getValueFromEvent={(e) => normFile(e, uploadCallBackOfTop)}
                                extra="用作产品详情页顶部图片"
                            >
                                <Upload
                                    name="image"
                                    action={webApi.fileApi}
                                    listType="picture-card"
                                    fileList={fileListOfTop}
                                    onPreview={handlePreview}
                                    beforeUpload={beforeUpload}
                                >
                                    {fileListOfTop.length >= 1 ? null : <UploadButton btnText="点击上传图片" />}
                                </Upload>
                            </Form.Item>
                        </div>
                    </Form.Item>
                    <Form.Item
                        label="产品类别"
                        name="type"
                        rules={[{ required: true, message: '请选择' }]}
                    >
                        <Select placeholder="产品类别" allowClear>
                            {productType.map(item =>
                                <Select.Option value={item.value}>
                                    {item.label}
                                </Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="产品系列与产品型号" style={{ marginBottom: 0 }}>
                        <Form.Item
                            name="series"
                            rules={[{ required: true, message: '请输入' }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Input placeholder="产品系列" />
                        </Form.Item>
                        <Form.Item
                            name="model"
                            rules={[{ required: true, message: '请输入' }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: 16 }}
                        >
                            <Input placeholder="产品型号" />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        label="产品名称"
                        name="name"
                        rules={[{ required: true, message: '请输入' }]}
                    >
                        <Input placeholder="产品名称" />
                    </Form.Item>
                    <Form.Item
                        label="产品参数"
                    >
                        {paramList.map((ele, index) => Row(index, ele))}
                    </Form.Item>
                </Form>
            </Modal >
        )
    }

    // 编辑详情页
    const productDetialForm = () => {
        //上传技术说明配图
        const uploadTecImg = ({ fileList }) => {
            console.log(fileList);
            setUploadTecImgFileList(fileList);

        }
        //上传附件后的回调函数
        const uploadCallBack = (fileList: []) => {
            console.log('fileList', fileList);
            setFileListOfProducing(fileList);
        }
        //预览技术图
        const handlePreview = async file => {
            console.log(file);
            if (!file.url && !file.preview) {
                file.preview = await getBase64Promise(file.originFileObj);
            }
            setPreviewImage(file.url || file.preview);
            setPreviewVisible(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        };
        const RowFeature = (index: number, item: any) => (
            <div className={styles.contain} key={getFeatureKey(index)}>
                <Form.Item
                    className={styles.left}
                    rules={[{ required: false, message: "请输入" }]}
                    name={["featureKey", getFeatureKey(index)]}
                >
                    <Input placeholder={`请输入产品特点${index + 1}(选填）`} />
                </Form.Item>
                <Form.Item
                    className={styles.right}
                    rules={[{ required: false, message: "请输入" }]}
                    name={["featureName", getFeatureKey(index)]}
                >
                    <Input placeholder="请描述该特点" />
                </Form.Item>
                <div className={styles.iconcontain}>
                    {featureList.length > 1 && (
                        <MinusCircleOutlined
                            className={styles.icon}
                            onClick={() => {
                                removeFeatureKey(index);
                            }}
                        />
                    )}
                    <PlusCircleOutlined
                        className={styles.icon}
                        onClick={() => {
                            pushFeatureKey({});
                        }}
                    />
                </div>
            </div>
        );
        const RowMoreParams = (index: number, item: any) => (
            <div className={styles.contain} key={getParamKey(index)}>
                <Form.Item
                    className={styles.left}
                    rules={[{ required: false, message: "请输入" }]}
                    name={["paramsKey", getParamKey(index)]}
                >
                    <Input placeholder={`请输入产品参数名称${index + 1}(选填）`} />
                </Form.Item>
                <Form.Item
                    className={styles.right}
                    rules={[{ required: false, message: "请输入" }]}
                    name={["paramsName", getParamKey(index)]}
                >
                    <Input placeholder="请输入参数值" />
                </Form.Item>
                <div className={styles.iconcontain}>
                    {paramMoreList.length > 1 && (
                        <MinusCircleOutlined
                            className={styles.icon}
                            onClick={() => {
                                removeParamKey(index);
                            }}
                        />
                    )}
                    <PlusCircleOutlined
                        className={styles.icon}
                        onClick={() => {
                            pushParamKey({});
                        }}
                    />
                </div>
            </div>
        );
        return (
            <>
                <Form
                    form={detailForm}
                    layout="vertical"
                    name="detail"
                >
                    <Form.Item
                    >
                        <div className={styles.title}>{productionInfo.length ? productionInfo[0].name : ''}</div>
                    </Form.Item>
                    <Form.Item
                        label='产品概述（200字以内）'
                        name="description"
                    >
                        <TextArea placeholder="请输入" autoSize={{ minRows: 4, maxRows: 6 }} />
                    </Form.Item>
                    <Form.Item
                        name="field"
                        label='产品应用领域（50字以内）'
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item
                    >
                        <Form.Item
                            label='产品说明（500字以内）'
                            name="explain"
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: '8px' }}
                        >
                            <TextArea placeholder="请输入" style={{ height: 187 }} />
                        </Form.Item>
                        <Form.Item
                            label='产品说明配图'
                            name="productionimg"
                            rules={[{ required: true, message: '请上传图片' }]}
                            style={{ display: 'inline-block', width: '50%' }}
                            valuePropName="fileList"
                            getValueFromEvent={(e) => normFile(e, uploadCallBack)}
                        >
                            <Upload
                                name="image"
                                action={webApi.fileApi}
                                listType="picture-card"
                                fileList={fileListOfProducing}
                                onPreview={handlePreview}
                                beforeUpload={beforeUpload}
                            >
                                {fileListOfProducing.length >= 1 ? null : <UploadButton btnText="上传产品说明配图" />}
                            </Upload>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        label='产品突出特点'
                    >
                        {featureList.map((ele, index) => RowFeature(index, ele))}
                    </Form.Item>
                    <Form.Item
                        label='继续补充产品参数（选填，填写后会在前台展）'
                    >
                        {paramMoreList.map((ele, index) => RowMoreParams(index, ele))}
                    </Form.Item>
                    <Form.Item
                        label="技术说明（上传展示图，选填；填写后会在前）"
                        name="tecImgs"
                        rules={[{ required: false, message: '请上传图片' }]}
                    >
                        <Upload
                            name="image"
                            action={webApi.fileApi}
                            listType="picture-card"
                            beforeUpload={beforeUpload}
                            fileList={uploadTecImgFileList}
                            onChange={uploadTecImg}
                            onPreview={handlePreview}
                        >
                            <UploadButton btnText="技术说明图" />
                        </Upload>
                    </Form.Item>
                </Form>
            </>
        )
    }
    return (
        <Spin spinning={allLoading}>
            <div className={styles.wrap}>
                {isDetail ?
                    <div className={styles.form}>
                        <div className={styles.btn}>
                            <div className={styles.left}>
                                <Button type="ghost" className={styles.return} onClick={() => {
                                    setIsDetail(false);
                                    queryList({
                                        queryType
                                    });
                                    setFileListOfProducing([]);
                                    setUploadTecImgFileList([]);
                                    detailForm.resetFields();
                                }} >返回</Button>
                                <Button type='primary' onClick={() => saveProductDetail(true)}>立即发布</Button>
                            </div>
                            <Button type='primary' onClick={() => saveProductDetail(false)}>保存并留在当前页</Button>
                        </div>
                        <div className={styles.title}>产品详情页</div>
                        <div className={styles.detail}>{productDetialForm()}</div>
                    </div>
                    :
                    <>
                        <h2 className={styles.title}>产品中心</h2>
                        <Button type='primary' onClick={() => setFormOpen(true)}>新增产品</Button>
                        <div className={styles.table}>{displayTable()}</div>
                        <>{productForm()}</>
                    </>
                }
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={() => setPreviewVisible(false)}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        </Spin>
    );
};
