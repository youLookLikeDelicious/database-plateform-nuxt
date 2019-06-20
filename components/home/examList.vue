<template>
    <div class="exam_list">
        <article 
            class="exam_box" v-for="(item, index) in popularExam"
            @click="showDetail(item.id)">
            <h5>{{item.data}}</h5>
            <h4>{{item.title}}</h4>
            <!--日期信息-->
            <div class="data_info">创建时间: {{ item.created_at | formatDate }}</div>
            <!--标签信息-->
            <div class="exam_tags" v-if="item.tags">
                <span v-for="tag in item.tags">{{tag}}</span>
            </div>
            <!--头像信息-->
            <div class="author_info">
	            <span><img :src="$baseUrl + item.stamp" alt=""></span><i>上传：{{item.nickname}}</i>
            </div>
        </article>
	</div>
</template>

<script>
    export default {
        name: 'examList',
        props: ['popularExam'],
        methods: {
          showDetail(id){
              this.$router.push({path: `exam/${id}`})
          }  
        },
        mounted(){
            // 为所有的article添加鼠标移入事件
            var articles = this.$el.getElementsByTagName('article');
            for(let i = 0, len = articles.length; i < len; i++){
                // 为每一个article标签添加一个索引
                articles[i].setAttribute('data-index', i);
                
                // 鼠标移入article范围
                // 1、当前article标签向上移动
                // 2、当前标签右边的所有标签向右移动
                articles[i].addEventListener('mouseenter', function() { 
                    this.style.top = '0px';
                    if(this.nextElementSibling)
                        this.nextElementSibling.style.marginLeft = '-50px'; 
                });
                // 效果与鼠标移入相反
                articles[i].addEventListener('mouseleave', function() {
                    this.style.top = '20px';
                    if(this.nextElementSibling)
                        this.nextElementSibling.style.marginLeft = '-100px';
                });
            }
        }
    }
</script>

<style lang="scss">
.exam_list{
    width: 800px;
    height: 470px;
    overflow-y: hidden;
    overflow-x: auto;
    display: inline-block;
    white-space: nowrap;
    margin-top: 15px;
    margin-left: 30px;
    font-size: 0.16rem;
    &::-webkit-scrollbar{
        width: 100%;
        height: 10px;
        border-radius: 7px;
    }
    &::-webkit-scrollbar-thumb{
        border-radius: 10px;
         -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.7);
        background: #535353;
    }
    &::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #EDEDED;
    }
}
.exam_box{
    cursor: pointer;
    &:not(:first-child){
        margin-left: -100px;
    }
    width: 250px;
    height: 400px;
    border-radius: 15px;
    display: inline-block;
    position: relative;
    bottom: 0px; top: 20px;
    box-shadow: -5px 7px 20px #888888;
    overflow: hidden;
    z-index: 1;
    filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#FFFFCC, endColorstr=#0099FF);
    background-image: linear-gradient(to bottom right,  #FFFFCC, #0099FF);
    overflow: hidden;
    transition-duration: 0.3s;
    h5{
        margin-top: 0.3rem;
        margin-bottom: 0.15rem;
        color: #003366;
        margin-left: 0.25rem;
    }
    h4{
        color: #003366;
        margin-left: 0.25rem;
    }
    .data_info{
        font-size: 0.13rem;
        margin-top: 0.12rem;
        margin-left: 0.25rem;
        color: #003366
    }
}
.author_info{
    color: #FFF;
    margin-left: 25px;
    margin-top: 125px;
    margin-bottom: 12px;
    bottom: 12px;
    position: absolute;
    bottom: 0px;
    i{
        width: 65px;
        height: 65px;
        border-radius: 65px;
        display: inline-block;
        font-style: normal;
    }
    img{
        width: 45px;
        height: 45px;
        border-radius: 45px;
    }
}
.exam_tags{
    color: #003366;
    margin-top: 35px;
    margin-left: 25px;
    margin-bottom: 0;
    overflow: hidden;
    span{
        height: 25px;
        padding: 0px 5px;
        margin-right: 7px;
        margin-top: 7px;
        border: 2px #ffffff dashed;
        border-radius: 10px;
        vertical-align: middle;
        float: left;
    }
}
</style>