import React from 'react';
import './NewzApp.scss';
import NewsService, { INewsItem, ENewsType } from './_components/newsService';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import NewsItemsList from './_components/newsItemsList/NewsItemsList';
import NewsControls from './_components/newsControls/NewsControls';
import LoadOlderNewsButton from './_components/loadOlderNewsButton/LoadOlderNewsButton';
import LoadShimmerCollection from './_components/loadShimmer/LoadShimmerCollection';
import FullItemDisplay from './_components/fullItemDisplay/FullItemDisplay';

const NewzApp = () => {
  const [hasFetchedOnce, setHasFetchedOnce] = React.useState<boolean>(false);
  const [newsItems, setNewsItems] = React.useState<INewsItem[]>([]);
  const [justArrivedIds, setJustArrivedIds] = React.useState<number[]>([]);
  const [visitedItems, setVisitedItems] = React.useState<number[]>([]);
  const [isLoadingLatest, setIsLoadingLatest] = React.useState<boolean>(false);
  const [isLoadingOlder, setIsLoadingOlder] = React.useState<boolean>(false);
  const [selectedNewsItem, setSelectedNewsitem] = React.useState<INewsItem | undefined>();
  const [filters, setFilters] = React.useState<string[]>([ENewsType.Story, ENewsType.Job]);

  React.useEffect(fetchLatestNews, []);

  function fetchLatestNews() {
    setIsLoadingLatest(true);
    NewsService.getLatestNewsItems(newsItems).then((latestNewsitems: INewsItem[]) => {
      setIsLoadingLatest(false);
      setNewsItems(oldItems => [...latestNewsitems, ...oldItems]);
      if (hasFetchedOnce) {
        const newIds = latestNewsitems.map(item => item.id);
        setJustArrivedIds(newIds);
      }
      setHasFetchedOnce(true);
    });
  }

  function handleNewsItemSelected(newsItem: INewsItem) {
    if (!newsItem.url) {
      setSelectedNewsitem(newsItem);
    } else {
      setSelectedNewsitem(undefined);
    }
    setVisitedItems([...visitedItems, newsItem.id]);
  }

  function fetchOlderNews() {
    setIsLoadingOlder(true);
    NewsService.getOlderNewsItems(newsItems).then((olderNewsitems: INewsItem[]) => {
      setIsLoadingOlder(false);
      setNewsItems(existingItems => [...existingItems, ...olderNewsitems]);
    });
  }

  function handleFiltersChanged(newFilters: string[]) {
    setFilters(newFilters);
  }

  function filteredNewsItems() {
    return newsItems.filter(item => filters.includes(item.type));
  }

  return (
    <Stack className="NewzApp" verticalAlign='start' horizontal tokens={{childrenGap: 20}}>
      <Stack.Item className='left-panel' styles={{root: {width: '35%', height: '100%'}}}>
        <Stack verticalFill>
          <Stack.Item shrink>
            <NewsControls onRefreshClick={fetchLatestNews} onFiltersChanged={handleFiltersChanged} filters={filters} />
          </Stack.Item>
          <Stack.Item grow className='list-container'>
            {
              isLoadingLatest && <LoadShimmerCollection />
            }
            <NewsItemsList 
              newsItems={filteredNewsItems()}
              selectedItem={selectedNewsItem}
              visitedItems={visitedItems}
              latestItemIds={justArrivedIds} 
              onNewsItemSelected={handleNewsItemSelected} 
              onLoadOlderNewsClicked={fetchOlderNews} />
            {
              isLoadingOlder && <LoadShimmerCollection />
            }
            <LoadOlderNewsButton onLoadOlderNewsClicked={fetchOlderNews} />
          </Stack.Item>
        </Stack>
      </Stack.Item>
      <Stack.Item verticalFill className='right-panel full-display-container' styles={{root: {width: '65%'}}}>
        <FullItemDisplay newsItem={selectedNewsItem} />
      </Stack.Item>
    </Stack>
  );
};

export default NewzApp;
