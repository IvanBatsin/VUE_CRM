import firebase from 'firebase/app';

/* eslint-disable */
export const record = {
  actions: {  
    async fetchRecords({commit, dispatch}){
      try {
        const id = await dispatch('getUid');
        const data = await firebase.firestore().collection('record').where('owner', '==', id).get();
        const records = [];
        data.forEach(snapshot => {
          records.push({ref: snapshot.id, ...snapshot.data()});
        });
        return records;
      } catch (error) {
        console.log(error);
        commit('setError', error);
        throw error;
      }
    },

    async createNewRecord({dispatch, commit}, {description, amount, date, type, category}) {
      try {
        const id = await dispatch('getUid');
        await firebase.firestore().collection('record').add({
          description, amount, date, type, category, owner: id
        });
      } catch (error) {
        console.log(error);
        commit('setError', error);
        throw error;
      }
    },

    async fetchRecordById({commit}, id) {
      try {
        const record = await firebase.firestore().collection('record').doc(id).get();
        return record.data();
      } catch (error) {
        console.log(error);
        commit('setError', error);
        throw error;
      }
    }
  }
}