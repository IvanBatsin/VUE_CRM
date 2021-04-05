<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>

    <Loader v-if="loading"/>
    <p class="empty-categories" v-else-if="!categories.length">None categoies</p>
    <section v-else>
      <div v-for="category in categories" :key="category.id">
        <p>
          <strong>{{category.title}}:</strong>
          {{category.spend | currency('RUB')}} из {{category.limit | currency('RUB')}}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div
              class="determinate"
              :class="category.progressColor"
              :style="{width: category.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { currencyFilter } from '../filters/currency';

export default {
  name: 'planning',

  metaInfo(){
    return {
      title: this.$title('Planning')
    }
  },

  data(){
    return {
      loading: true,
      categories: []
    }
  },

  computed: {
    ...mapGetters(['info'])
  },

  async mounted(){
    try {
      const records = await this.$store.dispatch('fetchRecords');
      const categories = await this.$store.dispatch('fetchCategories');

      this.categories = categories.map(category => {
        const spend = records
          .filter(record => record.category === category.id)
          .filter(record => record.type === 'outcome')
          .reduce((acc, record) => acc += +record.amount, 0);

        const percent = 100 * spend / category.limit;
        const progressPercent = percent > 100 ? 100 : percent; 
        const progressColor = percent < 60 ? 'green' : percent <= 100 ? 'yellow' : 'red';

        const tooltipValue = category.limit - spend;
        const tooltip = tooltipValue < 0 ? 'Превышенте лимита' : `Осталось: ${currencyFilter(tooltipValue)}`;

        return {
          ...category, 
          spend, 
          progressColor, 
          progressPercent,
          tooltip
        }
      });

      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    border-bottom: 1px solid rgb(172, 172, 172);
  }
  .empty-categories {
    font-size: 18px;
    font-weight: 500;
  }
</style>