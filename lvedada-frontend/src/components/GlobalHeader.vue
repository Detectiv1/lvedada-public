<template>
  <a-row id="globalHeader" class="grid-demo" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="titleBar">
            <img src="../assets/lvedada.png" alt="" class="logo" />
            <div class="title">略答答</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">{{
          item.name
        }}</a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div v-if="loginUserStore.loginUser.id">
        {{ loginUserStore.loginUser.userName ?? "匿名用户" }}
      </div>
      <div v-else>
        <router-link to="/user/login">
          <a-button type="primary" shape="round">Login</a-button>
        </router-link>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useLoginUserStore } from "@/store/userStore";
import checkAccess from "@/access/checkAccess";
const router = useRouter();
// 当前选中的菜单项 刷新后缓存依旧存在
const selectedKeys = ref(["/"]);
const loginUserStore = useLoginUserStore();
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});
// 点击菜单跳转到对应页面
const doMenuClick = (key: string) => router.push({ path: key });
// 展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (!checkAccess(loginUserStore.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  });
});
</script>
<style scoped>
#globalHeader {
}
.titleBar {
  display: flex;
  align-items: center;
}
.title {
  margin-left: 26px;
  color: black;
}
.logo {
  height: 28px;
}
</style>
