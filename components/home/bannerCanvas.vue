<script>
    // 根据图片的数量生成画布
//    <div class="canvas">
//        <a><img/></a>
//        ......
//        <a><img/></a>
//        <ul>
//            <li>1</li>
//            ...
//            <li>n</li>
//        </ul>
//    </div>
    export default {
        name: 'bannerCanvas',
        data(){
            return {
               bannerInfo: [
                   {url: '/img/banner_1.jpg', alt: 'banner1'},
                   {url: '/img/banner_2.jpg', alt: 'banner2'},
                   {url: '/img/banner_3.jpg', alt: 'banner3'}
                 ]
            }
        },
        render(h){
            if(this.bannerInfo){
                var childNodes = this.bannerInfo.reduce(
                    (dist, item, index) =>{
                        dist[0].push (
                            h('a', {
                            domProps:{
                                title: item.title || '',
                                href: item.href || ''
                            }
                        }, [
                            h('img', {
                                domProps:{
                                    src: item.url
                                }
                            })
                        ])
                        );
                        dist[1].push( h('li', {
                            class: {
                                on: (index === 0)
                            }
                        }) );
                        return dist;
                    }
                , [[], []]);
                
                childNodes[0].push(
                    h('ul', childNodes[1])
                );
                
                return h('div', {
                    attrs:{
                        class: 'canvas'
                    }
                },
                childNodes[0])
            }
        },
        mounted(){
            // 实例化banner动画
            this.$Animate.bannerFader(this.$el, {speed: 540, interval: 5000})
        }
    }
</script>
<style lang="scss">
    .canvas{ 
        left: 0; 
        top: 0;
        font-size: 0; 
        overflow: hidden;}
    .canvas a{
        position: absolute;
    }
    .canvas ul{
        width: 150px; 
        height: 27px; 
        z-index: 4; 
        position: absolute;
        left: 230px; 
        bottom: 7px;
        text-align: center;
        line-height: 27px;
    }
    .canvas img{
        width: 880px;
        height: 350px;
    }
    .canvas li{
    width:18px;
    height: 18px; 
    border-radius: 17px; 
    margin-right:15px; 
    display: inline-block; 
    transition: 0.3s;
    line-height: 18px;
    &:after{
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 6px;
        display: inline-block;
        border: 2px solid #FFFFF0;
        vertical-align: middle;
        margin: 0;
        padding: 0;
    }
}
 .canvas ul .on{
    background: rgba(255,255,230, 0.5);
    box-shadow: 0 0 5px white;
    &:after{
        background-color: #FFFFF0;
    }
}
</style>