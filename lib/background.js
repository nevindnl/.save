let save = false;
chrome.storage.sync.set({"saveMode": save});
chrome.storage.sync.set({"notes": []});
chrome.storage.sync.set({"rename": false});
chrome.storage.sync.set({"destination": ""});

chrome.browserAction.setBadgeBackgroundColor({color: '#003366'});

chrome.commands.onCommand.addListener(command => {
	if (command === "toggle_save_mode"){
		save = !save;
		chrome.storage.sync.set({"saveMode": save});

		const iconPath = save ? 'assets/active.png' : 'assets/inactive.png';
		chrome.browserAction.setIcon({path : iconPath});
	} else if (command === "add_note"){
		chrome.browserAction.setBadgeText({text: " "});
		chrome.tabs.executeScript(null, {file: 'lib/add_note.js'}, () => {
			setTimeout(() => chrome.browserAction.setBadgeText({text: ""}), 200);
		});
	} else if (command === "save_notes"){
		chrome.browserAction.setBadgeBackgroundColor({color: '#451513'});
		chrome.browserAction.setBadgeText({text: " "});
		chrome.tabs.executeScript(null, {file: 'lib/save_notes.js'}, () => {
			setTimeout(() => {
				chrome.browserAction.setBadgeText({text: ""});
				chrome.browserAction.setBadgeBackgroundColor({color: '#003366'});
			}, 200);
		});
	} else if (command === "view_notes"){
		chrome.tabs.create({url: '../notes.html'});
	}
});

chrome.runtime.onMessage.addListener(options => {
	chrome.storage.sync.get("rename", data => {
		if (data.rename){
			options.saveAs = true;
		}
	});
	chrome.storage.sync.get("destination", data => {
		if (data.destination.length !== 0){
			options.filename = data.destination + '/' + options.filename;
		}
	});
	chrome.downloads.download(options);
});
