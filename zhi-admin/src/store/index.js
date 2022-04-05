import { createStore } from 'vuex'
import getters from './getters'
const storeMoudle = import.meta.globEager("./moudles/*.js")
let modules = {}
for(let i in storeMoudle){
    modules[i.slice(10,-3)] = storeMoudle[i].default
}
export default createStore({
    modules,
    getters
})