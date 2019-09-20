// 轮播图组件的配置项
const config = {
    title: { // 标题配置
      icon: '', // 图标（@todo 这个可以后面配置）
      text: '左侧菜单栏', // 显示文本
      fullText: '左侧菜单栏组件', // 全称
      subText: '左侧菜单栏组件' // 简称
    },
    description: '这是一个配置左侧菜单栏的组件', // 组件描述信息
    picture: 'http://i.thsi.cn/images/', // 组件示意图
    ref: 'leftmenu', // 模块的标记名，不可与其他模块的标记名重复（@todo 这块可以提取出来单独做一个管理）
    option: { // 放到option的数据配置项
      data: [ // 数据集
        {
          key: 'listData', // 接收的字段名
          type: 'array-text', // 数据类型（text:纯文本;select:下拉列表;array-text:连续的纯文本框;array-select:连续的下拉列表;array-object:连续输入的复杂数据;object:对象数据）
          dataType: 'array-string', // 接收字段的类型（number/string/boolean/object/array-number/array-string/array-boolean/array-object）
          text: '股票代码列表', // 显示的选项名称
          default: '', // 默认填充的文本
          validation: 'hs_code',
          description: '股票代码列表', // 介绍说明
          mustRequired: true // 是否必填
        }
      ]
    },
    initData: [{ // 初始化组件时需要调用的方法
      name: 'initComponent', // 方法名
      params: [{ // 传递的参数（注意是按顺序的）
        validation: /^\d{6}$/, // 校验输入内容的正则或者function(val){}
        description: '股票代码', // 介绍说明
        mustRequired: true, // 是否必传
      }],
      description: '股票代码', // 介绍说明
      mustRequired: true // 是否必填
    }],
    inData: [ // 接收的数据
      {
        name: 'code', // 接收数据的字段名
        default: '', // 默认值，即接收值检验出错时使用
        validation: /^\d{6}$/, // 接收值校验，规则同上方配置项中的数据校验
        description: '股票代码' // 介绍说明
      }
    ],
    outData: [ // 输出数据
      {
        name: 'zdf', // 输出数据的字段名
        description: '个股的涨跌幅', // 字段描述，用于调用者阅读理解
        type: 'string' // 数据类型
      }
    ],
    inFunc: [ // 接收的方法，即可供外部调用的方法
      {
        name: 'changeCode', // 方法名
        params: ['code'], // 方法的参数名
        description: '修改股票代码的时候调动的方法' // 介绍说明
      }
    ],
    outFunc: [ // 输出的方法，即用于定义外部的方法
      {
        name: 'chooseCode', // 方法名
        params: [{ // 方法中会带有的参数
          name: 'code', // 参数名称
          type: 'string', // 数据格式
          description: '股票代码' // 介绍说明
        }],
        description: '点击列表时会调用的方法' // 介绍说明
      }
    ]
  }
  export default config