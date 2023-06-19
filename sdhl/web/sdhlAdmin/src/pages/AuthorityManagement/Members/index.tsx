import { authorityText, authorityType, deptText, deptType, permissiondescriptionType } from '@/common/enums';
import globalStyles from '@/global.less';
import { useMyDispatch } from '@/utils/utils';
/* eslint-disable react/react-in-jsx-scope */
import { PlusOutlined } from '@ant-design/icons';
import { useMount } from "ahooks";
import { Button, Divider, Form, Input, Modal, Select, Spin, Table, Tabs } from 'antd';
import classnames from 'classnames';
import React, { useState } from 'react';
import { useSelector } from 'umi';
import styles from './index.less';


const { TabPane } = Tabs;

export default () => {
    //
    const [formOpen, setFormOpen] = useState(false);
    const [editInfo, setEditInfo] = useState(null);
    const [form] = Form.useForm();
    // store state
    const { userList = [] } = useSelector(state => state.authority);
    const { userInfo } = useSelector(state => state.login);
    // store action
    const [queryLoading, queryAdminList] = useMyDispatch('authority/queryAdminList');
    const [saveLoading, addOrUdateUserInfo] = useMyDispatch('authority/addOrUdateUserInfo');
    const allLoading = queryLoading || saveLoading;

    useMount(() => {
        queryList();
    })

    // 查询成员列表
    const queryList = () => {
        if (Object.keys(userInfo).length) {
            queryAdminList({
                userInfo
            });
        }
    }

    // 新增or更新
    const saveUserInfo = (entity) => {
        console.log('提交', entity);
        addOrUdateUserInfo({
            params: entity
        })
            .then((res) => {
                if (res) {
                    setFormOpen(false);
                    queryList();
                    setEditInfo(null);
                    form.resetFields();
                }
            })
    }

    const displayTable = () => {
        const columns = [
            {
                title: '名字',
                dataIndex: 'name',
                key: 'name',
                width: 100,
            },
            {
                title: '登录账号',
                dataIndex: 'account',
                key: 'account',
                render: (text, record) => <>
                    <div>{`账号：${text}`}</div>
                    <div>{`密码：${record.password}`}</div>
                </>
            },
            {
                title: '部门',
                dataIndex: 'department',
                key: 'department',
                width: 150,
                render: (text) => deptText[text]
            },
            {
                title: '权限',
                dataIndex: 'role',
                key: 'role',
                render: (text) => authorityText[text]
            },
            {
                title: '权限描述',
                dataIndex: 'permissiondescription',
                key: 'permissiondescription',
                width: 180,
            },
            {
                title: '操作',
                dataIndex: 'id',
                key: 'id',
                width: 180,
                render: (text, record) => {
                    const { unused, deleted, department, role } = record;

                    return (
                        <>
                            <div>
                                <a
                                    className={classnames(globalStyles.redlink)}
                                    onClick={() => {
                                        const editEntity = { ...record, department: department + '', role: role + '' };
                                        setEditInfo(editEntity);
                                        form.setFieldsValue({
                                            ...editEntity
                                        })
                                        setFormOpen(true);
                                    }}>编辑</a>
                                <Divider type="vertical" />
                                <a
                                    className={classnames(!unused ? globalStyles.graylink : globalStyles.bluelink)}
                                    onClick={() => saveUserInfo({ adminId: userInfo.id, userInfo: { ...record, unused: unused ? 0 : 1 } })}>{unused ? '启用' : '停用'}</a>
                                {deleted ?
                                    ''
                                    :
                                    <>
                                        <Divider type="vertical" />
                                        <a
                                            className={classnames(globalStyles.bluelink)}
                                            onClick={() => saveUserInfo({ adminId: userInfo.id, userInfo: { ...record, deleted: 1 } })}>删除</a>
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
                <Table dataSource={userList} columns={columns} pagination={false} />
            </>
        );
    }

    const productForm = () => {
        return (
            <Modal
                visible={formOpen}
                title="管理员信息"
                okText="保存"
                cancelText="取消"
                onCancel={() => { setFormOpen(false); form.resetFields(); }}
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            // form.resetFields();
                            console.log(values);
                            const { department, role } = values;
                            saveUserInfo({
                                adminId: 1,
                                userInfo: {
                                    ...values,
                                    permissiondescription: permissiondescriptionType[department][role],
                                    role: role * 1,
                                    department: department * 1,
                                    id: editInfo ? editInfo.id : undefined
                                }
                            });
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="user"
                // initialValues={editInfo}
                >
                    <Form.Item
                        label="输入成员姓名"
                        name="name"
                        rules={[{ required: true, message: '请输入姓名' }]}
                    >
                        <Input placeholder="请输入姓名" />
                    </Form.Item>
                    <Form.Item
                        label="请输入账号密码"
                    >
                        <Form.Item
                            name="account"
                            rules={[{ required: true }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: 16 }}
                        >
                            <Input placeholder="请输入手机号" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Input placeholder="请输入密码" />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        label="请选择部门，并设定权限"
                    >
                        <Form.Item
                            name="department"
                            rules={[{ required: true }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: 16 }}
                        >
                            <Select placeholder="请选择部门" allowClear>
                                {deptType.map(item =>
                                    <Select.Option value={item.value}>
                                        {item.label}
                                    </Select.Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="role"
                            rules={[{ required: true }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Select placeholder="请设置权限" allowClear>
                                {authorityType.map(item =>
                                    <Select.Option value={item.value}>
                                        {item.label}
                                    </Select.Option>)}
                            </Select>
                        </Form.Item>
                    </Form.Item>
                </Form>
            </Modal >
        )
    }
    return (
        <Spin spinning={allLoading}>
            <div className={styles.wrap}>
                <div className={styles.title}>成员管理</div>
                <Tabs defaultActiveKey="1" tabBarExtraContent={<Button type='primary' onClick={() => setFormOpen(true)}><PlusOutlined />录入管理员</Button>}>
                    <TabPane tab="管理员列表" key="1">
                        <div className={styles.table}>{displayTable()}</div>
                    </TabPane>
                </Tabs>
                <>{productForm()}</>
            </div>
        </Spin>
    );
};