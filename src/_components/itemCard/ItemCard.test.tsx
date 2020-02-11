import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import ItemCard, { IItemCardProps } from './ItemCard';

let props: IItemCardProps;

beforeEach(() => {
    props = {
        index: 3,
        isLatest: false,
        onItemSelected: jest.fn(),
        newsItem: {
            id: 1,
            descendants: 0,
            by: 'King Julian',
            kids: [2, 3, 4],
            time: 1581442689,
            title: 'A comment',
            text: 'I believe',
            type: 'story',
        },
        visited: false,
        selected: false,
    }
});

describe('snapshot', () => {
    it('should look sensible', () => {
        const { container } = render(<ItemCard {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});

describe('selecting item', () => {
    it('should call props.onItemSelected', () => {
        const { container } = render(<ItemCard {...props} />);
        expect(props.onItemSelected).not.toHaveBeenCalled();
        fireEvent.click(container.children[0]);
        expect(props.onItemSelected).toHaveBeenCalled();
    });
});