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
  let text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  currentURL = window.location.href
  domain = currentURL.split("/tools/sparql")[0]
  url = domain + "/resource?uri=" + text
  window.open(url, '_blank').focus();
}