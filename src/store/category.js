import firebase from 'firebase/app';

/* eslint-disable */
export const category = {
  actions: {
    async createCategory({dispatch, commit}, {title, limit}){
      try {
        const id = await dispatch('getUid');

        let condidate = false;

        const docs = await firebase.firestore().collection('categories').where('title', '==', title).get();
        docs.forEach(snapshot => {
          if (snapshot.data().title.toUpperCase() === title.toUpperCase()) {
            condidate = true;
          }
        });

        if (condidate) {
          throw 'Category already exists';
        }

        const doc = await firebase.firestore().collection('categories').add({
          owner: id,
          title, limit
        });
        const category = await (await doc.get()).data();
        return category;
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },

    async fetchCategories({dispatch, commit}){
      try {
        const id = await dispatch('getUid');
        const categories = [];
        const docs = await firebase.firestore().collection('categories').where('owner', '==', id).get();
        docs.forEach(snapshot => {
          const category = {
            id: snapshot.id,
            ...snapshot.data()
          };
          categories.push(category);
        });
        return categories;
      } catch (error) {
        console.log(error);
        commit('setError', error);
        throw error;
      }
    },

    async updateCategory({commit}, {limit, title, id}) {
      try {
        await firebase.firestore().collection('categories').doc(id).update({
          limit, title
        });
      } catch (error) {
        console.log(error);
        commit('setError', error);
        throw error;
      }
    },

    async fetchCategoryById({commit}, id) {
      try {
        const category = await firebase.firestore().collection('categories').doc(id).get();
        return category.data();
      } catch (error) {
        console.log(error);
        commit('setError', error);
        throw error;
      }
    }
  }

};