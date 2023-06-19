import academician from '@/assets/academician.png';
import brand from '@/assets/brand.png';
import demonstration from '@/assets/demonstration.png';
import highTech from '@/assets/highTech.png';
import leader from '@/assets/leader.png';
import redcircle from '@/assets/redcircle.png';
import research from '@/assets/research.png';
import sincerity from '@/assets/sincerity.png';
import team from '@/assets/team.png';
import trademark from '@/assets/trademark.png';
import writecircle from '@/assets/writecircle.png';
import ImageViewer from '@/components/ImageViewer';
import ImgCard from '@/components/ImgCard';
import ProductCard from '@/components/ProductCard';
import classNames from 'classnames';
import React, { useState } from 'react';
import PatentSwiper from '../PatentSwiper';
import './index.less';


const { Content, Footer } = ProductCard;

export default () => {
    const [swiper, setSwiper] = useState({});
    const [activeIndex, setActiveIndex] = useState(0);
    const onSwiperChange = (swiper) => {
        console.log(swiper);
        setSwiper(swiper);
        setActiveIndex(swiper.activeIndex % 8);
    }

    return (
        <div className="tech">
            {/* 创新基地 */}
            <div className="baseTitle">
                <div className="firstTitle">创新之基</div>
                <div className="secondTitle">持之以恒地进行研发投入和团队建设，开发创新性产品，引领行业进步与变革</div>
            </div>
            <div className="basemain">
                <div className="left">
                    <div className="title">
                        研发团队
                    </div>
                    <div className="text">
                        作为高新技术企业，华立始终秉承“科技是第一生产力”的理念，注重研发投入和人才培育。公司现有各级技术人员135人，全部来自国内外顶尖高校，人才云集，实力雄厚，带动生产经营活动朝着科技化、系统化、智慧化的高精尖方向发展。
                    </div>
                </div>
                <div className="right">
                    <img src={team} className="img" alt="图片" />
                </div>
            </div>
            {/* 荣誉奖励 */}
            <div className="otherInfo">
                <div className="eachWrap">
                    <div className="title">产学研结合</div>
                    <ProductCard className="each">
                        <Content className="cardContent">
                            <img src={research} alt="图片" />
                        </Content>
                        <Footer className="cardFoot">
                            <div className="text">
                                华立主张企业提供相应岗位给高校同学进行实践学习，高校将最前沿的研究理论运用到企业生产制造中。校企携手，让更多的智慧群体汇集到一起，共同培育优秀人才，共同深入产品研发，从而推动行业发展、促进学生就业、提升科研实力。
                                </div>
                        </Footer>
                    </ProductCard>
                </div>
                <div className="eachWrap">
                    <div className="title">院士联络站</div>
                    <ProductCard className="each">
                        <Content className="cardContent">
                            <img src={academician} alt="图片" />
                        </Content>
                        <Footer className="cardFoot">
                            <div className="text">
                                华立不断突破创新，力图走在时代前沿，在发展中持续创造，在创造中持续发展。院士联络站的建立，令顶尖科研力量赋能产品研发，不断攻克技术难题，助力水务行业快速、健康发展。
                            </div>
                        </Footer>
                    </ProductCard>
                </div>
            </div>
            <div className="honor">
                <div className="firstTitle">荣誉奖励</div>
                <div className="secondTitle">既是对我们的认可与肯定，又是激发我们不懈探索的动力</div>
                <div className="card">
                    <ImgCard className="item">
                        <ImgCard.Content>
                            <ImageViewer src={highTech} alt="图片" />
                        </ImgCard.Content>
                        <ImgCard.ContentMask />
                        <ImgCard.Footer>
                            高新技术企业
                       </ImgCard.Footer>
                    </ImgCard>
                    <ImgCard className="item">
                        <ImgCard.Content>
                            <ImageViewer src={demonstration} alt="图片" />
                        </ImgCard.Content>
                        <ImgCard.ContentMask />
                        <ImgCard.Footer>
                            全国科技创新示范单位
                       </ImgCard.Footer>
                    </ImgCard>
                    <ImgCard className="item">
                        <ImgCard.Content>
                            <ImageViewer src={brand} alt="图片" />
                        </ImgCard.Content>
                        <ImgCard.ContentMask />
                        <ImgCard.Footer>
                            中国著名品牌
                       </ImgCard.Footer>
                    </ImgCard>
                    <ImgCard className="item">
                        <ImgCard.Content>
                            <ImageViewer src={leader} alt="图片" />
                        </ImgCard.Content>
                        <ImgCard.ContentMask />
                        <ImgCard.Footer>
                            全国给排水行业质量领军企业
                       </ImgCard.Footer>
                    </ImgCard>
                    <ImgCard className="item">
                        <ImgCard.Content>
                            <ImageViewer src={trademark} alt="图片" />
                        </ImgCard.Content>
                        <ImgCard.ContentMask />
                        <ImgCard.Footer>
                            中国驰名商标
                       </ImgCard.Footer>
                    </ImgCard>
                    <ImgCard className="item">
                        <ImgCard.Content>
                            <ImageViewer src={sincerity} alt="图片" />
                        </ImgCard.Content>
                        <ImgCard.ContentMask />
                        <ImgCard.Footer>
                            全国诚信企业
                       </ImgCard.Footer>
                    </ImgCard>
                </div>
            </div>
            {/* 核心专利 */}
            <div className="patent">
                <div className="title">
                    获邀参与<span className="red">2</span>项国家标准制定
                </div>
                <div className="smallTittleWrap">
                    <div className="smallTitle">
                        《管网叠压供水设备》国家标准
                    </div>
                </div>
                <div className="smallTittleWrap rightTitle">
                    <div className="smallTitle">
                        《绿色建材评价标准——给排水设备》
                    </div>
                </div>
                <div className="list">
                    <div className="firstTitle">
                        核心专利
                    </div>
                    <div className="secondTitle">
                        公司已成功申请20多个发明专利与使用新型专利
                    </div>
                    <div className="patentList">
                        <div className="left">
                            <div className={classNames("item", { reditem: activeIndex == 0 })} onClick={() => swiper.slideTo(8)}>
                                <img className={classNames("img")} src={activeIndex == 0 ? redcircle : writecircle} />
                                <div className={classNames("year")}>2020年</div>
                                <ul className={classNames("text")}>
                                    <li>· 一体化污水提升设备</li>
                                </ul>
                            </div>
                            <div className={classNames("item", { reditem: activeIndex == 1 })} onClick={() => swiper.slideTo(9)}>
                                <img className="img" src={activeIndex == 1 ? redcircle : writecircle} />
                                <div className="year">2019年</div>
                                <ul className="text">
                                    <li>· 一种无负压给水设备的单变频自动控制系统 </li>
                                </ul>
                            </div>
                            <div className={classNames("item", { reditem: activeIndex == 2 || activeIndex == 3 || activeIndex == 4 })} >
                                <img className="img" src={activeIndex == 2 || activeIndex == 3 || activeIndex == 4 ? redcircle : writecircle} />
                                <div className="year">2017年</div>
                                <ul className="text">
                                    <li style={activeIndex !== 2 ? { color: "#ffffff" } : {}} onClick={() => swiper.slideTo(10)}>· 一种立卧一体式污水处理系统</li>
                                    <li style={activeIndex !== 3 ? { color: "#ffffff" } : {}} onClick={() => swiper.slideTo(11)}>· 一种间歇性供水总阀 </li>
                                    <li style={activeIndex !== 4 ? { color: "#ffffff" } : {}} onClick={() => swiper.slideTo(12)}>· 一种供水系统 </li>
                                </ul>
                            </div>
                            <div className={classNames("item", { reditem: activeIndex == 5 })} onClick={() => swiper.slideTo(13)}>
                                <img className="img" src={activeIndex == 5 ? redcircle : writecircle} />
                                <div className="year">2016年</div>
                                <ul className="text">
                                    <li>· 一种节能型供水系统</li>
                                </ul>
                            </div>
                            <div className={classNames("item", { reditem: activeIndex == 6 })} onClick={() => swiper.slideTo(14)}>
                                <img className="img" src={activeIndex == 6 ? redcircle : writecircle} />
                                <div className="year">2015年</div>
                                <ul className="text">
                                    <li>· 双密封无负压供水真空抑制器</li>
                                </ul>
                            </div>
                            <div className={classNames("item", { reditem: activeIndex == 7 })} onClick={() => swiper.slideTo(15)}>
                                <img className="img" src={activeIndex == 7 ? redcircle : writecircle} />
                                <div className="year">2014年</div>
                                <ul className="text">
                                    <li>· 一种无负压管网增压稳流自动控制器</li>
                                </ul>
                            </div>
                        </div>
                        <div className="right">
                            <PatentSwiper onSwiperChange={onSwiperChange} />
                            {/* <div className="text">关于供水设备性能提升的改进方案</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}