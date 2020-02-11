import React from 'react';
import './loadOlderNewsButton.scss';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';

export interface ILoadOlderNewsButtonProps {
    onLoadOlderNewsClicked: () => void;
}

const LoadOlderNewsButton = (props: ILoadOlderNewsButtonProps) => {
    return (
        <div className='LoadOlderNewsButton'>
            <ActionButton onClick={props.onLoadOlderNewsClicked} text='Click to see older news' />'
        </div>
    );
}

export default LoadOlderNewsButton;