chrome.storage.sync.get("saveMode", data => {
	if (data.saveMode){
		$('*').on('click', e => e.preventDefault());
		$(document).on('DOMNodeInserted', e => {
			$(e.target).on('click',  e2 => e2.preventDefault());
		});
	}
});

chrome.storage.onChanged.addListener(changes => {
	const saveChange = changes["saveMode"];
	if (saveChange){
		if(saveChange.newValue){
			$('*').on('click', e => e.preventDefault());
			$(document).on('DOMNodeInserted', e => {
				$(e.target).on('click',  e2 => e2.preventDefault());
			});
		} else {
			$('*').off();
			$(document).off();
		}
	}
});

document.addEventListener('click', e => {
	chrome.storage.sync.get("saveMode", data => {
		if (data.saveMode){
			const target = e.target;

			if ($(target).is('img')){
				chrome.runtime.sendMessage({url: target.src});
			} else {
				const tree = $.makeArray($(target).parents());
				tree.unshift(target);

				let parentImageUrl;
				tree.some(node => {
					const background = $(node).css('background-image');
					if (background !== 'none'){
						parentImageUrl = background.slice(5, -2);
						return true;
					} else {
						return false;
					}
				});

				if (parentImageUrl){
					chrome.runtime.sendMessage({url: parentImageUrl});
				} else {
					const a = $(target).closest('a')[0];

					if (a){
						chrome.runtime.sendMessage({url: a.href});
					}
				}
			}
		}
	});
});
