<!-- 组件配置项的配置UI组件 -->
<template>
    <div class="item-option-nav bobo">
        <p class="item-option-object-title">{{option.text}}</p>
        <div v-for="(item, index) in option.objectOptions" :key="index">
            <OptionText v-if="item.type == 'text'" :option="item" class="item-option-object-nav"></OptionText>
        </div>
    </div>
</template>

<script>
import OptionText from './option-text';
export default {
  name: "Option-Object",
  components: {
      OptionText
  },
  props: ['option'],
  data() {
    return {
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
.bobo {
  border-bottom: 1px solid #cbc5c5;
}
.item-option-object-title {
  font-weight: bold;
  color: #111;
}
.item-option-object-nav {
  padding-left: 20px;
}
</style>
