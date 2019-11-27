let modules = {
 module1Tpl : require('./module1.tpl'),
 module2Tpl : require('./module2.tpl'),
 module3Tpl : require('./module3.tpl'),
 module4Tpl : require('./module4.tpl'),
 module5Tpl : require('./module5.tpl'),
 module6Tpl : require('./module6.tpl'),
 module7Tpl : require('./module7.tpl'),
 module8Tpl : require('./module8.tpl'),
 module9Tpl : require('./module9.tpl'),
 module10Tpl : require('./module10.tpl'),
 module11Tpl : require('./module11.tpl'),
 module12Tpl : require('./module12.tpl'),
}
export default  (i) => {
  return '<!-- 布局划分页面 -->'+modules[`module${i}Tpl`].default
}