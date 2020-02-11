import React from 'react';
import './NewzApp.scss';
import NewsService, { INewsItem, ENewsType, EStoriesType } from './_components/newsService';
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
  const [filters, setFilters] = React.useState<string[]>([ENewsType.Story.toString(), ENewsType.Job.toString()]);
  const [storiesType, setStoriesType] = React.useState<string>(EStoriesType.New.toString());

  React.useEffect(fetchLatestNews, []);

  function fetchLatestNews(totalRefresh?: boolean) {
    setIsLoadingLatest(true);
    const currentNewsItems = totalRefresh ? [] : newsItems
    NewsService.getLatestNewsItems(currentNewsItems, storiesType).then((latestNewsitems: INewsItem[]) => {
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
    setSelectedNewsitem(newsItem);
    setVisitedItems([...visitedItems, newsItem.id]);
  }

  function fetchOlderNews() {
    setIsLoadingOlder(true);
    NewsService.getOlderNewsItems(newsItems, storiesType).then((olderNewsitems: INewsItem[]) => {
      setIsLoadingOlder(false);
      setNewsItems(existingItems => [...existingItems, ...olderNewsitems]);
    });
  }

  function handleFiltersChanged(newFilters: string[]) {
    setFilters(newFilters);
  }

  function handleStoryTypeChanged(newFilter: string) {
    clearData();
    setStoriesType(newFilter);
    fetchLatestNews(true);
  }

  function filteredNewsItems() {
    return newsItems.filter(item => filters.includes(item.type));
  }

  function handlNextClicked() {
    if (selectedNewsItem) {
      const indexOfSelected = newsItems.indexOf(selectedNewsItem);
      const newSelected = newsItems[indexOfSelected + 1];
      setSelectedNewsitem(newSelected);
      setVisitedItems([...visitedItems, newSelected.id]);
    }
  }

  function handlPreviousClicked() {
    if (selectedNewsItem) {
      const indexOfSelected = newsItems.indexOf(selectedNewsItem);
      const newSelected = newsItems[indexOfSelected - 1];
      setSelectedNewsitem(newSelected);
      setVisitedItems([...visitedItems, newSelected.id]);
    }
  }

  function clearData() {
    setNewsItems([]);
    setHasFetchedOnce(false);
    setVisitedItems([]);
  }

  return (
    <Stack className="NewzApp" verticalAlign='start' horizontal tokens={{childrenGap: 20}}>
      <Stack.Item className='left-panel' styles={{root: {width: '40%', height: '100%'}}}>
        <Stack verticalFill>
          <Stack.Item shrink>
            <NewsControls 
              onRefreshClick={fetchLatestNews}
              storiesType={storiesType}
              onStoryTypeChange={handleStoryTypeChanged} 
              onFiltersChanged={handleFiltersChanged} 
              filters={filters} />
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
      <Stack.Item verticalFill className='right-panel full-display-container' styles={{root: {width: '60%'}}}>
        <FullItemDisplay 
          newsItem={selectedNewsItem}
          onNextClick={handlNextClicked}
          onPreviousClick={handlPreviousClicked}
          hasNext={!!selectedNewsItem && newsItems.indexOf(selectedNewsItem) < newsItems.length - 1}
          hasPrevious={!!selectedNewsItem && newsItems.indexOf(selectedNewsItem) > 0} />
      </Stack.Item>
    </Stack>
  );
};

export default NewzApp;
