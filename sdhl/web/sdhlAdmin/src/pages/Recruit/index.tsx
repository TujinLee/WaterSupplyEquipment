/* eslint-disable react/react-in-jsx-scope */
import { jobType } from '@/common/enums';
import globalStyles from '@/global.less';
import { useMyDispatch } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import { useMount } from "ahooks";
import { Button, Divider, Form, Input, InputNumber, Modal, Select, Spin, Table, Tabs } from 'antd';
import classnames from 'classnames';
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
    // store state
    const { recruitList = [], recruitInfo = {} } = useSelector(state => state.recruit);
    // store action
    const [queryLoading, queryRecruitmentList] = useMyDispatch('recruit/queryRecruitmentList');
    const [loading, queryRecruitmentInfo] = useMyDispatch('recruit/queryRecruitmentInfo');
    const [saveloading, addOrUdateRecruitment] = useMyDispatch('recruit/addOrUdateRecruitment');
    const allLoading = queryLoading || saveloading;

    useMount(() => {
        queryRecruitmentList();
    })
    // 新增or更新
    const saveRecruitment = (entity) => {
        console.log('提交', entity);
        addOrUdateRecruitment({
            params: entity
        }).then((res) => {
            if (res) {
                queryRecruitmentList();
                setEditInfo(null);
                setFormOpen(false);
                form.resetFields();
            }
        })
    }

    const displayTable = () => {
        const columns = [
            {
                title: '职位名称',
                dataIndex: 'positiontitle',
                key: 'positiontitle',
                width: 100,
            },
            {
                title: '职位类型',
                dataIndex: 'jobtype',
                key: 'jobtype',
                width: 100,
            },
            {
                title: '招聘人数',
                dataIndex: 'recruitsnums',
                key: 'recruitsnums',
                width: 100,
            },
            {
                title: '工作性质',
                dataIndex: 'jobnature',
                key: 'jobnature',
                width: 100,
            },
            {
                title: '需求部门',
                dataIndex: 'department',
                key: 'department',
                width: 180,
            },
            {
                title: '就职地点',
                dataIndex: 'jobbase',
                key: 'jobbase',
                width: 80,
            },
            {
                title: '操作',
                dataIndex: 'id',
                key: 'id',
                width: 120,
                render: (text, record) => {
                    const { unused, inrecruitment } = record;
                    return (
                        <>
                            <div>
                                <a
                                    className={classnames(globalStyles.redlink)}
                                    onClick={() => {
                                        setEditInfo(record);
                                        setFormOpen(true);
                                        form.setFieldsValue({
                                            ...record
                                        })
                                    }}>编辑</a>
                                <Divider type="vertical" />
                                <a
                                    className={classnames(inrecruitment ? globalStyles.graylink : globalStyles.bluelink)}
                                    onClick={() => saveRecruitment({ id: text, inrecruitment: inrecruitment ? 0 : 1 })}>{inrecruitment ? '停止招聘' : '开启招聘'}</a>
                                {!unused && <>
                                    <Divider type="vertical" />
                                    <a className={classnames(globalStyles.graylink)} onClick={() => saveRecruitment({ id: text, unused: 1 })}>删除</a>
                                </>}
                            </div>
                        </>
                    )
                }
            },
        ];
        return (
            <>
                <Table dataSource={recruitList} columns={columns} pagination={false} />
            </>
        );
    }

    const renderForm = () => {
        return (
            <Modal
                visible={formOpen}
                title="招聘信息录入"
                okText="保存"
                cancelText="取消"
                onCancel={() => { setFormOpen(false); form.resetFields() }}
                wrapClassName="recruitform"
                getContainer={document.getElementById('recruitForm')}
                footer={
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={() => setFormOpen(false)}>取消</Button>
                        <Button type="primary" onClick={() => {
                            form
                                .validateFields()
                                .then(values => {
                                    // form.resetFields();
                                    console.log(values);
                                    saveRecruitment({ ...values, inrecruitment: editInfo ? editInfo.inrecruitment : 0, id: editInfo && editInfo.id || undefined })
                                })
                                .catch(info => {
                                    console.log('Validate Failed:', info);
                                });
                        }}>保存</Button>
                        {!editInfo && <Button type="primary" onClick={() => {
                            form
                                .validateFields()
                                .then(values => {
                                    // form.resetFields();
                                    console.log(values);
                                    saveRecruitment({ ...values, inrecruitment: 1, id: editInfo && editInfo.id || undefined })
                                })
                                .catch(info => {
                                    console.log('Validate Failed:', info);
                                });
                        }} >开启招聘</Button>}
                    </div>
                }
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="recruit"
                // initialValues={editInfo}
                >
                    <div
                        className={styles.oneRow}
                    >
                        <Form.Item
                            label="输入职位名称"
                            name="positiontitle"
                            rules={[{ required: true, message: '请输入' }]}
                            className={styles.left}
                        >
                            <Input placeholder="请输入职位名称" />
                        </Form.Item>
                        <Form.Item
                            label="输入职位类型"
                            name="jobtype"
                            rules={[{ required: false, message: '请输入' }]}
                            className={styles.right}
                        >
                            <Input placeholder="请输入职位类型" defaultValue=""/>
                        </Form.Item>
                    </div>
                    <div
                        className={styles.oneRow}
                    >
                        <Form.Item
                            label="输入招聘人数"
                            name="recruitsnums"
                            rules={[{ required: false, message: '请输入' }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <InputNumber placeholder="请输入招聘人数" style={{ width: '100%' }} defaultValue={0}/>
                        </Form.Item>
                        <Form.Item
                            label="输入就职地点"
                            name="jobbase"
                            rules={[{ required: false, message: '请输入' }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Input placeholder="请输入就职地点" defaultValue=""/>
                        </Form.Item>
                    </div>
                    <Form.Item
                        label="招聘详情"
                        name="jobresponsibilities"
                        rules={[{ required: true, message: '请输入' }]}
                    >
                        <TextArea placeholder="请输入工作职责和工作要求" />
                    </Form.Item>
                    <Form.Item
                    >
                        <Form.Item
                            label="输入工作性质"
                            name="jobnature"
                            rules={[{ required: true, message: '请输入' }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Select placeholder="请选择">
                                {jobType.map(item =>
                                    <Select.Option value={item.value}>
                                        {item.label}
                                    </Select.Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="输入薪资范围"
                            name="salaryrange"
                            rules={[{ required: true, message: '请输入' }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Input placeholder="请输入薪资范围" />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                    >
                        <Form.Item
                            label="输入需求部门"
                            name="department"
                            rules={[{ required: false, message: '请输入' }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Input placeholder="请输入需求部门" defaultValue=""/>
                        </Form.Item>
                        <Form.Item
                            label="输入招聘区域"
                            name="recruitmentarea"
                            rules={[{ required: false, message: '请输入' }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                            initialValue={editInfo ? editInfo.recruitmentarea : "山东"}
                        >
                            <Input placeholder="山东（默认）" />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        label="输入投递邮箱"
                        name="deliverymail"
                        rules={[{ required: true, message: '请输入' }]}
                    >
                        <Input placeholder="请输入投递邮箱" />
                    </Form.Item>
                </Form>
            </Modal >
        )
    }
    return (
        <Spin spinning={allLoading}>
            <div className={styles.wrap}>
                <div className={styles.title} >人才招聘</div>
                <Tabs defaultActiveKey="1" tabBarExtraContent={<Button type='primary' onClick={() => setFormOpen(true)}><PlusOutlined />招聘岗位</Button>}>
                    <TabPane tab="招聘岗位" key="1">
                        <div className={styles.table}>{displayTable()}</div>
                    </TabPane>
                </Tabs>
                <div className={styles.form} id="recruitForm">{renderForm()}</div>
            </div>
        </Spin>
    );
};
