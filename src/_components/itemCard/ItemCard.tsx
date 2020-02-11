import React from 'react';
import moment from 'moment';
import './itemCard.scss';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { INewsItem, ENewsType } from '../newsService';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export interface IItemCardProps {
    newsItem: INewsItem;
    isLatest: boolean;
    onItemSelected: () => void;
    index: number;
    visited: boolean;
    selected?: boolean;
}

export const CARD_HEIGHT = 95;
export const CARD_SPACING = 20;
export const CARD_BOX_HEIGHT = CARD_HEIGHT + CARD_SPACING;

function getFormattedDate(time: number) {
    return moment.utc(time).format('HH:mm, dddd MMMM Do YYYY');
}

const ItemCard = (props: IItemCardProps) => {
    
    function getNewsTypeIconName() {
        switch (props.newsItem.type) {
            case ENewsType.Story:
                return 'Articles';
            case ENewsType.Job:
                return 'Commitments';
            case ENewsType.Poll:
                return 'PollResults';
        }
        return '';
    }

    return (
        <div
            className={`ItemCard ${props.visited && !props.selected ? 'visited' : ''} ${props.isLatest ? 'just-added' : ''} ${props.selected ? 'selected' : ''}`}
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
                    <Stack horizontal horizontalAlign='space-between' verticalAlign='start'>
                        <Stack.Item>
                            <div className='title'>{props.newsItem.title}</div>
                        </Stack.Item>
                        <Stack.Item className='icons'>
                            <Icon className='title title-icon' iconName={getNewsTypeIconName()} />
                            {
                                !!props.newsItem.url &&
                                <Icon className='title title-icon title-icon-external' iconName='NavigateExternalInline' />
                            }
                        </Stack.Item>
                        
                    </Stack>
                    
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
        </div>
    );
}

export default ItemCard;