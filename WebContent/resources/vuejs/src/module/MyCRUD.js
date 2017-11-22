var bus = new Vue()

var simpleGrid = Vue.component('simple-grid', {
    template: '#grid-template',
	data: function() {
		return {
			mode: 0,
			item: {},
			title: '',
			keyColumn: ''
		}
	},
    props: ['dataList', 'columns', 'searchKey'],
	created: function () {
		this.keyColumn = this.getKeyColumn(this.columns);
		bus.$on('create-item', this.createItem)
		bus.$on('update-item', this.updateItem)
	},
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
		openEditItemDialog: function(key) {			
			var currentItem = this.findItemByKey(key)
			this.title = 'Edit Item - ' + key
			this.mode = 2
			this.item = {}
			this.item = this.initItemForUpdate(currentItem)
			//this.$broadcast('showDialog', true)
			bus.$emit('showDialog', true)
		},        
        initItemForUpdate: function(p) {
            var c = c || {};
            for (var i in p) {
                if (p.hasOwnProperty(i)) {
                    if (typeof p[i] === 'object') {
                        c[i] = Array.isArray(p[i]) ? [] : {}
                        deepCopy(p[i], c[i])
                    } else {
                        c[i] = p[i]
                    }
                }
            }
            return c;
        },
        findItemByKey: function(key){
            var keyColumn = this.keyColumn
            for(var i = 0; i < this.dataList.length; i++){
                if(this.dataList[i][keyColumn] === key){
                    return this.dataList[i]
                }
            }
        },        
        createItem: function() {
        	if (!this.itemExists(this.keyColumn)) {
	            this.dataList.push(this.item)
	            //this.$broadcast('showDialog', false)
	            bus.$emit('showDialog', false)
	            this.item = {}
        	} else {
                alert(this.keyColumn + ' "' + this.item[this.keyColumn] + '" is already exists')
            }
        },    	
        deleteItem: function(index) {
            this.dataList.splice(index, 1);
        },
        updateItem: function() {
            var keyColumn = this.keyColumn

            for (var i = 0; i < this.dataList.length; i++) {
                if (this.dataList[i][keyColumn] === this.item[keyColumn]) {
                    for (var j in this.item) {
                        this.dataList[i][j] = this.item[j]
                    }
                    break;
                }
            }
            //this.$broadcast('showDialog', false)
            bus.$emit('showDialog', false)
            this.item = {}
        },
        itemExists: function(keyColumn) {
            for (var i = 0; i < this.dataList.length; i++) {
                if (this.item[keyColumn] === this.dataList[i][keyColumn])
                    return true;
            }
            return false;
        },
        getKeyColumn: function(columns) {
        	var keyColumn
        	columns.forEach((val) => {
        		if (val.isKey == true) {
        			keyColumn = val.name
        		}
        	})
        	return keyColumn
        }
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
			            } else if(this.mode === 2){
			                //this.$dispatch('update-item')
			            	bus.$emit('update-item')
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
