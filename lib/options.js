chrome.storage.sync.get("rename", data => {
	if (data.rename){
		document.getElementsByTagName('input')[0].checked = true;
	}
});

chrome.storage.sync.get("destination", data => {
	document.getElementsByTagName('input')[1].value = data.destination;
});

document.getElementsByTagName('button')[0].addEventListener('click', () => {
	chrome.tabs.create({'url': "../notes.html" });
});

document.getElementsByTagName('input')[0].addEventListener('click', () => {
	chrome.storage.sync.get("rename", data => {
		chrome.storage.sync.set({"rename": !data.rename});
	});
});

document.getElementsByTagName('input')[1].addEventListener('change', e => {
	chrome.storage.sync.set({"destination": e.target.value});
});
