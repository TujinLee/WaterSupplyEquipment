import army_home from "@/assets/army_home.jpeg";
import building_home from "@/assets/building_home.png";
import community_home from "@/assets/community_home.jpg";
import hospital_home from "@/assets/hospital_home.jpg";
import jundui from '@/assets/jundui.png';
import junduichoose from '@/assets/junduichoose.png';
import luzheng from '@/assets/luzheng.png';
import luzhengchoose from '@/assets/luzhengchoose.png';
import roadadmin_home from "@/assets/roadadmin_home.png";
import school_home from "@/assets/school_home.jpg";
import shangye from '@/assets/shangye.png';
import shangyechoose from '@/assets/shangyechoose.png';
import shuichang from '@/assets/shuichang.png';
import shuichangchoose from '@/assets/shuichangchoose.png';
import waterpumpstation from '@/assets/waterpumpstation.png';
import xiaoqu from '@/assets/xiaoqu.png';
import xiaoquchoose from '@/assets/xiaoquchoose.png';
import xuexiao from '@/assets/xuexiao.png';
import xuexiaochoose from '@/assets/xuexiaochoose.png';
import yiyuan from '@/assets/yiyuan.png';
import yiyuanchoose from '@/assets/yiyuanchoose.png';


// 产品性质
const productType = [{
    label: '供排水设备',
    value: '供排水设备'
}, {
    label: '华立水泵',
    value: '华立水泵'
}, {
    label: '污水处理设备',
    value: '污水处理设备'
}, {
    label: '原水净化设备',
    value: '原水净化设备'
}];

// 项目所属行业性质
const industryType = [{
    label: '水厂泵站',
    value: '水厂泵站',
    img: shuichang,
    imgChoose: shuichangchoose,
    path: "/projectCase#shuichang",
    key: '#shuichang',
    middleImg: waterpumpstation,
    text: '华立承建的青岛西海岸新区陡崖子加压泵站及平衡池加压泵站供水工程，仅用二十余天即完成了实地勘察、方案设计、安装调式，实现日供水量8万吨、单泵功率250kw的预期目标'
}, {
    label: '商业楼宇',
    value: '商业楼宇',
    img: shangye,
    imgChoose: shangyechoose,
    path: "/projectCase#shangye",
    key: '#shangye',
    middleImg: building_home,
    text: '华立产品深受商业楼宇客户信任，已与万达、万科、恒大、保利、绿地、等多家商业地产巨头达成战略合作伙伴关系，完成了超3000+商业楼宇项目'
}, {
    label: '住宅公寓',
    value: '住宅公寓',
    img: xiaoqu,
    imgChoose: xiaoquchoose,
    path: "/projectCase#xiaoqu",
    key: '#xiaoqu',
    middleImg: community_home,
    text: '华立针对不同规模、不同高度住宅小区供水特点研发了WHG-Z型 住宅公寓楼专用无负压供水设备，适用于任何需要加压的多层、高层及特高层住宅小区'
}, {
    label: '路政',
    value: '路政',
    img: luzheng,
    imgChoose: luzhengchoose,
    path: "/projectCase#luzheng",
    key: '#luzheng',
    middleImg: roadadmin_home,
    text: '针对路政污水排放、收集提升等需求，华立自主研发生产的SWW型 一体化预制泵站排水设备、潜水排污泵等，深受客户信赖'
}, {
    label: '学校',
    value: '学校',
    img: xuexiao,
    imgChoose: xuexiaochoose,
    path: "/projectCase#xuexiao",
    key: '#xuexiao',
    middleImg: school_home,
    text: '学校里同学们作息相同，出现集中用水高峰期和低峰期，华立对全国几十所院校的用水状况进行调查，自主研发出WHG-X型 学校部队专用无负压供水设备，攻克集中用水难题'
}, {
    label: '医院',
    value: '医院',
    img: yiyuan,
    imgChoose: yiyuanchoose,
    path: "/projectCase#yiyuan",
    key: '#yiyuan',
    middleImg: hospital_home,
    text: '面对医院的紧急需求，华立第一时间响应。2020年初新冠疫情爆发期间，我司昼夜施工，完成雷神山医院的供水保障工程，为医护人员和在治同胞连通了生命水脉'
}, {
    label: '部队',
    value: '部队',
    img: jundui,
    imgChoose: junduichoose,
    path: "/projectCase#jundui",
    key: '#jundui',
    middleImg: army_home,
    text: '部队里大家作息相同，24h用水曲线呈尖峰状，WHG-X型供水设备，充分考虑每个供水点的压力需求，克服传统供水方式的弊端，彻底解决集中用水难题'
}];


