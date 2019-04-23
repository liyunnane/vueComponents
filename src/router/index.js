import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/usr/:id',
      name: 'HelloWorld',
      alias:'/xxxxxxxx/:id',
      component: ()=>import('@/components/HelloWorld'),
    },
    {
      path: '/foo',
      name: 'foo',
      component: {template: '<div>foo</div>'}
    },
    {
      path: '/bar/:xxx',
      name: 'bar',
      component: {template: '<div>bar</div>'},
      alias: '/barbar/:xxx'
    },
    {
      path: '*',
      component: {template: '<div><h1>404无页面</h1></div>'}
    }
  ]
})
