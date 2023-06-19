import downArrowMenu from '@/assets/downArrowMenu.png';
import logo from '@/assets/logo.png';
import phone from '@/assets/phone.png';
import { industryType, productBtnAndPath } from '@/common/enums';
import { historyPush, isMobile } from '@/utils/utils';
import { MenuFoldOutlined, PhoneOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
const MenuItem = Menu.Item;
const { SubMenu } = Menu;

const DownOutlined = () => <img className={styles.down} src={downArrowMenu} />;

const innovation = [{
    title: '研发创新',
    path: "/innovation#Tech"
}, {
    title: '品质管控',
    path: "/innovation#Quality"
},
];
const serviceCenter = [{
    title: '服务体系',
    path: "/service#System"
}, {
    title: '服务流程',
    path: "/service#Flow"
}, {
    title: '售后服务',
    path: "/service#AfterSale"
}
];
const aboutUs = [{
    title: '企业风采',
    path: "/about#Enterprise"
}, {
    title: '人才中心',
    path: "/about#Talents"
},
];

export default () => {
    const [visible, setVisible] = useState(false);
    const createMenu = (data: Array<{ title: string; path: string; }> = [], needParent = true) => {
        return (
            <>
                {needParent ? <Menu>
                    {data.map((item, index) => (
                        <MenuItem key={index}>
                            <a href={item.path}>{item.title}</a>
                        </MenuItem>
                    ))}
                </Menu>
                    :
                    <>
                        {data.map((item, index) => (
                            <MenuItem key={index}>
                                <a href={item.path}>{item.title}</a>
                            </MenuItem>
                        ))}
                    </>
                }
            </>)
    }
    const menuOfProjectCase = (
        <>
            <Menu>
                {industryType.map((item, index) => (
                    <MenuItem key={index}>
                        <a href={item.path}>{item.label}</a>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
    const menuOfProjectCaseMobile = (
        <>
            {industryType.map((item, index) => (
                <MenuItem key={index}>
                    <a href={item.path}>{item.label}</a>
                </MenuItem>
            ))}
        </>
    );
    const mobileMenu = (
        <>
            <ul className={styles.firstMenu}>
                <li>
                    <a className={styles.title} href='/production'>产品中心</a>
                    <ul>
                        {productBtnAndPath.map(item => <li><a href={item.path}>{item.title}</a></li>)}
                    </ul>
                </li>
                <li>
                    <a className={styles.title} href='/projectCase'>工程案例</a>
                    <ul>
                        {industryType.map(item => <li><a href={item.path}>{item.label}</a></li>)}
                    </ul>
                </li>
                <li>
                    <a className={styles.title} href='/innovation'>研发创新</a>
                    <ul>
                        {innovation.map(item => <li><a href={item.path}>{item.title}</a></li>)}
                    </ul>
                </li>
                <li>
                    <a className={styles.title} href='/service'>服务中心</a>
                    <ul>
                        {serviceCenter.map(item => <li><a href={item.path}>{item.title}</a></li>)}
                    </ul>
                </li>
                <a className={styles.title} href='/news'>资讯中心</a>
                <li>
                    <a className={styles.title} href='/about'>关于我们</a>
                    <ul>
                        {aboutUs.map(item => <li><a href={item.path}>{item.title}</a></li>)}
                    </ul>
                </li>
            </ul>
            <div className={styles.phone}>
                <span>服务热线</span>
                <span className={styles.icon}><PhoneOutlined />0536-3162791</span>
            </div>
        </>
    )
    const trigger = isMobile() ? 'click' : 'hover';
    return (
        <div className={styles.header} >
            <div className={styles.content}>
                <img src={logo} alt="hualiLogo" className={styles.logo} onClick={() => historyPush('/home')} />
                <ul className={styles.ul}>
                    <li>
                        <a href="/home"><span>首页</span></a>
                    </li>
                    <Dropdown overlay={createMenu(productBtnAndPath)} trigger={[trigger]}>
                        <a href='/production'><span>产品中心</span><DownOutlined /></a>
                    </Dropdown>
                    <Dropdown overlay={menuOfProjectCase} trigger={[trigger]}>
                        <a href='/projectCase'><span>工程案例</span><DownOutlined /></a>
                    </Dropdown>
                    <Dropdown overlay={createMenu(innovation)} trigger={[trigger]}>
                        <a href='/innovation'><span>研发创新</span><DownOutlined /></a>
                    </Dropdown>
                    <Dropdown overlay={createMenu(serviceCenter)} trigger={[trigger]}>
                        <a href='/service'><span>服务中心</span><DownOutlined /></a>
                    </Dropdown>
                    <li>
                        <a href='/news'><span>资讯中心</span></a>
                    </li>
                    <Dropdown overlay={createMenu(aboutUs)} trigger={[trigger]}>
                        <a href='/about'><span>关于我们</span><DownOutlined /></a>
                    </Dropdown>
                </ul>
                <div className={styles.contact}>
                    <div className={styles.text}><img src={phone} alt="电话" />服务热线</div>
                    <div className={styles.phone}>0536-3162791</div>
                </div>
                <Dropdown
                    overlay={mobileMenu}
                    trigger={[trigger]}
                    overlayStyle={{ width: '100vw' }}
                    overlayClassName={styles.mobile}
                    getPopupContainer={triggerNode => triggerNode.parentNode}>
                    <MenuFoldOutlined className={styles.menu} />
                </Dropdown>
            </div>
        </div>
    )
}