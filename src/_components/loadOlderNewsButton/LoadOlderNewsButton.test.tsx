import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import LoadOlderNewsButton, { ILoadOlderNewsButtonProps } from './LoadOlderNewsButton';

let props: ILoadOlderNewsButtonProps;

beforeEach(() => {
    props = {
        onLoadOlderNewsClicked: jest.fn(),
    }
});

describe('snapshot', () => {
    it('should look sensible', () => {
        const { container } = render(<LoadOlderNewsButton {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});

describe('clicking button', () => {
    it('should call props.onLoadOlderNewsClicked', () => {
        const { getByText } = render(<LoadOlderNewsButton {...props} />);
        expect(props.onLoadOlderNewsClicked).not.toHaveBeenCalled();
        fireEvent.click(getByText('Click to see older news'));
        expect(props.onLoadOlderNewsClicked).toHaveBeenCalled();
    });
});