<!-- 组件配置项的配置UI组件 -->
<template>
  <div>
    <div class="item-option-outfunc-banner" v-for="(item, index) in option" :key="'outfunc'+index">
      <p>{{index + 1}}、{{item.description}}</p>
      <div class="outfunc-option vp-pl20">
        <p>选择调用的组件：</p>
        <select v-model="item.components">
          <option value="undefined">--请选择--</option>
          <option
            v-for="(v, i) in $store.state.product.components"
            :key="'comp'+i"
            :value="v.type"
            v-show="v.type !== compName">
            {{v.name}}--{{v.type}}
          </option>
        </select>
        <p v-if="item.components != 'undefined' && item.components">选择组件的方法：</p>
        <select v-model="item.funcName" v-if="item.components != 'undefined' && item.components">
          <option value="undefined">--请选择--</option>
          <option
            v-for="(v, i) in listDatas[item.components].inFunc"
            :key="'func'+i"
            :value="v.name">
            {{v.description}}--{{v.name}}
          </option>
        </select>
        <div v-if="(item.components != 'undefined' && item.components) && (item.funcName != 'undefined' && item.funcName)">
          <p>选择该方法需要的参数：</p>
          <div v-for="(v, i) in listDatas[item.components].inFunc[item.funcName].params" :key="'params'+i">
            <p :class="{'vp-mustRequierd': v.mustRequired}">{{i + 1}}）{{v.description}}（参数格式为{{$util.paramType[v.dataType]}}）</p>
            <div v-if="v.dataType == 'object'">
              <div v-for="(obj, ind) in v.objectOptions" :key="'obj'+v.name+ind">
                <p class="vp-ml20" :class="{'vp-mustRequierd': obj.mustRequired}">key{{ind+1}}：{{obj.description}}({{obj.key}})</p>
                <outfuncParamList class="vp-ml20" :item="item" :params="item.funcParams" :i="i" :objKey="obj.key" :type="'object'"></outfuncParamList>
              </div>
            </div>
            <div v-else>
              <outfuncParamList class="vp-ml20" :item="item" :params="item.funcParams" :i="i"></outfuncParamList>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import listDatas from "@/components/resources/list";
import outfuncParamList from "@/components/framework/option/outfuncParamList";
export default {
  name: "Option-OutFunc",
  created: function() {
  },
  props: ['option', 'compName'],
  components: {
    outfuncParamList
  },
  data() {
    return {
      listDatas: listDatas, // 组件列表数据
    };
  },
  mounted () {
  },
  computed: {
  },
  watch: {
    option (val) {
      for (let v of val) {
        v.funcParams = []
      }
    }
  },
  methods: {
    optData () {
      let data = []
      for (let i in this.option) {
        let outfunc = {}
        if (!this.option[i].components || this.option[i].components == 'undefined') {
          data.push(outfunc)
          continue
        }
        outfunc.compName = this.option[i].components
        if (!this.option[i].funcName || this.option[i].funcName == 'undefined') {
          return {err: 'validation false', errmsg: '请选择"' + this.option[i].components + '"组件中的方法！'}
        }
        outfunc.funcName = this.option[i].funcName
        let index = 0
        outfunc.funcParams = []
        for (let param of listDatas[this.option[i].components].inFunc[this.option[i].funcName].params) {
          if (param.mustRequired) {
            if (!this.option[i]['funcParams'][index] || this.option[i]['funcParams'][index] == 'undefined') {
              return {err: 'validation false', errmsg: `请选择"${this.option[i].components}"组件中"${this.option[i].funcName}"方法的"${param.description}"参数！` }
            }
          }
          if (this.option[i]['funcParams'][index] == 'undefined') {
            this.option[i]['funcParams'][index] = undefined
          }
          outfunc.funcParams[index] = this.option[i]['funcParams'][index]
          index++
        }
        outfunc.myFunc = this.option[i].name
        data.push(outfunc)
      }
      return data
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-option-outfunc-banner>p {
  line-height: 30px;
}
.outfunc-option select {
  width: 100%;
  height: 21px;
}
</style>
