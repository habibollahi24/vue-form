// store.js
import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

const swapElementsDown = (array, index1, index2) => {
  if (index1 === array.length - 1) return array;
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
  return array;
};
const swapElementsUp = (array, index1, index2) => {
  if (index1 === 0) return array;
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
  return array;
};

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({ array: state.array }),
});

export const store = createStore({
  state: {
    array: [],
    formName: 'UnTitle',
    formItems: [], // آیتم‌های فرم در اینجا ذخیره می‌شوند
  },
  mutations: {
    // search(state, searchInput) {
    //   if (searchInput.trim() === '') return state.array;
    //   const copy = state.array;
    //   state.array = copy.filter((item) =>
    //     item.formName.includes(searchInput)
    //   );
    // },

    swapIndexDown(state, { index1, index2 }) {
      console.log(index1);
      console.log(index2);
      // const data = swapElements(state.formItems, index1, index2);
      // console.log(data);
      state.formItems = swapElementsDown(
        state.formItems,
        index1,
        index2
      );
    },
    swapIndexUp(state, { index1, index2 }) {
      console.log(index1);
      console.log(index2);
      // const data = swapElements(state.formItems, index1, index2);
      // console.log(data);
      state.formItems = swapElementsUp(
        state.formItems,
        index1,
        index2
      );
    },
    updateName(state, name) {
      state.formName = name;
    },
    addFormItem(state, item) {
      state.formItems.push(item);
    },
    updateFormItem(state, { index, item }) {
      state.formItems[index] = item;
    },
    removeFormItem(state, id) {
      console.log(id);
      state.formItems = state.formItems.filter(
        (item) => item.id !== id
      );
    },
    // Mutation برای ذخیره فرم ساخته‌شده
    setFormData(state, form) {
      state.formData = form;
    },
    createOneForm(state) {
      state.array = [
        ...state.array,
        { formName: state.formName, formItems: state.formItems },
      ];
      state.formItems = [];
      state.formName = 'Un Title';
    },
  },
  actions: {
    // اکشن برای تغییر داده‌های فرم
    saveFormData({ commit }, form) {
      commit('setFormData', form);
    },
  },
  getters: {
    formJSON(state) {
      const copyOfState = { ...state };
      delete copyOfState.array;
      return JSON.stringify(copyOfState, null, 2); // فرم به صورت JSON
    },
    getAllForm(state) {
      console.log(state);

      const allForm = [
        { formName: state.formName, formItems: state.formItems },
      ];

      return allForm;
    },
  },
  plugins: [vuexLocal.plugin],
});
