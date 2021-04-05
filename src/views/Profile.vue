<template>
  <div>
    <div class="page-title">
      <h3>{{'profileTitle' | locale}}</h3>
    </div>

    <Loader v-if="loading"/>
    <form @submit.prevent="handleFormSubmit" v-else class="form">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
        >
        <label for="description">Имя</label>
        <span class="helper-text invalid" v-if="error.length">Невалидное имя</span>
        <span class="helper-text" v-else>Имя</span>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'profile',

  metaInfo(){
    return {
      title: this.$title('Profile')
    }
  },

  data(){
    return {
      name: '',
      loading: true,
      error: '',
      isRuLocale: true
    }
  },

  computed: {
    ...mapGetters(['info'])
  },

  watch: {
    name(value){
      if (!value.length) {
        this.error = 'invalid';
      } else {
        this.error = '';
      }
    },

    isRuLocale(value){
      console.log('isRuLocale - ', value);
    }
  },

  methods: {
    ...mapActions(['updateInfo']),

    async handleFormSubmit(){
      if (!this.name) {
        this.error = 'invalid';
        return;
      }

      this.error = '';

      try {
        await this.updateInfo({name: this.name, locale: this.isRuLocale ? 'ru-RU' : 'en-US'});
        this.name = '';
      } catch (error) {
        this.$error('Error with update profile');
      }
    }
  },

  async mounted(){
    try {
      /* eslint-disable */
      this.name = this.info.name;

      this.loading = false; 
      setTimeout(() => {
        M.updateTextFields();
      });
      this.isRuLocale = this.info.locale === 'ru-RU';
    } catch (error) {
      this.$error('Ошибка при получении пользователя');
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-title {
    margin-bottom: 30px;
  }
  .switch {
    margin-bottom: 30px;
  }
  .invalid {
    color: red;
  }
</style>