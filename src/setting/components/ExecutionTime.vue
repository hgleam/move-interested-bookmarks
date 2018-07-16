<template>
  <div class="setting-item">
    <span class="item-name">実行スケジュール：</span>
    <input
      type="time"
      v-model="executionTime"
      @change="change">に処理開始
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
      executionTime: ''
    }
  },
  mounted() {
    this.executionTime = this.value
  },
  methods: {
    change() {
      this.$emit('changeExecutionTime', this.executionTime)
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
