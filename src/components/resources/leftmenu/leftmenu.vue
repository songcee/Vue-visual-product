<!-- 组件配置项的配置UI组件 -->
<template>
  <ul class="list" v-if="listData && listData.length">
    <li
      v-for="(v, i) in listData"
      :key="i"
      :class="{'choose': chooseIndex == i}"
      @click="chooseList(i)">{{v}}</li>
  </ul>
</template>

<script>
export default {
  name: "Leftmenu",
  created: function() {
  },
  props: ['listData'],
  data() {
    return {
      chooseIndex: -1,
    };
  },
  mounted () {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    chooseList (i) {
      this.chooseIndex = i
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul, li {
  list-style: none;
}
.list {
  width: 100%;
  height: 100%;
  background: #19191b;
  color: #e5e5e5;
  border-right: 1px solid red;
  box-sizing: border-box;
}
.list li {
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  font-size: 14px;
  cursor: pointer;
}
.list li:hover {
  background: #333;
}
.list li.choose {
  background: #666;
}
</style>
