import Vue from 'vue'
Vue.filter('formatDate', function(u){
    let date = new Date( parseInt(u) * 1000 )
    
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
})
Vue.filter('typeFrom', function(index){
    const types = ['初级', '中级', '高级']
    return types[index]
})
Vue.filter('formatIsOriginal', function(flag){
    return flag == 'yes'? '原' : '转'
})