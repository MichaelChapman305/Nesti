const AVERAGE_READING_SPEED = 250;

function getEstimateInfo() {
  const loc = document.location;
  const uri = {
    spec: loc.href,
    host: loc.host,
    prePath: `${loc.protocol}//${loc.host}`,
    scheme: loc.protocol.substr(0, loc.protocol.indexOf(':')),
    pathBase: `${loc.protocol}//${loc.host}${loc.pathname.substr(0, loc.pathname.lastIndexOf('/') + 1)}`
  };

  const documentClone = document.cloneNode(true);
  const article = new Readability(uri, documentClone).parse();

  const wordCount = article.textContent.split(' ').length;
  const estimatedWpm = Math.round(wordCount / AVERAGE_READING_SPEED);

  return [estimatedWpm, wordCount];
}

function displayOnPage(estimatedReadTime, wordCount) {
  const divStyles = 'display: flex; flex-direction: column; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; line-height: 25px; font-size: 18px; color: #484848;';
  const textStyles = 'all: unset; font-weight: bold; color: #2d9cdb;';
  const containerDiv = document.createElement('div');
  const estimateDiv = document.createElement('div');
  const wordCountDiv = document.createElement('div');
  const estimateText = document.createElement('p');
  const wordCountText = document.createElement('p');
  const estimateHeading = document.createElement('h3');
  const wordCountHeading = document.createElement('h3');

  containerDiv.setAttribute('id', 'container-div');
  containerDiv.setAttribute('style', 'position: fixed; top: 80%; right: 1.5%; padding: 20px; border-radius: 15px; box-shadow: 0 0 10px rgba(0, 0, 0, .5); z-index: 10000; background-color: white;');
  estimateDiv.setAttribute('style', divStyles);
  wordCountDiv.setAttribute('style', divStyles);
  estimateText.setAttribute('style', textStyles);
  wordCountText.setAttribute('style', textStyles);
  estimateHeading.setAttribute('style', 'all: unset;');
  wordCountHeading.setAttribute('style', 'all: unset; margin-top: 10px;');

  document.body.appendChild(containerDiv);
  containerDiv.appendChild(estimateDiv);
  containerDiv.appendChild(wordCountDiv)
  estimateDiv.appendChild(estimateHeading);
  estimateDiv.appendChild(estimateText);
  wordCountDiv.appendChild(wordCountHeading);
  wordCountDiv.appendChild(wordCountText);

  estimateHeading.innerHTML = 'Reading time';
  estimateText.innerHTML = `${estimatedReadTime} mins`;
  wordCountHeading.innerHTML = 'Word count';
  wordCountText.innerHTML = `${wordCount} words`;
};

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.data) {
      const values = getEstimateInfo();
      sendResponse({
        estimatedReadTime: values[0],
        wordCount: values[1]
      });
    }
  }
);

chrome.storage.sync.get(['onWebPage'], webPage => {
  if (webPage.onWebPage) {
    const values = getEstimateInfo();
    displayOnPage(values[0], values[1]);
  }
});

window.addEventListener("scroll", function() {
  const element = document.getElementById('container-div');
  let scrollAmt = window.pageYOffset || document.documentElement.scrollTop
  
	if (scrollAmt >= 1000) {
    element.setAttribute('style', 'position: fixed; top: 80%; right: 1.5%; padding: 20px; border-radius: 15px; box-shadow: 0 0 10px rgba(0, 0, 0, .5); z-index: 10000; background-color: white; opacity: 0; -webkit-transition: opacity .5s linear;');
  } else if (scrollAmt < 1000) {
    element.setAttribute('style', 'position: fixed; top: 80%; right: 1.5%; padding: 20px; border-radius: 15px; box-shadow: 0 0 10px rgba(0, 0, 0, .5); z-index: 10000; background-color: white; opacity: 1; transition: opacity .5s linear;');
  }
});
