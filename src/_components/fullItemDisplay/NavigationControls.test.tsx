import { act, render } from '@testing-library/react';
import * as React from 'react';
import NavigationControls, { INavigationControlsProps } from './NavigationControls';

let props: INavigationControlsProps;

beforeEach(() => {
    props = {
        hasNext: true,
        hasPrevious: true,
        onNextClick: jest.fn(),
        onPreviousClick: jest.fn(),
    }
});

describe('snapshot', () => {
    it('should look sensible', async () => {
        const { container } = render(<NavigationControls {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});

describe('showing buttons', () => {
    it('should not show a please select something message when there is an item', async () => {
    });

    it('should show the item instead if there is one', async () => {
    });
});
