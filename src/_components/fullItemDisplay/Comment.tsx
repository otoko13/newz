import React from 'react';
import moment from 'moment';
import './comment.scss';	
import { INewsItem } from '../newsService';

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
        <div className='content' dangerouslySetInnerHTML={{__html: props.comment.text || ''}} />
    </div>;

export default Comment; 