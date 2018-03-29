chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  chrome.tabs.sendMessage(tabs[0].id, { data: true }, response => {
    // Set timeout causes the DOM manipulation of the popup below to wait for the
    // popup window to fully render. Without waiting for the popup to render,
    // the DOM manipulation happens and then the popup renders down to the default minimum size.
    setTimeout(() => {
      document.getElementById('read-estimate').innerHTML = `${response.estimatedReadTime} mins`;
      document.getElementById('word-count').innerHTML = `${response.wordCount} words`;
    }, 100);
  });
});
