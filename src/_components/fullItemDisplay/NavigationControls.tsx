import React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import './navigationControls.scss';

export interface INavigationControlProps {	
    onNextClick: () => void;
    onPreviousClick: () => void;
    hasNext: boolean;
    hasPrevious: boolean;	
}	

const NavigationControls = (props: INavigationControlProps) => {	
    return (
        <Stack horizontal horizontalAlign='space-between' className='NavigationControls'>
            <Stack.Item>
                {props.hasPrevious &&
                    <IconButton className='navigation-button' iconProps={{iconName: 'ChevronLeft'}} onClick={props.onPreviousClick} />
                }
            </Stack.Item>	
            <Stack.Item>
                {props.hasNext &&
                    <IconButton  className='navigation-button' iconProps={{iconName: 'ChevronRight'}} onClick={props.onNextClick} />
                }               
            </Stack.Item>
        </Stack>	
    );	
}	

export default NavigationControls; 