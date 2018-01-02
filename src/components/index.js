import MenuComponent from './menu.vue'

const Menu = {
  install: (Vue) => {
    Vue.component('s-menu', MenuComponent)
  }
}

export default Menu
