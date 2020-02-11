import React from 'react';
import moment from 'moment';
import './fullItemDisplay.scss';	
import { INewsItem } from '../newsService';
import CommentsSection from './CommentsSection';
import NavigationControls from './NavigationControls';

export interface IFullItemDisplayProps {	
    newsItem?: INewsItem;
    onNextClick: () => void;
    onPreviousClick: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
}	

function getFormattedDate(time: number) {
    return moment.utc(time).format('HH:mm, dddd MMMM Do YYYY');
}

const FullItemDisplay = (props: IFullItemDisplayProps) => {	
    return (
        <div className='FullItemDisplay'>
            <NavigationControls hasNext={props.hasNext} hasPrevious={props.hasPrevious} onNextClick={props.onNextClick} onPreviousClick={props.onPreviousClick} />
            { 
                props.newsItem &&
                <>
                    <div className='title'>{props.newsItem.title}</div>	
                    <div className='by'>{props.newsItem.by}</div>	
                    <div className='date'>{getFormattedDate(props.newsItem.time * 1000)}</div>
                    {
                        props.newsItem.text && <div className='content' dangerouslySetInnerHTML={{__html: props.newsItem.text}}></div>
                    }
                    {
                        props.newsItem.url && <a href={props.newsItem.url} className='article-link' target='_blank' rel='noopener noreferrer'>{props.newsItem.url}</a>
                    }
                    <CommentsSection newsItem={props.newsItem} />
                    
                </>
            }
            { 
                !props.newsItem && 	
                <div className='no-items-message'>Please click on a news item that isn't a link to view it here</div>	
            }	
        </div>	
    );	
}	

export default FullItemDisplay; 