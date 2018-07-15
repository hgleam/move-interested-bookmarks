<template>
  <div id="app">
    <h1>設定値</h1>
    <div class="app-main">
      <save-destination-folder
        :matching-bookmark-folders="matchingBookmarkFolders"
        :value="saveDestinationFolder"
        @searchBookmark="searchBookmark"
        @changeSaveDestinationFolder="changeSaveDestinationFolder"
      />
      <elapsed-month
        :value="elapsedMonth"
        @changeElapsedMonth="changeElapsedMonth"
      />
      <execution-time
        :value="executionTime"
        @changeExecutionTime="changeExecutionTime"/>
      <exclusion-domains
        :values="exclusionDomains"
        @addExclusionDomains="addExclusionDomains"
        @removeExclusionDomains="removeExclusionDomains"
      />
      <button
        type="submit"
        @click="save">保存
      </button>
    </div>
    <div id="tree"/>
  </div>

</template>

<script>
import SaveDestinationFolder from './components/SaveDestinationFolder.vue'
import ElapsedMonth from './components/ElapsedMonth.vue'
import ExecutionTime from './components/ExecutionTime.vue'
import ExclusionDomains from './components/ExclusionDomains.vue'
import Setting from './js/index'

export default {
  components: {
    SaveDestinationFolder,
    ElapsedMonth,
    ExecutionTime,
    ExclusionDomains
  },
  data() {
    return {
      saveDestinationFolder: this.model.saveDestinationFolder,
      matchingBookmarkFolders: this.model.matchingBookmarkFolders,
      elapsedMonth: this.model.elapsedMonth,
      executionTime: this.model.executionTime,
      exclusionDomains: this.model.exclusionDomains
    }
  },
  beforeCreate() {
    this.model = new Setting()
    this.model.restore()
  },
  mounted() {
    this.model.saveDestinationFolderChanged.observe(() => {
      this.saveDestinationFolder = this.model.saveDestinationFolder
    })
    this.model.searchFoldersChanged.observe(() => {
      this.matchingBookmarkFolders = this.model.matchingBookmarkFolders
    })
    this.model.elapsedMonthChanged.observe(() => {
      this.elapsedMonth = this.model.elapsedMonth
    })
    this.model.executionTimeChanged.observe(() => {
      this.executionTimeChanged = this.model.executionTime
    })
    this.model.exclusionDomainsChanged.observe(() => {
      this.exclusionDomains = this.model.exclusionDomains
    })
  },
  methods: {
    changeElapsedMonth(value) {
      this.model.changeElapsedMonth(value)
    },
    changeExecutionTime(value) {
      this.model.changeExecutionTime(value)
    },
    addExclusionDomains(value) {
      this.model.addExclusionDomains(value)
    },
    removeExclusionDomains(value) {
      this.model.removeExclusionDomains(value)
    },
    searchBookmark(value) {
      this.model.searchBookmark(value)
    },
    changeSaveDestinationFolder(value) {
      this.model.changeSaveDestinationFolder(value)
    },
    save() {
      this.model.save()
    }
  }
}
</script>

<style lang="css">
	#app {
		font-size: 20px;
    width: 622px;
	}
	.app-main {
		margin-left: 20px;
		font-size: 15px;
	}
</style>
