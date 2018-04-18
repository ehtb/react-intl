import * as ReactIntl from '../../../src/';

export default function (buildPath) {
    describe('build', () => {
        it('evaluates', () => {
            expect(require(buildPath)).toBeTruthy();
        });

        it('has all React Intl exports', () => {
            const ReactIntlBuild = require(buildPath);

            Object.keys(ReactIntl).forEach((name) => {
                expect(ReactIntlBuild[name]).toBeInstanceOf(typeof ReactIntl[name]);
            });
        });
    });
}
