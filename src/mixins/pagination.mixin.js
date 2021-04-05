import { chunk } from 'lodash';

export default {
  data(){
    return {
      currentPage: +this.$route.query.page || 1,
      itemsPerPage: 1,
      pageCount: 0,
      allItems: [],
      items: []
    }
  },

  methods: {
    setupPagination(allItems){
      this.allItems = chunk(allItems, this.itemsPerPage);
      this.pageCount = this.allItems.length;
      this.items = this.allItems[this.currentPage - 1] || this.allItems[0];
    },

    pageChangeHandle(page){
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.items = this.allItems[page - 1] || this.allItems[0];
    }
  }
}
