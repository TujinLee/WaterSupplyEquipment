import { webApi } from '@/common/constants';
import { columnType, posNewsType, posPortalType } from '@/common/enums';
import UploadButton from '@/components/UploadButton';
import globalStyles from '@/global.less';
import { beforeUpload, createUploadFile, getBase64Promise, normFile, useMyDispatch } from '@/utils/utils';
import { useMount } from 'ahooks';
import { Button, DatePicker, Divider, Form, Image, Input, message, Modal, Radio, Select, Spin, Table, Tabs, Upload } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import classnames from 'classnames';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'umi';
import styles from './index.less';


const { TabPane } = Tabs;
const { TextArea } = Input;
const dateFormat = "YYYY-MM-DD HH:mm:ss";
export default () => {
    //    R
    const [queryType, setQueryType] = useState('1');
    const [isPublish, setIsPublish] = useState(false);// 发布
    const [isAddUrl, setIsAddUrl] = useState(false);// 链接
    const [isRecommend, setIsRecommend] = useState(false);// 推荐
    const [previewVisible, setPreviewVisible] = useState(false); //预览
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [recommendID, setRecommendID] = useState(null);  //已经推荐
    const [form] = Form.useForm();
    const [urlArticleForm] = Form.useForm();
    const [recommendForm] = Form.useForm();
    const [editInfoURL, setEditInfoURL] = useState(null); //链接文章
    const [editInfoPublish, setEditInfoPublish] = useState(null); //原创文章

    // store state
    const { publishInfoList = [], archiveInfoList = [], existRecommendpos = [] } = useSelector(state => state.news);
    const homePos = existRecommendpos[0] || [];
    const newsPos = existRecommendpos[1] || [];
    // store action
    const [queryLoading, queryInformationList] = useMyDispatch('news/queryInformationList');
    const [saveLoading, addOrUdateInformation] = useMyDispatch('news/addOrUdateInformation');
    const [rLoading, recommendposUpdate] = useMyDispatch('news/recommendposUpdate');
    const [cLoading, cancelRecommend] = useMyDispatch('news/cancelRecommend');
    const [aLoading, archiving] = useMyDispatch('news/archiving');
    const [dLoading, queryExistRecommendpos] = useMyDispatch('news/queryExistRecommendpos');

    const allLoading = queryLoading || saveLoading || rLoading || cLoading || aLoading || dLoading;
    // 查询
    const queryList = () => {
        queryInformationList({
            pageInfo: {
                pageSize: 1000,
                pageIndex: 1
            },
            queryType: queryType * 1,
        });
    };
    useEffect(() => {
        queryList();
    }, [queryType]);

    useMount(() => {
        queryExistRecommendpos();
    })
    // 新增or更新
    const saveInformation = (entity, isStay) => {
        console.log('提交', entity);
        addOrUdateInformation({
            params: entity
        })
            .then((res) => {
                if (res) {
                    //链接文章
                    if (isStay == undefined) {
                        setIsAddUrl(false);
                        setEditInfoURL(null);
                        urlArticleForm.resetFields();
                        setFileList([]);
                    } else { //原创文章
                        if (isStay) { //发布后停留
                            setIsPublish(true);
                        } else { //
                            setIsPublish(false);
                            setEditInfoPublish(null);
                            queryList();
                            form.resetFields();
                            setFileList([]);
                        }
                    }
                  queryList();
                }
            })
    }
    // 归档文章
    const archivingArticle = (id) => {
        archiving({
            params: {
                informationId: id
            }
        })
            .then((res) => {
                if (res) {
                    queryList();
                }
            })
    }

    // 取消推荐

    const cancelRecommendPos = (id) => {
        cancelRecommend({
            params: {
                informationId: id
            }
        }).then((res) => {
            if (res) {
                queryList();
                queryExistRecommendpos();
            }
        })
    }

    const displayPublishedTable = () => {
        const columns = [
            {
                title: '#',
                dataIndex: 'id',
                key: 'id',
                width: 50,
            },
            {
                title: '头图',
                dataIndex: 'headimg',
                key: 'headimg',
                width: 100,
                render: (text) => text ? <Image width={100} src={`${webApi.api}${text}`} /> : ''
            },
            {
                title: '文章标题',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: '专栏',
                dataIndex: 'columnists',
                key: 'columnists',
                width: 120,
            },
            {
                title: '类别',
                dataIndex: 'category',
                key: 'category',
                width: 100,
            },
            {
                title: '发布时间',
                dataIndex: 'pubdate',
                key: 'pubdate',
                width: 180,
                render: (text) => moment(text).format('YYYY-MM-DD hh:mm:ss')
            },
            {
                title: '推荐位置',
                dataIndex: 'homerecommendpos',
                key: 'homerecommendpos',
                width: 180,
                render: (text, record) => {
                    const { infocentercommendpos } = record;
                    const arr = [];
                    if (text) {
                        arr.push(`首页0${text}号位`);
                    }
                    if (infocentercommendpos) {
                        arr.push(`资讯中心0${infocentercommendpos}号位`)
                    }
                    return arr.join('、');
                }
            },
            {
                title: '阅读量',
                dataIndex: 'readingcount',
                key: 'readingcount',
                width: 80,
            },
            {
                title: '操作',
                dataIndex: 'id',
                key: 'id',
                width: 180,
                render: (text, record) => {
                    const { homerecommendpos, infocentercommendpos, unused, category, pubdate, headimg, content } = record;
                    const hasPos = homerecommendpos || infocentercommendpos;
                    return (
                        <>
                            <div>
                                <a
                                    className={classnames(globalStyles.redlink)}
                                    onClick={() => {
                                        setFileList([{ //item为每个图片的相对路径
                                            uid: `${Math.random()}`,
                                            name: '头图',
                                            status: 'done',
                                            url: `${webApi.api}${headimg}`,
                                        }]);
                                        if (category == '链接文章') {
                                            setEditInfoURL(record);
                                            urlArticleForm.setFieldsValue({
                                                ...record,
                                                pubdate: moment(pubdate),
                                                headimg: [new createUploadFile({ uid: `${Math.random()}`, name: 'image.png', relativeUrl: `${headimg}`, })]
                                            });
                                            setIsAddUrl(true);
                                        } else { //编辑文章
                                            setEditInfoPublish(record);
                                            form.setFieldsValue({
                                                ...record,
                                                pubdate: moment(pubdate),
                                                content: BraftEditor.createEditorState(content),
                                                headimg: [new createUploadFile({ uid: `${Math.random()}`, name: 'image.png', relativeUrl: `${headimg}`, })]
                                            });
                                            setIsPublish(true);
                                        }
                                    }}>编辑</a>
                                {
                                    queryType == '1' && <>
                                        <Divider type="vertical" />
                                        {hasPos ? <a className={classnames(hasPos ? globalStyles.graylink : globalStyles.redlink)}
                                            onClick={() => cancelRecommendPos(text)}>取消推荐</a> : <a onClick={() => {
                                                setRecommendID(text);
                                                setIsRecommend(true);
                                            }}>推荐</a>}
                                    </>
                                }
                                {
                                    !hasPos && queryType == '1' && <>
                                        <Divider type="vertical" />
                                        <a className={classnames(globalStyles.redlink)} onClick={() => archivingArticle(text)}>归档</a>
                                    </>
                                }
                                {
                                    queryType == '2' && unused == 0 && <>
                                        <Divider type="vertical" />
                                        <a className={classnames(globalStyles.graylink)} onClick={() => saveInformation({ id: text, unused: 1 }, false)}>删除</a>
                                    </>
                                }
                            </div>
                        </>
                    )
                }
            },
        ];
        return (
            <>
                <Table dataSource={queryType == '1' ? publishInfoList : archiveInfoList} columns={columns} pagination={false} />
            </>
        );
    }
    // 保存并保留--编辑
    const saveAndStay = (isStay) => {
        form
            .validateFields()
            .then(values => {
                // form.resetFields();
                console.log(values);
                const entity = { ...values, id: editInfoPublish ? editInfoPublish.id : undefined };
                entity.pubdate = moment(entity.pubdate).format('YYYY-MM-DD hh:mm:ss');
                entity.content = entity.content.toHTML();
                entity.category = '编辑文章';
                entity.headimg = entity.headimg[0].response.Content.Data[0].fileURL;
                saveInformation(entity, isStay);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }
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
    // 发布
    const publishForm = () => {
        const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator',
          'media','img', 'undo', 'redo','letter-spacing','text-indent','superscript','subscript','text-align'];
        return (
            <Form
                form={form}
                layout="vertical"
                name="news"
            >
                <div className={styles.onerow}>
                    <div className={styles.left}>
                        <Form.Item
                            style={{ flex: 1 }}
                            name="headimg"
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
                                {fileList.length >= 1 ? null : <UploadButton btnText="点击上传头图" />}
                            </Upload>
                        </Form.Item>
                    </div>
                    <div className={styles.right}>
                        <Form.Item
                            label="请选择专栏"
                            name="columnists"
                            rules={[{ required: true, message: '请选择' }]}
                            initialValue="企业动态"
                        >
                            <Select placeholder="企业动态" allowClear>
                                {columnType.map(item =>
                                    <Select.Option value={item.value}>
                                        {item.label}
                                    </Select.Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='请输入文章来源'
                            name="origin"
                            rules={[{ required: true, message: '请输入' }]}
                            initialValue='原创文章'
                        >
                            <Input placeholder="原创文章（默认）" />
                        </Form.Item>
                        <Form.Item
                            label='请设置发布时间（默认当前时间）'
                            name="pubdate"
                            rules={[{ required: true, message: '请选择' }]}
                            initialValue={moment()}
                        >
                            <DatePicker format={dateFormat} style={{ width: '100%' }} showTime />
                        </Form.Item>
                    </div>
                </div>
                <Form.Item
                    name="title"
                    rules={[{ required: true, message: '请输入' }]}
                >
                    <Input size="large" placeholder="请输入文章标题" />
                </Form.Item>
                <Form.Item
                    name="content"
                    rules={[{ required: true, message: '请输入' }]}
                >
                    <BraftEditor
                        className="my-editor"
                        style={{ border: '1px solid #d1d1d1' }}
                        controls={controls}
                        placeholder="请输入文章正文"
                        media={{accepts:{
                          image: 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg',
                        }}}
                    />
                </Form.Item>
                <Form.Item
                    name="summary"
                    rules={[{ required: true, message: '请输入' }]}
                >
                    <TextArea placeholder="请输入文章摘要，10-50个字之间" />
                </Form.Item>
            </Form>
        )
    }
    // 链接文章
    const addUrlArticleForm = () => {
        return (
            <Modal
                visible={isAddUrl}
                title="添加链接文章"
                okText="保存"
                cancelText="取消"
                onCancel={() => { setIsAddUrl(false); urlArticleForm.resetFields(); setFileList([]); }}
                wrapClassName="urlsource"
                onOk={() => {
                    urlArticleForm
                        .validateFields()
                        .then(values => {
                            console.log(values);
                            const entity = {
                                ...values,
                                id: editInfoURL ? editInfoURL.id : undefined,
                                pubdate: moment(values.pubdate).format(dateFormat),
                                category: '链接文章',
                                headimg: values.headimg[0].response.Content.Data[0].fileURL,
                            };
                            saveInformation(entity);
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={urlArticleForm}
                    layout="vertical"
                    name="UrlArticleForm"
                >
                    <Form.Item
                        style={{ flex: 1 }}
                        name="headimg"
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
                            {fileList.length >= 1 ? null : <UploadButton btnText="点击上传头图" />}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="输入文章标题"
                        name="title"
                        rules={[{ required: true, message: '请输入' }]}
                    >
                        <Input placeholder="请输入文章标题" />
                    </Form.Item>
                    <Form.Item label="请选择专栏，并设置发布时间" style={{ marginBottom: 0 }}>
                        <Form.Item
                            name="columnists"
                            rules={[{ required: true, message: '请选择' }]}
                            style={{ display: 'inline-block', width: 'calc(40% - 8px)', marginRight: 16 }}
                            initialValue={editInfoURL ? editInfoURL.columnists : "媒体报道"}
                        >
                            <Select placeholder="媒体报道（默认）" allowClear>
                                {columnType.map(item =>
                                    <Select.Option value={item.value}>
                                        {item.label}
                                    </Select.Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="pubdate"
                            rules={[{ required: false, message: '请选择' }]}
                            style={{ display: 'inline-block', width: 'calc(60% - 8px)' }}
                            initialValue={moment()}
                        >
                            <DatePicker placeholder="请设置发布时间（选填，默认当前时间）" format={dateFormat} style={{ width: '100%' }} showTime/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        label="添加文章链接并标记文章来源"
                    >
                        <Form.Item
                            name="articlelink"
                            rules={[{ required: true, message: '请输入' }]}
                        >
                            <Input placeholder="请输入文章链接" />
                        </Form.Item>
                        <Form.Item
                            name="origin"
                            rules={[{ required: false, message: '请输入' }]}
                        >
                            <Input placeholder="请输入文章来源" />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        label="添加文章摘要"
                        name="summary"
                        rules={[{ required: true, message: '请输入' }]}
                    >
                        <TextArea placeholder="请输入" />
                    </Form.Item>
                </Form>
            </Modal >
        )
    }
    const addRecommendForm = () => {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <Modal
                visible={isRecommend}
                title={<div>
                    <div style={{ fontSize: 16, fontWeight: 500 }}>设置推荐位</div>
                    <div>(首页和资讯中心分别只能选择1个选项）</div>
                </div>}
                okText="保存"
                cancelText="取消"
                onCancel={() => { setIsRecommend(false); setRecommendID(null); recommendForm.resetFields(); }}
                onOk={() => {
                    recommendForm
                        .validateFields()
                        .then(values => {
                            // form.resetFields();
                            console.log(values);
                            const { homerecommendpos, infocentercommendpos } = values;
                            if (!homerecommendpos && !infocentercommendpos) { //两者均为空
                                message.error('请至少选择一个推荐位');
                                return;
                            }
                            recommendposUpdate({
                                params: {
                                    informationId: recommendID,
                                    ...values
                                }
                            }).then((res) => {
                                console.log('res', res);
                                if (res) {
                                    setIsRecommend(false);
                                    setRecommendID(null);
                                    recommendForm.resetFields();
                                    queryList();
                                    queryExistRecommendpos();
                                }
                            });
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={recommendForm}
                    layout="vertical"
                    name="recommandform"
                >
                    <Form.Item>
                        <Form.Item
                            name="homerecommendpos"
                            rules={[{ required: false, }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Radio.Group>
                                {posPortalType.map((item) => <Radio style={radioStyle} value={item.value} disabled={homePos.includes(item.value * 1)}>
                                    {item.label}
                                </Radio>)}
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="infocentercommendpos"
                            rules={[{ required: false, }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Radio.Group>
                                {posNewsType.map((item) => <Radio style={radioStyle} value={item.value} disabled={newsPos.includes(item.value * 1)}>
                                    {item.label}
                                </Radio>)}
                            </Radio.Group>
                        </Form.Item>
                    </Form.Item>
                </Form>
            </Modal >
        )
    }
    return (
        <Spin spinning={allLoading}>
            <div className={styles.wrap}>
                {isPublish ?
                    <div className={styles.form}>
                        <div className={styles.btn}>
                            <div className={styles.left}>
                                <Button type="ghost" className={styles.return} onClick={() => { setIsPublish(false); queryList(); setFileList([]); setEditInfoPublish(null); form.resetFields(); }} >返回</Button>
                                <Button type='primary' onClick={() => saveAndStay(false)}>立即发布</Button>
                            </div>
                            <Button type='primary' onClick={() => saveAndStay(true)}>保存并留在当前页</Button>
                        </div>
                        <div>{publishForm()}</div>
                    </div>
                    :
                    <div>
                        <div className={styles.title}>资讯列表</div>
                        <Tabs defaultActiveKey={queryType} animated tabBarExtraContent={
                            <>
                                <Button type='primary' style={{ marginRight: 5 }} onClick={() => setIsPublish(true)} >添加编辑文章</Button>
                                <Button type='primary' onClick={() => setIsAddUrl(true)} >添加链接文章</Button>
                            </>
                        } onChange={(key) => { setQueryType(key); }}>
                            <TabPane tab="已发布" key="1">
                                <div className={styles.table}>{displayPublishedTable()}</div>
                            </TabPane>
                            <TabPane tab="归档" key="2">
                                <div className={styles.table}>{displayPublishedTable()}</div>
                            </TabPane>
                        </Tabs>
                    </div>
                }
                <>{addUrlArticleForm()}</>
                <>{addRecommendForm()}</>
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
