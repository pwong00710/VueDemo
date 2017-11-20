// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files
const Foo = { template: '#foo' }
const Bar = { template: '<div>bar</div>' }
const UserProfile = { template: '<div>profile {{ $route.params.id }} </div>' }
const UserPosts = { template: '<div>post {{ $route.params.id }} </div>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
// const routes2 =
// [
//     { path: '/foo', component: Foo,
//       children: [
//         {path: 'profile', component: UserProfile},
//         {path: 'posts', component: UserPosts}
//       ]
//     },
//     { path: '/bar', component: Bar }
// ]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router2 = new VueRouter({
//  routes: routes2 // short for `routes: routes`
  routes: [
    { path: '/foo', component: Foo,
      children: [
        {
          path: 'profile',
          component: UserProfile
        },
        {
          path: 'posts',
          component: UserPosts
        }
      ]
    },
    { path: '/bar', component: Bar }
  ]
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app2 = new Vue({
  router : router2
}).$mount('#app-2')

const User = {
  data: function() {
    return {id : 1}
  },
  props: ['myId'],
  template: '#user'
}

//Vue.component('user-component', User)

const router3 = new VueRouter({
  routes: [
    { name: 'user', path: '/user/:id', component: User,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          name: 'profile',
          path: 'profile',
          component: UserProfile
        },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          name: 'posts',
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})

const app3 = new Vue({
  data: {
    id: 1,
    isShow: false
  },  
  computed: {
    userlink: function(){
        return '/user/'+this.id;
    }
  },
  router : router3
}).$mount('#app-3')
