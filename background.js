const conditions = [
  new chrome.declarativeContent.PageStateMatcher({
    pageUrl: { urlMatches: '(https:\/\/www.)?(money.)?cnn.com\/(1|2).*' }
  }),
  new chrome.declarativeContent.PageStateMatcher({
    pageUrl: { urlMatches: 'https:\/\/www.nytimes.com\/(1|2).*' }
  }),
  new chrome.declarativeContent.PageStateMatcher({
    pageUrl: { urlMatches: 'https:\/\/techcrunch.com\/(1|2).*' }
  }),
  new chrome.declarativeContent.PageStateMatcher({
    pageUrl: { urlMatches: 'https:\/\/www.economist.com/.*/.*/.*' }
  }),
  new chrome.declarativeContent.PageStateMatcher({
    pageUrl: { urlMatches: 'https:\/\/www.newyorker.com/.*/.*/.*' }
  }),
  new chrome.declarativeContent.PageStateMatcher({
    pageUrl: { urlMatches: '(https?:\/\/)?www.bbc.com/.*/.*/.*' }
  }),
  new chrome.declarativeContent.PageStateMatcher({
    pageUrl: { urlMatches: 'https:\/\/www.washingtonpost.com/.*/.*/.*' }
  }),
  new chrome.declarativeContent.PageStateMatcher({
    pageUrl: { urlMatches: 'https://www.nbcnews.com/.*/.*/.*' }
  }),
  new chrome.declarativeContent.PageStateMatcher({
    pageUrl: { urlMatches: 'https://www.npr.org/.*/.*/.*' }
  }),
  new chrome.declarativeContent.PageStateMatcher({
    pageUrl: { urlMatches: '(https?://www)?.time.com/.*/.*' }
  })
];

const rule = {
  conditions: conditions,
  actions: [new chrome.declarativeContent.ShowPageAction()]
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ onWebPage: true });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([rule]);
  });
});
