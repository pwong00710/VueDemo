var simpleGrid = Vue.component('simple-grid', {
    template: '#grid-template',
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
	}
})

var demo = new Vue({
    el: '#app',
    data: {
        searchQuery: '',
        columns: [{
            name: 'name'
        	}, {
            name: 'age'
        	}, {
            name: 'sex'
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


	