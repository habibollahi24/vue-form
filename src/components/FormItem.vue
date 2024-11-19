<template>
  <div class="max-w-sm mx-auto">
    <div
      class="rounded-md p-2 flex space-x-3 items-center justify-between my-2"
    >
      <div class="">
        <!-- نمایش نوع های مختلف ورودی -->
        <div v-if="editableItem.type === 'text'">
          <input
            type="text"
            placeholder=" Text ..."
            class="bg-gray-100 rounded-lg p-2"
            disabled
          />
        </div>
        <div v-if="editableItem.type === 'number'">
          <input
            type="number"
            placeholder=" Number ..."
            class="bg-gray-100 rounded-lg p-2"
            disabled
          />
        </div>

        <div
          v-if="editableItem.type === 'checkbox'"
          class="flex items-center"
        >
          <input
            type="checkbox"
            v-model="editableItem.value"
            class="border rounded-md text-base mr-1 accent-indigo-700 size-4"
          />
          CheckBox
        </div>

        <div
          v-if="editableItem.type === 'radio'"
          class="flex items-center"
        >
          <input
            type="radio"
            v-model="editableItem.value"
            :value="editableItem.value"
            class="border rounded-md text-base mr-1 accent-indigo-700 size-4"
          />
          Radio
        </div>
        <div
          v-if="editableItem.type === 'range'"
          class="flex items-center"
        >
          <input
            type="range"
            v-model="editableItem.value"
            class="border rounded-md text-base mr-1 accent-indigo-700"
          />
          Range
        </div>

        <!-- select با امکان اضافه کردن گزینه‌ها -->
        <select
          v-if="editableItem.type === 'select'"
          class="bg-gray-100 rounded-lg p-2 w-48"
          disabled
        >
          <option value="select">select</option>
        </select>
      </div>

      <!-- اعتبارسنجی‌ها -->
      <div class="flex items-center space-x-1">
        <div class="relative">
          <button
            @click="isOpen = !isOpen"
            class="transition-all hover:-translate-y-1"
          >
            ⚙
          </button>
          <div v-show="isOpen" class="absolute z-20 -translate-x-1/2">
            <div
              class="flex flex-col text-sm border-2 rounded-lg p-4 bg-white"
            >
              <div class="flex items-center space-x-1 mb-2">
                <label class="text-xs">Lable: </label>
                <input
                  v-model="editableItem.label"
                  placeholder="برچسب"
                  class="border rounded-lg p-1 text-xs"
                />
              </div>
              <label class="flex items-center">
                isRequired :
                <input
                  type="checkbox"
                  v-model="editableItem.validations.required"
                  class="border rounded-md text-base ml-1 accent-indigo-700 size-4"
                />
              </label>
              <label
                v-if="
                  ['text', 'number', 'range'].includes(
                    editableItem.type
                  )
                "
              >
                min:
                <input
                  type="number"
                  v-model="editableItem.validations.min"
                  class="border rounded-md px-2 my-1"
                />
              </label>
              <label
                v-if="
                  ['text', 'number', 'range'].includes(
                    editableItem.type
                  )
                "
              >
                max:
                <input
                  type="number"
                  v-model="editableItem.validations.max"
                  class="border rounded-md px-2"
                />
              </label>
              <label v-if="editableItem.type === 'range'">
                step:
                <input
                  type="number"
                  v-model="editableItem.validations.step"
                  class="border rounded-md px-2"
                />
              </label>
              <label v-if="editableItem.type === 'radio'">
                value:
                <input
                  type="text"
                  v-model="editableItem.value"
                  class="border rounded-md px-2"
                />
              </label>
              <label v-if="editableItem.type === 'select'">
                isMultiple:
                <input
                  type="checkbox"
                  v-model="editableItem.validations.isMultiple"
                  class="border rounded-md text-base ml-1 accent-indigo-700 size-4"
                />
              </label>
              <div v-if="editableItem.type === 'select'">
                <div class="flex items-center space-x-1 mb-2">
                  <label class="block">Options:</label>
                  <button
                    class="text-sm p-1 rounded-lg text-white flex justify-center items-center"
                    @click="addOption"
                  >
                    ➕
                  </button>
                </div>
                <div
                  v-for="(option, index) in editableItem.options"
                  :key="index"
                  class="flex items-center mb-2"
                >
                  <input
                    v-model="editableItem.options[index]"
                    placeholder="  new opt.."
                    class="bg-gray-100 rounded-lg p-1 text-sm"
                  />
                  <button
                    class="text-sm py-1 px-2 rounded-lg text-white ml-1"
                    @click="removeOption(index)"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          @click="removeItem(item.id)"
          class="transition-all hover:-translate-y-1"
        >
          🗑
        </button>
        <button
          class="text-xl transition-all hover:-translate-y-1"
          @click="
            $store.commit('swapIndexDown', {
              index1: index,
              index2: index + 1,
            })
          "
        >
          &#8595;
        </button>
        <button
          @click="
            $store.commit('swapIndexUp', {
              index1: index,
              index2: index - 1,
            })
          "
          class="text-xl transition-all hover:-translate-y-1"
        >
          &#8593;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/vue';

export default {
  props: ['item', 'index'],
  components: [Popover, PopoverButton, PopoverPanel],

  // setup() {
  //   return { Popover, PopoverButton, PopoverPanel };
  // },

  data() {
    console.log(this.item);
    const copyObject = { ...this.item };

    if (this.item.type === 'select') {
      copyObject.options = [];
    }
    console.log(copyObject);

    return {
      isOpen: false,
      // ایجاد یک کپی از prop برای ویرایش محلی
      editableItem: copyObject,
      // editableItem: {
      //   ...this.item,
      //   options:
      //     (this.item.type === 'select' && this.item.options) || [], // در صورتی که گزینه‌ها وجود نداشته باشند، آرایه خالی تنظیم شود.
      // },
    };
  },
  watch: {
    // زمانی که editableItem تغییر می‌کند، این تغییرات به والد ارسال می‌شود
    editableItem: {
      handler(newValue) {
        console.log(newValue);
        this.$store.commit('updateFormItem', {
          index: this.index,
          item: newValue,
        });
      },
      deep: true, // تغییرات عمیق را رصد می‌کند
    },
  },
  methods: {
    // افزودن گزینه جدید به select
    addOption() {
      this.editableItem.options.push(''); // یک گزینه خالی به آرایه اضافه می‌شود.
    },

    // حذف گزینه
    removeOption(index) {
      this.editableItem.options.splice(index, 1); // گزینه مورد نظر حذف می‌شود.
    },

    removeItem(id) {
      this.$store.commit('removeFormItem', id);
      // this.$emit('removeItem', this.item.id); // آیتم حذف می‌شود.
    },
  },
};
</script>

<style></style>
