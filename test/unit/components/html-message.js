import React from 'react';
import {generateIntlContext, makeMockContext, shallowDeep} from '../testUtils';
import FormattedHTMLMessage, {BaseFormattedHTMLMessage} from '../../../src/components/html-message';
import {BaseFormattedMessage} from '../../../src/components/message';

const mockContext = makeMockContext(
  require.resolve('../../../src/components/html-message')
);

describe('<FormattedHTMLMessage>', () => {
    let consoleError;
    let intl;

    beforeEach(() => {
        consoleError = jest.spyOn(console, 'error');
        intl = generateIntlContext({
          locale: 'en',
          defaultLocale: 'en-US'
        });
    });

    afterEach(() => {
        consoleError.mockReset();
    });

    test('has a `displayName`', () => {
        expect(typeof FormattedHTMLMessage.displayName).toBe('string');
    });

    test('extends FormattedMessage', () => {
        expect(BaseFormattedHTMLMessage.prototype).toBeInstanceOf(BaseFormattedMessage);
    });

    test('renders a formatted HTML message in a <span>', () => {
        const FormattedHTMLMessage = mockContext(intl);
        const descriptor = {
            id: 'hello',
            defaultMessage: 'Hello, <b>World</b>!',
        };

        const rendered = shallowDeep(
          <FormattedHTMLMessage {...descriptor} />,
          2
        );

        expect(rendered.type()).toBe('span');
        expect(
          rendered.prop('dangerouslySetInnerHTML')
        ).toEqual({
          __html: intl.formatHTMLMessage(descriptor)
        });
    });

    test('accepts `values` prop', () => {
        const FormattedHTMLMessage = mockContext(intl);
        const descriptor = {
            id: 'hello',
            defaultMessage: 'Hello, <b>{name}</b>!',
        };
        const values = {name: 'Eric'};

        const rendered = shallowDeep(
          <FormattedHTMLMessage {...descriptor} values={values} />,
          2
        );

        expect(rendered.prop('dangerouslySetInnerHTML').__html)
          .toBe(intl.formatHTMLMessage(descriptor, values));
    });

    test('should HTML-escape `values`', () => {
        const FormattedHTMLMessage = mockContext(intl);
        const descriptor = {
            id: 'hello',
            defaultMessage: 'Hello, <b>{name}</b>!',
        };
        const values = {name: '<i>Eric</i>'};

        const rendered = shallowDeep(
          <FormattedHTMLMessage {...descriptor} values={values} />,
          2
        );

        expect(rendered.prop('dangerouslySetInnerHTML').__html).toBe(
            'Hello, <b>&lt;i&gt;Eric&lt;/i&gt;</b>!'
        );
    });

    test('accepts `tagName` prop', () => {
        const FormattedHTMLMessage = mockContext(intl);
        const descriptor = {
            id: 'hello',
            defaultMessage: 'Hello, <b>World</b>!',
        };
        const tagName = 'p';

        const rendered = shallowDeep(
          <FormattedHTMLMessage {...descriptor} tagName={tagName} />,
          2
        );

        expect(rendered.type()).toEqual(tagName);
    });

    test('supports function-as-child pattern', () => {
        const FormattedHTMLMessage = mockContext(intl);
        const descriptor = {
            id: 'hello',
            defaultMessage: 'Hello, <b>World</b>!',
        };

        const spy = jest.fn().mockImplementation(() => <p>Jest</p>);
        const rendered = shallowDeep(
            <FormattedHTMLMessage {...descriptor}>
                { spy }
            </FormattedHTMLMessage>,
            2
        );

        expect(spy.mock.calls.length).toBe(1);
        expect(spy.mock.calls[0]).toEqual([
          intl.formatHTMLMessage(descriptor)
        ]);

        expect(rendered.type()).toBe('p');
        expect(rendered.text()).toBe('Jest');
    });

    test('does not support rich-text message formatting', () => {
        const FormattedHTMLMessage = mockContext(intl);
        const rendered = shallowDeep(
          <FormattedHTMLMessage
            id="hello"
            defaultMessage="Hello, <b>{name}</b>!"
            values={{
                name: <i>Eric</i>,
            }}
          />,
          2
        );

        expect(rendered.prop('dangerouslySetInnerHTML').__html).toBe('Hello, <b>[object Object]</b>!');
    });
});
