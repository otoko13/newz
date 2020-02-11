import { render } from '@testing-library/react';
import * as React from 'react';
import LoadShimmerCollection from './LoadShimmerCollection';

describe('snapshot', () => {
    it('should look sensible', () => {
        const { container } = render(<LoadShimmerCollection />);
        expect(container.firstChild).toMatchSnapshot();
    });
});