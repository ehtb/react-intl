import React from 'react';
import {mount} from 'enzyme';
import {generateIntlContext, makeMockContext, shallowDeep} from '../testUtils';
import FormattedMessage from '../../../src/components/message';

const mockContext = makeMockContext(
  require.resolve('../../../src/components/message')
);

describe('<FormattedMessage>', () => {
    let consoleError;
    let intl;

    beforeEach(() => {
        intl = generateIntlContext({
          locale: 'en',
          defaultLocale: 'en'
        });

        consoleError = jest.spyOn(console, 'error');
    });

    afterEach(() => {
        consoleError.mockReset();
    });

    test('has a `displayName`', () => {
        expect(typeof FormattedMessage.displayName).toBe('string');
    });

    test(
      'throws when <IntlProvider> is missing from ancestry and there is no defaultMessage',
      () => {
          const FormattedMessage = mockContext(null);
          expect(() => shallowDeep(<FormattedMessage />, 2)).toThrow(
              '[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry.'
          );
      }
    );

    test(
      'should work if <IntlProvider> is missing from ancestry but there is defaultMessage',
      () => {
          const FormattedMessage = mockContext(null);

          const rendered = shallowDeep(
            <FormattedMessage
              id="hello"
              defaultMessage="Hello"
            />,
            2
          );

          expect(rendered.type()).toBe('span');
          expect(rendered.text()).toBe('Hello');

          expect(consoleError.mock.calls.length).toBe(1);
      }
    );

    test('renders a formatted message in a <span>', () => {
        const FormattedMessage = mockContext(intl);
        const descriptor = {
            id: 'hello',
            defaultMessage: 'Hello, World!',
        };

        const rendered = shallowDeep(
          <FormattedMessage {...descriptor} />,
          2
        );
        expect(rendered.type()).toBe('span');
        expect(rendered.text()).toBe(intl.formatMessage(descriptor))
    });

    test('should not cause a unique "key" prop warning', () => {
        const FormattedMessage = mockContext(intl);
        const descriptor = {
            id: 'hello',
            defaultMessage: 'Hello, {name}!',
        };

        shallowDeep(
          <FormattedMessage
            {...descriptor}
            values={{name: <b>Jest</b>}}
          />,
          2
        );

        expect(consoleError.mock.calls.length).toBe(0);
    });

    test('should not cause a prop warning when description is a string', () => {
        const FormattedMessage = mockContext(intl);
        const descriptor = {
            id: 'hello',
            description: 'Greeting',
            defaultMessage: 'Hello, {name}!',
        };

        shallowDeep(
          <FormattedMessage
            {...descriptor}
            values={{name: <b>Jest</b>}}
          />
        );

        expect(consoleError.mock.calls.length).toBe(0);
    });

    test('should not cause a prop warning when description is an object', () => {
        const FormattedMessage = mockContext(intl);
        const descriptor = {
            id: 'hello',
            description: {
                text: 'Greeting',
                ticket: 'GTP-1234',
            },
            defaultMessage: 'Hello, {name}!',
        };

        shallowDeep(
          <FormattedMessage
            {...descriptor}
            values={{name: <b>Jest</b>}}
          />
        );

        expect(consoleError.mock.calls.length).toBe(0);
    });

    test('accepts `values` prop', () => {
        const FormattedMessage = mockContext(intl);
        const descriptor = {
            id: 'hello',
            defaultMessage: 'Hello, {name}!',
        };
        const values = {name: 'Jest'};

        const rendered = shallowDeep(
          <FormattedMessage {...descriptor} values={values} />,
          2
        );

        expect(rendered.type()).toBe('span');
        expect(rendered.text()).toBe(
          intl.formatMessage(descriptor, values)
        );
    });

    test('accepts string as `tagName` prop', () => {
        const FormattedMessage = mockContext(intl);
        const descriptor = {
            id: 'hello',
            defaultMessage: 'Hello, World!',
        };
        const tagName = 'p';

        const rendered = shallowDeep(
          <FormattedMessage
            {...descriptor}
            tagName={tagName}
          />,
          2
        );

        expect(rendered.type()).toBe(tagName);
    });

    test('accepts an react element as `tagName` prop', () => {
        const FormattedMessage = mockContext(intl);
        const descriptor = {
            id: 'hello',
            defaultMessage: 'Hello, World!',
        };

        const H1 = ({ children }) => <h1>{children}</h1>
        const rendered = shallowDeep(
          <FormattedMessage
            {...descriptor}
            tagName={H1}
          />,
          2
        );

        expect(rendered.type()).toBe(H1);
        expect(rendered.dive().text()).toBe(
          intl.formatMessage(descriptor)
        );
    });

    test('supports function-as-child pattern', () => {
        const FormattedMessage = mockContext(intl);
        const descriptor = {
            id: 'hello',
            defaultMessage: 'Hello, World!',
        };

        const spy = jest.fn().mockImplementation(() => <p>Jest</p>);

        const rendered = shallowDeep(
            <FormattedMessage {...descriptor}>
                { spy }
            </FormattedMessage>,
            2
        );

        expect(spy.mock.calls.length).toBe(1);
        expect(spy.mock.calls[0]).toEqual([
          intl.formatMessage(descriptor)
        ]);

        expect(rendered.type()).toBe('p');
        expect(rendered.text()).toBe('Jest');
    });

    test('supports rich-text message formatting', () => {
        const FormattedMessage = mockContext(intl);
        const rendered = shallowDeep(
          <FormattedMessage
              id="hello"
              defaultMessage="Hello, {name}!"
              values={{
                  name: <b>Jest</b>,
              }}
          />,
          2
        );

        const nameNode = rendered.childAt(1);
        expect(nameNode.type()).toBe('b');
        expect(nameNode.text()).toBe('Jest');
    });

    test(
      'supports rich-text message formatting in function-as-child pattern',
      () => {
          const FormattedMessage = mockContext(intl);
          const rendered = shallowDeep(
            <FormattedMessage
                id="hello"
                defaultMessage="Hello, {name}!"
                values={{
                    name: <b>Jest</b>,
                }}
            >
                {(...formattedMessage) => (
                    <strong>{formattedMessage}</strong>
                )}

            </FormattedMessage>,
            2
          );

          const nameNode = rendered.childAt(1);
          expect(nameNode.type()).toBe('b');
          expect(nameNode.text()).toBe('Jest');
      }
    );

    test('should not re-render when props and context are the same', () => {
        const FormattedMessage = mockContext(intl);
        const props = {
          id: 'hello',
          defaultMessage: 'Hello, World!'
        };

        const spy = jest.fn().mockImplementation(() => null);
        const rendered = mount(
          <FormattedMessage {...props}>
            { spy }
          </FormattedMessage>
        );
        rendered.instance().mockContext(intl);
        rendered.setProps(props);

        expect(spy.mock.calls.length).toBe(1);
    });

    test('should re-render when props change', () => {
        const FormattedMessage = mockContext(intl);
        const props = {
          id: 'hello',
          defaultMessage: 'Hello, World!'
        };

        const spy = jest.fn().mockImplementation(() => null);
        const rendered = mount(
          <FormattedMessage {...props}>
            { spy }
          </FormattedMessage>
        );
        rendered.setProps({
          ...props,
          defaultMessage: 'Hello, Galaxy!'
        });

        expect(spy.mock.calls.length).toBe(2);
    });

    test('should re-render when context changes', () => {
        const changedIntl = generateIntlContext({
          locale: 'en-US',
          defaultLocale: 'en-US'
        });

        const FormattedMessage = mockContext(intl);
        const props = {
          id: 'hello',
          defaultMessage: 'Hello, World!'
        };

        const spy = jest.fn().mockImplementation(() => null);
        const withIntlContext = mount(
          <FormattedMessage {...props}>
            { spy }
          </FormattedMessage>
        );
        withIntlContext.instance().mockContext(changedIntl);

        expect(spy.mock.calls.length).toBe(2);
    });

    test('should re-render when `values` are different', () => {
        const FormattedMessage = mockContext(intl);
        const descriptor = {
            id: 'hello',
            defaultMessage: 'Hello, {name}!',
        };
        const values = {
          name: 'Jest'
        };

        const spy = jest.fn().mockImplementation(() => null);
        const withIntlContext = mount(
          <FormattedMessage
            {...descriptor}
            values={values}
          >
            { spy }
          </FormattedMessage>
        );

        withIntlContext.setProps({
          ...descriptor,
          values: {
            ...values // create new object instance with same values to test shallow equality check
          }
        });
        expect(spy.mock.calls.length).toBe(1); // expect only 1 render as the value object instance changed but not its values

        withIntlContext.setProps({
          ...descriptor,
          values: {
            name: 'Enzyme'
          }
        });
        expect(spy.mock.calls.length).toBe(2); // expect a rerender after having changed the name
    });
});
