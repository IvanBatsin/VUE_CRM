<template>
  <div>
    <loader v-if="!record"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb link">История</router-link>
        <a class="breadcrumb">{{record.typeText}}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.typeClass">
            <div class="card-content white-text">
              <p>Описание: {{record.description}}</p>
              <p>Сумма: {{record.amount | currency('RUB')}}</p>
              <p>Категория: {{record.categoryName}}</p>

              <small>{{record.date | date('date')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else>{{`Запись с id - ${$route.params.id} не найдена`}}</p>
  </div>
</template>


<script>
export default {
  name: 'recordDetails',

  metaInfo(){
    return {
      title: this.$title('Details')
    }
  },

  data(){
    return {
      loading: true,
      record: null
    }
  },

  async mounted(){
    try {
      const record = await this.$store.dispatch('fetchRecordById', this.$route.params.id);
      const category = await this.$store.dispatch('fetchCategoryById', record.category);

      this.record = {
        ...record,
        categotyName: category.title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход'
      };

      this.loading = false;
    } catch (error) {
      this.$error('Fetch record error');
    }
  }
}
</script>

<style lang="scss" scoped>
  .breadcrumb-wrap {
    border-bottom: 1px solid rgb(182, 182, 182);
    display: flex;
    align-items: center;
    font-size: inherit;

    a {
      color: inherit;
    }
    a:before {
      color: inherit;
    }
    .link {
      transition: .2s;
    }
    .link:hover {
      filter: brightness(110%);
      letter-spacing: 0.5px;
    }
  }
  .card-content p, .card-content small{
    padding: 5px;
    font-size: 16px;
  }
</style>