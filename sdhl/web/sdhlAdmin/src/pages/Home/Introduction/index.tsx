/* eslint-disable no-restricted-syntax */
/* eslint-disable react/react-in-jsx-scope */
import { useMyDispatch } from '@/utils/utils';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDynamicList, useMount } from 'ahooks';
import { Button, Form, Input, Spin, Tabs } from 'antd';
import React from 'react';
import { useSelector } from 'umi';
import styles from './index.less';

const { TabPane } = Tabs;
export default () => {
    //
    const { list: waterSupplyList, remove: remove1, getKey: getKey1, push: push1, resetList: resetList1 } = useDynamicList([{}, {}, {}, {}]);// 供排水设备
    const { list: waterPumpList, remove: remove2, getKey: getKey2, push: push2, resetList: resetList2 } = useDynamicList([{}, {}, {}, {}]);// 华立水泵
    const { list: sewageList, remove: remove3, getKey: getKey3, push: push3, resetList: resetList3 } = useDynamicList([{}, {}, {}, {}]);// 污水处理设备
    const { list: rawWaterList, remove: remove4, getKey: getKey4, push: push4, resetList: resetList4 } = useDynamicList([{}, {}, {}, {}]);// 原水处理净化设备
    const [form] = Form.useForm();
    // store state
    const { productionDocumentList = [] } = useSelector(state => state.introduction);
    const hasIDArray = productionDocumentList.map(item => item.id);
    // store action
    const [queryLoading, queryProductionDocumentList] = useMyDispatch('introduction/queryProductionDocumentList');
    const [saveLoading, saveProductionInfo] = useMyDispatch('introduction/addOrUdateProductionInfo');

    const allLoading = queryLoading || saveLoading;

    useMount(() => {
        queryList();
    })
    const handleFormValue = (parseFeature, key) => {
        const list = [];
        for (const entity of Object.entries(parseFeature)) {
            list.push({
                [`${key}Key`]: entity[0],
                [`${key}Name`]: entity[1]
            })
        }
        return list;
    }
    const setFormValue = (list, key) => {
        const value = {};
        const name = {};
        list.forEach((item, index) => {
            value[index] = item[`${key}Key`] || '';
            name[index] = item[`${key}Name`] || '';
        })
        form.setFieldsValue({
            [`${key}Key`]: value,
            [`${key}Name`]: name,
        });
    }
    // 查询
    const queryList = () => {
        queryProductionDocumentList()
            .then((data) => {
                data.forEach(item => {
                    const { type, feature } = item;
                    const parseFeature = JSON.parse(feature);
                    if (type == 1) { // 供排水设备
                        const list1 = handleFormValue(parseFeature, 'waterSupply');
                        console.log(list1);
                        if (list1.length) {
                            resetList1(list1);
                            setFormValue(list1, 'waterSupply');
                        } else {
                            resetList1([{}, {}, {}, {}]);
                        }
                    }
                    if (type == 2) {
                        const list2 = handleFormValue(parseFeature, 'waterPump');
                        if (list2.length) {
                            resetList2(list2);
                            setFormValue(list2, 'waterPump');
                        } else {
                            resetList2([{}, {}, {}, {}])
                        }
                    }
                    if (type == 3) {
                        const list3 = handleFormValue(parseFeature, 'sewage');
                        if (list3.length) {
                            resetList3(list3);
                            setFormValue(list3, 'sewage');
                        } else {
                            resetList3([{}, {}, {}, {}]);
                        }
                    }
                    if (type == 4) {
                        const list4 = handleFormValue(parseFeature, 'rawWater');
                        if (list4.length) {
                            resetList4(list4);
                            setFormValue(list4, 'rawWater');
                        } else {
                            resetList4([{}, {}, {}, {}]);
                        }
                    }
                })
            })
    }
    // 新增or更新
    const addOrUdateProductionInfo = (entity) => {
        console.log("addOrUdateProductionInfo: ",JSON.stringify(entity),",hasIDArray:",hasIDArray);
        saveProductionInfo({
            params: entity
        })
            .then((res) => {
                if (res) {
                    queryProductionDocumentList();
                }
            })
    }
    // 提交
    const submit = () => {
        form.validateFields()
            .then((values) => {
                console.log("entity value:",values);
                const entity = [];
                for (const key in values) {
                    if (key.includes('waterSupplyKey')) {// 供水 ，id 1，type:1,
                        const tem = {};
                        values.waterSupplyKey.forEach((item, index) => {
                            if (item) {
                                tem[item] = values.waterSupplyName[index] || "";
                            }
                        });
                        entity.push({
                            id: hasIDArray[0] ? hasIDArray[0] : undefined,
                            type: 1,
                            feature: tem
                        })
                    } else if (key.includes('waterPumpKey')) { // 水泵 ，id 2，type:2,
                        const tem = {};
                        values.waterPumpKey.forEach((item, index) => {
                            if (item) {
                                tem[item] = values.waterPumpName[index] || "";
                            }
                        });
                        entity.push({
                            id: hasIDArray[1] ? hasIDArray[1] : undefined,
                            type: 2,
                            feature: tem
                        })
                    } else if (key.includes('sewageKey')) { // 污水 ，id 3，type:3,
                        const tem = {};
                        values.sewageKey.forEach((item, index) => {
                            if (item) {
                                tem[item] = values.sewageName[index] || "";
                            }
                        });
                        entity.push({
                            id: hasIDArray[2] ? hasIDArray[2] : undefined,
                            type: 3,
                            feature: tem
                        })
                    } else if (key.includes('rawWaterKey')) { // ，id 4，type:4,
                        const tem = {};
                        values.rawWaterKey.forEach((item, index) => {
                            if (item) {
                                tem[item] = values.rawWaterName[index] || "";
                            }
                        });
                        entity.push({
                            id: hasIDArray[3] ? hasIDArray[3] : undefined,
                            type: 4,
                            feature: tem
                        })
                    }
                }
                console.log('提交', entity);
                addOrUdateProductionInfo(entity);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const renderForm = () => {
        const Row = (index: number, item: any, list: any, remove: any, getKey: any, push: any, key: string) => {
            return (
                <div className={styles.contain} key={getKey(index)}>
                    <Form.Item
                        className={styles.left}
                        rules={[{ required: false, message: "请输入" }]}
                        name={[`${key}Key`, getKey(index)]}
                    >
                        <Input placeholder={`请输入产品特点${index + 1}`} />
                    </Form.Item>
                    <Form.Item
                        className={styles.right}
                        rules={[{ required: false, message: "请输入" }]}
                        name={[`${key}Name`, getKey(index)]}
                    >
                        <Input placeholder="请描述该特点" defaultValue=""/>
                    </Form.Item>
                    <div className={styles.iconcontain}>
                        {list.length > 1 && (
                            <MinusCircleOutlined
                                className={styles.icon}
                                onClick={() => {
                                    remove(index);
                                }}
                            />
                        )}
                        <PlusCircleOutlined
                            className={styles.icon}
                            onClick={() => {
                                push({});
                            }}
                        />
                    </div>
                </div>
            );
        }
        return (
            <Form
                form={form}
                layout="vertical"
                name="introduction"
                requiredMark={false}
            >
                <Form.Item
                    label="1、供排水设备"
                >
                    {waterSupplyList.map((ele, index) => Row(index, ele, waterSupplyList, remove1, getKey1, push1, 'waterSupply'))}
                </Form.Item>
                <Form.Item
                    label="2、华立水泵"
                >
                    {waterPumpList.map((ele, index) => Row(index, ele, waterPumpList, remove2, getKey2, push2, 'waterPump'))}
                </Form.Item>
                <Form.Item
                    label="3、污水处理设备"
                >
                    {sewageList.map((ele, index) => Row(index, ele, sewageList, remove3, getKey3, push3, 'sewage'))}
                </Form.Item>
                <Form.Item
                    label="4、原水净化设备"
                >
                    {rawWaterList.map((ele, index) => Row(index, ele, rawWaterList, remove4, getKey4, push4, 'rawWater'))}
                </Form.Item>
            </Form>
        )
    }
    return (
        <Spin spinning={allLoading}>
            <div className={styles.wrap}>
                <div className={styles.title}>产品介绍文案</div>
                <Tabs defaultActiveKey="1" tabBarExtraContent={<Button type='primary' onClick={submit}>保存</Button>}>
                    <TabPane tab="产品介绍文案" key="1">
                        <div className={styles.form}>{renderForm()}</div>
                    </TabPane>
                </Tabs>
            </div>
        </Spin>
    );
};
