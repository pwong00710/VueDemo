var bus = new Vue()

var simpleGrid = Vue.component('simple-grid', {
    template: '#grid-template',
	data: function() {
		return {
			mode: 0,
			item: {},
			title: ''
		}
	},
    props: ['dataList', 'columns', 'searchKey'],
    computed: {
	  filteredUsers: function () {
	    var self = this
	    return self.dataList.filter(function (user) {
	      return user.name.indexOf(self.searchKey) !== -1
	    })
	  }
	},
    methods: {
        openNewItemDialog: function(title) {
            this.title = title
            this.mode = 1
            this.item = {}
            //this.$broadcast('showDialog', true)
            bus.$emit('showDialog', true)
        },
        createItem: function() {
            this.dataList.push(this.item)
            //this.$broadcast('showDialog', false)
            bus.$emit('showDialog', false)
            this.item = {}
        },    	
        deleteItem: function(index) {
            this.dataList.splice(index, 1);
        },
    },
    filters: {
	  capitalize: function (value) {
	    if (!value) return ''
	    value = value.toString()
	    return value.charAt(0).toUpperCase() + value.slice(1)
	  }
	},
	components: {
		'modal-dialog': {
			template: '#dialog-template',
			data: function() {
				return {
					show: false,
					msg: "hello!"
				}
			},
			props: ['mode', 'title', 'fields', 'item'],
			created: function () {
				bus.$on('showDialog', this.showDialog)
			},
			methods: {
				showDialog: function (show) {
					this.show = show
				},				
	            close: function() {
	                    this.show = false
	            },
	            save: function() {
	                    if (this.mode === 1){
	                        //this.$dispatch('create-item')
	                    	bus.$emit('create-item')
	                    }
	            }
			}
		}
	}
})

var demo = new Vue({
    el: '#app',
    data: {
        searchQuery: '',
        columns: [{
            name: 'name',
            isKey: true
        	}, {
            name: 'age'
        	}, {
            name: 'sex',
            dataSource: ['Male', 'Female']
        }],
        people: [{
            name: 'Jack',
            age: 30,
            sex: 'Male'
        }, {
            name: 'Bill',
            age: 26,
            sex: 'Male'
        }, {
            name: 'Tracy',
            age: 22,
            sex: 'Female'
        }, {
            name: 'Chris',
            age: 36,
            sex: 'Male'
        }]
    }    
})
