// 默认动画速度,单位毫秒
let speeds = {
        fast: 200,
        slow: 800, 
        _default: 400},
    // 根据指令自动设置动画配置
    // 每个指令返回的是json config 
    autoConfig = {
    // 渐现
    // 只要不透明度小于1，就执行动画
    fadeIn: function(elem){
        if(window.Animate.css(elem, 'opacity') < 1){
            return {"opacity": 1};
        }
    },
    // 渐隐
    // 只要不透明度大于0就执行动画
    fadeOut: function(elem){
        if(window.Animate.css(elem, 'opacity')  > 0){
            return {"opacity": 0};
        }
    },
    // 自动渐隐渐现
    fadeToggle: function(elem){
        var Animate = window.Animate;
        if(Animate.css(elem, 'opacity') == 0){
            return {"opacity": 1};
        } else if(Animate.css(elem, 'opacity') == 1){
            return {"opacity": 0};
        }
    },
    // 向上滑动
    slideUp: function(elem){
        elem.setAttribute('data-direct', 'up')
        var h = elem.getAttribute('slideTo') ;
        // 如果元素没有slidTo属性，添加之，值为元素当前的计算高度
        if( !h ){
            h = window.Animate.css(elem, 'height')
            elem.setAttribute( 'slideTo', h )
        }
        
        if(h > 0){
            return {height:0};
        }
    },
    // 向下滑动
    slideDown: function( elem ){
        elem.setAttribute('data-direct', 'down');
        var h = elem.getAttribute('slideTo');
        if(elem.style.disply == 'none'){
            elem.style.disply = 'block'
        }
        // 没有slideTo Attribute 添加之
        if(!h){
            h = window.Animate.css(elem, 'height');
            elem.setAttribute('slideTo', h);
            elem.style.height = '0';
        }
        return {height: h}
    },
    // 自动滑动
    // 1、当前的计算高度为0 向下滑动
    // 2、当前的计算高 > 0 向上滑动
    slideToggle: function(elem){
        var direct = elem.getAttribute('data-direct') || 'down';    // 获取元素当前的高度
        
        if( direct === 'up'){
            return this.slideDown(elem);
        } 
        else if( direct === 'down' ){
            return this.slideUp(elem);
        }
    }
}
/* 一个元素对象对应的一个或多个动画效果
 * @param elem 元素对象
 * @param styles 结果样式
 * @param time消耗的时间
 * delay 可以是时间或函数，当delay为function时，默认立即执行
 * config string || json
 */
// 自定义动画
class AnimateInstance{
    constructor(elem, config, duration, delay, callback){
        this.parent = window.Animate;

        this.queue = [];
        this.elem = elem;
        this.speeds = speeds;
        
        // 根据指令生成配置
        if(typeof config === 'string'){
            // 如果没有预定义动画，结束执行
            if(!this[config])
                return ;
            
            config = this[config](elem);
        }
        this.animate(config, duration, delay, callback);
    }
    // 用于追加动画，将动画推入到队列中
    // 当delay为function类型时，默认没有延时
    animate ( config, duration, delay, callback ){
        var _this = this,
            _callback = typeof delay === 'function'? delay : callback;
        // 判断是否延迟处理
        if( typeof delay === 'number' ){
            window.setTimeout(function(){
                _this.getConfig( config, duration, _callback );
            }, delay);
        } else{
            this.getConfig( config, duration, _callback );
        } 
    }
    // 获取当前配置
    curConfig(){
        return this.queue[1];
    }
    // 动画入队操作
    // 如果当前实例存在动画，将动画配置推入站即可
    // return 表示入队操作完成
    enqueue(item){
        var timers = this.parent.timers, queue = this.queue;
        if( queue[0] === 'inprogress' ){
            queue.push(item);
        } else{
            // 第一次入队操作
            item['startTime'] = Date.now();
            queue.push( 'inprogress' );
            queue.push(item);
            timers.push(this);
            this.parent.start(); 
        }
        
        return true;
    }
    // 动画出队操作
    // return 
    //      如果没有后续动画，返回false, 
    //      如果有后续动画，返回true
    dequeue (){
        var queue = this.queue;

        queue.shift();
        
        queue.shift();
        // 设置下一个动画效果的起始时间
        if(queue.length >= 1){
            queue[0]['startTime'] = Date.now();
        }
        
        queue.unshift( 'inprogress' );
        
        return queue.length >= 2;
    }
    getConfig (config, duration, callback){
        var i, cur, buffer, 
            Animate = this.parent,
            tmp = {},
            elem = this.elem,
            compute_val = {},
            cur_val = {},
            styles = Animate.css(elem);
        
        // 所传的配置参数必须是json对象，否则不予以处理
        if(Object.prototype.toString.call(config) === '[object Object]'){
            // 获取当前属性的值和总的计算量
            for(i in config){
                if(i in styles){
                    cur = Animate.css(elem, i);
                    compute_val[i] = config[i] - cur;
                    cur_val[i] = cur;
                }
            }
            // 获取缓冲函数
            buffer = config.hasOwnProperty('buffer')? config.buffer : 'swing';
            tmp['buffer'] = buffer;
            
            tmp['cur_val'] = cur_val;
            tmp['compute_val'] = compute_val;
            tmp['duration'] = typeof duration === 'number'? duration:duration in this.speeds? this.speeds[duration]: this.speeds._default;
            
            // 添加回调函数
            if(typeof callback === 'function')
                tmp['callback'] = callback;
            
            // 动画入队操作
            this.enqueue(tmp)
            
            // 结束当前的动画
            if( config.hasOwnProperty('finish') && config.finish === true){
                // 如果之前有动画，则取消之前的动画，反之不取消
                if(this.queue.length > 2){
                    this.dequeue();
                }
            }
        }
    } 
    // 添加扩展配置（根据指令，自动设置动画配置）
    // 值接受json对象
    static extend(obj){
        for(let key in obj){
            // 如果AnimateInstance已经拥有obj的key值，报错
            if(AnimateInstance.hasOwnProperty(key)){
                new Error('AnimateInstance already had this propety!')
            }
            AnimateInstance.prototype[key] = obj[key];
        }
    }
}
AnimateInstance.extend(autoConfig)
export default AnimateInstance;