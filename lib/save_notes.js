chrome.storage.sync.get("notes", data => {
	if (data.notes.length !== 0){
		const notes = data.notes.join(`\n\n`);
		const blob = new Blob([notes], {type:"text/plain"});
		const url = window.URL.createObjectURL(blob);

		chrome.runtime.sendMessage({url, filename: 'notes.txt'});
		chrome.storage.sync.set({"notes": []});
	}
});
