<template>
    <div class="navigate">
        <div>
            <div class="menu">
                <i class="icofont-navigation-menu"></i>
            </div>
            <div class="logo">
                <img width="55" height="55" src="/img/logo.svg"/>
            </div>
            <ul class="nav_list">
                <li :class="{'on': $router.history.current.name == 'index'}">
                <a @click="goTo('index')">首页</a></li><li :class="{'on': $router.history.current.name.indexOf('material') === 0}">
                <a @click="goTo('material')">教材</a></li><li :class="{'on': $router.history.current.name.indexOf('exam') === 0}">
                <a @click="goTo('exam')">试题</a></li><li :class="{'on': $router.history.current.name.indexOf('article') === 0}">
                <a @click="goTo('article')">文章</a></li>
            </ul>
        </div>
        <div class="right">
            <component :is="navBtn"/>
            <div class="search">
                <input type="text" placeholder="教材/试题/论坛" />
                <i class="icofont-search-2"></i>
            </div>
        </div>
    </div>
</template>


<script>
import logRegistBtn from '@/components/common/logRegistBtn'
import userInfoBtn  from '@/components/common/userInfoBtn'
export default {
    name: 'navigate',
    asyncData({store}){
        return store.dispatch('userInfo/getUserInfo')
    },
    computed:{
        navBtn(){
            return this.$store.state.userInfo.navBtn
        }  
    },
    methods:{
      goTo(name){
          this.$router.push({name: name})
      }  
    },
    components:{
        "logRegistBtn": logRegistBtn,
        "userInfoBtn":  userInfoBtn
    }
}
</script>


<style lang="scss">
    .navigate{
    width: 100%; 
    height: $nav-height; 
    line-height: $nav-height;
    background: #222222; 
    color: #ffffff; 
    overflow: hidden;
    font-size: 0.17rem;
    position: fixed;
    top: 0px;
    z-index: 1001;
        div, ul, ul li{
            display: inline-block;
        }
        // 暂且封印
        .menu{
            display: none;
            font-size: 1.5em;
            font-weight: normal;
            vertical-align: top;
            width: $nav-height; height: $nav-height;
            transition: 0.3s;
            cursor: pointer;
            text-align: center;
            &:hover{
                background-color: $red_color;
            }
        }
        .logo{
            width: 55px;
            height: $nav-height;
            margin-left: 17px;
        }
        .nav_list{
            height: $nav-height;
            vertical-align: top;
            margin-left: 17px;
            a{
                &:link, &:visited{
                    color: #FFF
                }
                &:hover{
                    color: #FF0033;
                }
            }
            .on{
                color: $red-color;
                &::after{
                    width: 100%;
                }
            }
            li{
                height: 0.5rem;
                transition: 0.2s;
                box-sizing: border-box;
                line-height: 0.51rem;
                &:first-child{
                    margin-left: 0.36rem;
                }
                &::after{
                        content: '';
                        display: block;
                        width: 0;
                        height: 0.03rem;
                        background-color: $red-color;
                        transition-duration: 0.2s;
                        margin: 0 auto;
                        border-radius: 0.03rem;
                    }
                &:hover::after{
                    width: 100%;
                }
                a{
                    padding-left: 0.12rem;
                    padding-right: 0.12rem;
                }
            }
        }
    }
    .right{
        overflow: hidden;
        float: right;
        .personal_center{
            width: 1.6rem;
            text-align: center;
            float: right;
            .center, .login, .regist{
                cursor: pointer;
                margin-right: 20px;
                transition: 0.3s;
            }
            .center, .login{
                &:hover{
                    color: $red_color;
                }
            }
            .regist{
                width: $nav-height;
                height: $nav-height;
                background-color: $red_color;
                &:hover{
                    background: #FF6666;
                }
            }
        }
        .search{
            width: 1.5rem;
            height: 0.27rem;
            min-width: 1.2rem;
            margin-right: $big_space;
            position: relative;
            float: right;
            i{
                width: 35px;
                height: 35px;
                font-size: 1.3em;
                position: absolute;
                top: 20px;
                right: -13px;
                cursor: pointer; 
                transition: 0.3s;
                &:hover{
                    color: $red_color;
                }
            }
            input{
                width: 100%;
                height: 27px;
                font-size: 0.1rem;
                padding-left: 3px;
                border: 0px;
                border-bottom: 1px solid #fff;
                outline: 0px;
                background-color: transparent;
                caret-color: #fff;
                color: #e6e6e6;
                &::placeholder{
                    letter-spacing: 2px;
                    font-size: 0.12rem;
                }
            }
        }
    }
</style>