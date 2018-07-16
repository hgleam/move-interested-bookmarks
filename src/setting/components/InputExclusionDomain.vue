<template>
  <input
    type="text"
    class="input"
    style="width:180px"
    placeholder="新しいドメイン判断対象外URL"
    v-model="newExclusionDomainText"
    @keyup.enter="add"
  >
</template>

<script>
export default {
  data() {
    return {
      newExclusionDomainText: ''
    }
  },
  methods: {
    add() {
      const value =
        this.newExclusionDomainText && this.newExclusionDomainText.trim()
      if (value) {
        this.$emit('addExclusionDomain', value)
        this.newExclusionDomainText = ''
      }
    }
  }
}
</script>

<style lang="css">
</style>
