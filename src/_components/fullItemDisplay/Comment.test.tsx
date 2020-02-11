import { render } from '@testing-library/react';
import * as React from 'react';
import Comment, { ICommentProps } from './Comment';

let props: ICommentProps;

beforeEach(() => {
    props = {
        comment: {
            id: 1,
            descendants: 0,
            by: 'King Julian',
            kids: [],
            time: 1581442689,
            title: 'A comment',
            text: 'I believe',
            type: 'story',
        }
    }
});

it('should look sensible', () => {
    const { container } = render(<Comment {...props} />);
    expect(container.firstChild).toMatchSnapshot();
});