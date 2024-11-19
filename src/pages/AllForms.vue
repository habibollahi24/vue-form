<template>
  <div>
    <div
      class="text-center text-xl my-12"
      v-if="getAllForm.length === 0"
    >
      Noting form :)
    </div>
    <div v-else class="mt-8">
      <div
        class="max-w-screen-sm mx-auto mb-4 flex items-center space-x-1"
      >
        <input
          type="text"
          class="bg-gray-100 rounded-lg p-2"
          v-model="val"
          placeholder="search ..."
        />
      </div>
      <div
        v-for="(form, index) in getAllForm"
        :key="index"
        class="flex space-x-3 justify-center border-2 max-w-screen-sm mx-auto p-8 rounded-lg my-2"
      >
        <form class="p-4 flex-1">
          <h2 class="text-xl font-semibold mb-4">
            {{ form.formName }}
          </h2>

          <div v-for="(item, index) in form.formItems" :key="index">
            <label
              v-if="['text', 'number'].includes(item.type)"
              class="block text-sm text-gray-600"
            >
              {{ item.label }}
              <input
                :type="item.type"
                class="border rounded-md p-1 px-4 my-1 w-full text-base"
                :required="item.validations.required"
                :minlength="item.validations.min"
                :maxlength="item.validations.max"
                :min="item.validations.min"
                :max="item.validations.max"
              />
            </label>
            <label
              v-if="item.type === 'checkbox'"
              class="flex text-sm text-gray-600 my-2"
            >
              <input
                :type="item.type"
                class="border rounded-md text-base mr-1 accent-indigo-700 size-4"
                :required="item.validations.required"
              />
              {{ item.label }}
            </label>
            <label
              v-if="item.type === 'select'"
              class="text-sm text-gray-600 block"
            >
              {{ item.label }}
              <select
                class="border rounded-md p-1 my-1 w-full text-base"
              >
                <option
                  v-for="(opt, index) in item.options"
                  :key="index"
                  :value="opt"
                >
                  {{ opt }}
                </option>
              </select>
              <!-- <input
                :type="item.type"
                class="border rounded-md text-base mr-1 w-full accent-indigo-700"
                :required="item.validations.required"
                :min="item.validations.min"
                :max="item.validations.max"
                :step="item.validations.step"
                value="0"
              /> -->
            </label>
            <label
              v-if="item.type === 'range'"
              class="text-sm text-gray-600 block"
            >
              {{ item.label }}
              <input
                :type="item.type"
                class="border rounded-md text-base w-full accent-indigo-700"
                :required="item.validations.required"
                :min="item.validations.min"
                :max="item.validations.max"
                :step="item.validations.step"
                value="0"
              />
            </label>

            <p
              class="block w-full"
              v-if="item.type === 'radio' && index === 1"
            >
              select a value
            </p>
            <label
              v-if="item.type === 'radio'"
              class="flex text-sm text-gray-600 my-2"
            >
              <input
                :type="item.type"
                class="border rounded-md text-base mr-1 accent-indigo-700 size-4"
                :required="item.validations.required"
                name="gender"
                :value="item.value"
              />
              {{ item.label }}
            </label>
          </div>

          <button
            class="text-white bg-indigo-600 rounded-lg px-4 py-1 mt-2 w-full"
          >
            Submit
          </button>
        </form>

        <pre
          class="text-[10px] w-[200px] h-[300px] overflow-auto bg-gray-800 text-gray-100 p-2 rounded-lg"
          >{{ getAllForm[index] }}</pre
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
// const getAllForm = computed(() => store.state.array);

const val = ref('');

const getAllForm = computed(() => {
  const query = val.value.toLowerCase();
  return store.state.array.filter((form) =>
    form.formName.toLowerCase().includes(query)
  );
});
</script>

<style></style>
