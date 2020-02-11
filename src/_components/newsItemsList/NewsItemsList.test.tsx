import { render } from '@testing-library/react';
import * as React from 'react';
import NewsItemsList, { INewsItemsListProps } from './NewsItemsList';

let props: INewsItemsListProps;

beforeEach(() => {
    props = {
        latestItemIds: [],
        newsItems: [
            { id: 2, descendants: 0, by: 'Maurice', kids: [], time: 1581442689, title: 'Another comment', text: 'I believe', type: 'story' },
            { id: 3, descendants: 0, by: 'Phillip', kids: [], time: 1581442689, title: 'Yet another comment', text: 'I don\'t', type: 'story' },
            { id: 4, descendants: 0, by: 'Kevin', kids: [], time: 1581442689, title: 'One more comment', text: 'Well who the hell are you', type: 'story' },
        ],
        onLoadOlderNewsClicked: jest.fn(),
        onNewsItemSelected: jest.fn(),
        visitedItems: [],
    }
});

describe('snapshot', () => {
    it('should look sensible', () => {
        const { container } = render(<NewsItemsList {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});