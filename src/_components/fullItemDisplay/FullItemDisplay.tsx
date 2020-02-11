import React from 'react';	
import './fullItemDisplay.scss';	
import { INewsItem } from '../newsService';

export interface IFullItemDisplayProps {	
    newsItem?: INewsItem;	
}	

const FullItemDisplay = (props: IFullItemDisplayProps) => {	
    return (
        <div className='FullItemDisplay'>	
            { 
                props.newsItem && 	
                props.newsItem.title	
            }
            { 
                !props.newsItem && 	
                <div className='no-items-message'>Please click on a news item that isn't a link to view it here</div>	
            }	
        </div>	
    );	
}	

export default FullItemDisplay; 