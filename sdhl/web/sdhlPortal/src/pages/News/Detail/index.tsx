
import { webApi } from '@/common/constants';
import TextFooter from '@/pages/Home/HomeFooter/TextFooter';
import HomeHeader from '@/pages/Home/HomeHeader';
import { historyPush, useMyDispatch } from '@/utils/utils';
import { WechatFilled, WeiboSquareFilled } from '@ant-design/icons';
import { Spin } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { history, useSelector } from 'umi';
import "./index.less";


export default (props) => {
  const { publishInfoList = [], newsDetailInfo = {} } = useSelector(state => state.news);
  const [queryLoading, queryInformationListForFront] = useMyDispatch('news/queryInformationListForFront');
  const [detailLoading, queryInformationDetail] = useMyDispatch('news/queryInformationDetail');
  const [, updateReadingCount] = useMyDispatch('news/updateReadingCount');

  const [curIndex, setCurIndex] = useState(0);
  const { id } = props.history.location.query;
  useEffect(() => {
    queryInformationDetail({
      id
    }).then(data => {
      // console.log(data);
      if (publishInfoList.length) {
        const index = publishInfoList.findIndex(item => item.id == id);
        setCurIndex(index);
      }
    })
    updateReadingCount({
      id
    })
  }, [id]);
  useEffect(() => {
    queryInformationListForFront({
      pageInfo: {
        pageIndex: 1,
        pageSize: 100000
      },
      columnists: 0,
    }).then(data => {
      // console.log(data);
      const index = data.findIndex(item => item.id == id);
      setCurIndex(index);
    })
  }, []);

  // console.log(id, curIndex, publishInfoList);
  const preDetail = publishInfoList[curIndex - 1] || {};
  const nextDetail = publishInfoList[curIndex + 1] || {};
  const openOtherDetail = (id) => {
    console.log('clcik', id)
    history.push(`/news/detail?id=${id}`);
  }
  return (
    <Spin spinning={detailLoading || queryLoading || false} tip="加载中...">
      <div className="newsDeatilWarper">
        <div className="header">
          <HomeHeader />
        </div>
        <div className="content">
          <div className="newsContent">
            <div className="title">
              {newsDetailInfo.title || `最美“逆行者”！潍坊青州供水保障小组开赴武汉雷神山`}
            </div>
            <div className="label">
              <div className="origin">
                {`${newsDetailInfo.origin || '原创文章'}.${moment(newsDetailInfo.pubdate).format('YYYY-MM-DD hh:mm:ss')}`}
              </div>
              <div className="share">
                分享至
              <WechatFilled style={{ fontSize: '24px', color: '#4CBF00' }} />
                <WeiboSquareFilled style={{ fontSize: '24px', color: '#E71F19' }} />
              </div>
            </div>
            <div className="headImg">
              <img className="img" src={`${webApi.api}${newsDetailInfo.headimg}`} />
            </div>
            <div className="text" dangerouslySetInnerHTML={{ __html: newsDetailInfo.content || '无内容' }}></div>
          </div>
          <div className="right">
            <div className="moreLink" onClick={() => historyPush('/news')}></div>
            {curIndex !== 0 && <div className="newsCard" onClick={() => openOtherDetail(preDetail.id)}>
              <div className="prev">
                上一篇
            </div>
              <div className='contentWrap'>
                <div className="title">
                  {preDetail.title}
                </div>
                <div className="content">
                  <div style={{ wordBreak: 'break-all' }} dangerouslySetInnerHTML={{ __html: preDetail.summary || '无内容' }}></div>
                </div>
                <div className="pubDate">
                  {moment(preDetail.pubdate).format('YYYY-MM-DD hh:mm:ss')}
                </div>
              </div>
            </div>}
            {curIndex != publishInfoList.length - 1 && <div className="newsCard" onClick={() => openOtherDetail(nextDetail.id)}>
              <div className="prev">
                下一篇
            </div>
              <div className='contentWrap'>
                <div className="title">
                  {nextDetail.title}
                </div>
                <div className="content">
                  <div style={{ wordBreak: 'break-all' }} dangerouslySetInnerHTML={{ __html: nextDetail.summary || '无内容' }}></div>
                </div>
                <div className="pubDate">
                  {moment(nextDetail.pubdate).format('YYYY-MM-DD hh:mm:ss')}
                </div>
              </div>
            </div>}
          </div>
        </div>
        <TextFooter />
      </div>
    </Spin>
  );
}
