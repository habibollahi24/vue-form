<template>
  <div class="max-w-sm mx-auto">
    <div
      class="rounded-md p-2 flex md:justify-between space-x-3 my-2"
    >
      <div class="w-3/4">
        <!-- نمایش نوع های مختلف ورودی -->
        <div v-if="editableItem.type === 'text'">
          <input
            type="text"
            placeholder=" Text ..."
            class="bg-gray-100 rounded-lg p-2 w-full"
            disabled
          />
        </div>
        <div v-if="editableItem.type === 'number'">
          <input
            type="number"
            placeholder=" Number ..."
            class="bg-gray-100 rounded-lg p-2 w-full"
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
            class="border rounded-md text-base mr-1 accent-indigo-700 w-full"
          />
          Range
        </div>

        <!-- select با امکان اضافه کردن گزینه‌ها -->
        <select
          v-if="editableItem.type === 'select'"
          class="bg-gray-100 rounded-lg p-2 w-full"
          disabled
        >
          <option value="select">select</option>
        </select>
      </div>

      <!-- اعتبارسنجی‌ها -->
      <div class="flex items-center space-x-1 text-xs">
        <div class="relative">
          <button
            @click="isOpen = !isOpen"
            class="transition-all md:hover:-translate-y-1 mt-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
          <div
            v-show="isOpen"
            class="absolute z-20 -translate-x-[60%]"
          >
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
          class="transition-all md:hover:-translate-y-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
        <button
          class="text-xl transition-all md:hover:-translate-y-1"
          @click="
            $store.commit('swapIndexDown', {
              index1: index,
              index2: index + 1,
            })
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
        <button
          @click="
            $store.commit('swapIndexUp', {
              index1: index,
              index2: index - 1,
            })
          "
          class="text-xl transition-all md:hover:-translate-y-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
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
