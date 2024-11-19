<template>
  <div class="shadow-m rounded-2xl p-4 max-h-max">
    <h3 class="text-center text-2xl mb-4">Tools</h3>
    <div
      v-for="item in items"
      :key="item.type"
      draggable="true"
      @dragstart="dragStart(item)"
      @click="clickOnMobile(item)"
      class="px-4 py-2 rounded-xl border-2 border-dashed my-1 text-sm text-center font-semibold cursor-grab hover:opacity-50 transition-all whitespace-nowrap"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();

const items = [
  {
    type: 'text',
    label: ' Text-Input',
    validations: {},
  },
  { type: 'number', label: ' Number-Input', validations: {} },
  { type: 'checkbox', label: 'CheckBox', validations: {} },
  { type: 'radio', label: 'Radio', validations: {} },
  { type: 'range', label: 'Slider', validations: {} },
  { type: 'select', label: ' Select-Box', validations: {} },
];

const dragStart = (item) => {
  event.dataTransfer.setData('item', JSON.stringify(item));
};
const clickOnMobile = (item) => {
  if (window.innerWidth < 768) {
    store.commit('addFormItem', {
      ...item,
      id: new Date().getTime(),
    });
  }
};
</script>
