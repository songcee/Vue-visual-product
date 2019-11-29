export default `<!-- 背景页面 -->
<template>
  <div class="body">
<% if (modules.moduleIndex != -1) { %>
    <module></module>
<% } %>
  </div>
</template>
<script>
<% if (modules.moduleIndex != -1) { %>
import module from './module.vue'
<% } %>
export default {
  name: 'layout',
  components: {
<% if (modules.moduleIndex != -1) { %>
    module
<% } %>
  }
}
</script>
<style>
html, body {
  background: <%= layout.bgcolor %>;
  width: 100%;
  height: 100%;
}
.body {
  margin: 0 auto;
  position: relative;
  <% switch (layout.width_adaption) { 
    case '1': %>
  width: 100%;
  min-width: <%= layout.adaption.minWidth %>px;
  <% break;
    case '2': %>
  width: <%= layout.adaption.fixWidth %>px;
  <% break;
    case '3': %>
  width: 100%;
  min-width: <%= layout.adaption.minWidth %>px;
  max-width: <%= layout.adaption.maxWidth %>px;
  <% break;
  }
  switch (layout.height_adaption) { 
    case '1': %>
  height: <%= layout.adaption.fixHeight %>px;
  <% break;
    case '2': %>
  height: 100%;
  min-height: <%= layout.adaption.minHeight %>px;
  <% break;
    case '3': %>
  height: auto;
  <% break;
  } %>
}
</style>
`