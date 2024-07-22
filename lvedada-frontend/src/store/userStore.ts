import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getLoginUserUsingGet } from "@/api/userController";
import ACCESS_ENUM from "@/access/accessEnum";
/**
 * 登录用户信息全局状态
 */
// 定义一个名为 "loginUser" 的 Pinia 仓库
export const useLoginUserStore = defineStore("loginUser", () => {
  // 定义一个响应式引用 loginUser，用于存储登录用户信息，初始值为一个默认用户对象
  const loginUser = ref<API.LoginUserVO>({
    userName: "未登录",
  });

  // 定义一个方法 setLoginUser，用于更新 loginUser 的值
  function setLoginUser(newLoginUser: API.LoginUserVO) {
    loginUser.value = newLoginUser;
    // 更新 loginUser 的值为新用户信息
  }

  // 定义一个异步方法 fetchLoginUser，用于从服务器获取登录用户信息
  async function fetchLoginUser() {
    const res = await getLoginUserUsingGet();
    if (res.data.code === 0 && res.data.data) {
      loginUser.value = res.data.data;
    } else {
      loginUser.value = { userRole: ACCESS_ENUM.NOT_LOGIN };
    }
  }

  // 返回 loginUser, setLoginUser 和 fetchLoginUser，使它们可以在组件中使用
  return { loginUser, setLoginUser, fetchLoginUser };
});
