import { render } from '@testing-library/react';
import * as React from 'react';
import LoadShimmer from './LoadShimmer';

describe('snapshot', () => {
    it('should look sensible', () => {
        const { container } = render(<LoadShimmer />);
        expect(container.firstChild).toMatchSnapshot();
    });
});