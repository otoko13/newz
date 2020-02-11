import React from 'react';
import moment from 'moment';
import './fullItemDisplay.scss';	
import { INewsItem } from '../newsService';
import CommentsSection from './CommentsSection';

export interface IFullItemDisplayProps {	
    newsItem?: INewsItem;	
}	

function getFormattedDate(time: number) {
    return moment.utc(time).format('HH:mm, dddd MMMM Do YYYY');
}

const FullItemDisplay = (props: IFullItemDisplayProps) => {	
    return (
        <div className='FullItemDisplay'>	
            { 
                props.newsItem &&
                <>
                    <div className='title'>{props.newsItem.title}</div>	
                    <div className='by'>{props.newsItem.by}</div>	
                    <div className='date'>{getFormattedDate(props.newsItem.time * 1000)}</div>
                    {
                        props.newsItem.text && (
                            <>
                                <div className='content' dangerouslySetInnerHTML={{__html: props.newsItem.text}}></div>
                                <CommentsSection newsItem={props.newsItem} />
                            </>
                        )
                    }
                    
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