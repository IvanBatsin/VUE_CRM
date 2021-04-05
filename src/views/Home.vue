<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button @click="refresh" class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading"/>
    <div class="row" v-else>
      <HomeBill
        :rates="currency.rates"
      />
      <HomeCurrency
        :rates="currency.rates"
        :date="currency.date"
      />
    </div>
  </div>
</template>

<script>
import HomeBill from '../components/HomeBill';
import HomeCurrency from '../components/HomeCurrency';

export default {
  name: 'Home',

  metaInfo(){
    return {
      title: this.$title('Home')
    }
  },

  data() {
    return {
      loading: true,
      currency: null
    }
  },

  async mounted(){
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false;
  },

  methods: {
    async refresh(){
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    }
  },

  components: {
    HomeBill, HomeCurrency
  }
}
</script>

<style lang="scss" scoped>
  .page-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid grey;
    margin-bottom: 20px;
  }
</style>