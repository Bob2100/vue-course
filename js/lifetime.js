/*
* 1. 组件缓存
* 包裹在内置组件<keep-alive></alive>中的子组件，当v-if=false时，不会被销毁，而是停用；
* v-if=true时，不是被创建，而是被激活，这样避免了频繁创建销毁组件对象导致的性能损耗。
* */
var Son = {
    template: `
        <div>
            <span>我是son子组件, {{text}}</span>
            <div><button @click="change('change')">更改</button></div>
        </div>
    `,
    data: function(){
        return {
            text: 'hello son'
        }
    },
    methods: {
        change: function(param){
            this.text += param;
        }
    },
    //组件创建前执行，使用<keep-alive></keep-alive>将<son></son>包裹后，反复改变v-if的值，beforeCreate并不会
    // 反复执行，说明子组件并没有反复创建。
    //this.text为undefined，这个可以理解，组件创建前肯定是拿不到组件数据的
    beforeCreate: function(){
        console.log('Son beforeCreated, text: ' + this.text);
    },

    //组件被创建后执行，this.text为hello son，表明可以操作组件的数据，可以实现vue到页面的数据绑定
    created: function(){
        console.log('Son created, text: ' + this.text);
        this.text = '组件创建后设置的值';//重新绑定数据
    },

    //vue起作用，装载数据到DOM前执行
    beforeMount: function(){
        console.log('Son beforeMount');
        console.log(document.body.innerHTML);
    },

    //vue起作用，装载数据到DOM后执行
    mounted: function(){
        console.log('Son mounted');
        console.log(document.body.innerHTML);
    },

    //页面数据更新前执行
    beforeUpdate: function(){
        console.log('Son beforeUpdate');
        console.log(document.body.innerHTML);
    },

    //页面数据更新后执行
    updated: function(){
        console.log('Son updated');
        console.log(document.body.innerHTML);
    },

    //子组件被<keep-alive></keep-alive>包裹后,随着v-if在true和false之间改变时，子组件不会反复的创建和销毁，
    //此时created也就不会执行，取而代之的是激活和停用，activated是组件被激活后执行
    activated: function(){
        console.log('Son actived');
        console.log(document.body.innerHTML);
    },

    //停用后执行
    deactivated: function(){
        console.log('Son deactivated');
        console.log(document.body.innerHTML);
    },

    //子组件没有被<keep-alive></keep-alive>包裹时，当v-if=false时，子组就会被销毁，而不是停用，销毁前beforeDestroy
    //执行，销毁前执行的话document.body.innerHTML应该是销毁前的样子，但是这里打印的确实销毁后的样子，为什么？不太理解
    beforeDestroy: function(){
        console.log('Son beforeDestroy, text: ' + this.text);
        console.log(document.body.innerHTML);
    },

    //子组件销毁后执行，销毁后this.text应该拿不到值，但是这里也还能拿到。总结来说销毁前和销毁后，this都是能拿到值的，
    //document.body.innerHTML都是销毁后的样子，不知总结的对否？
    destroyed: function(){
        console.log('Son destroyed, text: ' + this.text);
        console.log(document.body.innerHTML);
    }
}

var App = {
    components: {
        son: Son
    },
    template: `
        <div>
            <button @click="show">{{btnVal}}</button>
            <!--<keep-alive>-->
                <son v-if="alive"></son>
            <!--</keep-alive>-->
        </div>
    `,
    data: function() {
        return {
            alive: true,
            btnVal: '停用'
        }
    },
    methods: {
        show: function(){
            this.alive = !this.alive;
            this.alive == true ? this.btnVal = '停用' : this.btnVal = '激活';
        }
    },
    beforeMount: function(){
        console.log('App beforeMount');
        console.log(document.body.innerHTML);
    },
    mounted: function(){
        console.log('App mounted');
        console.log(document.body.innerHTML);
    }
};
new Vue({
    el: '#app',
    components: {
        app: App
    },
    template: '<app/>'
});