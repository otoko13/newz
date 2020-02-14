// import * as rebase from 're-base'
// import * as firebase from 'firebase/app';
// import 'firebase/database';

// with lots of help and alternative library ideas from https://codeburst.io/on-connecting-my-app-to-the-hackernews-firebase-api-e7b9e1ccec29
// Avoiding reactFire due to use of mixins and issues with ES6, and using re-base

// const HACKERNEWS_DATABASE_URL = 'http://hacker-news.firebaseio.com';

// const firebaseApp = firebase.initializeApp({ 
//     databaseURL: HACKERNEWS_DATABASE_URL,
// });

// const db =  firebase.database(firebaseApp);
// export const newsBase = rebase.createClass(db);

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
    Job = 'job',
    Poll = 'poll',
}

export enum EStoriesType {
    Top = 'top',
    New = 'new',
    Best = 'best',
}

interface ICacheStatus {
    cached: INewsItem[];
    uncached: number[];
}

const ALLOWED_TYPES = [ENewsType.Poll.toString(), ENewsType.Job.toString(), ENewsType.Story.toString()];
export const ITEMS_TO_FETCH_IN_BATCH = 50;

// function getNewsStoriesByIdsFirebase(items: number[]) {
//     let getItemPromises = items.map(itemId => newsBase.fetch(`v0/item/${itemId}`, { context: {} }));
//     return Promise.all(getItemPromises).then(values => values);
// }

function getItemUrl(itemId: number) {
    return `https://hacker-news.firebaseio.com/v0/item/${itemId}.json`;
}

function getLatestNewsItemsIds(storyType: string) {
    return fetch(`https://hacker-news.firebaseio.com/v0/${storyType}stories.json`).then(response => response.json());
}

function getStoriesByIds(items: number[]): Promise<INewsItem[]> {
    let getItemPromises = items.map(itemId => fetch(getItemUrl(itemId)).then((response: any) => response.json() ));
    return Promise.all(getItemPromises).then(values => values);
}

function getFilteredSortedRelevantStories(rawNewsItems: INewsItem[]) {
    return rawNewsItems.filter(item => !!item && ALLOWED_TYPES.includes(item.type)).sort((a, b) => a.time < b.time ? 1 : -1);
}

const itemsStore: INewsItem[] = [];

function getNewsSortedByCacheStatus(ids: number[]): ICacheStatus {
    const alreadyCachedItemIds = itemsStore.map(comment => comment.id);
    const uncachedItems = ids.filter(itemId => !alreadyCachedItemIds.includes(itemId));
    const cachedItems = itemsStore.filter(item => ids.includes(item.id));
    return {
        cached: cachedItems,
        uncached: uncachedItems,
    }
}

const NewsService = {
    // subscribeToNewsUpdates: (callback: (newsItems: any[]) => void) => newsBase.listenTo('v0/newsstories', {
    //     context: {},
    //     asArray: true,
    //     then(data: number[]) {
    //         getNewsStoriesByIdsFirebase(data).then((newsItemsArray: any[]) => {
    //             callback(newsItemsArray)
    //         });
    //     }
    // }),
    getLatestNewsItemsIds,
    getStoriesByIds,
    getLatestNewsItems: (currentNewsItems: INewsItem[], storyType: string) => {
        let cachedNews: INewsItem[];
        return getLatestNewsItemsIds(storyType).then((ids: number[]) => {
            const latestItems = ids.slice(0, ITEMS_TO_FETCH_IN_BATCH);
            const existingIds = currentNewsItems.map(item => item.id);
            const newIds = latestItems.filter(id => !existingIds.includes(id));
            const cacheStatus = getNewsSortedByCacheStatus(newIds);
            cachedNews = cacheStatus.cached;
            return getStoriesByIds(cacheStatus.uncached)
        }).then((latestNewsItems: INewsItem[]) => {
            itemsStore.push(...latestNewsItems);
            return getFilteredSortedRelevantStories([...latestNewsItems, ...cachedNews]);
        });
    },
    getOlderNewsItems: (currentNewsItems: INewsItem[], storyType: string) => {
        const oldestItemId = Math.min(...currentNewsItems.map(item => item.id));
        let cachedNews: INewsItem[];
        return getLatestNewsItemsIds(storyType).then((ids: number[]) => {
            const indexOfOldestItem = ids.sort().reverse().indexOf(oldestItemId);
            const indexToSearchFrom = indexOfOldestItem === -1 ? 0 : indexOfOldestItem + 1;
            const idsToGet = ids.slice(indexToSearchFrom, indexToSearchFrom + ITEMS_TO_FETCH_IN_BATCH);

            const cacheStatus = getNewsSortedByCacheStatus(idsToGet);
            cachedNews = cacheStatus.cached;
            return getStoriesByIds(cacheStatus.uncached);
        }).then((newsitems: INewsItem[]) => {
            itemsStore.push(...newsitems);
            return getFilteredSortedRelevantStories([...newsitems, ...cachedNews]);
        });
    },
    getComments: (newsItem: INewsItem) => {
        if (!newsItem.kids) {
            return Promise.resolve([]);
        }
        const cacheStatus = getNewsSortedByCacheStatus(newsItem.kids); 
        
        return getStoriesByIds(cacheStatus.uncached).then(comments => {
            itemsStore.push(...comments);
            return [...comments, ...cacheStatus.cached].sort((a, b) => a.time < b.time ? 1 : -1)
        });
    },
};

export default NewsService;