import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import StoryTypeFilter, { IStoryTypeFilterProps } from './StoryTypeFilter';
import NewsTypeFilter, { INewsTypeFilterProps } from './NewsTypeFilter';

let props: INewsTypeFilterProps;

beforeEach(() => {
    props = {
        filters: ['story'],
        onFiltersChanged: jest.fn(),
    }
});

describe('snapshot', () => {
    it('should look sensible', () => {
        const { container } = render(<NewsTypeFilter {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});

describe('changing filters', () => {
    it('should call props.onFiltersChanged with the correct new filters', () => {
        const { getAllByRole, getAllByTitle } = render(<NewsTypeFilter {...props} />);
        fireEvent.click(getAllByRole('button')[0]);
        fireEvent.click(getAllByTitle('Stories')[1]);
        fireEvent.click(getAllByTitle('Polls')[1]);
        fireEvent.click(getAllByTitle('Jobs')[1]);
        expect(props.onFiltersChanged).toHaveBeenCalledWith(['story', 'job']);
    });
});