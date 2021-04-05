<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <CreateCategory
          @created="addNewCategory"
        />
        <EditCategory
          v-if="categories.length"
          :categories="categories"
          @updated="updateCategories"
          :key="categories.length + updatedCount"
        /> 
        <h1 class="empty-category" v-else>None categories</h1>
      </div>
    </section>
  </div>
</template>

<script>
import CreateCategory from '../components/CreateCategory';
import EditCategory from '../components/EditCategory';

export default {
  name: "categories",

  data(){
    return {
      categories: [],
      loading: true,
      updatedCount: 0
    }
  },

  methods: {
    addNewCategory(category){
      this.categories = [...this.categories, category];
    },

    updateCategories(updatedCategory){
      const index = this.categories.findIndex(category => category.id === updatedCategory.id);
      this.categories[index] = updatedCategory;
      this.updatedCount++; // форсированная перерисовка
    }
  },

  async mounted(){
    try {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  },

  components: {
    CreateCategory, EditCategory
  }
}
</script>

<style lang="scss" scoped>
  .empty-category {
    display: flex;
    justify-content: center;
  }
</style>