<!--import bread from '@/pages/home/components/common/bread-info'-->
<!--<bread/>-->
<template>
    <header class="home_bread_info">
        数据库学习平台>{{module}}>{{part}}
    </header>
</template>


<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('bread')
export default {
    name: 'breadInfo',
    computed: {
        ...mapState( {
            module: state => state.module,
            part:   state => state.part
        })
    }
}
</script>


<style lang="scss">
    .home_bread_info{
        font-size: 0.12rem;
        color: #787878;
        border-bottom: 0.01rem solid #c6c6c6;
        padding-bottom: 0.03rem;
        text-align: left;
        margin-bottom: 0.24rem
    }
</style>