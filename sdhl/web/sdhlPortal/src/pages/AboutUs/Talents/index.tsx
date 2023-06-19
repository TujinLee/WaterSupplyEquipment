import culture from '@/assets/culture.png'
import fuli from '@/assets/fuli.png'
import lanqiu from '@/assets/lanqiu.png'
import nianhui from '@/assets/nianhui.png'
import qinzi from '@/assets/qinzi.png'
import tuanjian from '@/assets/tuanjian.png'
import zhishu from '@/assets/zhishu.png'
import Table from '@/components/Table'
import { useMyDispatch } from '@/utils/utils'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useSelector } from 'umi'
import './index.less'

export default () => {
    const [queryLoading, queryRecruitmentList] = useMyDispatch('recruit/queryRecruitmentList');
    const { recruitList = [] } = useSelector(state => state.recruit);
    useEffect(() => {
        queryRecruitmentList({});
    }, [])

    const activity = [{
        img: nianhui,
        text: '公司年会'
    }, {
        img: lanqiu,
        text: '篮球比赛'
    }, {
        img: tuanjian,
        text: '团建活动'
    }, {
        img: zhishu,
        text: '植树活动'
    }, {
        img: fuli,
        text: '节日福利'
    }, {
        img: qinzi,
        text: '亲子活动'
    }];
    const columns = [
        { title: '职位名称', dataIndex: 'positiontitle', align: "center" },
        { title: '职位类型', dataIndex: 'jobtype', align: "center" },
        { title: '招聘人数', dataIndex: 'recruitsnums', align: "center" },
        { title: '就职地点', dataIndex: 'jobbase', align: "center" },
        { title: '更新时间', dataIndex: 'opdate', align: "center", render: (text) => moment(text).format('YYYY-MM-DD') },
    ];

    const displayExtra = (record) => {
        return (
            <div key={record.id + 'each'} className="moreInfo">
                <div className="couple">
                    <div className="item">
                        <div className="title">
                            工作性质
                        </div>
                        <div className="label">
                            {record.jobnature}
                        </div>
                    </div>
                    <div className="item">
                        <div className="title">
                            薪资范围
                        </div>
                        <div className="label">
                            {record.salaryrange}
                        </div>
                    </div>
                    <div className="item">
                        <div className="title">
                            需求部门
                        </div>
                        <div className="label">
                            {record.department}
                        </div>
                    </div>
                    <div className="item">
                        <div className="title">
                            就职地点
                        </div>
                        <div className="label">
                            {record.jobbase}
                        </div>
                    </div>
                    <div className="item">
                        <div className="title">
                            职位类型
                        </div>
                        <div className="label">
                            {record.jobtype}
                        </div>
                    </div>
                    <div className="item">
                        <div className="title">
                            招聘区域
                        </div>
                        <div className="label">
                            {record.recruitmentarea}
                        </div>
                    </div>
                </div>
                <div>
                    <div>工作职责：</div>
                    <pre style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                        {record.jobresponsibilities}
                    </pre>
                </div>
                <div className="mail">
                    <span> 投递邮箱：</span><a href={`mailto:${record.deliverymail}`}>{record.deliverymail}</a>
                </div>
            </div>
        )
    }
    return (
        <div className="talents">
            <div className="talentsCenter">
                <div className="text">
                    <div className="title">
                        人才中心
                    </div>
                    <div className="others">
                        我们建立了多样化的人才引进渠道，在全国范围内诚聘英才。各位华立人被视为公司最宝贵的资产，欢迎您加入华立团队
                    </div>
                    <div className="others">
                        求职邮箱：1121632533@qq.com<br />
                        官方微信：山东华立供水
                    </div>
                </div>
            </div>
            <div className="table">
                <Table
                    rowKey={record => record.id}
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => <div style={{ margin: 0 }}>{displayExtra(record)}</div>,
                        expandIcon: ({ expanded, onExpand, record }) =>
                            expanded ? (
                                <UpOutlined onClick={e => onExpand(record, e)} />
                            ) : (
                                    <DownOutlined onClick={e => onExpand(record, e)} />
                                ),
                        onExpand: (expanded, record) => console.log(expanded, record),
                        expandIconColumnIndex: 6
                    }}
                    dataSource={recruitList || []}
                    pagination={false}
                />
            </div>
            <img src={culture} alt="文化" style={{ width: '100%' }} />
            <div className="photoList">
                {activity.map((item, index) => (
                    <div className="card" key={index}>
                        <img src={item.img} className="img" />
                        <div className="title">
                            {item.text}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}