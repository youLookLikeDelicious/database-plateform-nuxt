<template>
    <div class="app">
        <div class="material_list_header">
            <h2>教材列表</h2>
            <p>虚假的学问比无知更糟糕。无知好比一块空地，可以耕耘和播种；虚假的学问就象一块长满杂草的荒地，几乎无法把草拔尽。——康因</p>
        </div>
        <bread/>
        <div class="material_list_title">
<!--
            <section class="type">
                <span>分类</span>
                <ul>
                    <li>mysql</li>
                    <li>DB2</li>
                    <li>SQLSERVER</li>
                    <li>Mongodb</li>
                    <li>其他</li>
                </ul>
            </section>
-->
            <section>
                <span class="title">共{{total}}份资料</span>
<!--
                <ul>
                    <li class="on">综合排序</li>
                    <li>最热</li>
                    <li>最新</li>
                </ul>
-->
            </section>
        </div>
        <article class="article_list_box" v-for="material in materials">
            <div class="cover"><img :src="$baseUrl+material.small_cover"></div>
            <div class="material_info">
                <h3><a @click="showDetail(material.id)">{{material.title}}</a></h3>
                <section>
                    <div><span class="icofont-eye">{{material.visited}}</span>
                    <span class="tags">{{material.type|typeFrom}}</span></div>
                    <p class="material.introduction">{{material.introduction}}</p>
                </section>
            </div>
        </article>
    </div>
</template>

<script>
    import axios from '@/plugins/axios'
    export default {
        name: 'materialList',
        data(){
            return {
                total: null,
                materials: null
            }
        },
        asyncData(){
            return axios({
                method: 'GET',
                url: 'material/list'
            }).then( response=>{
                return response.data
            }).catch( ()=>{
                
            })
        },
        methods:{
            showDetail(id){
                this.$router.push({path: `/material/${id}`})
            }
        },
        mounted(){
            this.$store.commit('bread/setModule', '教材')
            this.$store.commit('bread/setPart',   '列表')
        }
    }
</script>

<style lang="scss">
/*    名言警句部分*/
    .material_list_header{
        margin-bottom: 0.24rem;
        h2{
            font-family: '楷体'
        }
        p{
            text-indent: 2em;
            margin-top: 0.12rem;
            width: 3.5rem;
            font-size: 0.13rem;
            color: #aaa;
        }
    }
/*    分类和排序部分*/
    .material_list_title{
        widows: 100%;
        overflow: hidden;
        .type{
            margin-bottom: 0.12rem;
        }
        ul, ul li{
            display: inline-block;
        }
        ul{
            margin-left: 0.12rem;
        }
        ul li{
            background: #FFF;
            height: 0.25rem;
            line-height: 0.25rem;
            margin-right: 0.12rem;
            cursor: pointer;
            color: #333333;
            font-size: 0.14rem;
            &:hover{
                color: #EE0033
            }
        }
        .on{
            border-bottom: 2px solid #FF0033;
        }
        .list{
            
        }
        .title{
            font-size: 0.13rem;
            color: #a7a7a7;
        }
    }
/*    文章列表部分*/
    .article_list_box{
        margin-top: 0.42rem;
        width: 10.48rem;
        padding-bottom: 0.17rem;
        border-bottom: 0.01rem solid #c6c6c6;
        white-space: nowrap;
        background-color: white;
        padding-top: 0.24rem;
        .cover{
            width: 2.2rem;
            height: 1.2rem;
            display: inline-block;
            vertical-align: top;
        }
        img{
            width: 2.2rem;
            height: 1.2rem;
            border-radius: 0.05rem;
        }
        .material_info{
            vertical-align: top;
            width: 8rem;
            height: 1.2rem;
            display: inline-block;
            margin-left: 0.15rem;
        }
        h3{
            font-size: 0.15rem;
            font-weight: bold;
            color: #232323;
        }
        section{
            font-size: 0.12rem;
            color: #a7a7a7;
            margin-top: 0.1rem;
        }
        .tags{
            margin-left: 0.17rem;
            i{
                margin-left: 0.12rem;
            }
        }
        p{
            margin-top: 0.12rem;
            font-size: 0.14rem;
            text-indent: 2em;
            color: #232323;
            white-space: normal;
            text-align: justify;
        }
    }
</style>