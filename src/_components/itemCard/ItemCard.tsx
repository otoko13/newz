import React from 'react';
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

const CARD_HEIGHT = 95;
const CARD_SPACING = 20;
export const CARD_BOX_HEIGHT = CARD_HEIGHT + CARD_SPACING;

const ItemCard = (props: IItemCardProps) => {
    return (
        <div 
            className={`ItemCard ${props.visited ? 'visited' : ''}`}
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
                            {props.newsItem.time}
                        </Stack.Item>
                        <Stack.Item className='author'>
                            {props.newsItem.by}
                        </Stack.Item>
                    </Stack>
                </Stack.Item>
            </Stack>
        </div>
    );
}

export default ItemCard;