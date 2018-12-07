import * as ReactIntl from '../../src/react-intl';

describe('react-intl', () => {
    describe('exports', () => {
        test('exports `addLocaleData`', () => {
            expect(typeof ReactIntl.addLocaleData).toBe('function');
        });

        test('exports `defineMessages`', () => {
            expect(typeof ReactIntl.defineMessages).toBe('function');
        });

        test('exports `injectIntl`', () => {
            expect(typeof ReactIntl.injectIntl).toBe('function');
        });

        describe('React Components', () => {
            test('exports `IntlProvider`', () => {
                expect(typeof ReactIntl.IntlProvider).toBe('function');
            });

            test('exports `FormattedDate`', () => {
                expect(typeof ReactIntl.FormattedDate).toBe('function');
            });

            test('exports `FormattedTime`', () => {
                expect(typeof ReactIntl.FormattedTime).toBe('function');
            });

            test('exports `FormattedRelative`', () => {
                expect(typeof ReactIntl.FormattedRelative).toBe('function');
            });

            test('exports `FormattedNumber`', () => {
                expect(typeof ReactIntl.FormattedNumber).toBe('function');
            });

            test('exports `FormattedPlural`', () => {
                expect(typeof ReactIntl.FormattedPlural).toBe('function');
            });

            test('exports `FormattedMessage`', () => {
                expect(typeof ReactIntl.FormattedMessage).toBe('function');
            });

            test('exports `FormattedHTMLMessage`', () => {
                expect(typeof ReactIntl.FormattedHTMLMessage).toBe('function');
            });
        });

        describe('PropTypes Definitions', () => {
            test('exports `intlShape`', () => {
                expect(typeof ReactIntl.intlShape).toBe('function');
            });
        });
    });
});
