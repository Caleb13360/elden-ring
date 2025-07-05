import { Actor } from './../../engine/actors/Actor.js';
import { Display } from './../../engine/displays/Display.js';
import { Item } from './../../engine/items/Item.js';
import { Location } from './../../engine/positions/Location.js';
import { DeathAction } from '../actions/DeathAction.js';
import { ResetManager } from '../reset/ResetManager.js';
import { Resettable } from '../reset/Resettable.js';

/**
 * An item that presents arrows that are going to land on a tile
 * Created by: Caleb Smith
 */
export class RadahnsRain extends Item implements Resettable {
    /**
     * The actor who shot the arrows
     */
    private holder: Actor;
    /**
     * Amount of turns before arrows land
     */
    private turns: number = 2;
    /**
     * Damage the arrows do if they hit an actor
     */
    private damage: number = 180;
    /**
     * Location the arrows will be landing
     */
    private location: Location;

    /**
     * RadahnsRain constructor
     * @param holder the actor who shot the arrows
     * @param location the location the arrows will land
     */
    constructor(holder: Actor, location: Location) {
        super("Radahn's Rain", '"', false);
        this.location = location;
        this.holder = holder;
        ResetManager.getInstance().registerResettable(this);
    }

    /**
     * Allows the arrows to experience time so that they can calculate when they land and damage an actor if applicable
     * @param currentLocation The location of the ground on which the arrows will land.
     */
    tick(currentLocation: Location): void {
        if (this.turns === 0) {
            const display = new Display();
            if (currentLocation.containsAnActor()) {
                const target = currentLocation.getActor();
                if (target !== this.holder) {
                    target.hurt(this.damage);
                    let result = `${this} from ${this.holder} rained down on ${target} dealing ${this.damage} damage.`;
                    if (!target.isConscious()) {
                        result += new DeathAction(this.holder).execute(target, currentLocation.mapRef());
                    }
                    display.println(result);
                }
            }
            currentLocation.removeItem(this);
        } else {
            this.turns -= 1;
        }
    }

    /**
     * Used to remove the arrows if a reset occurs
     */
    reset(): void {
        this.location.removeItem(this);
        ResetManager.getInstance().removeResettable(this);
    }
}