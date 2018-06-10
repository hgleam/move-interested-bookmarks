<template>
	<div id="app">
		<h1>設定値</h1>
			<div class="app-main">
				<save-destination-folder :matchingBookmarkFolders="matchingBookmarkFolders" :value="saveDestinationFolder"
					@searchBookmark="searchBookmark"
					@changeSaveDestinationFolder="changeSaveDestinationFolder">
				</save-destination-folder>
				<elapsed-month :value="elapsedMonth" @changeElapsedMonth="changeElapsedMonth"></elapsed-month>
				<execution-time :value="executionTime" @changeExecutionTime="changeExecutionTime"></execution-time>
				<exclusion-domains :values="exclusionDomains" @addExclusionDomains="addExclusionDomains"
																										  @removeExclusionDomains="removeExclusionDomains"></exclusion-domains>
				<button type="submit" @click="save">保存</button>
		</div>
		<div id="tree">
		</div>
	</div>

</template>

<script>
	import SaveDestinationFolder from './components/SaveDestinationFolder'
	import ElapsedMonth from './components/ElapsedMonth';
	import ExecutionTime from './components/ExecutionTime';
	import ExclusionDomains from './components/ExclusionDomains';
	import Setting from '../scripts/setting';

	export default {
		components: {
			SaveDestinationFolder,
			ElapsedMonth,
			ExecutionTime,
			ExclusionDomains,
		},
		data() {
			return {
				saveDestinationFolder: this.model.saveDestinationFolder,
				matchingBookmarkFolders: this.model.matchingBookmarkFolders,
				elapsedMonth: this.model.elapsedMonth,
				executionTime: this.model.executionTime,
				exclusionDomains: this.model.exclusionDomains,
			}
		},
		beforeCreate() {
			this.model = new Setting();
	 		this.model.restore();
		},
		mounted() {
			this.model.saveDestinationFolderChanged.observe(() => {
				this.saveDestinationFolder = this.model.saveDestinationFolder;
			})
			this.model.searchFoldersChanged.observe(() => {
				this.matchingBookmarkFolders = this.model.matchingBookmarkFolders;
			})
	  	this.model.elapsedMonthChanged.observe(() => {
				this.elapsedMonth = this.model.elapsedMonth;
			})
			this.model.executionTimeChanged.observe(() => {
				this.executionTimeChanged = this.model.executionTime;
			})
			this.model.exclusionDomainsChanged.observe(() => {
				this.exclusionDomains = this.model.exclusionDomains;
			})
		},
		methods: {
			changeElapsedMonth(value) {
				this.model.changeElapsedMonth(value);
			},
			changeExecutionTime(value) {
				this.model.changeExecutionTime(value);
			},
			addExclusionDomains(value) {
				this.model.addExclusionDomains(value);
			},
			removeExclusionDomains(value) {
				this.model.removeExclusionDomains(value);
			},
			searchBookmark(value) {
				this.model.searchBookmark(value);
			},
			changeSaveDestinationFolder(value) {
				this.model.changeSaveDestinationFolder(value)
			},
			save() {
				this.model.save();
			},
		},
	};
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
