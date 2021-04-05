<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="handleFormSubmit">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              required
              :class="{invalid: error.startsWith('title')}"
          >
          <label for="name">Название</label>
          <span v-if="error.startsWith('title')" class="helper-text">Не валидное название категории</span>
          <span v-else class="helper-text">Введите название</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: error.startsWith('limit')}"
          >
          <label for="limit">Лимит</label>
          <span v-if="error.startsWith('limit')" class="helper-text">Минимальная величина указана не верно</span>
          <span v-else class="helper-text">Минимальная величина</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      title: '',
      limit: 1,
      error: ''
    }
  },

  watch: {
    title(){
      this.error = '';
    },

    limit(){
      this.error = ''
    }
  },

  methods: {
    async handleFormSubmit(){
      if (!this.title) {
        this.error = 'title';
        return;
      }

      if (!this.limit || this.limit < 1) {
        this.error = 'limit';
        return ;
      }

      this.error = '';

      try {
        const newCategory = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        });

        this.title = '';
        this.limit = 1;
        this.$message(`New Category added - ${newCategory.title}`);
        this.$emit('created', newCategory);
      } catch (error) {
        this.$error(error);
        
        this.title = '';
        this.limit = 1;
      }
    }
  },

  mounted(){
    /* eslint-disable */
    M.updateTextFields();
    /* eslint-enable */
  }
}
</script>


<style lang="scss" scoped>
  .invalid {
    border-bottom: 1px solid red !important;
  }
</style>