
# weLynk

weLynk is a social platform for finding and posting local events. Whether you're looking for a professional conference or a casual meetup, weLynk makes it easy to connect with like-minded individuals and plan fun activities.

## Current Features
* **Registration and Login**: Users can create a new account and login. Any errors in the registration or login process are displayed to the user.



https://github.com/grantlj1300/weLynk/assets/65977700/088fed7f-77f5-4928-b8d0-1f0dfe38334a



* **Account Editing**: Users can personalize their account by changing their name, email, or bio. You can also upload and crop a profile picture. Finally, users can set a "default" map viewport so that the map will always open on the region they choose.



https://github.com/grantlj1300/weLynk/assets/65977700/ce5921c6-6289-4b06-bcaa-7be29aa4e537


* **User Search and Friend Requests**: Users can search for other users by username. The search results are fuzzy autocompleted meaning that you don't have to type the complete name (and you can even get a letter or two wrong) and it will display the most similar results to what you type. You can visit the user's page and send them a friend request. Requests and your friend list can be accessed via the activity center.



https://github.com/grantlj1300/weLynk/assets/65977700/0d1cf0ee-0462-4bca-a744-83794549d7ed



* **Map Navigation and Filtering**: Users can browse events on a beautiful map interface. You can drag around to different regions or use the search bar to search a specific region to view. Only the events within the current viewport will be rendered to improve efficiency. Users can either click an event on the map to see a more detailed view or use the scrollbar popup to see all events at once. They may also filter events by category, keywords, or type (public, private, or all).



https://github.com/grantlj1300/weLynk/assets/65977700/800a91bb-9886-4605-9328-b1dac48808da




* **Event Creation**: Users can create and post their own events and specify event details (title, date, time, location, description, privacy settings, category, and photo).



https://github.com/grantlj1300/weLynk/assets/65977700/7b163466-020a-4ff4-9e63-fc905346b8ba



* **Event Management**: After creating an event, the creator can edit any of its details or can delete the event entirely.



https://github.com/grantlj1300/weLynk/assets/65977700/251b5aa7-e543-42b3-bc0b-1ac8e8b393a0



* **Group chat**: Each event has a dedicated group chat where attendees can communicate and coordinate logistics.
## Technologies Used
weLynk is built using [Next.js](https://nextjs.org) with the data being stored in [MongoDB](https://www.mongodb.com). The website uses [Google Maps API](https://developers.google.com/maps/documentation) for event location logic and [OpenLayers](https://openlayers.org) for the map interface. [Pusher](https://pusher.com) is used for websocket connections to provide real-time data for the groupchats.
## Getting Started
To use weLynk, you will need to create an account. Once you're signed in, you can browse events, create and post events, and connect with other users.
## Current Status
weLynk is currently still under development. More features will be continuously rolled out and existing features will be improved.
