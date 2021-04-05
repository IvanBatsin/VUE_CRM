<template>
  <form class="card auth-card" @submit.prevent="handleFormSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            :class="{inputError: errorMessage.includes('Email')}"
            id="email"
            type="text"
            v-model.trim="email"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid">{{errorMessage.includes('Email') ? errorMessage : 'Email'}}</small>
      </div>
      <div class="input-field">
        <input
            :class="{inputError: errorMessage.includes('Password')}"
            id="password"
            type="password"
            v-model.trim="password"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid">{{errorMessage.includes('Password') ? errorMessage : 'Password'}}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { emailCheck } from '../utils/emailCheck';
import { messages } from '../utils/messages';

export default {
  name: 'login',

  metaInfo(){
    return {
      title: this.$title('Login')
    }
  },

  data(){
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },

  methods: {
    async handleFormSubmit(){
      if (!emailCheck(this.email) || !this.password) {
        this.errorMessage = !this.email ? 'Email is invalid' : 'Password is invalid';
        return ;
      }

      this.errorMessage = '';
      const formData = {
        email: this.email,
        password: this.password
      };
      
      try {
        await this.$store.dispatch('login', formData);
        this.$router.push('/');
      } catch (error) {
        /*eslint-disable */
      }
    }
  },
  
  mounted(){
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  }
}
</script>

<style lang="scss">
  .inputError {
    border-bottom: 1px solid red !important;
  }
</style>