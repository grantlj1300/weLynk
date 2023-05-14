
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


* **Joining and Leaving an Event**: Users can find events on the map and join them to gain access to the exclusive event page which houses a group chat for all members. If you decide you don't want to attend, you can leave the event.



https://github.com/grantlj1300/weLynk/assets/65977700/d8d1211c-80da-4596-9f30-c99574f4bb85



* **Group chat**: Each event has a dedicated group chat where attendees can communicate and coordinate logistics. The messages arrive and send in real-time as can be seen between the two accounts below.



https://github.com/grantlj1300/weLynk/assets/65977700/8d24cbf3-830f-44bc-bbbf-5cdacaefd228



* **Sending Invitations and the Activity Center**: If you're a member of an event, you can send invitations to your friends. The request will show in their activity center.



https://github.com/grantlj1300/weLynk/assets/65977700/3b0a7172-5f8b-4b79-8a8b-fe9d0aabf72a



## Technologies Used
weLynk is built using [Next.js](https://nextjs.org) with the data being stored in [MongoDB](https://www.mongodb.com). The website uses [Google Maps API](https://developers.google.com/maps/documentation) for event location logic and [OpenLayers](https://openlayers.org) for the map interface. [Pusher](https://pusher.com) is used for websocket connections to provide real-time data for the groupchats.
## Getting Started
To use weLynk, you will need to create an account. Once you're signed in, you can browse events, create and post events, and connect with other users.
## Current Status
weLynk is currently operational. Over time, I'd like to continue to contribute to the project and make improvements.
## A Retrospective
After roughly 6 months of working on weLynk, I can easily say this has been one of my most valuable experiences to date. I was able to bring an idea I've had for a while to life. I have learned many skills and developed features I intend to use in future projects. Firstly, this was the first time I worked with Next.js and Vercel. Having built projects in React in the past, I can say that using Next certainly simplifies things as it abstracts routing and backend API calls. This makes it easier as a "one man team" since there's less for me to worry about and organize.
I also grew more confident in my usage of MongoDB. I became more comfortable with using search indexes to find users and events that match certain keywords. I also learned how to use sessions for the first time which is crucial for handling updates to multiple documents in the database who must remain consistent with each other.
This was also the first time I worked with websockets. In this project, I used the Pusher API to handle the websocket connections for handling the instant messaging system in events. This will certainly be useful in the future since sending data in real-time is common across sites and apps (messaging, notifications, posts, etc...).
I also had to learn how to manage multiple services and APIs. In this case, I was juggling several Google mapping services, the OpenLayers map interface, and a MapBox vector style. This required me to become familiar with the usage of each service by reading documentation and experimenting.
Another skill I developed was designing a visually appealing UI. I believe there are still some areas to improve on the site, but for the most part I believe I did well (especially on the map). I learned how to best manipulate elements via CSS and tried implementing animations throughout the site to give it a more legitimate feel. I also created nearly every element from scratch. Although I could have relied on existing libraries, I wanted to make all the elements myself so I could hone my skills and have complete customization ability.
Overall, this project is the product of failure after failure. There were so many instances where I was at a total loss of what to do or how to overcome a certain issue, but I managed to figure each one out and kept pushing forward. 
