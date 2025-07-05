/**
 * An interface for actors who drop runes on death
 * Created by:
 * Caleb Smith
 */
export interface RuneCarrier {
    /**
     * Method which will return number of runes that are to be released upon invocation
     * @return number of runes
     */
    ReleaseRunes(): number;
}