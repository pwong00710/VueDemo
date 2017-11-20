var Home = Vue.extend({
	template: '#home',
	data: function() {
		return {
			msg: 'Hello, vue router!'
		}
	}
});

var News = Vue.extend({
    template: '#news'
});

var Message = Vue.extend({
    template: '#message'
});

var About = Vue.extend({
	template: '#about'
});

var router1 = new VueRouter({
	routes: [	         
		{ path: '/home', component: Home,
		      children: [
                 {
                   path: 'news', component: News
                 },
                 {
                   path: 'message', component: Message
                 }
               ]			
		},
		{ path: '/about', component: About}
	]
});

var app1 = new Vue({
	el : '#app-1',
	data : {
		id: 1
	},
	router : router1
});
