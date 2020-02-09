import React from 'react';
import './NewzApp.scss';
import NewsService, { newsBase } from './_components/newsService';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import NewsItemsList from './_components/newsItemsList/NewsItemsList';
import FullItemDisplay from './_components/fullItemDisplay/FullItemDisplay';

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

const NewzApp = () => {
  const [newsItems, setNewsItems] = React.useState<INewsItem[]>([]);
  const [selectedNewsItem, setSelectedNewsitem] = React.useState<INewsItem>();
  const [justArrivedIds, setJustArrivedIds] = React.useState<number[]>([]);
  
  React.useEffect(() => {
    // NewsService.subscribeToNewsUpdates(updateNewsItems);
    // const newsRefresher = setInterval(fetchLatestIds, 15000);
    fetchLatestIds();

    return (() => {
      //clearInterval(newsRefresher);
    });
  }, []);

  function fetchLatestIds() {
    let newIds: number[];
    NewsService.getLatestNewsItemsIds().then((ids: number[]) => {
      const latest50 = ids.slice(0, 100);
      const existingIds = newsItems.map(item => item.id);
      newIds = latest50.filter(id => !existingIds.includes(id));
      return NewsService.getNewsStoriesByIds(newIds);
    }).then((latestNewsitems: INewsItem[]) => {
      const relevantLatestNews = latestNewsitems.filter(item => item.type && (item.type === 'story' || item.type === 'job'));
      setNewsItems(oldItems => [...oldItems, ...relevantLatestNews]);
      setJustArrivedIds(newIds);
    });
  }

  // function updateNewsItems(newsItems: any[]) {
  //   setNewsItems(newsItems);
  // }

  function handleNewsItemSelected(newsItem: INewsItem) {
    setSelectedNewsitem(newsItem);
  }

  return (
    <div className="NewzApp">
        <Stack horizontal verticalFill={true} verticalAlign='start' tokens={{childrenGap: 20}}>
          <Stack.Item shrink verticalFill className='list-container' styles={{root: {width: '35%'}}}>
            <NewsItemsList newsItems={newsItems} latestItemIds={justArrivedIds} onNewsItemSelected={handleNewsItemSelected} />  
          </Stack.Item>
          <Stack.Item verticalFill className='full-display-container' styles={{root: {width: '65%'}}}>
            <FullItemDisplay newsItem={selectedNewsItem} />  
          </Stack.Item>
        </Stack>
    </div>
  );
};

export default NewzApp;
