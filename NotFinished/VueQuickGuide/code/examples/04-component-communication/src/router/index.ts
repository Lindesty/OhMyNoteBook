import { createRouter, createWebHistory } from 'vue-router'
import PropsDemo from '@/pages/PropsDemo.vue'
import EmitDemo from '@/pages/EmitDemo.vue'
import MittDemo from '@/pages/MittDemo.vue'
import VModelDemo from '@/pages/VModelDemo.vue'
import ProvideInjectDemo from '@/pages/ProvideInjectDemo.vue'
import SlotDemo from '@/pages/SlotDemo.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/props', component: PropsDemo },
    { path: '/emit', component: EmitDemo },
    { path: '/mitt', component: MittDemo },
    { path: '/v-model', component: VModelDemo },
    { path: '/provide-inject', component: ProvideInjectDemo },
    { path: '/slot', component: SlotDemo },
    { path: '/', redirect: '/props' }
  ]
})

export default router