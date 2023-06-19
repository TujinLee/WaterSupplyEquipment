// import News from './News';
import { webApi } from '@/common/constants';
import News from '@/pages/News/HomeNews';
import { useMyDispatch } from '@/utils/utils';
import React, { useEffect } from 'react';
import SwiperCore, { A11y, Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
// import 'swiper/components/pagination/pagination.less';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.less';
import 'swiper/swiper-bundle.min.css';
import { useSelector } from 'umi';
import Bussines from './Bussines';
import HomeFooter from './HomeFooter';
import HomeHeader from './HomeHeader';
import './index.less';
import Product from './Product';
import TechAndServices from './TechAndServices';



SwiperCore.use([A11y, Autoplay, Navigation, Pagination, EffectFade]);

export default () => {
  // store state
  const { homeBannerList = [] } = useSelector(state => state.home);
  // store action    
  const [queryLoading, queryHomeBannerList] = useMyDispatch('home/queryHomeBannerList');

  useEffect(() => {
    queryHomeBannerList();
  }, []);

  const contentStyle = {
    cursor: 'pointer',
  };
  return (
    <div className="homeWrap">
      <HomeHeader />
      <Swiper
        className="swiper"
        autoplay={{
          disableOnInteraction: false,
          delay: 10000,
        }}
        speed={1000}
        allowTouchMove
        slidesPerView={1}
        pagination={{
          clickable: true,
          type: 'bullets',
          // el: '.swiper-pagination',
          // bulletClass: 'my-bullet',//需设置.my-bullet样式
          // bulletActiveClass: 'my-bullet-active',
          renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
          }
        }}
        effect="slide"
      >
        {homeBannerList.map((item) =>
          <SwiperSlide>
            <img
              src={`${webApi.api}${item.img}`} onClick={item.link ? () => { window.open(item.link, '_blank'); } : () => { }}
              style={item.link ? contentStyle : {}}
            />
          </SwiperSlide>
        )}
      </Swiper>
      <Bussines />
      <TechAndServices />
      <Product />
      <News from="home" />
      <HomeFooter />
    </div>
  );
}
