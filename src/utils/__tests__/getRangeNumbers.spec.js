import getRangeNumbers from '../getRangeNumbers';

describe('gerRangeNumbers', () => {
    test('getRangeNumber($a, $b) should return range from $a to $b', () => {
        const range = getRangeNumbers(2, 7);
        expect(range).toEqual([2, 3, 4, 5, 6, 7]);
    });

    test('getRangeNumber($a, $b) being $a > $b should return empty array', () => {
        const range = getRangeNumbers(5, 2);
        expect(range).toEqual([]);
    });

    test('getRangeNumber($a, $a) should return empty [$a]', () => {
        const range = getRangeNumbers(1, 1);
        expect(range).toEqual([1]);
    });
});