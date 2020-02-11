import React from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Shimmer,ShimmerElementType } from 'office-ui-fabric-react/lib/Shimmer';
import './loadShimmer.scss';
import { CARD_HEIGHT, CARD_SPACING } from '../itemCard/ItemCard';

const LoadShimmer = () =>
    <div className='LoadShimmer' style={{height: `${CARD_HEIGHT}px`, marginBottom: `${CARD_SPACING}px`}}>
        <Fabric>
            <Shimmer className='top' width={'100%'} shimmerElements={[{ type: ShimmerElementType.line, height: 30, width: '80%' }]} />
            <Shimmer width={'30%'} shimmerElements={[
                { type: ShimmerElementType.line, height: 17 },
            ]} />
        </Fabric>
    </div>

export default LoadShimmer;