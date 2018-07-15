<template>
  <div class="setting-item">
    <span class="item-name">現在から何ヶ月経過したブックマークを対象とするか：</span>
    <select
      v-model="selected"
      @change="change">
      <option
        v-for="n in 12"
        :key="n"
        :value="n">{{ n }}
      </option>
    </select>ヶ月
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selected: ''
    }
  },
  mounted() {
    this.selected = this.value
  },
  methods: {
    change() {
      this.$emit('changeElapsedMonth', this.selected)
    }
  }
}
</script>

<style lang="css">
  .item-name {
    display: inline-block;
    width: 400px;
  }
</style>
