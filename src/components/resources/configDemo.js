// 配置项的demo
const config = {
  title: { // 标题配置
    icon: '', // 图标（@todo 这个可以后面配置）
    text: '分时/K线图模块', // 显示文本
    fullText: '沪深个股分时/K线切换图表的模块', // 全称
    subText: '分时/K线图' // 简称
  },
  description: '这是一个展示分时和K线并且可以相互切换的展示模块，接收一个股票代码的参数', // 组件描述信息
  picture: 'http://i.thsi.cn/images/', // 组件示意图
  ref: 'klineChart', // 模块的标记名，不可与其他模块的标记名重复（@todo 这块可以提取出来单独做一个管理）
  /*
   * option中的type值，目前支持以下类型：
   * 一、单输入框
   * 1、文本输入框（text）
   * 2、下拉列表框（select）
   * 二、连续输入框（可以连续添加多组相同的输入框）
   * 1、连续输入框（array-text）（“-”后面的内容是单输入框的type）
   * 三、修饰符
   * 1、分割线（separator）
   */
  option: { // 放到option的数据配置项
    data: [ // 数据集
      {
        key: 'code', // 接收的字段名（必传）
        type: 'text', // 数据类型（text:纯文本;select:下拉列表;array-text:连续的纯文本框;array-select:连续的下拉列表;array-object:连续输入的复杂数据;object:对象数据）（必传）
        dataType: 'string', // 接收字段的类型（number/string/boolean/object/array-number/array-string/array-boolean/array-object）（必传）
        text: '初始化股票代码', // 显示的选项名称（必传）
        default: '', // 默认填充的文本（必传）
        validation: /^\d{6}$/, // 校验输入内容的正则或者function(val){}
        description: '股票代码', // 介绍说明（必传）
        mustRequired: false // 是否必填（必传）
      },
      {
        type: 'separator', // 分割线
      },{
        key: 'type', // 接收的字段名（必传）
        type: 'select', // 数据类型（text:纯文本;select:下拉列表;array-text:连续的纯文本框;array-select:连续的下拉列表;array-object:连续输入的复杂数据;object:对象数据）（必传）
        dataType: 'string', // 接收字段的类型（number/string/boolean/object/array-number/array-string/array-boolean/array-object）（必传）
        text: '显示的选项名称', // 显示的选项名称（必传）
        default: 'null', // 默认填充的文本（必传）
        selectData: [
          {value: 'null', text: '空'},
          {value: '1', text: '第一个选项'},
          {value: '2', text: '第二个选项'},
          {value: '3', text: '第三个选项'}
        ],
        description: '测试select类型的配置项', // 介绍说明（必传）
        mustRequired: false // 是否必填（必传）
      },
      {
        key: 'urls', // 接收的字段名
        type: 'array-text', // 数据类型（text:纯文本;select:下拉列表;array-text:连续的纯文本框;array-select:连续的下拉列表;array-object:连续输入的复杂数据;object:对象数据）
        dataType: 'array-string', // 接收字段的类型（number/string/boolean/object/array-number/array-string/array-boolean/array-object）
        text: '轮播图url', // 显示的选项名称
        default: 'http://u.thsi.cn/imgsrc/level/c47b56693cd5aad5ef5dbede6d1dab83.jpg', // 默认填充的文本
        validation: function (val) { // 校验输入内容的正则或者function(val){}
          let result = false
          try {
            if(val.indexOf('http://') !== 0) {
              alert('图片url必须是以http://开头')
            } else {
              result = true
            }
          } catch (e) {
            window.console.log(e)
          }
          return result
        },
        description: '轮播图中每个图片的url', // 介绍说明
        mustRequired: true // 是否必填
      },
      {
        key: 'slides', // 接收的字段名
        type: 'array', // 数据类型（text:纯文本;select:下拉列表;array-text:连续的纯文本框;array-select:连续的下拉列表;array-object:连续输入的复杂数据;object:对象数据）
        dataType: 'array-object', // 接收字段的类型（number/string/boolean/object/array-number/array-string/array-boolean/array-object）
        // 如果dataType是object或array-*可以不填default和validation；但是当dataType是object或array-object时，必填objectOptions
        text: '轮播图中的url和标题', // 显示的选项名称
        objectOptions: [ // 接受数据类型是对象时配置每个对象里的具体数据，数组的每一项表示对象的每一个key-value键值对；当dataType是object或array-object时，必填此项
          {
            key: 'url',
            type: 'text',
            dataType: 'string',
            text: '图片的url',
            default: 'http://u.thsi.cn/imgsrc/level/c47b56693cd5aad5ef5dbede6d1dab83.jpg',
            validation: '',
            description: '轮播图中每个图片的url', // 介绍说明
            mustRequired: true // 是否必填
          },{
            key: 'title',
            type: 'text',
            dataType: 'string',
            text: '图片的标题',
            default: '',
            validation: '',
            description: '轮播图中每个图片的标题', // 介绍说明
            mustRequired: true // 是否必填
          }
        ],
        description: '轮播图中每个图片的url以及要显示的标题', // 介绍说明
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
  inFunc: { // 接收的方法，即可供外部调用的方法
    'changeCode': {
      name: 'changeCode', // 方法名
      params: [{
        name: 'code', // 参数名
        description: '股票代码', // 介绍说明
        mustRequired: true // 是否必填
      }], // 方法的参数名
      description: '修改股票代码的时候调动的方法' // 介绍说明
    }
  },
  outFunc: [ // 输出的方法，即用于调用外部方法
    {
      name: 'dblclick', // 方法名
      params: [{ // 可用参数，即可供外部方法使用的参数
        name: 'code', // 参数名称
        type: 'string', // 数据格式
        description: '股票代码' // 介绍说明
      }],
      description: '双击股票名称时会调用这个方法' // 介绍说明
    }
  ]
}
export default config