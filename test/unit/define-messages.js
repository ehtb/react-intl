import defineMessages from '../../src/define-messages';

describe('defineMessages()', () => {
    test('exports a default function', () => {
        expect(typeof defineMessages).toBe('function');
    });

    test('retuns the passed-in Message Descriptors', () => {
        const descriptors = {
            foo: {
                id: 'foo',
                description: 'For translator',
                defaultMessage: 'Hello, World!',
            },
        };

        expect(defineMessages(descriptors)).toBe(descriptors);
    });
});
