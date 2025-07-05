import { Actor } from './../../engine/actors/Actor.js';
import { Location } from './../../engine/positions/Location.js';
import { Runes } from './Runes.js';
import { RuneCarrier } from './RuneCarrier.js';

/**
 * A Rune manager class that manages a list of Rune Carriers.
 * Created by: Caleb Smith, Rvinder Sandhu
 */
export class RuneManager {
    /**
     * A list of objects that carry runes
     */
    private runeCarriers: RuneCarrier[] = [];
    /**
     * Total number of runes player holds at the given point of the game
     */
    private runes: number = 0;
    /**
     * Only instance of the Rune Manager class in existence
     */
    private static instance: RuneManager;
    /**
     * Set of Runes that were last dropped by the player
     */
    private lastDroppedRune?: Runes | null;
    /**
     * Location of Runes that were last dropped by the player
     */
    private lastDroppedRuneLocation?: Location | null;

    /**
     * Private constructor for Rune Manager
     * Initialises empty list of rune carriers and sets number of runes player holds to 0
     */
    private constructor() {}

    /**
     * Getter for the sole instance of Rune Manager or creates a new instance and assigns it as such
     * @return instance of Rune Manager
     */
    public static getInstance(): RuneManager {
        if (!RuneManager.instance) {
            RuneManager.instance = new RuneManager();
        }
        return RuneManager.instance;
    }

    /**
     * Remove runes that were dropped last, if they were never picked up
     */
    public removeOldRunes(): void {
        if (this.lastDroppedRune && this.lastDroppedRuneLocation) {
            this.lastDroppedRuneLocation.removeItem(this.lastDroppedRune);
        }
    }

    /**
     * Setter for last dropped rune
     * @param lastDroppedRune new Rune item
     */
    public setLastDroppedRune(lastDroppedRune: Runes | null): void {
        this.lastDroppedRune = lastDroppedRune;
    }

    /**
     * Setter for last dropped rune location
     * @param lastDroppedRuneLocation new location of dropped rune
     */
    public setLastDroppedRuneLocation(lastDroppedRuneLocation: Location | null): void {
        this.lastDroppedRuneLocation = lastDroppedRuneLocation;
    }

    /**
     * Release runes of runeCarrier that has just died in an OO manner :) 
     * @return number of runes released by rune carrier
     */
    public getReleasedRunes(): number {
        for (const runeCarrier of this.runeCarriers) {
            const droppedRunes = runeCarrier.ReleaseRunes();
            if (droppedRunes !== 0) {
                this.runes += droppedRunes;
                return droppedRunes;
            }
        }
        return 0;
    }

    /**
     * Register new rune carrier 
     * @param runeCarrier
     */
    public registerRuneCarrier(runeCarrier: RuneCarrier): void {
        this.runeCarriers.push(runeCarrier);
    }

    /**
     * Remove rune carrier from list of rune carriers, typically upon removal from the game
     * @param runeCarrier rune Carrier to be removed
     */
    public removeRuneCarrier(runeCarrier: RuneCarrier): void {
        // Assumes RuneCarrier extends Actor or is compatible
        this.runeCarriers = this.runeCarriers.filter(rc => rc != runeCarrier);
    }

    /**
     * Get number of runes held by the Player at current time
     * @return
     */
    public getRunes(): number {
        return this.runes;
    }

    /**
     * Increase number of runes held by Player
     * @param newRunes amount to increase by
     */
    public addRunes(newRunes: number): void {
        this.runes += newRunes;
    }

    /**
     * Decrease number of runes held by Player
     * @param amount to decrease runes by
     */
    public decreaseRunes(amount: number): void {
        this.runes -= amount;
    }

    /**
     * Attempt to make a purchase using number of runes held by Player
     * @param price price of what is being purchased
     * @return True if purchase is possible, else False
     */
    public makePurchase(price: number): boolean {
        if (this.runes >= price) {
            this.decreaseRunes(price);
            return true;
        }
        return false;
    }

    /**
     * Reset the number of runes the player is holding to 0, typically upon "death"
     */
    public resetRunes(): void {
        this.runes = 0;
    }
}