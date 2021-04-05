<template>
  <ul :class="{close: value}" class="sidenav app-sidenav open">
    <router-link 
      v-for="route in routes" 
      :key="route.to"
      tag="li"
      :to="route.to"
      active-class="active"
      :exact="route.exact">
      <a href="#" class="waves-effect waves-orange pointer">{{route.title}}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ['value'],
  data(){
    return {
      routes: [
        {
          to: '/',
          title: 'Счет',
          exact: true
        },
        {
          to: '/history',
          title: 'История'
        },
        {
          to: '/planning',
          title: 'Планирование'
        },
        {
          to: '/record',
          title: 'Новая запись'
        },
        {
          to: '/categories',
          title: 'Категории'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-sidenav {
    transform: translateX(0);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: 0;
    bottom: 0;
    padding-bottom: 0;
    height: 100%;

    &.close {
      display: none;
    }

    li {
      font-size: 1.2rem;
      font-weight: bold;
      width: 100%;
    }
  }
</style>