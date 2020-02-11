import React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import './newsControls.scss';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';

export interface INewsControlsProps {
    onRefreshClick: () => void;
}

const NewsControls = (props: INewsControlsProps) => {
    return (
        <Stack horizontal verticalAlign='center' horizontalAlign='space-between' className='NewsControls'>
            <Stack.Item>
                <div>
                    <ActionButton aria-label='refresh' onClick={props.onRefreshClick} iconProps={{iconName: 'Refresh'}} />
                </div>
            </Stack.Item>
        </Stack>
    );
}

export default NewsControls;