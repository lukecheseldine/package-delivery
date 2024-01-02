# email handler

REST API endpoint to receive incoming email addresses.

https://www.cloudmailin.com/

Auto-forward emails to cloudmailin, then cloudmailin sends POST to this API.
This API parses the email and sends off to ChatGPT. If ChatGPT determines it's a package delivery email, then this application sends a message to Amazon SQS, and the notification handler API handles distributing the notification to relevant subscribers.
