<!-- 教材详情组件 -->
<template>
    <div class="app">
<!--        位置信息-->
        <section class="detail_nav">当前位置: 首页>教材>{{title}}</section>
        <hr class="detail_line"/>
<!--        封面和先关属性-->
        <div class="detail_head">
            <div class="left_head">
                <img :src="cover"/>
                <section>
                    <span><i class="icofont-eye"></i>{{visit}}</span>
                    <span class="tag">
                        <i v-for="tag in tags" class="tag">{{tag}}</i>
                    </span>
                    <span><i class="icofont-heart-alt"></i> 收藏</span>
                </section>
            </div>
            <div class="right_head">
                <h3>{{title}}</h3>
                <p>上传: {{upper}}</p>
                <p class="prompt">如果您想查看隐藏内容，请在评论区 <span>评论</span></p>
            </div>
        </div>
<!--        课程详细介绍-->
        <div class="detail_content">
            <multTag :list="multTag" @clickTag="clickTag" :tagStyle="'red'"/>
            <article class="introduce">
                <p>{{introduce}}</p>
            </article>
            <article class="chapter"><p>{{chapter}}</p></article>
            <commentList :comments="comments"/>
        </div>
    </div>
</template>

<script>
    import multTag from '@/common/mult-tags'
    import commentList from './commentList'
    export default {
        name: 'detail',
        components: {
          commentList,
          multTag  
        },
        data: () => {
            return {
                visit: null,
                tags: null,
                title: null,
                cover: null,
                upper: null,
                introduce: null,
                chapter: null,
                comments: null,
                multTag:[
                    '课程介绍',
                    '章节目录',
                    '评论'
                ]
            }
        },
        methods:{
            // @param ind 多标签的索引，从0开始
            clickTag(ind){
                // 元素行为的设置
                var articles = document.querySelectorAll('.detail_content>article')  // 简介、评论和章节目录标签列表
                    
                // 显示与li对应的内容，其他的内容隐藏
                for(let i = 0, len = articles.length; i < len; i++){
                    articles[i].style.display = 'none'
                }

                articles[ind].style.display = 'block'
            }
        },
        mounted(){
            // 从后台获取相关数据
            this.cover = './static/img/cover.jpg';
            this.tags = ['实战', '高级'];
            this.visit = 1000;
            this.title = 'Mysql 核心优化';
            this.upper = '你好像很好吃';
            this.introduce = '对于查询占主要的应用来说，索引显得尤为重要。很多时候性能问题很简单的就是因为我们忘了添加索引而造成的，或者说没有添加更为有效的索引导致。如果不加索引的话，那么查找任何哪怕只是一条特定的数据都会进行一次全表扫描，如果一张表的数据量很大而符合条件的结果又很少，那么不加索引会引起致命的性能下降。但是也不是什么情况都非得建索引不可，比如性别可能就只有两个值，建索引不仅没什么优势，还会影响到更新速度，这被称为过度索引。';
            this.chapter = '第01课：SQL数据库应用程序到Windows Azure虚拟机中';
            this.comments = [
                {
                    stamp: '/static/img/stamp1.jpg',
                    data: '2019-1-17',
                    content: 'sdfsdfsdfsdfs',
                    name: '你好像很好吃'
                },
                {
                    stamp: '/static/img/stamp1.jpg',
                    data: '2019-1-17',
                    content: `对于时间和岁月，我好像从未思考和关注过，但前不久常州博物馆的伊犁民族风情展的一个活动，却让我感受了岁月的神秘。

馆内十分安静，但我们却早已是心潮澎湃。满心的好奇不断被一件件沉睡的展品勾起，澄澈眼眸里的惊异更诉说着我们对这遥远草原的向往。

走过雕塑，看过鹿石，我的目光一下被一张金光闪闪的面具所吸引，面具呈方圆形，额际宽阔，下额丰满，嘴唇微启，八字须，大小与真人面孔相差无几。面具做工精细，由纯黄金打造，还在眼睛、眉毛等部位都镶满了红宝石，红宝石眼睛仍旧蕴含着主人的昔日神采。整体看来是那么精致，那么迷人。究竟是怎样的鬼斧神工才能雕琢出这样一张面具啊，毫无疑问在当时这一定价值连城。

但无论是黄金还是宝石，终究抵挡不了时间洪流的冲刷，黄金暗淡，宝石蒙尘，面部还有一块不小的黑斑，凹凸不平的面部让整张面具显得更加古老，令人琢磨不透这面具之下的岁月。

那黑斑或许是出土时人们不小心造成的损伤，亦或是主人生前戴着面具，驰骋沙场时留下的光荣印记。透过黑斑，透过这个时间漩涡，仿佛看到了所有人都围聚在面具主人身边，沉痛怀念着为守卫家园而捐躯的将军，他躺在那里，依旧魁梧，但面容严重灼伤。一位老者给他戴上了金面具，让其恢复神采，让他的灵魂在面具中永生……

这个镶嵌红宝石的金面具一直印在我的脑海，已然成为一个神秘的岁月符号，牵动着我无限的好奇。或许在他背后有着起浮人生，有着凄美爱情，有着心酸血泪......`,
                    name: '你好像很好吃'
                }
            ];
        }
    }
</script>

<style lang="scss">
    .detail_nav{
        font-size: 0.12rem;
        margin-left: 0.24rem;
    }
    .detail_line{
        width: 96%;
        height: 2px;
        size: 2px;
        box-shadow: 0 2px 7px #c6c6c6;
        margin: 0.12rem auto;
        border: 0px;
        background-image: linear-gradient(to right, #FFCC99, #FF0033);
    }
    .detail_head{
        font-size: 0.16rem;
        overflow: hidden;
        margin-top: 0.2rem;
        margin-left: 0.24rem;
    }
    .left_head{
        width: 5rem;
        float: left;
        img{
            width: 5rem;
            height: 2.7rem;
            border-radius: 0.07rem;
        }
        span{
            position: relative;
            height: 0.15rem;
            display: inline-block;
            line-height: 0.15rem;
            &:last-child{
                margin-left: 0.32rem;
                cursor: pointer;
            }
        }
        .icofont-heart-alt{
            color: #C6C6C6;
            cursor: pointer;
        }
        .tag{
            font-size: 0.12rem;
            margin-left: 0.17rem;
            font-style: normal;
        }
    }
    .right_head{
        height: 2.5rem;
        float: left;
        margin-left: 0.6rem;
        border-left: 1px solid #c6c6c6;
        padding-left: 0.2rem;
        font-size: 0.14rem;
        line-height: 0.28rem;
        p{
            height: 30px;
            word-wrap: break-word;
        }
        .bottom_info{
            font-size: 0.10rem;
        }
        .prompt{
            letter-spacing: 0.02rem;
            color: #c6c6c6;
            span{
                color: #FF9900;
                cursor: pointer;
            }
        }
    }
    .detail_content{
        width: 5.55rem;
        border-top: 1px solid #c6c6c6;
        border-radius: 0.07rem;
        margin-top: 0.24rem;
        margin-left: 0.24rem;
        ul{
            margin-top: 0.12rem;
            margin-bottom: 0.12rem;
            list-style: none;
            li{
                display: inline-block;
                cursor: pointer;
                margin-right: 0.12rem;
                padding-bottom: 0.05rem;
            }
        }
    }
    .introduce{
        p{
            font-size: 0.14rem;
            text-indent: 2em;
            line-height: 0.23rem;
        }
    }
    .chapter{
        display: none;
    }
</style>