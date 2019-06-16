This repo is a sample WebExtension demonstrating a bug in Firefox's `chrome.notifications.onClicked` behavior. It generates a single notification on load, and registers a handler that clears the notification when it is clicked. It also clears the notification automatically after ten seconds.

## Sample Output

If the notification is clicked within ten seconds, it is never cleared (even after the ten seconds are up), and the following output is shown in the console:

```
Notification created: some-notification-id
All notifications after create: Object { "some-notification-id": {…} }
Notification clicked
All notifications on click: Object {  }
Clearing notification
Cleared? false
Timeout reached, clearing notification
All notifications after timeout: Object {  }
Cleared? false
```

If the notification is *not* clicked witin ten seconds, it is cleared automatically, and the following output is shown in the console:

```
Notification created: some-notification-id
All notifications after create: Object { "some-notification-id": {…} }
Timeout reached, clearing notification
All notifications after timeout: Object { "some-notification-id": {…} }
Notification closed
Cleared? true
All notifications after close: Object {  }
```

This demonstrates that if the notification is clicked, it is no longer returned by `chrome.notifications.getAll` and can no longer be cleared.
