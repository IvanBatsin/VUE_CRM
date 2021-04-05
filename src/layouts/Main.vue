<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else class="app-main-layout">
      <Navbar @closeOpenSidebar="closeOpenSidebar"/>
      <div class="main-content">
        <Sidebar v-model="sidebarOpen"/>
        <main class="app-content">
          <div class="app-page">
            <router-view/>
          </div>
        </main>

        <div class="fixed-action-btn" v-tooltip="'Add button'">
          <router-link to="/record" class="btn-floating btn-large blue">
            <i class="large material-icons">add</i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { errorCodes } from '../utils/errorCodes';

export default {
  components: {
    Navbar, Sidebar
  },

  data(){
    return {
      sidebarOpen: true,
      loading: true
    }
  },

  computed: {
    error(){
      return this.$store.getters.error;
    }
  },

  watch: {
    error(firebaseError) {
      this.$error(errorCodes[firebaseError.code] || 'Server Error');
    }
  },

  methods: {
    closeOpenSidebar(){
      this.sidebarOpen = !this.sidebarOpen;
    }
  },

  async mounted(){
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
    }

    this.loading = false;
  }
}
</script>

<style scoped lang="scss">
  .app-main-layout {
    min-height: 100vh;
  }

  .main-content {
    display: flex;
    height: calc(100vh - 64px);

    .app-content {
      display: flex;
      flex-grow: 1;
      padding: 10px;

      .app-page {
        width: 100%;
      }
    }
  }
</style>