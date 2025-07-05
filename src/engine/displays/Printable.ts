/**
 * Things that are Printable can appear in the user interface and therefore can be represented
 * by a character in the UI.
 */
export interface Printable {
    /**
     * @return display character of an instance
     */
    getDisplayChar(): string;
}