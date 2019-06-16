chrome.notifications.onClicked.addListener(notificationId => {
	console.log('Notification clicked');
	chrome.notifications.getAll(notifications => {
		console.log('All notifications on click:', notifications);
		console.log('Clearing notification');
		chrome.notifications.clear(notificationId, success => {
			console.log('Cleared?', success);
		});
	});
});

chrome.notifications.onClosed.addListener(notificationId => {
	console.log('Notification closed');
	chrome.notifications.getAll(notifications => {
		console.log('All notifications after close:', notifications);
	});
});

chrome.notifications.create('some-notification-id', {
	type: 'basic',
	title: 'Sample notification',
	message: 'Click me if you want',
}, notificationId => {
	console.log('Notification created:', notificationId);
	chrome.notifications.getAll(notifications => {
		console.log('All notifications after create:', notifications);
		setTimeout(() => {
			console.log('Timeout reached, clearing notification');
			chrome.notifications.getAll(notificationsAgain => {
				console.log('All notifications after timeout:', notificationsAgain);
				chrome.notifications.clear(notificationId, success => {
					console.log('Cleared?', success);
				});
			})
		}, 10000);
	});
});
