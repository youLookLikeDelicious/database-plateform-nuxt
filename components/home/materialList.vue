<template>
<div class="material_list">
	<article class="material_box" v-for="(item, index) in materialInfo">
		<div class="img_wrap">
		    <img 
		        @click="showDetail(item.id)"
		        :src="$baseUrl + item.small_cover"/>
		</div>
		<a
		@click="showDetail(item.id)">{{item.title}}</a>
		<section class="footer">
            <span class="icofont-eye"> {{ item.visited }}</span>
            <span class="type clear">
                <i>{{item.type|typeFrom}}</i>
            </span>
        </section>
    </article>
</div>
</template>
<script>
    export default{
        name: 'materailList',
        props:['materialInfo'],
        methods:{
            showDetail(id){
                this.$router.push({path: `/material/${id}`})
            }
        }
    }
</script>

<style lang="scss">
    .material_list{
        width: 100%;
        font-size: 0.16rem;
    }
    .material_box{
        display: inline-block;
        margin-left: 0.21rem;
        overflow: hidden;
        width: 2.2rem;
        transition-duration: 0.3s;
        .img_wrap{
            width: 2.2rem;
            height: 1.2rem;
            text-align: center;
            box-sizing: border-box;
            overflow: hidden
        }
        img{
            width: 2.2rem;
            height: 1.2rem;
            border-radius: 5px;
            cursor: pointer;
            -webkit-transition-duration: 0.2s;
            -mos-transition-duration: 0.2s;
            -ms-transition-duration: 0.2s;
            -o-transition-duration: 0.2s;
            transition-duration: 0.2s;
            &:hover{
                width: 2.42rem;
                height: 1.32rem;
                margin-left: -0.11rem;
                margin-right: -0.06rem;
            }
        }
        a{
            margin-bottom: 0.07rem;
            font-size: 0.15rem;
            padding-left: 0.07rem;
            &:hover{
                text-decoration: underline
            }
        }
        .footer{
            height: 0.17rem;
            line-height: 0.17rem;
            overflow: hidden;
        }
        span{
            font-size: 0.14rem;
            height: 0.16rem;
            line-height: 0.16rem;
            padding-left: 0.07rem;
            i{
                font-style: normal;
            }
        }
        .type{
            color: #454545;
            float: right;
            margin-right: 0.07rem;
        }
    }
</style>