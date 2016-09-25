chrome.storage.sync.get("notes", data => {
	const notes = data.notes.join(`<br/><br/>`);
	document.getElementById('notes').innerHTML = notes;
});
