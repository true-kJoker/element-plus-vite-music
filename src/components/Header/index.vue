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
            <span class="login-btn" @click="loginDialogOpen" v-else>登录</span>
        </div>
    </header>

    <el-dialog v-model="dialogVisible" title="请进行登录！" width="18%" draggable center>
        <el-radio-group @change="radioChange" v-model="radio">
            <el-radio-button label="手机号登录" />
            <el-radio-button label="二维码登录" />
        </el-radio-group>
        <el-form v-if="radio=='手机号登录'" label-position="left" label-width="100px" :model="formLabelAlign"
            style="max-width: 460px;margin-top: 15px;">
            <el-form-item label="电话号码">
                <el-input v-model="formLabelAlign.phone" />
            </el-form-item>
            <el-form-item label="验证码">
                <el-input v-model="formLabelAlign.captcha" />
            </el-form-item>
            <el-form-item>
                <el-button @click="loginVerify" type="primary">登录</el-button>
                <el-button @click="loginSent">获取验证码</el-button>
            </el-form-item>
        </el-form>
        <el-image v-if="radio=='二维码登录'" style="width: 300px; height: 300px" :src="imgUrl" />
    </el-dialog>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue'
import { useLogin, useLoginStatus, useLoginSent, useLoginVerify, useLogOut } from "~/api/api";
import Search from './search.vue'
import { ElMessage } from 'element-plus'

const { proxy } = getCurrentInstance()

const dialogVisible = ref(false)
const isLogin = ref(false)
let imgUrl = ref("")
const radio = ref('手机号登录')
const formLabelAlign = reactive({
    phone: '',
    captcha: ''
})
const userInfo = reactive({
    avatarUrl: "",
    nickname: ""
})

const loginDialogOpen = () => {
    dialogVisible.value = true
}

//选择登录方式监听事件
const radioChange = (value) => {
    if (value == '二维码登录') {
        loginDialog()
    }
}

//获取登录状态
const checkLogin = async () => {
    const res = await useLoginStatus()
    console.log(res.data);
    if (res.data.code == 200) {
        if (res.data.profile == null) {
            console.log("未登录");
        } else {
            console.log("已经登录");
            dialogVisible.value = false
            isLogin.value = true
            userInfo.avatarUrl = res.data.profile.avatarUrl
            userInfo.nickname = res.data.profile.nickname
        }
    }
}
onMounted(() => {
    let cookie = localStorage.getItem('cookie')
    if (cookie) {
        checkLogin()
    } else {
        return true
    }
})

//二维码登录
const loginCheck = async ({ key: key }) => {
    const res = await proxy.$http.loginCheck({ key: key })
    return res.data
}
const loginStatus = async (cookie) => {
    const res = await proxy.$http.loginStatus(cookie)
    return res.data
}
const loginDialog = async () => {
    const cookie = localStorage.getItem('cookie')
    loginStatus(cookie)
    const res = await proxy.$http.loginKey()
    const key = res.data.data.unikey
    const res2 = await proxy.$http.loginCreat({ key: key })
    imgUrl.value = res2.data.data.qrimg
    const timer = setInterval(async () => {
        if (radio.value == "手机号登录") {
            clearInterval(timer)
            return
        }
        const statusRes = await loginCheck({ key: key })
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

//手机号验证码登录
const loginSent = async () => {
    const res = await useLoginSent(formLabelAlign.phone)
    return res.data
}
const loginVerify = async () => {
    const res = await useLoginVerify(formLabelAlign.phone, formLabelAlign.captcha)
    if (res.data == true) {
        const statusRes = await useLogin(formLabelAlign.phone, "", formLabelAlign.captcha)
        if (statusRes.code == 200) {
            ElMessage(
                {
                    message: '授权登录成功',
                    type: 'success'
                })
            localStorage.setItem('cookie', statusRes.cookie)
            dialogVisible.value = false
            isLogin.value = true
            userInfo.avatarUrl = statusRes.profile.avatarUrl
            userInfo.nickname = statusRes.profile.nickname
        }
    } else {
        ElMessage(
            {
                message: '验证码不正确，请重新输入!',
                type: 'warning'
            })
    }
}

//退出登录
const logout = async () => {
    const res = await useLogOut()
    if (res.code == 200) {
        ElMessage(
            {
                message: '退出登录成功',
                type: 'success'
            })
        isLogin.value = false
        localStorage.removeItem('cookie')
    }

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
