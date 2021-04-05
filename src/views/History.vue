<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading"/>
    <p class="empty-records" v-else-if="!records.length">None records - <router-link to='/record'>Create new record</router-link></p>
    <section v-else>
      <HistoryTable
        :records="items"
      />
      <Paginate
        v-model="currentPage"
        :page-count="pageCount"
        :click-handler="pageChangeHandle"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from '../components/HistoryTable';
import PaginationMixin from '../mixins/pagination.mixin';

export default {
  name: 'history',

  metaInfo(){
    return {
      title: this.$title('History')
    }
  },

  data(){
    return {
      loading: true,
      records: []
    }
  },

  mixins: [PaginationMixin],

  async mounted(){
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');
    this.setup(categories);

    this.loading = false;
  },

  methods: {
    setup(categories){
      this.setupPagination(this.records.map(record => ({
        ...record,
        categoryName: categories.find(category => category.id === record.category).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      })));
    }
  },

  components: {
    HistoryTable
  },
}
</script>

<style lang="scss" scoped>
  .page-title {
    border-bottom: 1px solid rgb(168, 168, 168);
  }
  .empty-records {
    font-weight: 500;
    font-size: 18px;
  }
</style>