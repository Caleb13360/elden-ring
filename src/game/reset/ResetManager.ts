import { Actor } from './../../engine/actors/Actor.js';
import { Location } from './../../engine/positions/Location.js';
import { Resettable } from './Resettable.js';

/**
 * A reset manager class that manages a list of resettables.
 * Created by: Adrian Kristanto
 * Modified by: Rvinder Sandhu
 */
export class ResetManager {
    /**
     * List of objects that implement resettable interface
     */
    private resettables: Resettable[] = [];
    /**
     * Reference to the single instance in existence of ResetManager
     */
    private static instance: ResetManager;
    /**
     * Last place the player has rested
     */
    private lastPlayerGrace?: Location;

    /**
     * Getter for last location of last rested player grace
     * @return location representing where player last rested
     */
    public getLastPlayerGrace(): Location | undefined {
        return this.lastPlayerGrace;
    }

    /**
     * Setter for location of last rested player grace
     * @param lastPlayerGrace Location at which player has rested
     */
    public setLastPlayerGrace(lastPlayerGrace: Location): void {
        this.lastPlayerGrace = lastPlayerGrace;
    }

    /**
     * Private constructor for the Reset Manager initialising an empty list which will contain resettables
     */
    private constructor() {}

    /**
     * Method which will run the reset method for each resettable object that has been registered
     */
    public run(): void {
        for (const resettable of this.resettables) {
            resettable.reset();
        }
    }

    /**
     * Add resettable object to list maintained by Reset Manager
     * @param resettable object which implements resettable
     */
    public registerResettable(resettable: Resettable): void {
        this.resettables.push(resettable);
    }

    /**
     * Remove object from list of resettables, typically due to removal from the game in some way
     * @param resettable object to be removed
     */
    public removeResettable(resettable: Resettable | Actor): void {
        const index = this.resettables.indexOf(resettable as Resettable);
        if (index !== -1) {
            this.resettables.splice(index, 1);
        }
    }

    /**
     * Method to retrieve only existence of Reset Manager or generate what will be the only existence of Reset Manager
     * @return instance of Reset Manager
     */
    public static getInstance(): ResetManager {
        if (!ResetManager.instance) {
            ResetManager.instance = new ResetManager();
        }
        return ResetManager.instance;
    }
}