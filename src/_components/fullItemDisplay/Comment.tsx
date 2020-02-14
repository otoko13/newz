import React from 'react';
import moment from 'moment';
import './comment.scss';	
import { INewsItem } from '../newsService';
import CommentsSection from './CommentsSection';

export interface ICommentProps {	
    comment: INewsItem;	
}	

function getFormattedDate(time: number) {
    return moment.utc(time).format('HH:mm, dddd MMMM Do YYYY');
}

const Comment = (props: ICommentProps) => 
    <div className='Comment'>
        <div className='by'>{props.comment.by}</div>
        <div className='date'>{getFormattedDate(props.comment.time * 1000)}</div>
        <div className='comment-content' dangerouslySetInnerHTML={{__html: props.comment.text || ''}} />
        {(props.comment.kids && props.comment.kids.length > 0) &&
            <CommentsSection newsItem={props.comment} />
        }
    </div>;

export default Comment; 