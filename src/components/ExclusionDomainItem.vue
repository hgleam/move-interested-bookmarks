<template>
  <li>
    <span>{{exclusionDomain.text}}</span>
    <button class="delete-button" @click="remove(exclusionDomain)">削除</button>
  </li>
</template>

<script>

  export default {
    props: {
      exclusionDomain: {
        type: Object,
        required: true
      }
    },
    methods: {
      remove(value) {
        this.$emit('removeExclusionDomain', value);
      },
    },
  }
</script>

<style lang="css">
  li {
    list-style: none;
    height: 28px;
    border-top: 1px solid #CDCDCD;
    border-bottom: 1px solid #CDCDCD;
  }
  .delete-button {
    float: right;
  }
</style>
