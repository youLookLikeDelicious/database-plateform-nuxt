/* 按位计算数值
 * @param flag 结果
 * @param code 操作的值
 * @param condition 加/减
 * @return flag
 */
function operateCode(flag, code, condition = true){
    // 加
    if(condition && (flag & code) !== code){
        return flag + code
    }
    // 减
    if(!condition && (flag & code) === code){
        return flag - code
    }
    return flag
}
// 获取input的url
const createURL = (function(){
    if( typeof window === 'undefined' ) return 
    if(window.createObjectURL !== undefined){
        return window.createObjectURL
    }
    if(window.URL && window.URL.createObjectURL){
        return window.URL.createObjectURL
    }
    // 目前chrome已经弃用
    if(window.webkitURL !== undefined){
        return window.webkitURL.createURL
    }
})()
function serializeMessage(obj){
    let message = ''
    for(let i in obj){
        message += `${obj[i]} \n`
    }

    return message
}
export {operateCode as operateCode, createURL, serializeMessage} 