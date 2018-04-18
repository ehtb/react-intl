import * as p from 'path';
import {sync as globSync} from 'glob';

describe('locale data', () => {
    it('has generated locale data modules with correct shape', () => {
        const localeDataFiles = globSync('./locale-data/*.js');

        expect(localeDataFiles.length).toBeGreaterThan(0);
        localeDataFiles.forEach((filename) => {
            const localeData = require(p.resolve(filename));

            expect(typeof localeData).toBe('array');
            localeData.forEach((locale) => {
                expect(typeof locale).toBe('object');
                expect(locale.locale).toBeTruthy();
            });
        });
    });
});
