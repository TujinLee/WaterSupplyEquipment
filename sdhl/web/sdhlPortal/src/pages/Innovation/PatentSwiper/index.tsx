import patent201412 from '@/assets/2014.12.png'
import patent201510 from '@/assets/2015.10.png'
import patent201606 from '@/assets/2016.06.png'
import patent201706 from '@/assets/2017.06.png'
import patent20170601 from '@/assets/2017.0601.png'
import patent201712 from '@/assets/2017.12.png'
import patent201906 from '@/assets/2019.06.png'
import patent202006 from '@/assets/2020.06.png'
import React from 'react'
import SwiperCore, { A11y, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.less'
import './index.less'

SwiperCore.use([A11y, Autoplay]);

interface props {
    onSwiperChange: (swiper: Swiper) => {}
}

export default (props: props) => {
    const { onSwiperChange } = props;
    return (
        <div id="certify">
            <Swiper
                className="swiper-container"
                slidesPerView={'auto'}
                loop
                loopedSlides={8}
                speed={1000}
                // autoplay
                // initialSlide={14}
                centeredSlides
                watchSlidesProgress
                allowSlideNext
                allowSlidePrev
                slideToClickedSlide
                onSlideChange={(swiper) => onSwiperChange(swiper)}
                onProgress={(swiper, progress) => {
                    const slides = swiper.slides;
                    for (let i = 0; i < slides.length; i++) {
                        var slide = slides.eq(i);
                        var slideProgress = slides[i].progress;
                        let modify = 1;
                        if (Math.abs(slideProgress) > 1) {
                            modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                        }
                        let translate = slideProgress * modify * 160 + 'px';
                        let scale = 1 - Math.abs(slideProgress) / 8;
                        let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                        slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                        slide.css('zIndex', zIndex);
                        slide.css('opacity', 1);
                        if (Math.abs(slideProgress) > 3) {
                            slide.css('opacity', 0);
                        }
                    }
                }}
                onSetTransition={(swiper, transition) => {
                    const slides = swiper.slides;
                    for (let i = 0; i < slides.length; i++) {
                        let slide = slides.eq(i)
                        slide.transition(transition);
                    }
                }}
            >
                <SwiperSlide className="swiper-slide">
                    <img src={patent202006} />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                    <img src={patent201906} />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                    <img src={patent201712} />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                    <img src={patent20170601} />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                    <img src={patent201706} />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                    <img src={patent201606} />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                    <img src={patent201510} />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                    <img src={patent201412} />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}