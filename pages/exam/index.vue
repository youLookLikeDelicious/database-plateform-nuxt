<template>
    <div class="app">
        <div class="home_header_info">
            <h2>文章列表</h2>
            <p>培育能力的事必须继续不断地去做，又必须随时改善学习方法，提高学习效率，才会成功。</p>
        </div>
        <breadInfo/>
        <ul class="exam_module_list">
            <li v-for="exam in exams">
                <a @click="showDetail(exam.id)">{{exam.title}}</a><span class="clear">2019-5-5</span></li>
        </ul>
        <router-view></router-view>
    </div>
</template>    


<script>
import breadInfo from '@/components/common/bread-info'
import axios from '@/plugins/axios'
export default {
    name: 'exam',
    data(){
        return {
            exams: undefined
        }
    },
    asyncData(){
        return axios({
            method: 'GET',
            url: '/exam/list'
        }).then( response=>{
            return response.data
        }).catch( ()=>{
            
        })
    },
    components:{
        breadInfo
    },
    methods:{
        showDetail(id){
            this.$router.push({path: `/exam/${id}`})
        }  
    },
    mounted(){
        this.$store.commit('bread/setModule', '试题')
        this.$store.commit('bread/setPart', '列表')
    }
}
</script>


<style lang="scss">
    .exam_module_list{
        display: block;
        width: 100%;
        li{
            height: 0.35rem;
            line-height: 0.35rem;
            margin-top: 0.12rem;
            padding-bottom: 0.03rem;
            padding-left: 0.12rem;
            box-sizing: border-box;
            border-bottom: 0.01rem dashed #c6c6c6;
        }
        a{
            color: #343434;
            &:hover{
                text-decoration: underline;
            }
        }
        span{
            font-size: 0.12rem;
            float: right;
            display: inline-block;
            color: #898989;
        }
    }
</style>