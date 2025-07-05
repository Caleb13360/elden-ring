import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Exit } from './../../engine/positions/Exit.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Location } from './../../engine/positions/Location.js';
import { WeaponItem } from './../../engine/weapons/WeaponItem.js';
import { RevivedHero } from '../actors/RevivedHero.js';
import { FallenHero } from '../items/FallenHero.js';

/**
 * An Action to revive a fallen hero
 * Created by: Caleb Smith
 */
export class ReviveHeroAction extends Action {
    private deathLocation: Location;
    private name: string;
    private weapon: WeaponItem;
    private fallenHero: FallenHero;

    /**
     * Constructor for revive hero action
     * @param name name of fallen hero
     * @param deathLocation location fallen hero can be revived
     * @param weapon weapon of fallen hero
     * @param fallenHero fallen hero item used to revive itself
     */
    constructor(name: string, deathLocation: Location, weapon: WeaponItem, fallenHero: FallenHero) {
        super();
        this.weapon = weapon;
        this.name = name;
        this.deathLocation = deathLocation;
        this.fallenHero = fallenHero;
    }

    /**
     * Complete the revive action by removing the item and spawning a new revived hero in an adjacent location if available
     * @param actor The actor reviving
     * @param map The map the actor is on.
     * @returns description of the revival
     */
    execute(actor: Actor, map: GameMap): string {
        for (const exit of map.locationOf(actor).getExits()) {
            const destination = exit.getDestination();
            if (!destination.containsAnActor()) {
                destination.addActor(new RevivedHero(this.name, this.deathLocation, this.weapon));
                this.deathLocation.removeItem(this.fallenHero);
                return `${this.name} was revived by ${actor} and will join them in battle`;
            }
        }
        return `${this.name} failed to revive ${actor} as there is not enough space`;
    }

    /**
     * Describes who is being revived
     * @param actor The actor reviving
     * @returns a description used for the menu UI
     */
    menuDescription(actor: Actor): string {
        return `Revive Fallen Hero ${this.name}`;
    }
}