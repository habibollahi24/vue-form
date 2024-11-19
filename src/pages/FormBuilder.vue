<template>
  <div class="flex space-x-5">
    <div
      class="w-96 bg-gray-700 text-gray-200 rounded-2xl p-4 overflow-auto overflow-y-auto h-[calc(100vh-100px)]"
    >
      <pre class="text-xs">{{ formJSON }}</pre>
    </div>

    <div class="w-full">
      <div class="flex justify-between items-center w-full mb-2">
        <div class="flex items-center space-x-1">
          <p class="font-semibold text-sm">Form Name:</p>
          <input
            type="text"
            class="border rounded-lg p-1 text-sm"
            v-model="formName"
          />
        </div>
        <div v-if="isCreate">
          <div
            @click="closeModal"
            :class="
              isCreate &&
              'backdrop-blur-[2px] z-30 bg-black/30 w-screen h-screen fixed top-0 left-0'
            "
          ></div>
          <div
            class="absolute z-50 p-8 border-2 rounded-lg bg-white top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2"
          >
            <div class="flex items-center space-x-8">
              <p>Are You Sure To Create Form?</p>
              <div class="flex items-center space-x-2">
                <RouterLink
                  to="/forms"
                  @click="$store.commit('createOneForm')"
                  class="bg-indigo-700 text-white rounded-xl py-1 px-4"
                >
                  Ok
                </RouterLink>
                <button
                  @click="closeModal"
                  class="border border-indigo-700 text-indigo-700 rounded-xl py-1 px-4"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          @click="openModal"
          class="bg-indigo-700 text-white rounded-xl py-1 px-4 disabled:bg-gray-700 disabled:cursor-not-allowed"
          :disabled="$store.state.formItems.length === 0"
        >
          Create Form
        </button>
      </div>
      <div
        class="w-full p-4 border-2 border-dashed rounded-2xl overflow-y-auto h-[calc(100vh-100px)]"
        @dragover.prevent
        @drop="onDrop"
      >
        <div v-for="(item, index) in formItems" :key="item.id">
          <FormItem :item="item" :index="index" />
        </div>
      </div>
    </div>
    <!-- <button @click="saveForm">ذخیره فرم</button> -->
    <!-- @removeItem="removeItem" -->
    <!-- @updateItem="updateItem" -->
    <ToolBox />
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import FormItem from '../components/FormItem.vue';
import ToolBox from '../components/ToolBox.vue';

export default {
  components: { ToolBox, FormItem },

  computed: {
    formName: {
      get() {
        return this.$store.state.formName;
      },
      set(value) {
        this.$store.commit('updateName', value);
      },
    },
  },

  methods: {
    saveForm() {
      const formJson = [
        {
          label: 'نام',
          type: 'text',
          placeholder: 'نام خود را وارد کنید',
        },
        {
          label: 'ایمیل',
          type: 'text',
          placeholder: 'ایمیل خود را وارد کنید',
        },
        {
          label: 'آیا می‌خواهید خبرنامه دریافت کنید؟',
          type: 'checkbox',
        },
        {
          label: 'نوع انتخاب',
          type: 'radio',
          options: ['انتخاب 1', 'انتخاب 2', 'انتخاب 3'],
        },
        {
          label: 'کشور',
          type: 'select',
          options: ['ایران', 'آلمان', 'فرانسه'],
        },
      ];

      // ذخیره‌سازی داده‌ها در Vuex
      this.$store.dispatch('saveFormData', formJson);
    },
  },
  setup() {
    const store = useStore();
    const formItems = computed(() => store.state.formItems);
    const formJSON = computed(() => store.getters.formJSON);
    const isCreate = ref(false);

    function openModal() {
      isCreate.value = true;
    }
    function closeModal() {
      isCreate.value = false;
    }

    const onDrop = (event) => {
      const item = JSON.parse(event.dataTransfer.getData('item'));
      store.commit('addFormItem', {
        ...item,
        id: new Date().getTime(),
      });
    };

    // const updateItem = (index, item) => {
    //   store.commit('updateFormItem', { index, item });
    // };

    // const removeItem = (id) => {
    //   console.log(id);
    //   store.commit('removeFormItem', id);
    // };

    return {
      formItems,
      formJSON,
      onDrop,
      isCreate,
      openModal,
      closeModal,
    };
  },
};
</script>
