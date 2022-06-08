<template>
  <div class="login_container">
    <div class="login_box">
        <!-- 头像区域 -->
        <div class="avatar_box">
           <img src="../assets/logo.png" alt=""> 
        </div>
        <!-- 登录表单 区域 
         ref可以得到表单的整个对象，下面用 $refs获取
         loginFormRef是表单的实例对象
         -->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-password"></el-input>
          </el-form-item>
          <!-- 按钮区域 -->
           <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            //登录表单的数据绑定对象
            loginForm:{
                username:'admin',
                password:'123456'
            },
            //表单的验证规则
            loginFormRules:{
                //验证用户名是否合法
                username:[
                    {
                        required:true,
                        message:'请输入登录名称',
                        trigger:'blur'
                    },
                    {
                        min:3,
                        max:10,
                        message:"长度在3到10个字符之间",
                        trigger:'blur'
                    }
                ],
                //验证密码是否合法
                password:[
                     {
                        required:true,
                        message:'请输入登录密码',
                        trigger:'blur'
                    },
                    {
                        min:3,
                        max:10,
                        message:"长度在6到15个字符之间",
                        trigger:'blur'
                    }
                ]
            }
        }
    },
    methods: { 
        //点击重置按钮  重置登录表单
        resetLoginForm(){
            // console.log(this);
            this.$refs.loginFormRef.resetFields();
        },
        login(){
            //表单登录之前的预验证，回调函数第一个形参是布尔值
            this.$refs.loginFormRef.validate(async valid=> {
                // console.log(valid);
                if(!valid){
                    return;
                }
                //请求发方法是post,路径是login,参数是password和username
                //await只能用在被async 修饰的方法中，所以valid用async修饰
                // const result =await this.$http.post("login",this.loginForm);

                //解析结构只需要data的数据，用await修饰成异步的
                 const {data:res} =await this.$http.post("login",this.loginForm);
                 if(res.meta.status !==200) return this.$message.error('登录失败');
                  this.$message.success("登录成功") ;
                //   console.log(res);
                 //登录成功之后的token ，保存到客户端的 sessionStorage中
                  window.sessionStorage.setItem('token',res.data.token);
                  //通过编程式导航跳转到后台主页，路由地址是 /home
                  this.$router.push("/home")
            })
        }
    },
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px ;
    box-sizing: border-box;
}
.btns {
    display: flex;
    justify-content: flex-end;
}
</style>