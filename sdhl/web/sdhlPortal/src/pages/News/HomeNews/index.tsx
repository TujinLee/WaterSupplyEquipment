import homenewslink from '@/assets/homenewlink.png';
import { webApi } from '@/common/constants';
import { historyPush, useMyDispatch } from '@/utils/utils';
import { Radio } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { history, useSelector } from 'umi';
import "./index.less";

export default (props) => {
  const { from } = props;
  // console.log(from);
  const { homenewsList = [] } = useSelector(state => state.news);
  const [showNewList, setShowNewList] = useState([]);
  const [queryLoading, queryRecentNews] = useMyDispatch('news/queryRecentNews');
  const [first, setFirst] = useState({});
  const [second, setSecond] = useState({});
  const [third, setThird] = useState({});
  useEffect(() => {
    queryRecentNews({
      queryType: from === "home" ? 1 : 2,
      queryCount: 5,
    }).then((newsList = []) => {
      // console.log('newsList', newsList);
      setShowNewList(newsList);
      setFirst(newsList[0]);
      setSecond(newsList[1]);
      setThird(newsList[2]);
    });
  }, []);
  const options = [
    { label: '01', value: '1' },
    { label: '02', value: '2' },
    { label: '03', value: '3' },
  ];
  const changeShowNewlist = (e) => {
    // console.log(e);
    const { value } = e.target;
    // console.log(value);
    if (value == 1) {
      setFirst(showNewList[0]);
    } else if (value == 2) {
      setFirst(showNewList[3]);
    } else {
      setFirst(showNewList[4]);
    }
  }
  const isFromNews = from == 'news';
  const openNewsDetail = (id) => {
    historyPush(`/news/detail?id=${id}`);
  }
  return (
    <div className="homenewsWarper" style={isFromNews ? { background: 'unset', paddingTop: 30, paddingBottom: 30 } : {}}>
      <div className={classNames("title", isFromNews ? 'unshow' : '')}>资讯中心</div>
      <div className={classNames("morelink", isFromNews ? 'unshow' : '')}>
        <img src={homenewslink} /><span className='mr' onClick={() => history.push('/news')}>查看更多资讯动态</span>
      </div>
      <div className="news">
        <div className="left">
          <div className="newsRadio">
            <Radio.Group
              defaultValue="1"
              options={options}
              optionType="button"
              onChange={changeShowNewlist}
            />
          </div>
          <img src={`${webApi.api}${first && first.headimg}`} onClick={() => openNewsDetail(first && first.id)} />
          <div className={isFromNews ? "newsTitle" : "newstitle"}>
            {first && first.title}
          </div>
        </div>
        <div className="right">
          <div className={classNames("item", isFromNews ? 'mb' : 'mbHomes')} style={{ height: isFromNews ? 250 : 260 }} onClick={() => openNewsDetail(second && second.id)}>
            <img src={`${webApi.api}${second && second.headimg}`} />
            <div className={isFromNews ? "newsTitle" : "newstitle"}>
              {second && second.title}
            </div>
          </div>
          <div className="item" style={{ height: isFromNews ? 250 : 260 }} onClick={() => openNewsDetail(third && third.id)}>
            <img src={`${webApi.api}${third && third.headimg}`} />
            <div className={isFromNews ? "newsTitle" : "newstitle"}>
              {third && third.title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
