// NOTE: These tests will not run without a front-end server, which this code bundle does not implement (not even a dev server)
import { expect } from '@jest/globals';
import { changeTab } from './script.js';

test('should set Football tab to active', () => {
  changeTab(null, 'football');

  expect(document.getElementById(`tab-panel-football`).className).toBe('tab-panel panel-active');
  expect(document.getElementById(`tab-head-football`).className).toBe('tab tab-active');
});

test('number of tab headings equal the number of tab panels', () => {
  changeTab(null, 'football');
  let tabHeadings = document.getElementsByClassName('tab');
  let tabPanels = document.getElementsByClassName('tab-panel');
  expect(tabHeadings.length).toBe(tabPanels.length);
});

test('only one tab heading should be active at one time', () => {
  changeTab(null, 'football');
  expect(document.getElementById(`tab-head-football`).className).toBe('tab tab-active');

  let tabHeadings = document.getElementsByClassName('tab');
  for (i = 0; i < tabHeadings.length; i++) {
    if (tabHeadings[i].id != 'tab-head-football') {
      expect(tabHeadings[i].className).toBe('tab');
    }
  }
});

test('only one tab panel should be visible at one time', () => {
  changeTab(null, 'football');
  expect(document.getElementById(`tab-panel-football`).className).toBe('tab-panel panel-active');

  let tabPanels = document.getElementsByClassName('tab-panel');
  for (i = 0; i < tabPanels.length; i++) {
    if (tabPanels[i].id != 'tab-panel-football') {
      expect(tabPanels[i].className).toBe('tab-panel');
    }
  }
});
