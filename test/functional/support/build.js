import * as ReactIntl from '../../../src/';

function testFn() {}

export default function (buildPath) {
    describe('build', () => {
        test('evaluates', () => {
            expect(require(buildPath)).toBeTruthy();
        });

        test('has all React Intl exports', () => {
            const ReactIntlBuild = require(buildPath);
            const buildKeys = Object.keys(ReactIntlBuild);

            Object.keys(ReactIntl).forEach((name) => {
                expect(buildKeys.indexOf(name) >= 0).toBeTruthy();
                // expect(ReactIntlBuild[name]).toBeInstanceOf(ReactIntl[name]);
            });
        });
    });
}
