<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="handleFormSubmit">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option 
              v-for="category in categories" 
              :key="category.id"
              :value="category.id"
            >
              {{category | capitalize}}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input type="text" id="name" v-model="title">
          <label for="name">Название</label>
          <span v-if="error.startsWith('title')" class="helper-text invalid">Не верно указано название</span>
          <span v-else class="helper-text">TITLE</span>
        </div>

        <div class="input-field">
          <input id="limit" type="number" v-model.number="limit">
          <label for="limit">Лимит</label>
          <span v-if="error.startsWith('limit')" class="helper-text invalid">Не верно указан лимит</span>
          <span v-else class="helper-text">LIMIT</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditCategory',

  props: ['categories'],

  data(){
    return {
      select: null,
      title: '',
      limit: 1,
      error: '',
      current: null
    }
  },

  watch: {
    current(id){
      this.current = id;
      const {limit, title} = this.categories.find(category => category.id === id);
      this.title = title;
      this.limit = limit;
    }
  },

  filters: {
    capitalize(category) {
      return category.title.charAt(0).toUpperCase() + category.title.slice(1);
    }
  },

  methods: {
    async handleFormSubmit(){
      if (!this.title) {
        this.error = 'title';
        return;
      }

      if (!this.limit) {
        this.error = 'limit';
        return;
      }

      this.error = '';

      const categoryData = {
        title: this.title,
        limit: this.limit,
        id: this.current
      };

      try {
        await this.$store.dispatch('updateCategory', categoryData);
        this.$message('Category was updated succeffuly');
        this.$emit('updated', categoryData);
      } catch (error) {
        this.$error('Update category error');
      }
    }
  },

  created(){
    const {title, limit, id} = this.categories[0];
    this.title = title;
    this.limit = limit;
    this.current = id;
  },

  mounted(){
    /* eslint-disable */
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
    /* eslint-enable */
  },

  beforeDestroy(){
    if (this.select) {
      this.select.destroy();
    }
  }
}
</script>