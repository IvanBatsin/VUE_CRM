<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading"/>

    <p class="empty-categories" v-else-if="!categories.length">None categories <router-link to="/categories">Create category</router-link></p>

    <form v-else class="form" @submit.prevent="handleFormSubmit">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option 
            v-for="category in categories" 
            :key="category.id"
            :value="category.id"
          >{{category.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
        >
        <label for="amount">Сумма</label>
        <span v-if="error.startsWith('amount')" class="helper-text invalid">Колличество невалидно</span>
        <span v-else class="helper-text">Колличество</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
        >
        <label for="description">Описание</label>
        <span v-if="error.startsWith('description')" class="helper-text invalid">Описание невалидно</span>
        <span v-else class="helper-text">Описание</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Record',

  metaInfo(){
    return {
      title: this.$title('Record')
    }
  },

  data() {
    return {
      select: null,
      categories: [],
      loading: true,
      category: null,
      type: 'outcome',
      amount: 1,
      description: '',
      error: ''
    }
  },

  computed: {
    ...mapGetters(['info']),

    canCreateRecord(){
      if (this.type === 'income') {
        return true;
      }

      return this.info.bill >= this.amount;
    }
  },

  methods: {
    async handleFormSubmit(){
      if (!this.description) {
        this.error = 'description';
        console.log('description');
        return ;
      }

      if (!this.amount || this.amount < 1) {
        this.error = 'amount';
        console.log('amount');
        return ;
      }

      if (!this.canCreateRecord) {
        this.$message('На счете не хватает - ' + (this.amount - this.info.bill));
        return ;
      }

      try {
        const recordData = {
          amount: this.amount,
          description: this.description,
          category: this.category,
          type: this.type,
          date: new Date().toJSON()
        };

        await this.$store.dispatch('createNewRecord', recordData);

        const updatedBill = this.type === 'income' ? this.info.bill += this.amount : this.info.bill -= this.amount;
        await this.$store.dispatch('updateInfo', {bill: updatedBill});
        this.$message('Record add successfully');

        this.amount = 1;
        this.description = '';
      } catch (error) {
        this.$error('Error with add new record');
      }
    }
  },

  watch: {
    amount(amount){
      if (amount <= 0) {
        this.error = 'amount';
        return ;
      } 

      this.error = '';
    },

    description(description) {
      if (!description) {
        this.error = 'description';
        return ;
      }

      this.error = '';
    }
  },

  async mounted(){
    /* eslint-disable */
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
    /* eslint-enable */
  },

  beforeDestroy(){
    if (this.select && this.select.destroy){
      this.select.destroy();
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-title {
    border-bottom: 1px solid rgb(204, 204, 204);
    margin-bottom: 20px;
  }
  .empty-categories {
    font-size: 18px;
    margin-top: 30px;
    font-weight: 500;
  }

  .invalid {
    color: red;
  }
</style>