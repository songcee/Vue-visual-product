<!-- 组件配置项的配置UI组件 -->
<template>
    <div class="item-option-nav">
        <label :title="option.text">{{option.text}}</label><span>：</span>
        <input v-if="option.dataType == 'number'" v-model.number="aa" type="number" />
        <input v-else v-model="aa"/>
    </div>
</template>

<script>
export default {
  name: "Option-Text",
  created: function() {
  },
  props: ['option'],
  data() {
    return {
      aa: ''
    };
  },
  computed: {
  },
  watch: {
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
