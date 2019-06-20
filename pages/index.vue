<template>
    <div class="app">
        <!--      banner和推荐文章部分-->
        <div class="last_news">
            <div class="banner">
                <bannerCanvas></bannerCanvas>
            </div>
            <div class="popular_article">
                <p>本月最受欢迎</p>
                <hr />
                <ul>
                    <li v-for="(item, index) in articles">
                        <a @click="overLookArticle(item.id)" :href="item.href">{{index + 1}}、{{item.title}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <!--      教材列表部分-->
        <div class="recommend_material">
            <h3 class="recommend_title"></h3>
            <materialList :materialInfo="materials" />
        </div>
        <!--      试题列表部分-->
        <div class="popular_exam">
            <div class="popular_exam_title">本月最受欢迎</div>
            <examList :popularExam="exams" />
        </div>
    </div>
</template>

<script>
    import bannerCanvas from '@/components/home/bannerCanvas'
    import materialList from '@/components/home/materialList'
    import examList from '@/components/home/examList'
    import axios from '@/plugins/axios'
    export default {
        name: 'index',
        components: {
            bannerCanvas,
            materialList,
            examList,
        },
        data() {
            return {
                bannerInfo: null, // banner信息
                articles: undefined, // 推荐文章列表,
                materials: undefined, // 推荐教材信息
                exams: undefined // 受欢迎实体列表
            }
        },
        asyncData(){
            return axios({
                url: ''
            }).then( response =>{
                return response.data
            }).catch( ()=>{
                console.log('suppernature event')
            })
        },
        methods:{
            overLookArticle(id){
                this.$router.push({path: `/article/${id}`})
            }
        }
    }

</script>

<style lang="scss">
    .last_news {
        margin-top: 25px;
        width: 1220px;
        overflow: hidden;
        box-shadow: 0 5px 20px #c7c7c7;
        background-color: #fff;

        .recommond_news {
            width: 320px;
            float: right;
        }
    }

    ;

    /*banner样式*/
    .banner {
        width: 880px;
        height: 350px;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
        float: left;
        left: 0
    }

    ;

    /*本月最受欢迎文章列表*/
    .popular_article {
        width: 280px;
        border: 2px solid #e6e6e6;
        border-radius: 5px;
        margin-right: 20px;
        padding-top: 12px;
        padding-bottom: 12px;
        float: right;

        p {
            padding-left: 14px;
            font-size: 16px;
        }

        hr {
            width: 97%;
            height: 1px;
            size: 2px;
            border: 0px;
            border-radius: 2px;
            background-color: #c6c6c6;
            margin: 0.12rem 0;
        }

        ul {
            padding-left: 12px;
            font-size: 14px;

            li {
                margin-top: 12px;

                a {

                    &:link,
                    &:visited {
                        color: #000;
                    }

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }

    /*推荐教材部分*/
    .recommend_material {
        width: 12.2rem;
        margin-top: 0.45rem;
        border: 1px solid #c6c6c6;
        border-radius: 0.05rem;
        background-color: #FFFFFF;
        padding-bottom: 0.17rem;
        box-shadow: 0px 0.05rem 0.2rem #c6c6c6;

        // title
        h3 {
            width: 100%;
            text-align: center;
            font-weight: bolder;
            color: #343434;
            letter-spacing: 0.05rem;
            font-family: 'fantasy'
        }

        h4,
        h5 {
            font-weight: normal;
        }
    }

    .recommend_title {
        margin-bottom: 17px;
    }

    /*推荐试题部分*/
    .popular_exam {
        width: 12.2rem;
        height: 500px;
        border: 1px solid #c6c6c6;
        border-radius: 5px;
        margin-top: 65px;
        overflow: hidden;
        white-space: nowrap;
        background-color: white;
    }

    .popular_exam_title {
        width: 270px;
        height: 450px;
        border: 0px solid;
        -moz-border-radius: 15px;
        -ms-border-radius: 15px;
        -webkit-border-radius: 15px;
        border-radius: 15px;
        display: inline-block;
        margin-top: 15px;
        margin-left: 30px;
        padding-left: 20px;
        text-align: left;
        font-size: 0.3rem;
        line-height: 7rem;
        font-weight: 7rem;
        color: #FFF;
        overflow: hidden;
        filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#C2E9FB, endColorstr=#A14CFD);
        background: linear-gradient(#C2E9FB, #A14CFD);
    }

</style>
