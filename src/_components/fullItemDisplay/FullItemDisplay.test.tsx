import { act, render } from '@testing-library/react';
import * as React from 'react';
import FullItemDisplay, { IFullItemDisplayProps } from './FullItemDisplay';
import NewsService, { INewsItem } from '../newsService';

jest.mock('../newsService', () => {
    const mockComments: INewsItem[] = [
        { id: 2, descendants: 0, by: 'Maurice', kids: [], time: 1581442689, title: 'Another comment', text: 'I believe', type: 'story' },
        { id: 3, descendants: 0, by: 'Phillip', kids: [], time: 1581442689, title: 'Yet another comment', text: 'I don\'t', type: 'story' },
        { id: 4, descendants: 0, by: 'Kevin', kids: [], time: 1581442689, title: 'One more comment', text: 'Well who the hell are you', type: 'story' },
    ]
    
    return {
        getComments: jest.fn().mockResolvedValue(mockComments),
    }
});

let props: IFullItemDisplayProps;

beforeEach(() => {
    props = {
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
        hasNext: true,
        hasPrevious: true,
        onNextClick: jest.fn(),
        onPreviousClick: jest.fn(),
    }
});

describe('snapshot', () => {
    it('should look sensible', async () => {
        const { container } = render(<FullItemDisplay {...props} />);
        expect(container.firstChild).toMatchSnapshot();
        await act(async () => {
            await NewsService.getComments({} as INewsItem);
        });
    });
});

describe('no news message', () => {
    it('should not show a please select something message when there is an item', async () => {
        const { queryByText } = render(<FullItemDisplay {...props} newsItem={undefined} />);
        expect(queryByText('Please click on a news item that isn\'t a link to view it here')).not.toBeNull();
        await act(async () => {
            await NewsService.getComments({} as INewsItem);
        });
    });

    it('should show the item instead if there is one', async () => {
        const { queryByText } = render(<FullItemDisplay {...props} />);
        expect(queryByText('Please click on a news item that isn\'t a link to view it here')).toBeNull();
        await act(async () => {
            await NewsService.getComments({} as INewsItem);
        });
    });
});
