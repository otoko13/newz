import React from 'react';
import moment from 'moment';
import { INewsItem } from '../../NewzApp';
import './itemCard.scss';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

export interface IItemCardProps {
    newsItem: INewsItem;
    isLatest: boolean;
    onItemSelected: () => void;
    index: number;
    visited: boolean;
}

export const CARD_HEIGHT = 95;
export const CARD_SPACING = 20;
export const CARD_BOX_HEIGHT = CARD_HEIGHT + CARD_SPACING;

function getFormattedDate(time: number) {
    return moment.utc(time).format('HH:mm, dddd MMMM Do YYYY');
}

const ItemCard = (props: IItemCardProps) => {
    return (
        <a 
            href={props.newsItem.url}
            target="_blank" 
            rel="noopener noreferrer"
            className={`ItemCard ${props.visited ? 'visited' : ''} ${props.isLatest ? 'just-added' : ''}`}
            onClick={props.onItemSelected} 
            style={
                { 
                    top: `${props.index * CARD_BOX_HEIGHT}px`,
                    marginBottom: `${CARD_SPACING}px`,
                    height: `${CARD_HEIGHT}px`
                }
            }>
            <Stack verticalFill verticalAlign='space-between'>
                <Stack.Item>
                    <div className='title'>{props.newsItem.title}</div>
                </Stack.Item>
                <Stack.Item>
                    <Stack horizontal horizontalAlign='space-between' className='details'>
                        <Stack.Item className='date'>
                            {getFormattedDate(props.newsItem.time * 1000)}
                        </Stack.Item>
                        <Stack.Item className='author'>
                            {props.newsItem.by}
                        </Stack.Item>
                    </Stack>
                </Stack.Item>
            </Stack>
        </a>
    );
}

export default ItemCard;