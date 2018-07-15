<template>
  <div class="setting-item">
    <span class="item-name">退避先フォルダ：</span>
    <input
      readonly
      v-model="saveDestinationFolder.title"
      type="text"
      class="input"
      style="width:130px"
      placeholder="退避先フォルダ"
    >
    <button class="delete-button" @click="openDialog">選択</button>

    <div id="dialog" role="dialog" aria-labelledby="dialog-title" aria-hidden="true">
      <header>
        <h3 id="dialog-title">退避先フォルダ選択</h3>
      </header>
      <input type="text" id="folderInput" v-model="searchWord" placeholder="Search folder..." @keyup="search($event)">
      <div id="folderList" class="folder-list">
        <div v-if="!matchingBookmarkFolders.length">
          一致するフォルダがありません
        </div>
        <div v-else v-for="matchingBookmarkFolder in matchingBookmarkFolders"
             class="folder"
             :key="matchingBookmarkFolder.id"
             @click="changeSaveDestinationFolder(matchingBookmarkFolder)">
          <span class="icon"/>
          <div class="title">{{ matchingBookmarkFolder.title }}</div>
        </div>
      </div>
    </div>
    <div id="dialog-overlay"/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchWord: '',
        saveDestinationFolder: ''
      };
    },
    mounted() {
      this.saveDestinationFolder = this.value;
    },
    props: [
      'value',
      'matchingBookmarkFolders',
    ],
    methods: {
      openDialog() {
        $(this).blur();
        $("#dialog-overlay" ).fadeIn("slow") ;
        let dialog = document.getElementById('dialog');
        dialog.setAttribute("aria-hidden", false);
        dialog.style.display = 'flex';

        $("#dialog-overlay").unbind().click(function() {
		      $("#dialog").fadeOut("slow", function() {
			      $('#dialog-overlay').css('display', 'none');
		      });
	      });
      },
      changeSaveDestinationFolder(value) {
        this.saveDestinationFolder = value;
        this.$emit('changeSaveDestinationFolder', value);
      },
      search(event) {
        this.$emit('searchBookmark', this.searchWord);
      },
    },
  }
</script>

<style scoped lang="css">
#dialog {
  margin: 0;
  width: 400px;
  height: 400px;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  display: none;
  flex-direction: column;
  position: fixed;
  top: 100px;
  left: 0px;
  right: 0px;
  z-index: 2;
  width: 50%;
  margin: auto;
  border-radius: 3px;
  background-color: #FFFFFF;
  border: solid 1px #000000;
}

#dialog-overlay {
  z-index:1;
	display:none;
	position:fixed;
	top:0;
	left:0;
	width:100%;
	height:120%;
	background-color:rgba(0,0,0,0.75);
}

#dialog header {
  display: flex;
  padding: 0.7rem 1.5rem;
  background-color: #077CA6;
}

#dialog header h3 {
  margin: 0rem;
  font-size: 1rem;
  font-weight: 700;
}

#folderInput {
  display: block;
  flex: 0 0 30px;
  line-height: 30px;
  padding: 0 5px;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  color: #4a4a4a;
  border: 0;
  border-top: 1px solid #ddd;
}

.folder-list {
  flex: 1;
  border-top: 1px solid #ddd;
  max-height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}

#noMatchingMessage {
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
}

.folder {
  position: relative;
  display: flex;
  flex: 0 0 31px;
  flex-wrap: nowrap;
  cursor: pointer;
}

.folder:hover, .folder.selected {
  background-color: #eee;
}

.folder .icon {
  flex: 0 0 20px;
  height: 31px;
  margin-left: 2px;
  opacity: 0.3;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 21 21' version='1.1'><g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g fill='%23000000'><path d='M8 2L2 2C0.9 2 0 2.9 0 4L0 16C0 17.1 0.9 18 2 18L18 18C19.1 18 20 17.1 20 16L20 6C20 4.9 19.1 4 18 4L10 4 8 2'/></g></g></svg>");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 15px;
}

.folder .title {
  flex-grow: 1;
  height: 31px;
  line-height: 31px;
  margin-left: 7px;
  overflow: hidden;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: inherit;
  display: inline-block;
  font-size: 13px;
  font-weight: 400;
}
</style>