// 项目所属区域
const areaType = [{
    label: '华北',
    value: '华北'
}, {
    label: '华东',
    value: '华东'
}, {
    label: '华中',
    value: '华中'
}, {
    label: '华南',
    value: '华南'
}, {
    label: '东北',
    value: '东北'
}, {
    label: '西北',
    value: '西北'
}, {
    label: '西南',
    value: '西南'
}];
// 图片排序
const imgSort = [];
for (let i = 1; i < 21; i++) {
    imgSort.push({
        label: `0${i}`,
        value: `0${i}`
    })
}

// 权限--部门
const deptType = [{
    label: '办公室',
    value: '1',
    des: ['账号管理，全平台编辑', '全平台编辑']
}, {
    label: '产品部',
    value: '2',
    des: ['产品模块的编辑']
}, {
    label: '市场部',
    value: '3',
    des: ['案例、服务模块的编辑'],
}, {
    label: '宣传部',
    value: '4',
    des: ['资讯模块的编辑'],
}];

const deptText = {
    '1': '办公室',
    '2': '产品部',
    '3': '市场部',
    '4': '宣传部',
}

const permissiondescriptionType = {
    '1': {
        '1': '账号管理，全平台编辑',
        '2': '全平台编辑',
    },
    '2': {
        '3': '产品模块的编辑'
    },
    '3': {
        '3': '案例、服务模块的编辑'
    },
    '4': {
        '3': '资讯模块的编辑'
    }
}

// 权限--范围
const authorityType = [{
    label: '超级管理员',
    value: '1'
}, {
    label: '高级管理员',
    value: '2'
}, {
    label: '管理员',
    value: '3'
}];

const authorityText = {
    '1': '超级管理员',
    '2': '高级管理员',
    '3': '管理员',
}

// 权限--范围
const columnType = [{
    label: '企业动态',
    value: 1
}, {
    label: '媒体报道',
    value: 2
}, {
    label: '行业动态',
    value: 3
}];

// 资讯--推荐位
const posPortalType = [{
    label: '首页01号位',
    value: '1'
}, {
    label: '首页02号位',
    value: '2'
}, {
    label: '首页03号位',
    value: '3'
}, {
    label: '首页04号位',
    value: '4'
}, {
    label: '首页05号位',
    value: '5'
}];

const posNewsType = [{
    label: '资讯中心01号位',
    value: '1'
}, {
    label: '资讯中心02号位',
    value: '2'
}, {
    label: '资讯中心03号位',
    value: '3'
}, {
    label: '资讯中心04号位',
    value: '4'
}, {
    label: '资讯中心05号位',
    value: '5'
}];

const productBtn = ['供排水设备', '华立水泵', '污水处理设备', '原水净化设备', '数字化水务平台'];
const productBtnAndPath = [{
    title: '供排水设备',
    path: "/production#WaterSupply"
},
{
    title: '华立水泵',
    path: "/production#WaterPump"
}, {
    title: '污水处理设备',
    path: "/production#Sewage"
}, {
    title: '原水净化设备',
    path: "/production#Purify"
}, {
    title: '数字化水务平台',
    path: "/production#WaterAffairs"
}];

export {
    productType,
    industryType,
    areaType,
    imgSort,
    deptType,
    authorityType,
    columnType,
    posPortalType,
    posNewsType,
    permissiondescriptionType,
    deptText,
    authorityText,
    productBtn,
    productBtnAndPath
};

