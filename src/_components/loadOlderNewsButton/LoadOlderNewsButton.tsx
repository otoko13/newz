import React from 'react';
import './loadOlderNewsButton.scss';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { CARD_BOX_HEIGHT } from '../itemCard/ItemCard';

export interface ILoadOlderNewsButtonProps {
    numberOfItemsLoaded: number;
    onLoadOlderNewsClicked: () => void;
}

const LoadOlderNewsButton = (props: ILoadOlderNewsButtonProps) => {
    return (
        <div className='LoadOlderNewsButton' style={{top: `${CARD_BOX_HEIGHT * props.numberOfItemsLoaded}px` }}>
            <ActionButton onClick={props.onLoadOlderNewsClicked} text='Click to see older news' />'
        </div>
    );
}

export default LoadOlderNewsButton;