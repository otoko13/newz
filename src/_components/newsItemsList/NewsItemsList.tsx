import React from 'react';
import { INewsItem } from '../../NewzApp';
import './newsItemsList.scss';
import ItemCard from '../itemCard/ItemCard';
import LoadOlderNewsButton from '../loadOlderNewsButton/LoadOlderNewsButton';

export interface INewsItemsListProps {
    newsItems: INewsItem[];
    visitedItems: number[];
    latestItemIds: number[];
    onNewsItemSelected: (newsItem: INewsItem) => void;
    onLoadOlderNewsClicked: () => void;
}

const NewsItemsList = (props: INewsItemsListProps) => {
    return (
        <>
            <div className='NewsItemsList'>
                {
                    props.newsItems.map((item, index) => 
                        <ItemCard 
                            key={item.id}
                            visited={props.visitedItems.includes(item.id)}
                            index={index}
                            newsItem={item}
                            onItemSelected={() => props.onNewsItemSelected(item)}
                            isLatest={props.latestItemIds.includes(item.id)} />
                    )
                }
                <LoadOlderNewsButton onLoadOlderNewsClicked={props.onLoadOlderNewsClicked} numberOfItemsLoaded={props.newsItems.length} />
            </div>
            
        </>
    );
}

export default NewsItemsList;