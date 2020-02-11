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

export interface INewsItem {
    by: string;
    descendants: number;
    id: number;
    kids: number[];
    score?: number;
    time: number;
    title: string;
    type: string;
    url?: string;
    text?: string;
}

export enum ENewsType {
    Story = 'story',
    Job = 'Job',
}

const latestItemsEndpoint = 'https://hacker-news.firebaseio.com/v0/newstories.json';
export const ITEMS_TO_FETCH_IN_BATCH = 50;

function getNewsStoriesByIdsFirebase(items: number[]) {
    let getItemPromises = items.map(itemId => newsBase.fetch(`v0/item/${itemId}`, { context: {} }));
    return Promise.all(getItemPromises).then(values => values);
}

function getItemUrl(itemId: number) {
    return `https://hacker-news.firebaseio.com/v0/item/${itemId}.json`;
}

function getLatestNewsItemsIds() {
    return fetch(latestItemsEndpoint).then(response => response.json());
}

function getStoriesByIds(items: number[]) {
    let getItemPromises = items.map(itemId => fetch(getItemUrl(itemId)).then((response: any) => response.json() ));
    return Promise.all(getItemPromises).then(values => values);
}

function getFilteredSortedRelevantStories(rawNewsItems: INewsItem[]) {
    return rawNewsItems.filter(item => !!item && item.type && (item.type === ENewsType.Story || item.type === ENewsType.Job)).sort((a, b) => a.time < b.time ? 1 : -1);
}

const NewsService = {
    subscribeToNewsUpdates: (callback: (newsItems: any[]) => void) => newsBase.listenTo('v0/newsstories', {
        context: {},
        asArray: true,
        then(data: number[]) {
            getNewsStoriesByIdsFirebase(data).then((newsItemsArray: any[]) => {
                callback(newsItemsArray)
            });
        }
    }),
    getLatestNewsItemsIds,
    getStoriesByIds,
    getLatestNewsItems: (currentNewsItems: INewsItem[]) => {
        return getLatestNewsItemsIds().then((ids: number[]) => {
            const latestItems = ids.slice(0, ITEMS_TO_FETCH_IN_BATCH);
            const existingIds = currentNewsItems.map(item => item.id);
            const newIds = latestItems.filter(id => !existingIds.includes(id));
            return getStoriesByIds(newIds)
        }).then((latestNewsitems: INewsItem[]) => {
            return getFilteredSortedRelevantStories(latestNewsitems);
        });
    },
    getOlderNewsItems: (currentNewsItems: INewsItem[]) => {
        const oldestItemId = Math.min(...currentNewsItems.map(item => item.id));
        return getLatestNewsItemsIds().then((ids: number[]) => {
            const indexOfOldestItem = ids.sort().reverse().indexOf(oldestItemId);
            const indexToSearchFrom = indexOfOldestItem === -1 ? 0 : indexOfOldestItem + 1;
            const idsToGet = ids.slice(indexToSearchFrom, indexToSearchFrom + ITEMS_TO_FETCH_IN_BATCH);
            return getStoriesByIds(idsToGet);
        }).then((newsitems: INewsItem[]) => {
            return getFilteredSortedRelevantStories(newsitems);
        });
    },
};

export default NewsService;