import { act, render } from '@testing-library/react';
import * as React from 'react';
import CommentsSection, { ICommentsSectionProps } from './CommentsSection';
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

let props: ICommentsSectionProps;

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
        }
    }
});

describe('snapshot', () => {
    it('should look sensible', async () => {
        const { container } = render(<CommentsSection {...props} />);
        expect(container.firstChild).toMatchSnapshot();
        await act(async () => {
            await NewsService.getComments({} as INewsItem);
        });
    });
});

describe('loading', () => {
    it('should show a loading shimmer when comments are not yet loaded', async () => {
        const { queryByTitle } = render(<CommentsSection {...props} />);
        expect(queryByTitle('loading')).not.toBeNull();
        await act(async () => {
            await NewsService.getComments({} as INewsItem);
            expect(queryByTitle('loading')).toBeNull();
        });
    });
});

describe('no comments', () => {
    it('should not show a no comments message when there are comments', async () => {
        const { queryByText } = render(<CommentsSection {...props} />);
        await act(async () => {
            await NewsService.getComments({} as INewsItem);
            expect(queryByText('No Comments')).toBeNull();
        });
    });

    it('should show a no comments message when there are no comments and this is the first level of comments', async () => {
        NewsService.getComments = jest.fn().mockResolvedValue([]);
        const { queryByText } = render(<CommentsSection {...props} isFirstLevel={true} />);
        await act(async () => {
            await NewsService.getComments({} as INewsItem);
            expect(queryByText('No Comments')).not.toBeNull();
        });
    });

    it('should not show a no comments message when there are no comments and this is not the first level of comments', async () => {
        NewsService.getComments = jest.fn().mockResolvedValue([]);
        const { queryByText } = render(<CommentsSection {...props} isFirstLevel={false} />);
        await act(async () => {
            await NewsService.getComments({} as INewsItem);
            expect(queryByText('No Comments')).toBeNull();
        });
    });
});
