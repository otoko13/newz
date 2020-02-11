import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import NewsControls, { INewsControlsProps } from './NewsControls';

let props: INewsControlsProps;

beforeEach(() => {
    props = {
        onRefreshClick: jest.fn(),
        onStoryTypeChange: jest.fn(),
        storiesType: 'new',
        filters: ['story'],
        onFiltersChanged: jest.fn(),
    }
});

describe('snapshot', () => {
    it('should look sensible', () => {
        const { container } = render(<NewsControls {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});

describe('changing filters', () => {
    it('should call props.onFiltersChanged with the correct new news type filters', () => {
        const { getAllByRole, getAllByTitle } = render(<NewsControls {...props} />);
        const storyFilter = getAllByRole('button')[0];
        fireEvent.click(storyFilter);
        fireEvent.click(getAllByTitle('Stories')[1]);
        fireEvent.click(getAllByTitle('Polls')[1]);
        fireEvent.click(getAllByTitle('Jobs')[1]);
        expect(props.onFiltersChanged).toHaveBeenCalledWith(['story', 'job']);
    });

    it('should call props.onStoryTypeChange with the correct new stories type', () => {
        const { getByRole, getByTitle } = render(<NewsControls {...props} />);
        fireEvent.click(getByRole('listbox'));
        fireEvent.click(getByTitle('Best stories'));
        expect(props.onStoryTypeChange).toHaveBeenCalledWith('best');
    });
});

describe('refreshing', () => {
    it('should call props.onRefreshClick when clicked', () => {
        const { getByLabelText } = render(<NewsControls {...props} />);
        expect(props.onRefreshClick).not.toHaveBeenCalled();
        fireEvent.click(getByLabelText('refresh'));
        expect(props.onRefreshClick).toHaveBeenCalled();
    });
});