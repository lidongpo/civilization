import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/components/Content'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/:type',
        name: 'Content',
        component: Content,
    }, {
        path: '/',
        name: 'Content',
        component: Content,
    }],
    linkActiveClass: 'active'
})