import React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { INewsItem } from '../../NewzApp';
import './newsItemsList.scss';
import ItemCard from '../itemCard/ItemCard';

export interface INewsItemsListProps {
    newsItems: INewsItem[];
    latestItemIds: number[];
    onNewsItemSelected: (newsItem: INewsItem) => void;
}

const NewsItemsList = (props: INewsItemsListProps) => {
    return (
        <Stack verticalAlign='start' className='NewsItemsList'>
            {
                props.newsItems.map(item => 
                    <ItemCard 
                        key={item.id} 
                        newsItem={item}
                        onItemSelected={() => props.onNewsItemSelected(item)}
                        isLatest={props.latestItemIds.includes(item.id)} />
                )
            }
        </Stack>
    );
}

export default NewsItemsList;