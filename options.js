document.getElementById('onWebPageTrue').addEventListener('change', () => {
  chrome.storage.sync.set({ onWebPage: true });
});

document.getElementById('onWebPageFalse').addEventListener('change', () => {
  chrome.storage.sync.set({ onWebPage: false });
});
