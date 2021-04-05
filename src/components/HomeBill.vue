<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line" v-for="cur in currencies" :key="cur">
          <span>{{getCurrency(cur) | currency(cur)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],

  data(){
    return {
      currencies: ['RUB', 'EUR', 'USD']
    }
  },

  computed:{
    base(){
      return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR']);
    }
  },

  methods: {
    getCurrency(currency){
      return Math.floor(this.base * this.rates[currency]);
    }
  }
}
</script>

<style lang="scss" scoped>
  .currency-line {
    border-bottom: 2px solid white;
    padding: 5px;
    padding-left: 0;
    font-size: 18px;
  }
</style>