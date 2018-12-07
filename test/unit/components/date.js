import React from 'react';
import {mount} from 'enzyme';
import {generateIntlContext, makeMockContext, shallowDeep} from '../testUtils';
import FormattedDate from '../../../src/components/date';

const mockContext = makeMockContext(
  require.resolve('../../../src/components/date')
);

describe('<FormattedDate>', () => {
    let consoleError;
    let intl;

    beforeEach(() => {
        consoleError = jest.spyOn(console, 'error');
        intl = generateIntlContext({
          locale: 'en'
        });
    });

    afterEach(() => {
        consoleError.mockReset();
    });

    test('has a `displayName`', () => {
        expect(typeof FormattedDate.displayName).toBe('string');
    });

    test('throws when <IntlProvider> is missing from ancestry', () => {
        const FormattedDate = mockContext();
        expect(() => shallowDeep(<FormattedDate />, 2)).toThrow(
            '[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry.'
        );
    });

    test('requires a finite `value` prop', () => {
        const FormattedDate = mockContext(intl);
        const value = Date.now();

        shallowDeep(
          <FormattedDate value={value} />,
          2
        );
        expect(isFinite(value)).toBe(true);
        expect(consoleError.mock.calls.length).toBe(0);

        shallowDeep(
          <FormattedDate />,
          2
        );
        expect(consoleError.mock.calls.length).toBe(1);
        expect(consoleError.mock.calls[0][0]).toContain(
            '[React Intl] Error formatting date.\nRangeError: Invalid time value'
        );
    });

    test('renders a formatted date in a <span>', () => {
        const FormattedDate = mockContext(intl);
        const date = Date.now();

        const rendered = shallowDeep(
          <FormattedDate value={date} />,
          2
        );

        expect(rendered.type()).toBe('span');
        expect(rendered.text()).toBe(intl.formatDate(date));
    });

    test('should not re-render when props and context are the same', () => {
        const FormattedDate = mockContext(intl);
        const date = Date.now();

        const spy = jest.fn().mockImplementation(() => null);
        const withInlContext = mount(
          <FormattedDate value={date}>
            { spy }
          </FormattedDate>
        );

        withInlContext.setProps({
          ...withInlContext.props()
        });
        withInlContext.instance().mockContext(intl);

        expect(spy.mock.calls.length).toBe(1);
    });

    test('should re-render when props change', () => {
      const FormattedDate = mockContext(intl);
      const date = Date.now();

      const spy = jest.fn().mockImplementation(() => null);
      const withInlContext = mount(
        <FormattedDate value={date}>
          { spy }
        </FormattedDate>
      );

      withInlContext.setProps({
        ...withInlContext.props(),
        value: withInlContext.prop('value') + 1
      });

      expect(spy.mock.calls.length).toBe(2);
    });

    test('should re-render when context changes', () => {
      const FormattedDate = mockContext(intl);
      const date = Date.now();

      const spy = jest.fn().mockImplementation(() => null);
      const withInlContext = mount(
        <FormattedDate value={date}>
          { spy }
        </FormattedDate>
      );

      const otherIntl = generateIntlContext({
        locale: 'en-US'
      });
      withInlContext.instance().mockContext(otherIntl);

      expect(spy.mock.calls.length).toBe(2);
    });

    test('accepts valid Intl.DateTimeFormat options as props', () => {
        const FormattedDate = mockContext(intl);
        const date = new Date();
        const options = {year: 'numeric'};

        const rendered = shallowDeep(
          <FormattedDate value={date} {...options} />,
          2
        );

        expect(rendered.text()).toBe(
          intl.formatDate(date, options)
        );
    });

    test('fallsback and warns on invalid Intl.DateTimeFormat options', () => {
        const FormattedDate = mockContext(intl);
        const date = new Date();
        const rendered = shallowDeep(
          <FormattedDate value={date} year='invalid' />,
          2
        );

        expect(rendered.text()).toBe(String(date));
        expect(consoleError.mock.calls.length).toBeGreaterThan(0);
    });

    test('accepts `format` prop', () => {
        intl = generateIntlContext({
            locale: 'en',
            formats: {
                date: {
                    'year-only': {year: 'numeric'},
                },
            },
        });

        const FormattedDate = mockContext(intl);
        const date   = new Date();
        const format = 'year-only';

        const rendered = shallowDeep(
          <FormattedDate value={date} format={format} />,
          2
        );

        expect(rendered.text()).toBe(intl.formatDate(date, {format}));
    });

    test('supports function-as-child pattern', () => {
        const FormattedDate = mockContext(intl);
        const date = Date.now();

        const spy = jest.fn().mockImplementation(() => <b>Jest</b>);
        const rendered = shallowDeep(
          <FormattedDate value={date}>
            { spy }
          </FormattedDate>,
          2
        );

        expect(spy.mock.calls.length).toBe(1);
        expect(spy.mock.calls[0]).toEqual([
          intl.formatDate(date)
        ]);

        expect(rendered.type()).toBe('b');
        expect(rendered.text()).toBe('Jest');
    });
});
