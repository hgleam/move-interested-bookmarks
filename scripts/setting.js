"use strict";

import Notificator from './notificator';
import BookmarkSearcher from './bookmark_searcher';

export default class {
  constructor()
  {
    this.saveDestinationFolderChanged = new Notificator;
    this.searchFoldersChanged         = new Notificator;
    this.elapsedMonthChanged          = new Notificator;
    this.executionTimeChanged         = new Notificator;
    this.exclusionDomainsChanged      = new Notificator;

    this.elapsedMonth = {};
    this.executionTime = {};
    this.exclusionDomains = [];
    this.matchingBookmarkFolders = [];
    this.saveDestinationFolder = [];
  }
  set saveDestinationFolder(x) {
    this._saveDestinationFolder = x;
    this.saveDestinationFolderChanged.fire();
  }
  get saveDestinationFolder() {
    return this._saveDestinationFolder;
  }

  set elapsedMonth(x) {
    this._elapsedMonth = x;
    this.elapsedMonthChanged.fire();
  }

  get elapsedMonth() {
    return this._elapsedMonth;
  }

  set executionTime(x) {
    this._executionTime = x;
    this.executionTimeChanged.fire();
  }

  get executionTime() {
    return this._executionTime;
  }

  set exclusionDomains(x) {
    this._exclusionDomains = x;
    this.exclusionDomainsChanged.fire();
  }

  get exclusionDomains() {
    return this._exclusionDomains;
  }

  changeSaveDestinationFolder(i) {
    this.saveDestinationFolder = i;
  }

  changeElapsedMonth(i) {
    this.elapsedMonth = i;
  }

  changeExecutionTime(i) {
    this.executionTime = i;
  }

  changeExclusiondomains(i) {
    this.exclusionDomains = i;
  }

  addExclusionDomains(i) {
    this.exclusionDomains.push({
      text: i
    });
  }

  removeExclusionDomains(i) {
    this.exclusionDomains.splice(i, 1);
  }

  searchBookmark(value) {
    browser.bookmarks.search(value, this.getMatchingBookmark.bind(this));
  }

  getMatchingBookmark(bookmarkTreeNodeSet) {
    let searchCondition = {value: bookmarkTreeNodeSet, filterType: 'folder'};
    let bookmarkSearcher = new BookmarkSearcher(searchCondition);
    this.matchingBookmarkFolders = bookmarkSearcher.start();
    this.searchFoldersChanged.fire();
  }

  restore() {
    let value = JSON.parse(localStorage.getItem('setting')) || {};
    if(Object.keys(value).length != 0) {
      this.saveDestinationFolder = value.saveDestinationFolder;
      this.elapsedMonth = value.elapsedMonth;
      this.executionTime = value.executionTime;
      this.exclusionDomains = value.exclusionDomains;
    }
  }

  save() {
    let value = {
      saveDestinationFolder: this.saveDestinationFolder,
      elapsedMonth: this.elapsedMonth,
      executionTime: this.executionTime,
      exclusionDomains: this.exclusionDomains
    };

    localStorage.setItem('setting', JSON.stringify(value));

    // バックグラウンド起動時間の更新
    let page = browser.extension.getBackgroundPage();
    page.createAlarm();
  }
}
