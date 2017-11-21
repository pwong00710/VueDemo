var bus = new Vue()

var dialog = Vue.component('modal-dialog', {
    template: '#dialog-template',
    props: ['show'],
    methods: {
        close: function() {
            this.show = false
        }
    }
})

var app1 = new Vue({
    el: '#app-1',
    data: {
        show: false,
        dialogClass: 'dialog-info'
    },
    methods: {
        openDialog: function(dialogClass) {
            this.show = true
            this.dialogClass = dialogClass
        },
        closeDialog: function() {
            this.show = false
        }
    }
})

var parent = Vue.component('parent-component', {
    template: '#parent-component',
    data: function() {
        return {
            msg: 'parent component message'
        }
    },    
    components: {
        'child-component1': {
            template: '#child-component1',
            data: function() {
                return {
                    msg: 'child component 111111'
                }
            }
        },
        'child-component2': {
            template: '#child-component2',
            data: function() {
                return {
                    msg: 'child component 222222'
                }
            },
            methods: {
                showParentComponentData: function() {
                    alert(this.$parent.msg)
                }
            }
        }
    },
    methods: {
        showChildComponentData: function() {
            for (var i = 0; i < this.$children.length; i++) {
                alert(this.$children[i].msg)
            }
            alert(this.$refs.cc1.msg);
            alert(this.$refs.cc2.msg);
        }
    }
})

var child = Vue.component('child-component', {
    template: '#child-component',
    data: function() {
        return {
            msg: ''
        }
    },
    methods: {
        notify: function() {
            if (this.msg.trim()) {
                //this.$emit('child-msg', this.msg)                    
            	this.$emit('click_add_msg_btn', this.msg)
            	bus.$emit('click_add_msg_btn', this.msg)
                this.msg = ''
            }
        }
    }
})

var app2 = new Vue({
	el: '#app-2',
    data: {
        messages: ['hello']
    },
    methods: {
    	add_msg: function(msg) {
    		this.messages.push(msg)
    	}
    }/*,    
    events: {
        'child-msg': function(msg) {
            this.messages.push(msg)
        }
    }*/
})

var app3 = new Vue({
	  el: "#app-3",
	  data:{
	  	something: 123,
	  	echo_something: 123
	  },
	  created: function () {
		  bus.$on('click_add_msg_btn', this.add_msg)
	  },
	  methods: {
		  add_msg: function (msg) {
			  this.echo_something = msg
		  }
	  },
	  watch: {
		  something:function() {
			this.echo_something = this.something
	  		console.log(234)
	  	}
	  }
});

