<template>
    <header class="header">
        <div class="menu"></div>
        <Search />
        <div :class="isLogin ? 'user-avatar' : 'login'">
            <div class="logined" v-if="isLogin">
                <el-image :src="userInfo.avatarUrl" class="avatar">
                    <div slot="placeholder" class="image-slot">
                        <i class="iconfont icon-placeholder"></i>
                    </div>
                </el-image>
                <span class="nickname">{{ userInfo.nickname }}</span>
                <span class="set"><i class="iconfont icon-set"></i></span>
                <span class="quit" @click="logout"><i class="iconfont icon-quit"></i></span>
            </div>
            <span class="login-btn" @click="loginDialog" v-else>登录</span>
        </div>
    </header>

    <el-dialog v-model="dialogVisible" title="请扫描二维码进行登录！" width="18%" draggable center>
        <el-image style="width: 300px; height: 300px" :src="imgUrl" />
    </el-dialog>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import Search from './search.vue'
import { ElMessage } from 'element-plus'

const { proxy } = getCurrentInstance()

const dialogVisible = ref(false)
const isLogin = ref(false)
let imgUrl = ref("")
const userInfo = reactive({
    avatarUrl: "",
    nickname: ""
})

const loginCheck = async ({ key: key }) => {
    const res = await proxy.$http.loginCheck({ key: key })
    return res.data
}

const loginStatus = async (cookie) => {
    const res = await proxy.$http.loginStatus(cookie)
    return res.data
}

const loginDialog = async () => {
    dialogVisible.value = true

    const cookie = localStorage.getItem('cookie')
    loginStatus(cookie)
    const res = await proxy.$http.loginKey()
    const key = res.data.data.unikey
    const res2 = await proxy.$http.loginCreat({ key: key })
    imgUrl.value = res2.data.data.qrimg

    const timer = setInterval(async () => {
        const statusRes = await loginCheck({ key: key })
        console.log(statusRes);
        if (statusRes.code === 800) {
            ElMessage(
                {
                    message: '二维码已过期,请重新获取',
                    type: 'warning'
                })
            clearInterval(timer)
        }
        if (statusRes.code === 803) {
            // 这一步会返回cookie
            clearInterval(timer)
            ElMessage(
                {
                    message: '授权登录成功',
                    type: 'success'
                })
            const res = await loginStatus(statusRes.cookie)
            localStorage.setItem('cookie', statusRes.cookie)
            dialogVisible.value = false
            isLogin.value = true
            console.log(res);
            userInfo.avatarUrl = res.data.profile.avatarUrl
            userInfo.nickname = res.data.profile.nickname
        }
    }, 3000)
}

const logout = () => {
    console.log(logout);
}


</script>

<style lang="less" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
}

.menu {
    flex: 1;
}

.user-avatar {
    padding: 5px 0 5px 20px;
    text-align: center;

    .avatar {
        display: inline-block;
        width: 24px;
        height: 24px;
        border-radius: 100%;
        overflow: hidden;
        cursor: pointer;
    }

    .logined {
        display: flex;
        align-items: center;

        span {
            display: inline-block;
            height: 24px;
            line-height: 24px;
            font-weight: 300;
            padding: 0 10px;
            cursor: pointer;
        }

        .iconfont {
            color: var(--color-text-main);
            vertical-align: top;
        }
    }
}

.login {
    padding: 0 20px;
    text-align: center;

    .login-btn {
        font-size: 16px;
        cursor: pointer;
    }
}
</style>
