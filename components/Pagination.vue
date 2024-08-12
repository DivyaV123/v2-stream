<template>
  <div v-if="getPageCount" class="py-2">
    <nav class="block">
      <ul class="flex pl-0 rounded list-none flex-wrap">
        <li>
          <button
            @click="pageToParent(page - 1)"
            :disabled="page === 1"
            class="
              disabled:opacity-50
              first:ml-0
              text-xs
              font-semibold
              inline-flex
              w-8
              h-8
              mx-1
              p-0
              items-center
              justify-center
              leading-tight
              relative
              border border-solid border-gray-800
              bg-white
              text-gray-600
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </li>
        <li
          v-for="(p, i) in getPageCount.slice(page, page + maxPages)"
          :key="i"
        >
          <button
            v-if="page == p"
            class="
              first:ml-0
              text-xs
              font-semibold
              flex
              w-8
              h-8
              mx-1
              p-0
              rounded-full
              items-center
              justify-center
              leading-tight
              relative
              border border-solid border-gray-800
              bg-gray-500
              text-white
            "
          >
            {{ p }}
          </button>
          <button
            v-else
            @click="pageToParent(p)"
            class="
              first:ml-0
              text-xs
              font-semibold
              flex
              w-8
              h-8
              mx-1
              p-0
              rounded-full
              items-center
              justify-center
              leading-tight
              relative
              border border-solid border-gray-800
              bg-white
              text-gray-600
            "
          >
            {{ p }}
          </button>
        </li>
        <li>
          <button
            @click="pageToParent(page + 1)"
            :disabled="page === getPageCount.length"
            class="
              disabled:opacity-50
              first:ml-0
              text-xs
              font-semibold
              flex
              w-8
              h-8
              mx-1
              p-0
              items-center
              justify-center
              leading-tight
              relative
              border border-solid border-gray-800
              bg-white
              text-gray-600
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 25,
    },
    maxPages: {
      type: Number,
      default: 8,
    },
  },
  data() {
    return {
      clickedPage: null,
    };
  },
  methods: {
    async pageToParent(pg) {
      this.clickedPage = pg;
      this.$emit("pageChange", pg);
    },
  },
  computed: {
    getPageCount() {
      if (this.total >= this.pageSize) {
        var pc = Array.from(
          Array(Math.ceil(this.total / this.pageSize)).keys()
        );
        return pc;
      }
    },
  },
};
</script>

<style>
</style>