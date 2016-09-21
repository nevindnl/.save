let save = true;

chrome.tabs.executeScript(null, {file: 'lib/jquery-3.1.0.js'}, () => {
	chrome.tabs.executeScript(null, {file: 'lib/save.js'});
});

chrome.browserAction.onClicked.addListener(() => {
	save = !save;

	const iconPath = save ? 'assets/active.png' : 'assets/inactive.png';
	chrome.browserAction.setIcon({path : iconPath});
});

chrome.runtime.onMessage.addListener(options => {
	if(save) chrome.downloads.download(options);
});
