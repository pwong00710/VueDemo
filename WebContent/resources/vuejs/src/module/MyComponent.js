// 1. Create component
var myComponent1 = Vue.extend({
    data: function(){
        return {a : 1}
    },
	template: '<div>This is my first component!</div>'
});

var myComponent2 = Vue.extend({
    data: function(){
        return {a : 2}
    },	
	template: '#myComponent2'
});

var myComponent3 = Vue.extend({
    data: function(){
        return {a : 3}
    },
	template: '#myComponent3'
});

var Child = Vue.extend({
    template: '<p>This is a child component!</p>'
});

var Parent = Vue.extend({
    // Use <child-component> in Parent template
    template :'<p>This is a Parent component</p>',
    components: {
        // Register Child component, only used in Parent component
        'child-component': Child
    }
});       

// 2. Register component
Vue.component('my-component1', myComponent1)
Vue.component('parent-component', Parent)

var app1 = new Vue({
	el: '#app-1'
});

var app2 = new Vue({
    el: '#app-2',
    components: {
        // 2. Register component
        'my-component2' : myComponent2
    }
});

var app3 = new Vue({
    el: '#app-3',
    components: {
        // 2. Register component
        'my-component2' : myComponent2,
        'my-component3' : myComponent3,
    }
});

var app4 = new Vue({
    el: '#app-4',
    data: {
        name: 'keepfool',
        age: 29
    },
    components: {
        'my-component4': {
            template: '#myComponent4',
            props: ['myName', 'myAge', 'syncMode']
        }
    }
});


