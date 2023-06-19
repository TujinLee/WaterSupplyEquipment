import hometec1 from "@/assets/hometec1.png";
import hometec2 from "@/assets/hometec2.png";
import hometec3 from "@/assets/hometec3.png";
import hometec4 from "@/assets/hometec4.png";
import hometec5 from "@/assets/hometec5.png";
import viewRight from "@/assets/viewRight.png";
import DisplayCard from '@/components/DisplayCard';
import React from 'react';
import { history } from 'umi';
import "./index.less";


const { Content, ContentMask, FooterMask, Footer } = DisplayCard;
/*首页可靠的技术保障与优质的全程服务组件*/
export default () => {
  return (
    <div className="tecandserviceWarper">
      <div className="title">可靠的技术保障与优质的全程服务</div>
      <div className="subtitle">为您项目的成功护航</div>
      <div className="showcard">
        <div className="left">
          <img className="img" src={hometec5} />
        </div>

        <DisplayCard className='card'>
          <Content>
            <img className="img1" src={hometec1} />
          </Content>
          <ContentMask>
            <div className="cardcontent">
              <div className="titleDes">健全的产品与管理认证体系</div>
              <div>20+质量管理认证资质</div>
              <div>20+产品质量认证资质 </div>
              <div>10+生产环境与职业健康认证资质</div>
              <div>标准化质量管理体系</div>
            </div>
          </ContentMask>
          <Footer>
            健全的产品与管理认证体系
              </Footer>
          <FooterMask>
            <div className="cardfoot" onClick={() => history.push('/innovation#Quality')}>
              <span className="link" >点击查看</span>
              <img className="arrow" src={viewRight} alt="右箭头" />
            </div>
          </FooterMask>
        </DisplayCard>
        <DisplayCard className='card'>
          <Content>
            <img className="img2" src={hometec2} />
          </Content>
          <ContentMask>
            <div className="cardcontent">
              <div className="titleDes">研发创新与技术服务</div>
              <div>50位研发骨干</div>
              <div>20+专利技术</div>
              <div>135人技术服务团队  </div>
              <div>产学研合作、省级科研中心</div>
            </div>
          </ContentMask>
          <Footer>
            研发创新与技术服务
              </Footer>
          <FooterMask>
            <div className="cardfoot" onClick={() => history.push('/innovation')}>
              <span className="link">点击查看</span>
              <img className="arrow" src={viewRight} alt="右箭头" />
            </div>
          </FooterMask>
        </DisplayCard>
        <DisplayCard className='card'>
          <Content>
            <img className="img1" src={hometec3} />
          </Content>
          <ContentMask>
            <div className="cardcontent">
              <div className="titleDes">工程项目与实例流程</div>
              <div>20000+工程实例</div>
              <div>3000+合作伙伴</div>
              <div>完善的项目响应体系</div>
              <div>健全的合作机制</div>
            </div>
          </ContentMask>
          <Footer>
            工程项目与实例流程
              </Footer>
          <FooterMask>
            <div className="cardfoot" onClick={() => history.push('/projectCase')}>
              <span className="link">点击查看</span>
              <img className="arrow" src={viewRight} alt="右箭头" />
            </div>
          </FooterMask>
        </DisplayCard>

        <DisplayCard className='card'>
          <Content>
            <img className="img1" src={hometec4} />
          </Content>
          <ContentMask>
            <div className="cardcontent">
              <div className="titleDes">服务网络与售后政策</div>
              <div>130+售后网点</div>
              <div>30min响应，2h内到达现场</div>
              <div>365天质保</div>
              <div>七星级售后服务</div>
            </div>
          </ContentMask>
          <Footer>
            服务网络与售后政策
              </Footer>
          <FooterMask>
            <div className="cardfoot" onClick={() => history.push('/service')}>
              <span className="link">点击查看</span>
              <img className="arrow" src={viewRight} alt="右箭头" />
            </div>
          </FooterMask>
        </DisplayCard>
      </div>
    </div>
  );
}
