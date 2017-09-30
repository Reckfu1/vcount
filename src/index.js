import vcount from './vcount.vue'
export default vcount

if(typeof window!=='undefined'&&window.Vue){
    window.Vue.component.('vcount',vcount)
}