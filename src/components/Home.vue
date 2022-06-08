<template>
     <el-container>
        <!-- 头部区域 -->
        <el-header>
          <div>
            <img src="../assets/heima.png" alt="">
            <span>电商后台管理系统</span>
          </div>
          <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 页面主体区域 -->
        <el-container>
        <!-- 侧边栏 -->
          <el-aside :width="isCollapse ? '64px' :'200px'">
               <!-- 侧边栏菜单区域 -->
               <div class="toggle-button" @click="toggleCollapse">|||</div>
               <el-menu
                 background-color="#333744"
                 text-color="#fff"
                 active-text-color="#409EFE"
                 unique-opened
                 :collapse="isCollapse"
                 :collapse-transition="false"
                 :router="true"
                 :default-active="activePath">
                 <!-- 这是一级菜单 -->
                 <el-submenu :index= "item.id +''" v-for="item in menulist" :key="item.id">
                   <!-- 一级菜单的模板区域 -->
                   <template slot="title">
                     <!-- 图标 -->
                     <i :class="iconsObj[item.id]"></i>
                     <span>{{item.authName}}</span>
                   </template>
                     <!-- 这是二级菜单 -->
                     <el-menu-item :index=" '/'+ subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+ subItem.path)">
                        <template slot="title">
                     <!-- 图标 -->
                     <i class="el-icon-menu"></i>
                     <span>{{subItem.authName}}</span>
                   </template>
                     </el-menu-item>
                 </el-submenu>
               </el-menu>
          </el-aside>
          <!-- 右侧内容主体 -->
          <el-main>
            <!-- 路由占位符 -->
            <router-view></router-view>
          </el-main>
        </el-container>
     </el-container>
</template>

<script>
export default {
    data() {
        return {
            menulist:[],
            iconsObj:{
                '125':'iconfont icon-yonghu',
                '103':'iconfont icon-yonghu',
                '101':'iconfont icon-shangpinguanli',
                '102':'iconfont icon-dingdanguanli',
                '145':'iconfont icon-shujutongji'
            },
            //是否折叠
            isCollapse: false,
            //被激活的链接地址
            activePath:''
        }
    },
    //一加载就应该获取左侧菜单
    created() {
        this.getMenuList(),
        this.activePath=window.sessionStorage.getItem('activePath')
    },
    methods: {
        logout(){
            //清空
            window.sessionStorage.clear();
            //重定向到登录页面
            this.$router.push('/login')
        },
        //获取所有的菜单
        async getMenuList(){
            //请求路径：menus, 请求方法：get(返回promise函数，用awit)
           const {data:res} = await this.$http.get('menus')
           if(res.meta.status !==200 ) return this.$message.error(res.meta.msg)
           this.menulist=res.data
           console.log(res);
        },
        //点击按钮，切换菜单的折叠与展开
        toggleCollapse(){
            this.isCollapse= !this.isCollapse
        },
        //保存链接的激活状态
        saveNavState(activePath) {
            window.sessionStorage.setItem('activePath', activePath)
            this.activePath=activePath
        }
    },
}
</script>

<style lang="less" scoped>
.el-container {
    height: 100%;
}
.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
        display: flex;
        align-items: center;
        span {
            margin-left: 15px;
        }
    }
}

.el-aside {
    background-color: #333744;
    .el-menu {
        border-right:none;
    }
}

.el-main {
    background-color: #eaedf1;
}

.iconfont {
    margin-right: 10px;
}

.toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2rem;
    cursor: pointer;
}
</style>