var appData = {
		message : 'Hello VueJs!!!'
};

var app = new Vue({
	el : '#app',
	data : appData,
	methods : {
		sayHello : function() {
			alert('Hey there, ' + this.name);
		}
	}
});

var app1 = new Vue({
	el : '#app-1',
	data : {
		message : 'Hello VueJs!',
		name : 'Peter Wong',
		isLoggedIn : false,
		x : 1,
        userInput: 0,
        randomNumber: 5,		
	    inventory: [
	                {name: 'MacBook Air', price: 1000},
	                {name: 'MacBook Pro', price: 1800},
	                {name: 'Lenovo W530', price: 1400},
	                {name: 'Acer Aspire One', price: 300}
	              ]
	},
	methods : {
		sayHello : function() {
			alert('Hey there, ' + this.name);
		},
		login : function() {
			// 'this' refers to the vm instance
			this.isLoggedIn = !this.isLoggedIn;
		},
        getRandomNumber: function(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
	},
    computed: {
        doubleX: function(){
            return this.x*2;
        },
        result : function() {
			if (this.userInput == this.randomNumber) {
				this.randomNumber = this.getRandomNumber(1, 10);
				return 'You got it right!';
			} else {
				this.randomNumber = this.getRandomNumber(1, 10);
				return 'Try again!';
			}
		}
    }
});

var app2 = new Vue({
	el : '#app-2',
	data : {
		message : 'You loaded this page on ' + new Date().toLocaleString()
	}
});
