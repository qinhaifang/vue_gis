import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Moduletwo from '../components/moduletwo'
import Modulethree from '../components/modulethree'
import Kong from '../components/kong'
Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld,
            children:[
                {
                    path:'/',
                    name:'Moduletwo',
                    component:Moduletwo
                },
                {
                    path:'/modulethree',
                    name:'Modulethree',
                    component:Modulethree
                }
            ]
        },
        {
            path: '/kong',
            name: 'Kong',
            component: Kong,
        }
    ]
})
