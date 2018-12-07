import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';
import * as registry from '../../src/locale-data-registry';
import allLocaleData from '../../locale-data';
import defaultLocaleData from '../../src/en';

describe('locale data registry', () => {
    const IMF_LOCALE_DATA = {...IntlMessageFormat.__localeData__};
    const IRF_LOCALE_DATA = {...IntlRelativeFormat.__localeData__};

    const emptyLocaleData = () => {
        const emptyObject = (obj) => {
            Object.keys(obj).forEach((prop) => delete obj[prop]);
        };

        emptyObject(IntlMessageFormat.__localeData__);
        emptyObject(IntlRelativeFormat.__localeData__);
    };

    const restoreLocaleData = () => {
        emptyLocaleData();
        Object.assign(IntlMessageFormat.__localeData__, IMF_LOCALE_DATA);
        Object.assign(IntlRelativeFormat.__localeData__, IRF_LOCALE_DATA);
    };

    afterEach(() => {
        restoreLocaleData();
    });

    describe('exports', () => {
        test('exports `addLocaleData`', () => {
            expect(typeof registry.addLocaleData).toBe('function');
        });

        test('exports `hasLocaleData`', () => {
            expect(typeof registry.hasLocaleData).toBe('function');
        });
    });

    describe('hasLocaleData()', () => {
        beforeEach(() => {
            emptyLocaleData();
            // "en" is guaranteed to be included by default.
            IntlMessageFormat.__addLocaleData(IMF_LOCALE_DATA.en);
            IntlRelativeFormat.__addLocaleData(IRF_LOCALE_DATA.en);
        });

        test('does not throw when called with no arguments', () => {
            expect(() => registry.hasLocaleData()).not.toThrow();
        });

        test('returns `false` when called with no arguments', () => {
            expect(registry.hasLocaleData()).toBe(false);
        });

        test('returns `true` for built-in "en" locale', () => {
            expect(registry.hasLocaleData('en')).toBe(true);
        });

        test('normalizes the passed-in locale', () => {
            expect(registry.hasLocaleData('EN')).toBe(true);
            expect(registry.hasLocaleData('eN')).toBe(true);
            expect(registry.hasLocaleData('En')).toBe(true);
        });

        test('delegates to IntlMessageFormat and IntlRelativeFormat', () => {
            emptyLocaleData();
            expect(registry.hasLocaleData('en')).toBe(false);

            IntlMessageFormat.__addLocaleData(IMF_LOCALE_DATA.en);
            IntlRelativeFormat.__addLocaleData(IRF_LOCALE_DATA.en);
            expect(registry.hasLocaleData('en')).toBe(true);
        });

        test(
            'requires both IntlMessageFormat and IntlRelativeFormat to have locale data',
            () => {
                emptyLocaleData();
                IntlMessageFormat.__addLocaleData(IMF_LOCALE_DATA.en);
                expect(registry.hasLocaleData('en')).toBe(false);
            }
        );
    });

    describe('addLocaleData()', () => {
        beforeEach(() => {
            emptyLocaleData();
        });

        test('does not throw when called with no arguments', () => {
            expect(() => registry.addLocaleData()).not.toThrow();
        });

        test('adds locale data to the registry', () => {
            expect(registry.hasLocaleData(defaultLocaleData.locale)).toBe(false);

            registry.addLocaleData(defaultLocaleData);
            expect(registry.hasLocaleData(defaultLocaleData.locale)).toBe(true);
        });

        test('accepts an array of locale data', () => {
            expect(Array.isArray(allLocaleData)).toBe(true);

            const {locale} = allLocaleData[0];
            expect(registry.hasLocaleData(locale)).toBe(false);

            registry.addLocaleData(allLocaleData);
            expect(registry.hasLocaleData(locale)).toBe(true);
        });
    });
});
