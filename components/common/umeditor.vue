<!--
该组件的id属性是一个随机数
表单的name属性、初始化提示信息可在父组件中绑定
该组件会向父组件发送一个事件reciveUM，UM对象最为唯一参数
该组件上传图片的字段是upfile[]
<umeditor @reciveUM="reciveUM" initMessage=""/>
-->
<script>
    import './umeditor.config.js'

	export default {
		name: 'umeditor',
        props:{
          nameAttr: {
              default: 'um_editor'
          },
          initMessage:{
              default: '提示信息'
          },
          height: {
              default: '300px'
          },
          width: {
              default: '100%'
          }
        },
        data() {
            return {
                umId: 'um_editor_' + (Math.random().toFixed(3)).toString().replace('.', '_'),
                UM: undefined, // UM对象
            }
        },
        render(h){
            return h('script', {
                domProps: {
                    type: 'text/plain',
                    id: this.umId,
                },
                attrs:{
                    class: 'um_editor',
                    name: this.nameAttr,// name写在别的地方就会报错
                },
                style: {
                    height: this.height
                },
            })
        },
		mounted(){
		    //window.UMEDITOR_CONFIG['imagePath'] = "只需配置php的路径即可";
            //window.UMEDITOR_CONFIG['imageUrl'] = '<C("UEDITOR_PATH")."php/imageUp.php"?>';
            window.UMEDITOR_CONFIG['imagePath'] = "/";
            window.UMEDITOR_CONFIG['imageUrl'] = this.baseURL + '/article/uploadImage';
            window.UMEDITOR_CONFIG['allowSyn'] = true;		// 默认允许使用异步上传进行预览
            //实例化编辑器
            this.UM = UM.getEditor(this.umId,{
                initialFrameWidth: this.width,
                autoHeightEnabled: true,
                autoFloatEnabled: true,
                toolbar: ['emotion']
            });
            UM.umId = this.umId
            UM.areaName = this.nameAttr
            this.UM.setContent(this.initMessage)
            this.$emit('reciveUM', this.UM)
		}
	}
</script>

<style lang="css" scoped="true">
h1{
    font-family: "微软雅黑";
    font-weight: normal;
}
.btn {
    display: inline-block;
    *display: inline;
    padding: 4px 12px;
    margin-bottom: 0;
    *margin-left: .3em;
    font-size: 14px;
    line-height: 20px;
    color: #333333;
    text-align: center;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
    vertical-align: middle;
    cursor: pointer;
    background-color: #f5f5f5;
    *background-color: #e6e6e6;
    background-image: -moz-linear-gradient(top, #ffffff, #e6e6e6);
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6));
    background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6);
    background-image: -o-linear-gradient(top, #ffffff, #e6e6e6);
    background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
    background-repeat: repeat-x;
    border: 1px solid #cccccc;
    *border: 0;
    border-color: #e6e6e6 #e6e6e6 #bfbfbf;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    border-bottom-color: #b3b3b3;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#ffe6e6e6', GradientType=0);
    filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
    *zoom: 1;
    -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn:hover,
.btn:focus,
.btn:active,
.btn.active,
.btn.disabled,
.btn[disabled] {
    color: #333333;
    background-color: #e6e6e6;
    *background-color: #d9d9d9;
}

.btn:active,
.btn.active {
    background-color: #cccccc \9;
}

.btn:first-child {
    *margin-left: 0;
}

.btn:hover,
.btn:focus {
    color: #333333;
    text-decoration: none;
    background-position: 0 -15px;
    -webkit-transition: background-position 0.1s linear;
    -moz-transition: background-position 0.1s linear;
    -o-transition: background-position 0.1s linear;
    transition: background-position 0.1s linear;
}

.btn:focus {
    outline: thin dotted #333;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
}

.btn.active,
.btn:active {
    background-image: none;
    outline: 0;
    -webkit-box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn.disabled,
.btn[disabled] {
    cursor: default;
    background-image: none;
    opacity: 0.65;
    filter: alpha(opacity=65);
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
}
</style>