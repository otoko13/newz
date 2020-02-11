import React from 'react';
import './NewzApp.scss';
import NewsService from './_components/newsService';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import NewsItemsList from './_components/newsItemsList/NewsItemsList';
import NewsControls from './_components/newsControls/NewsControls';

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
}

const ITEMS_IN_BATCH = 20;

const NewzApp = () => {
  const [newsItems, setNewsItems] = React.useState<INewsItem[]>([]);
  const [justArrivedIds, setJustArrivedIds] = React.useState<number[]>([]);
  const [visitedItems, setVisitedItems] = React.useState<number[]>([]);
  
  React.useEffect(fetchLatestNews, []);

  function fetchLatestNews() {
    let newIds: number[];
    NewsService.getLatestNewsItemsIds().then((ids: number[]) => {
      const latestItems = ids.slice(0, ITEMS_IN_BATCH);
      const existingIds = newsItems.map(item => item.id);
      newIds = latestItems.filter(id => !existingIds.includes(id));
      return NewsService.getNewsStoriesByIds(newIds);
    }).then((latestNewsitems: INewsItem[]) => {
      const relevantLatestNews = latestNewsitems.filter(item => !!item && item.type && (item.type === 'story' || item.type === 'job')).sort((a, b) => a.time > b.time ? 1 : -1);
      setNewsItems(oldItems => [...relevantLatestNews, ...oldItems]);
      setJustArrivedIds(newIds);
    });
  }

  function handleNewsItemSelected(newsItem: INewsItem) {
    setVisitedItems([...visitedItems, newsItem.id]);
  }

  function fetchOlderNews() {

  }

  return (
    <Stack className="NewzApp" verticalAlign='start'>
      <Stack.Item shrink>
        <NewsControls onRefreshClick={fetchLatestNews} />
      </Stack.Item>
      <Stack.Item grow>
        <div className='ms-Grid list-container' dir='ltr'>
          <div className='ms-Grid-row'>
            <div className='ms-Grid-col ms-lg3 ms-hiddenMdDown'></div>
            <div className='ms-Grid-col ms-lg6 ms-md12'>
              <NewsItemsList 
                newsItems={newsItems}
                visitedItems={visitedItems}
                latestItemIds={justArrivedIds} 
                onNewsItemSelected={handleNewsItemSelected} 
                onLoadOlderNewsClicked={fetchOlderNews} />
            </div>
            <div className='ms-Grid-col ms-lg3 ms-hiddenMdDown'></div>
          </div>
        </div>
      </Stack.Item>
    </Stack>
  );
};

export default NewzApp;
