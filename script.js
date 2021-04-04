const apiHost = 'https://content.guardianapis.com'; //Will be loaded from env variables

window.onload = function funLoad() {
  changeTab(event, 'uk-news');
};

async function changeTab(event, clickedTab) {
  const li_classes = 'list-item';

  // 1. Hide the active tab content
  let tabPanels = document.getElementsByClassName('tab-panel');
  for (i = 0; i < tabPanels.length; i++) {
    tabPanels[i].className = tabPanels[i].className.replace('panel-active', '');
  }

  // 2. Change tab style to default
  let tabHeadings = document.getElementsByClassName('tab');
  for (i = 0; i < tabHeadings.length; i++) {
    tabHeadings[i].className = tabHeadings[i].className.replace('tab-active', '');
  }

  // 3. Show the clicked tab
  document.getElementById(`tab-panel-${clickedTab}`).className = 'tab-panel panel-active';
  document.getElementById(`tab-head-${clickedTab}`).className += ' tab-active';

  // 4. Load data
  fetchFromAPI(`${apiHost}/${clickedTab}?api-key=test`).then((apiResponseData) => {
    let data = '';
    let idx = 1;
    apiResponseData.forEach((res) => {
      data += `<div class="${li_classes}"><span>  ${idx} </span> <a href=${res.webUrl}>${res.webTitle}</a></div>`;
      idx++;
    });
    document.getElementById(`tab-panel-${clickedTab}`).innerHTML = data;
  });
}

async function fetchFromAPI(url) {
  // Using Axios would allow one to easily set pre-request hooks to check and update auth tokens.
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(function (response) {
        if (response.status == 200) {
          resolve(response.data.response.results);
        } else {
          reject(response);
        }
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
}

// export { changeTab }
