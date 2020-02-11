import React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import './newsControls.scss';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import NewstypeFilter from './NewsTypeFilter';

export interface INewsControlsProps {
    onRefreshClick: () => void;
    filters: string[];
    onFiltersChanged: (types: string[]) => void;
}

const NewsControls = (props: INewsControlsProps) => {
    return (
        <Stack horizontal verticalAlign='center' horizontalAlign='space-between' className='NewsControls'>
            <Stack.Item>
                <NewstypeFilter onFiltersChanged={props.onFiltersChanged} filters={props.filters} />
            </Stack.Item>
            <Stack.Item>
                <div>
                    <ActionButton className='refresh-button' aria-label='refresh' onClick={props.onRefreshClick} iconProps={{iconName: 'Refresh'}} />
                </div>
            </Stack.Item>
        </Stack>
    );
}

export default NewsControls;