button.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  chrome.scripting.executeScript({
    target: {
      tabId: tab.id
    },
    function: setLocationToResource,
  });
});

function setLocationToResource() {

  //get selected text from DOM
  let uri = "";
  if (window.getSelection) {
    uri = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    uri = document.selection.createRange().text;
  }

  let currentURL = window.location.href
  let domain = window.location.host

  //deal with special case for EA
  if (currentURL.includes("linked-data") == true) {
    domain = domain + "/linked-data"
  }

  //build UTL for new page from current domain and 
  url = window.location.protocol + "//" + domain + "/resource?uri=" + uri
  window.open(url, '_blank').focus();
}