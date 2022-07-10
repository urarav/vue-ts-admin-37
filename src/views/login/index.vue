<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import router from "@/router";
import type { TloginInfo } from "~/store";
const info = reactive<TloginInfo>({
  username: "",
  password: "",
});
const { username, password } = toRefs(info);
const handleLogin = async () => {
  try {
    await useUserStore().login(info);
    router.push("/");
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <form class="box">
    <div class="input-box">
      <input v-model="username" required type="text" />
      <span>Name</span>
    </div>
    <div class="input-box">
      <input v-model="password" required type="password" autocomplete="off" />
      <span>Password</span>
    </div>
    <button class="btn-box" @click.prevent="handleLogin">Login</button>
  </form>
</template>

<style lang="scss" scoped>
.box {
  background: #1d2b3a;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  .input-box {
    position: relative;
    width: 350px;
    input {
      width: 100%;
      padding: 10px;
      background: #1d2b3a;
      border: 1px solid rgba(255, 255, 255, 0.25);
      outline: none;
      border-radius: 4px;
      color: #fff;
      font-size: 1em;
      transition: all 0.5s;
      &:valid,
      &:focus {
        border: 1px solid #00dfc4;
        & + span {
          color: #00dfc4;
          transform: translate(10px, -7px);
          padding: 0 10px;
          background-color: #1d2b3a;
          border-left: 1px solid #00dfc4;
          border-right: 1px solid #00dfc4;
          letter-spacing: 0.2em;
        }
      }
    }
    &:nth-child(2),
    &:nth-child(2) {
      input:valid,
      input:focus {
        & + span {
          color: #1d2b3a;
          background-color: #00dfc4;
          border: 2px;
        }
      }
    }
    span {
      position: absolute;
      left: 0;
      padding: 13px 10px;
      color: rgba(255, 255, 255, 0.25);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      pointer-events: none;
      transition: 0.5s all;
      font-size: 0.65em;
    }
  }
  .btn-box {
    border: 1px solid rgba(255, 255, 255, 0.25);
    background-color: #1d2b3a;
    color: rgba(255, 255, 255, 0.25);
    width: 350px;
    padding: 10px;
    border-radius: 4px;
    text-transform: uppercase;
    &:hover {
      border: 1px solid #00dfc4;
      color: #00dfc4;
    }
  }
}
</style>
