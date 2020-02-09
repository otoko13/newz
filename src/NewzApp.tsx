import React from 'react';
import './NewzApp.scss';
import NewsService, { newsBase } from './_components/newsService';

const NewzApp = () => {
  const [newsItems, setNewsItems] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    // newsBase.fetch('v0/newsstories', {
    //   context: {},
    //   then(data) {
    //     setNewsItems(data);
    //   }
    // });
    NewsService.subscribeToNewsUpdates(updateNewsItems);
  }, []);

  function updateNewsItems(newsItems: any[]) {
    setNewsItems(newsItems);
  }

  function getNewsListToRender() {
    return newsItems.map(item => item.id);
  }

  return (
    <div className="NewzApp">
        {getNewsListToRender()}
    </div>
  );
};

export default NewzApp;
