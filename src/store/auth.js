import firebase from 'firebase/app';

/*eslint-disable */
export const auth = {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        console.log(error);
        commit('setError', error);
        throw error;
      }
    },

    async register({dispatch, commit}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const userid = await dispatch('getUid');
        const user = await firebase.firestore().collection('users').add({
          name,
          email,
          bill: 10000,
          id: userid
        });
      } catch (error) {
        console.log(error);
        commit('setError', error);
        throw error;
      }
    },

    async getUid(){
      const uid = await firebase.auth().currentUser.uid || null;
      return uid;
    },
    
    async logout({commit}){
      await firebase.auth().signOut();
      commit('clearInfo');
    }
  }
};