<template>
  <form class="card auth-card" @submit.prevent="handleSubmitForm">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{inputError: errorMessage.includes('Email')}"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid">{{errorMessage.includes('Email') ? errorMessage : 'Email'}}</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{inputError: errorMessage.includes('Password')}"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid">{{errorMessage.includes('Password') ? errorMessage : 'Password'}}</small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
        >
        <label for="name">Имя</label>
        <small class="helper-text invalid">Name</small>
      </div>
      <p>
        <label>
          <input type="checkbox"
            @click="agree = !agree"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { emailCheck } from '../utils/emailCheck';

export default {
  data(){
    return {
      email: '',
      password: '',
      name: '',
      agree: false,
      errorMessage: ''
    }
  },

  methods: {
    async handleSubmitForm(){
      if (!emailCheck(this.email)) {
        console.log('email error');
        this.errorMessage = 'Email is invalid';
        return;
      } else if (!this.password || this.password.length < 6) {
        console.log('password error');
        this.errorMessage = 'Password is invalid';
        return;
      } else if (!this.name) {
        this.errorMessage = 'Name is invalid';
        return;
      } else if (!this.agree) {
        window.alert('You should agree with rules');
      } else {
        const formData = {
          email: this.email,
          password: this.password,
          name: this.name
        };

        try {
          await this.$store.dispatch('register', formData);
          this.errorMessage = '';
          this.$router.push('/');
        } catch (error) {
          // window.alert('Error with register method');
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .inputError {
    border-bottom: 1px solid red !important;
  }
</style>