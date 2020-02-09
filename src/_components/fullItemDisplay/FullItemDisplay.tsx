import React from 'react';
import { INewsItem } from '../../NewzApp';
import './fullItemDisplay.scss';

export interface IFullItemDisplayProps {
    newsItem?: INewsItem;
}

const FullItemDisplay = (props: IFullItemDisplayProps) => {
    return (
        <div className='FullItemDisplay'>
            { props.newsItem && 
                props.newsItem.title
            }
        </div>
    );
}

export default FullItemDisplay;