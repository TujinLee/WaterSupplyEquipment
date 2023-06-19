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
    value: '水厂泵站'
}, {
    label: '商业楼宇',
    value: '商业楼宇'
}, {
    label: '住宅公寓',
    value: '住宅公寓'
}, {
    label: '办公写字楼',
    value: '办公写字楼'
}, {
    label: '路政',
    value: '路政'
}, {
    label: '学校',
    value: '学校'
}, {
    label: '医院',
    value: '医院'
}, {
    label: '部队',
    value: '部队'
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
    value: '企业动态'
}, {
    label: '媒体报道',
    value: '媒体报道'
}, {
    label: '行业动态',
    value: '行业动态'
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

const jobType = [
    {
        label: '兼职',
        value: '兼职'
    }, {
        label: '全职',
        value: '全职'
    }
]

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
    jobType
};

