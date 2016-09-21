document.addEventListener('click', e => {
	const target = e.target;
	const a = $(target).closest('a')[0];
	console.log(target);

	if ($(target).is('img')){
		chrome.runtime.sendMessage({url: target.src});
	} else if (a){
		chrome.runtime.sendMessage({url: a.href})
	}
});





// let hasFolder = false;
// let folderId = "-1";
// let newUrl = "";
// let tabsCount = 0;
// let newTabId = '-1';
//
// // Getting the URL from the storge
// chrome.storage.sync.get('url', items => {
//   newUrl = items.url;
//   // console.log(newUrl);
//   chrome.bookmarks.getChildren('1', bookmarks => {
//     bookmarks.forEach(bookmark => {
//       if (bookmark.title === 'NowYou(Dont)SeeMe Bookmarks') {
//         hasFolder = true;
//         folderId = bookmark.id;
//       }
//     });
//
//     if (hasFolder) {
//       chrome.bookmarks.getChildren(folderId, bookmarks => {
//         bookmarks.forEach(bookmark => {
//
//           // Open up the bookmarks
//           chrome.tabs.create({url: bookmark.url});
//         });
//       });
//       chrome.bookmarks.removeTree(folderId);
//       chrome.storage.sync.get('newTabId', items => {
//         chrome.tabs.remove(items.newTabId);
//       });
//       newTabId = '';
//       tabsCount = 0;
//       chrome.browserAction.setIcon({path : 'assets/inactive.png'});
//       chrome.browserAction.setBadgeText({text:''});
//     } else {
//       // if no folder yet, create the folder and
//       chrome.bookmarks.create({'parentId': '1',
//       'title': 'NowYou(Dont)SeeMe Bookmarks'},
//       (newFolder) => {
//         // console.log("added folder: " + newFolder.title);
//         chrome.tabs.query({}, tabs => {
//
//           // Bookmark all the tabs and close them.
//           tabs.forEach(tab => {
//             tabsCount += 1;
//             chrome.bookmarks.create({'parentId': newFolder.id,
//             'title': tab.title,
//             'url': tab.url},
//             (newBookMark) => {
//               // console.log("added bookmark: " + newBookMark.title);
//             });
//             chrome.tabs.remove(tab.id);
//           });
//           chrome.browserAction.setBadgeText({text:''+tabsCount+''});
//         });
//         // Create a new blank tab.
//         chrome.tabs.create({'url': newUrl}, tab => {
//           chrome.storage.sync.set({
//             newTabId: tab.id
//           });
//         });
//       });
//       chrome.browserAction.setIcon({path : 'assets/active.png'});
//     }
//   });
// });
