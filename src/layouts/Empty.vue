<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
import { errorCodes } from '../utils/errorCodes';

export default {
  computed: {
    error(){
      return this.$store.getters.error;
    }
  },

  watch: {
    error(firebaseError){
      this.$error(errorCodes[firebaseError.code] || 'Server Error');
    }
  }
}
</script>

<style scoped lang="scss">
  .empty-layout {
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>