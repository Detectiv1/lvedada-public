<template>
  <div id="basicLayout">
    <a-layout style="height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader></GlobalHeader>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://github.com/programmer-luoluo/vue3-admin-template"
          >by:程序员小略</a
        >
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
<style scoped>
#basicLayout {
}
.header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}
.content {
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 28px;
  padding: 20px;
  background: linear-gradient(to right, #fefefe, #fff);
}
.footer {
  padding: 16px;
  text-align: center;
  background: #efefef;
  box-shadow: #eee 1px 1px 5px;
}
.footer a {
  color: #9c27b0;
}
</style>
