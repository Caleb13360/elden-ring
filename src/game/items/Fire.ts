import { Actor } from './../../engine/actors/Actor.js';
import { Display } from './../../engine/displays/Display.js';
import { Item } from './../../engine/items/Item.js';
import { Location } from './../../engine/positions/Location.js';
import { DeathAction } from '../actions/DeathAction.js';
import { ResetManager } from '../reset/ResetManager.js';
import { Resettable } from '../reset/Resettable.js';
import { Status } from '../utility/Status.js';

/**
 * Fire item that lies on a ground on fire and deals damage to actors who walk on it for 3 turns
 * Created by: Caleb Smith
 */
export class Fire extends Item implements Resettable {
    /**
     * Actor who spawned the fire
     */
    private holder: Actor;
    /**
     * Lifespan of fire in turns
     */
    private turns: number = 3;
    /**
     * Damage fire does
     */
    private damage: number = 57;
    /**
     * Location fire lies
     */
    private location: Location;

    /**
     * Fire constructor
     * @param holder actor who spawned the fire
     * @param location location fire lies
     */
    constructor(holder: Actor, location: Location) {
        super("Fire", 'u', false);
        this.location = location;
        this.holder = holder;
        location.getGround().addCapability(Status.BURNED);
        ResetManager.getInstance().registerResettable(this);
    }

    /**
     * Allows fire to experience a turn and damage the actor standing on the ground if there is one and they aren't the spawner
     * @param currentLocation The location of the ground on which the fire lies.
     */
    tick(currentLocation: Location): void {
        if (this.turns === 0) {
            currentLocation.removeItem(this);
            currentLocation.getGround().removeCapability(Status.BURNED);
            return;
        }
        const display = new Display();
        if (currentLocation.containsAnActor()) {
            const target = currentLocation.getActor();
            if (target !== this.holder) {
                target.hurt(this.damage);
                let result = `${this} from ${this.holder} burned ${target} for ${this.damage} damage.`;
                if (!target.isConscious()) {
                    result += new DeathAction(this.holder).execute(target, currentLocation.mapRef());
                }
                display.println(result);
            }
        }
        this.turns -= 1;
    }

    /**
     * Resets the fire by removing it from the ground and the burned status
     */
    reset(): void {
        this.location.removeItem(this);
        this.location.getGround().removeCapability(Status.BURNED);
        ResetManager.getInstance().removeResettable(this);
    }
}