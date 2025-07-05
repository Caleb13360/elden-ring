import { Action } from './../../engine/actions/Action.js';
import { ActionList } from './../../engine/actions/ActionList.js';
import { Item } from './../../engine/items/Item.js';
import { Location } from './../../engine/positions/Location.js';
import { WeaponItem } from './../../engine/weapons/WeaponItem.js';
import { ReviveHeroAction } from '../actions/ReviveHeroAction.js';

/**
 * Fallen hero item that is dropped in place where a fallen hero can be revived
 * Created by: Caleb Smith
 */
export class FallenHero extends Item {
    /**
     * Location where the item will respawn
     */
    private deathLocation: Location;
    /**
     * Name of fallen hero
     */
    private heroName: string;
    /**
     * Weapon of fallen hero
     */
    private weapon: WeaponItem;

    /**
     * Fallen hero constructor
     * @param name name of fallen hero
     * @param deathLocation location where the item will respawn
     * @param weapon weapon of fallen hero
     */
    constructor(name: string, deathLocation: Location, weapon: WeaponItem) {
        super("Fallen Hero", 'b', false);
        this.weapon = weapon;
        this.heroName = name;
        this.deathLocation = deathLocation;
    }

    /**
     * Provides the action to revive the fallen hero
     * @return action list with a single revive hero action for this fallen hero
     */
    getAllowableActions(): readonly Action[] {
        const actions = new ActionList();
        actions.add(new ReviveHeroAction(this.heroName, this.deathLocation, this.weapon, this));
        return actions.getUnmodifiableActionList();
    }
}