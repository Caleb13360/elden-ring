/**
 * A random number generator
 * Created by:
 * Adrian Kristanto
 */
export class RandomNumberGenerator {
    /**
     * Gets a random int between 0 (inclusive) and the bound (exclusive)
     * @param bound highest value of the int +1
     * @return int between 0 (inclusive) and bound (exclusive)
     */
    static getRandomInt(bound: number): number;
    /**
     * Gets a random int between lower bound and upper bound, inclusive for both
     * @param lowerBound lowest value the int can be
     * @param upperBound highest value the int can be
     * @return a random int between the upper and lower bound (inclusive)
     */
    static getRandomInt(lowerBound: number, upperBound: number): number;
    static getRandomInt(a: number, b?: number): number {
        if (b === undefined) {
            // Only one argument: getRandomInt(bound)
            const bound = a;
            return bound > 0 ? Math.floor(Math.random() * bound) : 0;
        } else {
            // Two arguments: getRandomInt(lowerBound, upperBound)
            const lowerBound = a;
            const upperBound = b;
            const range = upperBound - lowerBound + 1;
            return Math.floor(Math.random() * range) + lowerBound;
        }
    }
}