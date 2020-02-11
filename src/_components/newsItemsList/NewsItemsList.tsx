import React from 'react';
import './newsItemsList.scss';
import ItemCard, { CARD_BOX_HEIGHT } from '../itemCard/ItemCard';
import { INewsItem } from '../newsService';

export interface INewsItemsListProps {
    newsItems: INewsItem[];
    visitedItems: number[];
    latestItemIds: number[];
    onNewsItemSelected: (newsItem: INewsItem) => void;
    onLoadOlderNewsClicked: () => void;
    selectedItem?: INewsItem;
}

const NewsItemsList = (props: INewsItemsListProps) => {
    return (
        <>
            <div className='NewsItemsList' style={{height: `${CARD_BOX_HEIGHT * props.newsItems.length}px`}}>
                {
                    props.newsItems.map((item, index) => 
                        <ItemCard 
                            key={item.id}
                            selected={props.selectedItem && item.id === props.selectedItem.id}
                            visited={props.visitedItems.includes(item.id)}
                            index={index}
                            newsItem={item}
                            onItemSelected={() => props.onNewsItemSelected(item)}
                            isLatest={props.latestItemIds.includes(item.id)} />
                    )
                }
            </div>
        </>
    );
}

export default NewsItemsList;