
import { webApi } from '@/common/constants';
import { columnType } from '@/common/enums';
import ViewButton from '@/components/ViewButton';
import TextFooter from '@/pages/Home/HomeFooter/TextFooter';
import HomeHeader from '@/pages/Home/HomeHeader';
import { useMyDispatch } from '@/utils/utils';
import { Spin, Tabs } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { history, useSelector } from 'umi';
import HomeNews from './HomeNews';
import "./index.less";
const { TabPane } = Tabs;
const stepPageSize = 10; //每次加载的数目
export default () => {
  // store state
  const [activeKey, setActiveKey] = useState<number>(1); //tabKey
  const [pageSize, setPageSize] = useState<number>(stepPageSize); //分页
  const { publishInfoList = [], pageInfo = {} } = useSelector(state => state.news);
  // store action
  const [queryLoading, queryInformationListForFront] = useMyDispatch('news/queryInformationListForFront');
  useEffect(() => {
    queryInformationListForFront({
      pageInfo: {
        pageIndex: 1,
        pageSize: pageSize
      },
      columnists: activeKey,
    })
  }, [activeKey, pageSize]);
  //每次
  const tabcallback = (key: any) => {
    // console.log(key);
    setActiveKey(key);
    setPageSize(stepPageSize);
  }
  //查看更多
  const viewMoreNews = () => {
    setPageSize(pageSize + stepPageSize);
  }
  const openNewsDetail = (id) => {
    history.push(`/news/detail?id=${id}`);
  }
  // console.log('publishInfoList', publishInfoList);
  return (
    <Spin spinning={queryLoading} tip="请稍候...">
      <div className="newsWarper">
        <div className="menu">
          <HomeHeader />
        </div>
        <HomeNews from='news' />
        <div className="tabNews">
          <Tabs defaultActiveKey="企业动态" onChange={tabcallback} size="large">
            {columnType.map(item => (
              <TabPane tab={item.label} key={item.value}>
                {publishInfoList.sort((a, b) => new Date(b.pubdate).getTime() - new Date(a.pubdate).getTime()).map((each) => (
                  <div className="newsUI" onClick={each.articlelink ? () => window.open(each.articlelink, '_blank') : () => openNewsDetail(each.id)} key={each.id}>
                    <div className="imgContent">
                      <img className="img" src={`${webApi.api}${each.headimg}`} alt="图片" />
                    </div>
                    <div className="textContent">
                      <div className="title">
                        {each.title || '标题'}
                      </div>
                      <div className="mainbody">
                        <div style={{ wordBreak: 'break-all' }} dangerouslySetInnerHTML={{ __html: each.summary || '无内容' }}></div>
                      </div>
                      <div className="footer">
                        <div className="origin">
                          {`文章来源：${each.origin ? each.origin : (each.articlelink ? '链接文章' : '无')}`}
                        </div>
                        <div>
                          {moment(each.pubdate).fromNow()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </TabPane>
            ))}
          </Tabs>
        </div>
        {(pageInfo.TotalCount && pageInfo.TotalCount > pageSize) && <div onClick={viewMoreNews}>
          <ViewButton children="查看更多" style={{ margin: '0 auto', marginTop: 30 }} />
        </div>}
        <TextFooter />
      </div>
    </Spin>
  );
}
