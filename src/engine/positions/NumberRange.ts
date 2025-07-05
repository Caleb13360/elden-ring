/**
 * A class that represents an array of sequential numbers.
 * 
 * Counted for loops can cause off by one errors, and using this class can
 * let you use enhanced for loops instead. Python programmers should be familiar
 * with this idiom.
 */
export class NumberRange implements Iterable<number> {
    private list: ReadonlyArray<number>;

    constructor(start: number, count: number) {
        const innerList: number[] = [];
        for (let i = start; i < start + count; i++) {
            innerList.push(i);
        }
        this.list = Object.freeze(innerList);
    }

    [Symbol.iterator](): Iterator<number> {
        return this.list[Symbol.iterator]();
    }

    /**
     * Return the smallest int in the range.
     * @return the smallest int in the range.
     */
    min(): number {
        return this.list[0];
    }

    /**
     * Return the largest int in the range.
     * @return the largest int in the range.
     */
    max(): number {
        return this.list[this.list.length - 1];
    }

    /**
     * Returns true if the range contains the given int.
     * 
     * @param i the int to check for.
     * @return true if i lies between min and max, false otherwise.
     */
    contains(i: number): boolean {
        return this.list.includes(i);
    }
}