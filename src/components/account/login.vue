<template>
    <div>

        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName" v-model='user_name' name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" v-model='password' name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" type="submit" value="立即登录" @click='login'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//导入
import {bus} from '../../comment/commvue'
    export default{
        data(){
            return{
                user_name:'zhangsan',
                password:'123'
            }
        },
        created(){
            // this.login()
        },
        methods:{
            login(){
                //发送请求
                $axios.post('site/account/login',{
                    user_name:this.user_name,
                    password:this.password
                }).then(response=>{
                    // console.log(response.data);
                    if(response.data.status==0){
                       //去目标页面
                        console.log(response.data.message);                       
                        this.$router.push({path:localStorage.getItem('lastVisitPath')})
                        //触发bus.$emit('id-selected', 1)
                         bus.$emit('myislogin', true)
                        // console.log(localStorage.getItem('lastVisitPath'));
                        
                        // this.$router.push({ path: localStorage.getItem('lastVisitPath')})
                    }else{
                        // console.log(response.data.message);
                        bus.$emit('myislogin', false)
                    }
                },err=>{
                    console.log(err);
                })
            }    
            
        }

    }
</script>
