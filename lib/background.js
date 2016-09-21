let save = false;
chrome.storage.sync.set({"saveMode": save});

chrome.browserAction.onClicked.addListener(() => {
	save = !save;
	chrome.storage.sync.set({"saveMode": save});

	const iconPath = save ? 'assets/active.png' : 'assets/inactive.png';
	chrome.browserAction.setIcon({path : iconPath});
});

chrome.runtime.onMessage.addListener(options => {
	chrome.downloads.download(options);
});
