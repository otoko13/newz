import { fireEvent, render } from '@testing-library/react';
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
    it('should look sensible', () => {
        const { container } = render(<NavigationControls {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});

describe('showing buttons', () => {
    it('should show both the previous and next buttons if there are previous and next items', () => {
        const { queryByLabelText } = render(<NavigationControls {...props} />);
        expect(queryByLabelText('Previous item')).not.toBeNull();
        expect(queryByLabelText('Next item')).not.toBeNull();
    });

    it('should not show a previous button if there is no previous', () => {
        const { queryByLabelText } = render(<NavigationControls {...props} hasPrevious={false} />);
        expect(queryByLabelText('Previous item')).toBeNull();
    });

    it('should not show a previous button if there is no previous', () => {
        const { queryByLabelText } = render(<NavigationControls {...props} hasNext={false} />);
        expect(queryByLabelText('Next item')).toBeNull();
    });
});

describe('button handlers', () => {
    it('should call props.onNextClick when clicking next', () => {
        const { getByLabelText } = render(<NavigationControls {...props} />);
        expect(props.onNextClick).not.toHaveBeenCalled();
        fireEvent.click(getByLabelText('Next item'));
        expect(props.onNextClick).toHaveBeenCalled();
    });

    it('should call props.onPreviousClick when clicking previous', () => {
        const { getByLabelText } = render(<NavigationControls {...props} />);
        expect(props.onPreviousClick).not.toHaveBeenCalled();
        fireEvent.click(getByLabelText('Previous item'));
        expect(props.onPreviousClick).toHaveBeenCalled();
    });
});
