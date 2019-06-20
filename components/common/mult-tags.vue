<!--
1、使用Object.assign继承此模版的属性
2、父组件需要监听clickTag事件，标签的索引作为荷载参数
<multTag :list=""/>
props mixed list
    array[item]
        item {name:'name, iconFont:'icon-font'} || string
-->
<template>
	<!--    多标签列表模板-->
    <header :class="{'mult_tags': true, 'mult_tags_red': tagStyle == 'red', 'mult_tags_blue': tagStyle == 'blue'}">
        <ul>
            <li v-for="(li, index) in list" @click="clickTag(index)" :class="{on: index == curTag}"><span><i v-if="li.hasOwnProperty('iconFont')" :class="li.iconFont"></i>{{li.name || li}}</span></li>
        </ul>
    </header>
</template>

<script>
	export default {
		name: 'multTags',
		props: {
            'list':{
                required: true
            }, 
            'tagStyle': {
                 default: 'blue'
            }
        },
        data(){
            return {
                curTag: 0
            }
        },
        methods: {
            // 点击标签事件
            clickTag(index){
                this.curTag = index
                this.$emit('clickTag', index)
            }
        }
    }
</script>

<style lang="scss">
    .mult_tags{
        font-size: 0.17rem;
        letter-spacing: 0.05rem;
        margin-bottom: 0.24rem;
        ul li{
            span {
                height: 0.25rem;
                line-height: 0.25rem;
                padding-left: 0.07rem;
                padding-right: 0.07rem;
            }
            display: inline-block;
            cursor: pointer;
            &::after{
                content: '';
                width: 0%;
                height: 0.02rem;
                margin: 0 auto;
                display: block;
                transition-duration: 0.2s;
            }
            &:hover::after{
                width: 100%;
            }
        }
    }
    .mult_tags_red{
        // 当前选中项
        .on{
            color: $red-color;
            &::after{
                width: 100%;
            }
        }
        ul li{
            color: $red-color;
            &::after{
                background: $red-color;
            }
        }
    } 
    .mult_tags_blue{
        // 当前选中项
        .on{
            color: #20a4e9;
            &::after{
                width: 100%;
            }
        }
        ul li{
            color: #20a4e9;
            &::after{
                background-color: #20a4e9;
            }
        }
    }
</style>