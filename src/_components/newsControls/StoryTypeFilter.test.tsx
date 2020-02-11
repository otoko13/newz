import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import StoryTypeFilter, { IStoryTypeFilterProps } from './StoryTypeFilter';

let props: IStoryTypeFilterProps;

beforeEach(() => {
    props = {
        filter: 'new',
        onFilterChanged: jest.fn(),
    }
});

describe('snapshot', () => {
    it('should look sensible', () => {
        const { container } = render(<StoryTypeFilter {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});

describe('changing filter', () => {
    it('should call props.onFilterChanged with the correct new filter', () => {
        const { getByRole, getByTitle } = render(<StoryTypeFilter {...props} />);
        fireEvent.click(getByRole('listbox'));
        fireEvent.click(getByTitle('Best stories'));
        expect(props.onFilterChanged).toHaveBeenCalledWith('best');
    });
});