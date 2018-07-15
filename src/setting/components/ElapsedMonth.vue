<template>
  <div class="setting-item">
    <span class="item-name">現在から何ヶ月経過したブックマークを対象とするか：</span>
    <select v-model="selected" @change="change">
      <option v-for="n in 12" :value="n">{{ n }}</option>
    </select>ヶ月
  </div>
</template>

<script>
  export default {
    data () {
      return {
        selected: '',
      }
    },
    mounted() {
      this.selected = this.value;
    },
    props: ['value'],
    methods: {
      change() {
        this.$emit('changeElapsedMonth', this.selected);
      }
    },
  }
</script>

<style lang="css">
  .item-name {
    display: inline-block;
    width: 400px;
  }
</style>
