<template>
  <div class="view">
    <div class="header">
      <h1>Object.freeze()導入</h1>
      <button @click="loadData">データロード</button>
    </div>

    <div class="tag-selector">
      <label v-for="tag in tags" :key="tag">
        <input v-model="selectedTags" type="checkbox" :value="tag" />
        {{ tag }}
      </label>
    </div>

    <RecycleScroller
      class="scroller"
      :items="convertedData"
      :item-size="32"
      key-field="id"
      v-slot="{ item }"
    >
      <div class="data-view">
        <span class="name"
          >{{ item.name }} (選択のタグ: {{ item.count }}個)</span
        >
        <div class="tags">
          <span
            v-for="tag in item.tags"
            :key="tag.name"
            class="tag"
            :class="{ selected: tag.selected }"
          >
            [ {{ tag.name }} ]
          </span>
        </div>
      </div>
    </RecycleScroller>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  shallowRef,
  ref,
  computed,
} from "@vue/composition-api";
import { DataType, TagType, BIG_DATA, TAGS } from "../data/big-data";

export default defineComponent({
  setup() {
    const data = shallowRef<DataType[]>([]);
    const selectedTags = ref<TagType[]>([]);

    const tags = computed(() => TAGS.slice().sort());

    const convertedData = computed(() => {
      return data.value.map((d) => ({
        id: d.id,
        name: d.name,
        count: d.options.tags.reduce(
          (sum, t) => sum + (selectedTags.value.includes(t) ? 1 : 0),
          0
        ),
        tags: d.options.tags
          .map((t) => ({
            name: t,
            selected: selectedTags.value.includes(t),
          }))
          .sort((a, b) => (a.name < b.name ? -1 : 1)),
      }));
    });

    const loadData = () => {
      data.value = BIG_DATA;
      console.log("big data", data.value);
    };

    return {
      data,
      selectedTags,
      tags,
      convertedData,
      loadData,
    };
  },
});
</script>

<style lang="scss" scoped>
.view {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
}

.tag-selector {
  margin: 20px 0;
}

.data-view {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 32px;
  margin: 0 40px;

  .name {
    width: 180px;
    text-align: left;
    margin-right: auto;
  }

  .tags {
    .tag.selected {
      color: red;
      font-weight: bold;
    }
  }
}
</style>
