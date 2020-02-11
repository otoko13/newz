# Welcome to Newz

## Author

Mayur Bapodra\
[eighthsamurai@hotmail.com](mailto:eighthsamurai@hotmail.com)

## Viewing the project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Install necessary packages by first running `npm install` from the project directory. Run the app using `npm run start` in the same directory. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Run tests using `npm run test`.

## Future improvements and enhancements

As always with coding exercises, you can't do everything you'd love to. Here are a list of improvements I'd make to the design and implementation given more time:

- I would have used more time to evaluate the data structure. As a first pass, I have assumed a single level of comments but it could easily be a tree. I've also not handled polls properly and need to investigate further (especially w.r.t. pollopt).

- Alternative styling framework to office-ui-fabric - while it has a massive set of features, components and shortcuts, it's not the best one out there for a nice looking app. Though it does create a familiar UX for Windows users, the main reason I used it was recent familiarity with the code. 

- A much nicer theme and much more work on the styles. 

- Add proper typing for all the different kinds of news items available through Hacker News.

- Renaming some of the components to make it clearer what they do. 

- The method of getting news items could be much improved - currently I get a batch of items and filter out unwanted types from it. This could potentially leave you with very few new items. A slightly slower method but one that returns more content would involve several passes of the available items until the full batch size is returned. I could also improve the method of retrieving comments - strangely, many "kid" items for stories are not of the comment type, but actually stories. I'm not sure if this is a bug in the API or a data issue.  

- More thorough Jest testing, especially of the news service and the main NewzApp component.

- Lots of consideration for a responsive layout - this doesn't work well at all on smaller screens.

- A better cache of read items, so it's kept in local storage and isn't lost after filtering.

- I spent many hours initially trying to get the Firebase real time updates working, but had to give up - I got no permissions errors when I tried to call the endpoints. It would have been nice to get this working - it's not ideal to have the news list auto-updating while users are browsing but it might be nice as an option for people who have the page up in the background (hence the idea behind the animation and highlighting of newly dropped in items).

- Other improvements:
    - Mark as unread button
    - Add some keyboard navigation (up, down)
    - Making sure all accessibility labels etc. are present
    - Checking for text overflow on all elements