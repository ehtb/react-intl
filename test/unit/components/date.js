import expectJSX from 'expect-jsx';
import React from 'react';
import {createRenderer} from '../../react-compat';
import IntlProvider from '../../../src/components/provider';
import FormattedDate from '../../../src/components/date';

expect.extend(expectJSX);

describe('<FormattedDate>', () => {
    let consoleWarn;
    let renderer;
    let intlProvider;

    beforeEach(() => {
        consoleWarn  = jest.spyOn(console, 'warn');
        renderer     = createRenderer();
        intlProvider = new IntlProvider({locale: 'en'}, {});
    });

    afterEach(() => {
        consoleWarn.mockRestore();
    });

    it('has a `displayName`', () => {
        expect(typeof FormattedDate.displayName).toBe('string');
    });

    it('throws when <IntlProvider> is missing from ancestry', () => {
        expect(() => renderer.render(<FormattedDate />)).toThrow(
            '[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry.'
        );
    });

    it('requires a finite `value` prop', () => {
        const {intl} = intlProvider.getChildContext();

        renderer.render(<FormattedDate value={0} />, {intl});
        expect(isFinite(0)).toBe(true);
        expect(consoleWarn.calls.length).toBe(0);

        renderer.render(<FormattedDate />, {intl});
        expect(consoleWarn.calls.length).toBe(1);
        expect(consoleWarn.calls[0].arguments[0]).toContain(
            '[React Intl] Error formatting date.\nRangeError'
        );
    });

    it('renders a formatted date in a <span>', () => {
        const {intl} = intlProvider.getChildContext();
        const date = new Date();

        const el = <FormattedDate value={date} />;

        renderer.render(el, {intl});
        expect(renderer.getRenderOutput()).toEqualJSX(
            <span>{intl.formatDate(date)}</span>
        );
    });

    it('should not re-render when props and context are the same', () => {
        intlProvider = new IntlProvider({locale: 'en'}, {});
        renderer.render(<FormattedDate value={0} />, intlProvider.getChildContext());
        const renderedOne = renderer.getRenderOutput();

        intlProvider = new IntlProvider({locale: 'en'}, {});
        renderer.render(<FormattedDate value={0} />, intlProvider.getChildContext());
        const renderedTwo = renderer.getRenderOutput();

        expect(renderedOne).toBe(renderedTwo);
    });

    it('should re-render when props change', () => {
        renderer.render(<FormattedDate value={0} />, intlProvider.getChildContext());
        const renderedOne = renderer.getRenderOutput();

        renderer.render(<FormattedDate value={1} />, intlProvider.getChildContext());
        const renderedTwo = renderer.getRenderOutput();

        expect(renderedOne).not.toBe(renderedTwo);
    });

    it('should re-render when context changes', () => {
        intlProvider = new IntlProvider({locale: 'en'}, {});
        renderer.render(<FormattedDate value={0} />, intlProvider.getChildContext());
        const renderedOne = renderer.getRenderOutput();

        intlProvider = new IntlProvider({locale: 'en-US'}, {});
        renderer.render(<FormattedDate value={0} />, intlProvider.getChildContext());
        const renderedTwo = renderer.getRenderOutput();

        expect(renderedOne).not.toBe(renderedTwo);
    });

    it('accepts valid Intl.DateTimeFormat options as props', () => {
        const {intl} = intlProvider.getChildContext();
        const date = new Date();
        const options = {year: 'numeric'};

        const el = <FormattedDate value={date} {...options} />;

        renderer.render(el, {intl});
        expect(renderer.getRenderOutput()).toEqualJSX(
            <span>{intl.formatDate(date, options)}</span>
        );
    });

    it('fallsback and warns on invalid Intl.DateTimeFormat options', () => {
        const {intl} = intlProvider.getChildContext();
        const el = <FormattedDate value={0} year="invalid" />;

        renderer.render(el, {intl});
        expect(renderer.getRenderOutput()).toEqualJSX(
            <span>{String(new Date(0))}</span>
        );

        expect(consoleWarn.calls.length).toBeGreaterThan(0);
    });

    it('accepts `format` prop', () => {
        intlProvider = new IntlProvider({
            locale: 'en',
            formats: {
                date: {
                    'year-only': {year: 'numeric'},
                },
            },
        }, {});

        const {intl} = intlProvider.getChildContext();
        const date   = new Date();
        const format = 'year-only';

        const el = <FormattedDate value={date} format={format} />;

        renderer.render(el, {intl});
        expect(renderer.getRenderOutput()).toEqualJSX(
            <span>{intl.formatDate(date, {format})}</span>
        );
    });

    it('supports function-as-child pattern', () => {
        const {intl} = intlProvider.getChildContext();
        const date   = new Date();

        const el = (
            <FormattedDate value={date}>
                {(formattedDate) => (
                    <b>{formattedDate}</b>
                )}
            </FormattedDate>
        );

        renderer.render(el, {intl});
        expect(renderer.getRenderOutput()).toEqualJSX(
            <b>{intl.formatDate(date)}</b>
        );
    });
});
