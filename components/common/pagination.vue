<!--
绑定父组件的状态
对象的格式与pageInfo props相同
<pagination :pageInfo="pageInfo" @changePage="changePage"/>
父组件监听此组件的changePage事件,页数作为唯一的参数
-->
<script>
export default {
    name: 'pagination',
    props: {
        pageInfo:{
            default(){
                return {
                    baseUrl: undefined,
                    curPage: undefined,
                    next: undefined,
                    previous: undefined,
                    total: 0,
                    first: undefined,
                    last: undefined,
                    pages: undefined, // 总的页数
                }
            }
        }
    },
    data(){
        return {
            jumpPage: 0
        }
    },
    render(h){
        if(this.pageInfo.total === 0) return
        
        let lis = []
                
        for(let i = this.pageInfo.first, len = this.pageInfo.last; i <= len; i++){
            lis.push(h('li', {
                on: {
                    click: () => {
                        this.changePage(i)
                    }
                },
                class:{
                    item: 'true',
                    cur_page: i == this.pageInfo.curPage
                },
                domProps: {
                    innerText: i
                }
            }))
        }
        
        // 设置尾页和首页
        if(this.pageInfo.last !== 1){
            lis.push(h('li', {
                on: {
                    click: () => {
                        this.changePage(this.pageInfo.pages)
                    }
                },
                domProps: {
                    innerText: '尾页',
                },
                class:{
                    end_point: this.pageInfo.curPage != this.pageInfo.last
                }
            }))
            
            lis.unshift(h('li', {
            on:{
                click: () => {
                    this.changePage(1)
                }
            },
            domProps: {
                innerText: '首页'
            },
            class:{
                end_point: this.pageInfo.curPage != this.pageInfo.first
            }
        }))
        }
        
        // 总页数信息
        lis.push(h('li',` 共${this.pageInfo.pages}页`))
        
        // 跳转页input
        lis.push(h('li',[
            h('input', {
                domProps: {
                    type: 'text',
                    className: 'jump_input'
                },
                on: {
                    input: (e) => {
                        let value = e.target.value
                        e.target.value = value.match(/^[1-9]\d*/)
                        this.jumpPage = e.target.value
                    }
                }
            })
        ]))
        // 跳转按钮
        lis.push(h('li', [
            h('a', {
                domProps: {
                    className: 'jump_btn',
                    innerText: '跳转'
                },
                on: {
                    // input中的内容必须是数字
                    // input的取值范围为1 ~ pageInfo.pages
                    click: ()=>{
                        if(this.jumpPage > this.pageInfo.pages)
                            this.jumpPage = this.pageInfo.pages
                        
                        this.changePage(this.jumpPage)
                    }
                }
            })
        ]))
        
        return h('ul', {
            domProps: {
                className: 'pagination'
            }
        } ,lis)
        
    },
    computed:{
    },
    methods:{
        changePage(ind){
            if(this.pageInfo.curPage == ind) 
                return
            this.$emit('changePage', ind)
        }
    }
}
</script>

<style lang="scss">
    $li-height: 0.23rem;
    .pagination{
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        font-size: 0.14rem;
        li{
            display: inline-block;
            margin-right: 0.07rem;
            box-sizing: border-box;
            height: $li-height;
            line-height: $li-height;
        }
        .item, .end_point{
            border: 0.01rem solid #c6c6c6;
            text-align: center;
            cursor: pointer;
        }
        .item, .end_point, .jump_btn{
            &:hover{
                color: #20a4e9;
                border-color: #20a4e9;
            }
        }
        .item{
            width: $li-height;
            line-height: $li-height;
        }
        .end_point{
            padding-left: 0.04rem;
            padding-right: 0.04rem
        }
        .cur_page{
            cursor: default;
            border: 0;
            &:hover{
                color: black;
            }
        }
        .jump_btn{
            height: $li-height;
            padding-left: 0.03rem;
            padding-right: 0.03rem;
            display: inline-block;
            color: #333;
            border: 0.01rem solid #c6c6c6;
        }
        .jump_input{
            width: 0.23rem;
            height: $li-height;
        }
    }
</style>