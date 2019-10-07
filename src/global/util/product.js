// 公用的项目逻辑处理方法（数据结构处理方法放在common.js中）
const fun = {
  /*
   * 选中每个模块后会执行以下3个步骤：
   * 第一步：将选中模块的索引存入store.modules.editIndex
   * 第二部：如果模块中已经设置了组件，则在list模块中选中对应组件
   * 第三部：如果模块中已经设置了组件，则在option模块中显示组件配置项的情况
   */
  chooseModule (self, index) {
    // 第一步
    self.$store.commit("product_set_editIndex", index);
    // 第二部、第三部
    self.$store.commit("handler_list_chosen", index);
  },
  // 选择模块划分后，需要监听给每个模块添加、修改组件的事件
  moduleUpdateComp (self) {
    self.$util.bus.$on("module_update_comp", data => {
      // 更新模块中组件的数据
      self.$set(
        self.componentData,
        data.index,
        self.$util.deepClone(data.value)
      );
      self.$nextTick(() => {
        // 调用外部组件的
        if (data.value.outFunc && data.value.outFunc.length > 0) {
          let pointComp = self.$refs[data.value.type] // 目标组件
          for (let outFunc of data.value.outFunc) {
            let outComp = self.$refs[outFunc.compName] // 要调用的外部组件
            if (!outComp){ // 外部组件不存在则忽略该配置
              continue
            }
            // 在原逻辑执行完后执行after里的逻辑，异步函数在这里会与问题
            pointComp[outFunc.myFunc] = (pointComp[outFunc.myFunc] || function () {}).after(() => {
              let arg = []
              for (let i in outFunc.funcParams) {
                if (typeof outFunc.funcParams[i] == 'object') {
                  let obj = {}
                  for (let j in outFunc.funcParams[i]) {
                    obj[j] = pointComp[outFunc.funcParams[i][j]]
                  }
                  arg.push(obj)
                } else if (typeof outFunc.funcParams[i] == 'array') {
                } else {
                  arg.push(pointComp[outFunc.funcParams[i]])
                }
              }
              outComp[outFunc.funcName].apply(outComp, arg)
            })
          }
        }
      })
    });
  }
}
export default fun