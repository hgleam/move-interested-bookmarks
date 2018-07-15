<template>
  <div class="setting-item">
    <span class="item-name">ドメイン判断対象外URL：</span>
    <input-exclusion-domain @addExclusionDomain="add"/>
    <p>対象外としたドメインの一覧</p>
    <ul v-if="values.length">
      <exclusion-domain-item
        v-for="exclusionDomain in values"
        :key="exclusionDomain.id"
        :exclusion-domain="exclusionDomain"
        @removeExclusionDomain="remove"
      />
    </ul>
    <p v-else>
      除外対象ドメインは存在しません
    </p>
  </div>
</template>

<script>
import InputExclusionDomain from './InputExclusionDomain.vue'
import ExclusionDomainItem from './ExclusionDomainItem.vue'

export default {
  components: {
    InputExclusionDomain,
    ExclusionDomainItem
  },
  props: {
    values: {
      type: Array,
      required: true
    }
  },
  methods: {
    add(value) {
      this.$emit('addExclusionDomains', value)
    },
    remove(value) {
      const index = this.values.indexOf(value)
      this.$emit('removeExclusionDomains', index)
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
