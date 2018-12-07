import React from 'react';
import {mount} from 'enzyme';
import {generateIntlContext, makeMockContext, shallowDeep} from '../testUtils';
import FormattedPlural from '../../../src/components/plural';

const mockContext = makeMockContext(
  require.resolve('../../../src/components/plural')
);

describe('<FormattedPlural>', () => {
    let consoleWarn;
    let intl;

    beforeEach(() => {
        consoleWarn = jest.spyOn(console, 'warn');
        intl = generateIntlContext({
          locale: 'en'
        });
    });

    afterEach(() => {
        consoleWarn.mockReset();
    });

    test('has a `displayName`', () => {
        expect(typeof FormattedPlural.displayName).toBe('string');
    });

    test('throws when <IntlProvider> is missing from ancestry', () => {
        const FormattedPlural = mockContext();
        expect(() => shallowDeep(<FormattedPlural />, 2)).toThrow(
            '[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry.'
        );
    });

    test('renders an empty <span> when no `other` prop is provided', () => {
        const FormattedPlural = mockContext(intl);

        const rendered = shallowDeep(
          <FormattedPlural />,
          2
        );
        expect(rendered.type()).toBe('span');
        expect(rendered.text()).toBe('');

        const renderedWithValue = shallowDeep(
          <FormattedPlural value={1} />,
          2
        );
        expect(renderedWithValue.type()).toBe('span');
        expect(renderedWithValue.text()).toBe('');
    });

    test('renders `other` in a <span> when no `value` prop is provided', () => {
        const FormattedPlural = mockContext(intl);
        const other = 'Jest';

        const rendered = shallowDeep(
          <FormattedPlural other={other} />,
          2
        );
        expect(rendered.type()).toBe('span');
        expect(rendered.text()).toBe(other);
    });

    test('renders a formatted plural in a <span>', () => {
        const FormattedPlural = mockContext(intl);
        const num = 1;
        const one = 'foo';
        const other = 'bar';

        const rendered = shallowDeep(
          <FormattedPlural value={num} one={one} other={other} />,
          2
        );
        expect(rendered.type()).toBe('span');
        expect(rendered.text()).toBe(
          num === 1
            ? one
            : other
        );
    });

    test('should not re-render when props and context are the same', () => {
        const FormattedPlural = mockContext(intl);

        const spy = jest.fn().mockImplementation(() => null);
        const withInlContext = mount(
          <FormattedPlural value={1} one='foo' other='bar'>
            { spy }
          </FormattedPlural>
        );

        withInlContext.setProps({
          ...withInlContext.props()
        });
        withInlContext.instance().mockContext(intl);

        expect(spy.mock.calls.length).toBe(1);
    });

    test('should re-render when props change', () => {
        const FormattedPlural = mockContext(intl);

        const spy = jest.fn().mockImplementation(() => null);
        const withInlContext = mount(
          <FormattedPlural value={0} one='foo' other='bar'>
            { spy }
          </FormattedPlural>
        );

        withInlContext.setProps({
          ...withInlContext.props(),
          value: withInlContext.prop('value') + 1
        });

        expect(spy.mock.calls.length).toBe(2);
    });

    test('should re-render when context changes', () => {
        const FormattedPlural = mockContext(intl);

        const spy = jest.fn().mockImplementation(() => null);
        const withInlContext = mount(
          <FormattedPlural value={0} one='foo' other='bar'>
            { spy }
          </FormattedPlural>
        );

        const otherIntl = generateIntlContext({
          locale: 'en-US'
        });
        withInlContext.instance().mockContext(otherIntl);

        expect(spy.mock.calls.length).toBe(2);
    });

    test('accepts valid IntlPluralFormat options as props', () => {
        const FormattedPlural = mockContext(intl);
        const num = 22;
        const props = {two: 'nd'};
        const options = {style: 'ordinal'};

        const rendered = shallowDeep(
          <FormattedPlural value={num} {...props} {...options} />,
          2
        );

        expect(rendered.type()).toBe('span');
        expect(rendered.text()).toBe(
          props[intl.formatPlural(num, options)]
        );
    });

    test('supports function-as-child pattern', () => {
        const FormattedPlural = mockContext(intl);
        const props = {one: 'foo'};
        const num = 1;

        const spy = jest.fn().mockImplementation(() => <b>Jest</b>);
        const rendered = shallowDeep(
          <FormattedPlural {...props} value={num}>
            { spy }
          </FormattedPlural>,
          2
        );

        expect(spy.mock.calls.length).toBe(1);
        expect(spy.mock.calls[0]).toEqual([
          props[intl.formatPlural(num)]
        ]);

        expect(rendered.type()).toBe('b');
        expect(rendered.text()).toBe('Jest');
    });
});
