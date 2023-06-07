function invoke(info, tab) {
  var url = tab.url;
  if (info) {
    url = info.linkUrl || info.srcUrl;
  }
  console.log("replay-with attempting to play URL: " + url);
  browser.tabs.sendMessage(tab.id, { url: url });
}

function createContextMenu() {
  browser.contextMenus.create({
    id: "replay-with",
    title: browser.i18n.getMessage("actionName"),
    contexts: ["link", "video"]
  });
}

function registerButtonClickEvent() {
  browser.browserAction.onClicked.addListener(tab => {
    invoke(null, tab);
  });
}

function registerContextMenuClickEvent() {
  browser.contextMenus.onClicked.addListener((info, tab) => {
    invoke(info, tab);
  });
}

createContextMenu();
registerButtonClickEvent();
registerContextMenuClickEvent();
