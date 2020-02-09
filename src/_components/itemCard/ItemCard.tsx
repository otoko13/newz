import React from 'react';
import { DocumentCard } from 'office-ui-fabric-react/lib/DocumentCard';
import { INewsItem } from '../../NewzApp';
import './itemCard.scss';

export interface IItemCardProps {
    newsItem: INewsItem;
    isLatest: boolean;
    onItemSelected: () => void;
}

const ItemCard = (props: IItemCardProps) => {
    return (
        <div className='ItemCard' onClick={props.onItemSelected}>
            {props.newsItem.title}
        </div>
    );
}

export default ItemCard;