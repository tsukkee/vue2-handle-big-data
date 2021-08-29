<template>
  <div class="view">
    <div class="header">
      <h1>初期状態</h1>
      <button @click="loadData">データロード</button>
    </div>

    <div class="tag-selector">
      <label v-for="tag in tags" :key="tag">
        <input v-model="selectedTags" type="checkbox" :value="tag" />
        {{ tag }}
      </label>
    </div>

    <div class="scroller">
      <div v-for="d in convertedData" :key="d.id" class="data-view">
        <span class="name">{{ d.name }} ({{ d.count }})</span>
        <div class="tags">
          <span
            v-for="tag in d.tags"
            :key="tag.name"
            class="tag"
            :class="{ selected: tag.selected }"
          >
            [ {{ tag.name }} ]
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DataType, TagType, BIG_DATA, TAGS } from "../data/big-data";

@Component({
  components: {},
})
export default class DataView extends Vue {
  data: readonly DataType[] = [];

  selectedTags: TagType[] = [];

  get tags() {
    return TAGS.slice().sort();
  }

  get convertedData() {
    return this.data.map((d) => ({
      id: d.id,
      name: d.name,
      count: d.options.tags.reduce(
        (sum, t) => sum + (this.selectedTags.includes(t) ? 1 : 0),
        0
      ),
      tags: d.options.tags
        .map((t) => ({
          name: t,
          selected: this.selectedTags.includes(t),
        }))
        .sort((a, b) => (a.name < b.name ? -1 : 1)),
    }));
  }

  loadData(): void {
    this.data = BIG_DATA;
    console.log("big data", this.data);
  }
}
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

.scroller {
  overflow: auto;
}

.data-view {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 32px;
  margin: 0 40px;

  .name {
    width: 300px;
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
