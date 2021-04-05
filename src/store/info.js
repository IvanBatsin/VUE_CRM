import firebase from 'firebase/app';

/* eslint-disable */
export const info = {
  state: {
    info: {}
  },

  actions: {
    async fetchInfo({dispatch, commit}){
      try {
        const id = await dispatch('getUid');
        const data = await firebase.firestore().collection('users').where('id', '==', id).get();
        let user;
        data.forEach(snapshot => {
          user = {
            ref: snapshot.id,
            ...snapshot.data()
          }
        });
        commit('setInfo', user);
      } catch (error) {
        console.log(error);
        commit('setError', error);
        throw error;
      }
    },

    async updateInfo({commit, getters}, data){
      try {
        const updateData = {...getters.info, ...data};
        await firebase.firestore().collection('users').doc(updateData.ref).update(updateData);
      } catch (error) {
        console.log(error);
        commit('setError', error);
        throw error;
      }
    }
  },

  mutations: {
    setInfo(state, user) {
      state.info = user;
    },

    clearInfo(state) {
      state.info = {};
    }
  },

  getters: {
    info: state => state.info
  }
};