import * as rebase from 're-base'
import * as firebase from 'firebase/app';
import 'firebase/database';

// with lots of help and alternative library ideas from https://codeburst.io/on-connecting-my-app-to-the-hackernews-firebase-api-e7b9e1ccec29
// Avoiding reactFire due to use of mixins and issues with ES6, and using re-base

const HACKERNEWS_DATABASE_URL = 'http://hacker-news.firebaseio.com';

const firebaseApp = firebase.initializeApp({ 
    databaseURL: HACKERNEWS_DATABASE_URL,
});

const db =  firebase.database(firebaseApp);
export const newsBase = rebase.createClass(db);

const getNewsStories = (items: number[]) => {
    let getItemPromises = items.map(itemId => newsBase.fetch(`v0/item/${itemId}`, { context: {} }));
    return Promise.all(getItemPromises).then(values => values);
}

const NewsService = {
    subscribeToNewsUpdates: (callback: (newsItems: any[]) => void) => newsBase.listenTo('v0/newsstories', {
        context: {},
        asArray: true,
        then(data: number[]) {
            getNewsStories(data).then((newsItemsArray: any[]) => {
                callback(newsItemsArray)
            });
        }
    }),
    getNewsStories,
};

export default NewsService;