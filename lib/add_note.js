chrome.storage.sync.get("notes", data => {
	const note = window.getSelection().toString();

	if (note){
		chrome.storage.sync.set({"notes": data.notes.concat(note)});
	}
});
