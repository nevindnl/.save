chrome.storage.onChanged.addListener(changes => {
	const saveChange = changes["saveMode"];
	if (saveChange){
		if(saveChange.newValue){
			$('a').on('click', e => e.preventDefault());
		} else {
			$('a').off();
		}
	}
});

document.addEventListener('click', e => {
	chrome.storage.sync.get("saveMode", data => {
		if (data.saveMode){
			const target = e.target;
			const a = $(target).closest('a')[0];

			if ($(target).is('img')){
				chrome.runtime.sendMessage({url: target.src});
			} else if (a){
				chrome.runtime.sendMessage({url: a.href})
			}
		}
	});
});
