import { Action } from './../../engine/actions/Action.js';
import { ActionList } from './../../engine/actions/ActionList.js';
import { DoNothingAction } from './../../engine/actions/DoNothingAction.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Display } from './../../engine/displays/Display.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Location } from './../../engine/positions/Location.js';
import { WeaponItem } from './../../engine/weapons/WeaponItem.js';
import { DespawnAction } from '../actions/DespawnAction.js';
import { Faction } from './enemies/Faction.js';
import { AttackBehaviour } from '../behaviours/AttackBehaviour.js';
import { Behaviour } from '../behaviours/Behaviour.js';
import { FollowBehaviour } from '../behaviours/FollowBehaviour.js';
import { WanderBehaviour } from '../behaviours/WanderBehaviour.js';
import { FallenHero } from '../items/FallenHero.js';
import { ResetManager } from '../reset/ResetManager.js';
import { Resettable } from '../reset/Resettable.js';
import { Status } from '../utility/Status.js';

/**
 * Class representing a revived hero (e.g., Godrick)
 * Created by: Caleb Smith
 */
export class RevivedHero extends Actor implements Resettable {
    /**
     * Map of ordered behaviours accessed by int key
     */
    private behaviours: Map<number, Behaviour> = new Map();
    /**
     * Location where the revived hero should be respawned from
     */
    private deathLocation: Location;
    /**
     * Bool representing if the hero is to reset next turn
     */
    private toReset: boolean = false;
    /**
     * Weapon that the revived hero uses
     */
    private weapon: WeaponItem;

    /**
     * Revived hero constructor, adds status to make them friendly to the player and retrieve runes
     * @param name name of the hero
     * @param deathLocation location where the hero is to be summoned from
     * @param weapon the weapon the hero uses
     */
    constructor(name: string, deathLocation: Location, weapon: WeaponItem) {
        super(name, 'B', 500);
        this.deathLocation = deathLocation;
        this.behaviours.set(999, new WanderBehaviour());
        this.behaviours.set(100, new AttackBehaviour());
        weapon.togglePortability();
        this.addWeaponToInventory(weapon);
        this.weapon = weapon;
        this.addCapability(Faction.PLAYER_FRIENDLY);
        this.addCapability(Status.RUNE_ABSORBER);
        ResetManager.getInstance().registerResettable(this);
    }

    /**
     * Allows revived heroes to start following a demigod after it gives the option to attack one
     * @param otherActor the Actor that might be performing attack
     * @param direction  String representing the direction of the other Actor
     * @param map        current GameMap
     * @return ActionList of allowable actions
     */
    allowableActions(otherActor: Actor, direction: string, map: GameMap): ActionList {
        const actions = new ActionList();
        if (otherActor.hasCapability(Status.DEMIGOD)) {
            this.behaviours.set(997, new FollowBehaviour(otherActor));
        }
        return actions;
    }

    /**
     * Determines if the actor is conscious, adds a new fallen hero item if not conscious
     * @return bool representing if the actor is conscious
     */
    isConscious(): boolean {
        if (this.hitPoints <= 0) {
            this.deathLocation.addItem(new FallenHero(this.name, this.deathLocation, this.weapon));
        }
        return super.isConscious();
    }

    /**
     * At each turn, select a valid action to perform.
     * Reset hero if required, back to the fallen hero item
     *
     * @param actions    collection of possible Actions for this Actor
     * @param lastAction The Action this Actor took last turn
     * @param map        the map containing the Actor
     * @param display    the I/O object to which messages may be written
     * @return the valid action that can be performed in that iteration or null if no valid action is found
     */
    async playTurn(actions: ActionList, lastAction: Action, map: GameMap, display: Display): Promise<Action> {
        if (this.toReset) {
            this.deathLocation.addItem(new FallenHero(this.name, this.deathLocation, this.weapon));
            return new DespawnAction();
        }
        for (const behaviour of this.behaviours.values()) {
            const action = behaviour.getAction(this, map);
            if (action !== null) {
                return action;
            }
        }
        return new DoNothingAction();
    }

    /**
     * Sets the hero to reset on its next turn
     */
    reset(): void {
        this.toReset = true;
    }
}