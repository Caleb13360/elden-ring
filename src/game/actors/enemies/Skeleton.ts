import { Action } from './../../../engine/actions/Action.js';
import { ActionList } from './../../../engine/actions/ActionList.js';
import { Actor } from './../../../engine/actors/Actor.js';
import { Display } from './../../../engine/displays/Display.js';
import { GameMap } from './../../../engine/positions/GameMap.js';
import { TransformAction } from '../../actions/TransformAction.js';
import { Faction } from './Faction.js';
import { RegularEnemy } from './RegularEnemy.js';
import { defaultNewBones, PileOfBonesSkill } from './PileOfBonesSkill.js';
import { PileOfBones } from './PileOfBones.js';

/**
 * Abstract class for skeletal enemies
 * Created by:
 * Rvinder Sandhu
 */
export abstract class Skeleton extends RegularEnemy implements PileOfBonesSkill {
    /**
     * Constructor for skeleton type enemy that uses a default intrinsic attack method
     * @param name name of enemy
     * @param displayChar display character of enemy
     * @param hitPoints hit points of enemy
     * @param minRunes minimum amount of runes the enemy drops
     * @param maxRunes maximum amount of runes the enemy drops
     */
    constructor(name: string, displayChar: string, hitPoints: number, minRunes: number, maxRunes: number) {
        super(name, displayChar, hitPoints, minRunes, maxRunes);
        this.addCapability(Faction.SKELETON_FRIENDLY);
    }

    /**
     * If dead, become pile of bones else play turn as usual
     * @param actions    collection of possible Actions for this Actor
     * @param lastAction The Action this Actor took last turn
     * @param map        the map containing the Actor
     * @param display    the I/O object to which messages may be written
     * @return the valid action that can be performed in that iteration or null if no valid action is found
     */
    async playTurn(actions: ActionList, lastAction: Action, map: GameMap, display: Display): Promise<Action> {
        if (this.hitPoints < 0) {
            const spawnBones = new TransformAction(this.newBones(this, super.getMinRunes(), super.getMaxRunes()), map.locationOf(this));
            map.removeActor(this);
            return spawnBones;
        }
        return super.playTurn(actions, lastAction, map, display);
    }

    /**
     * Skeleton never dies until they are killed as pile of bones
     * @return true
     */
    isConscious(): boolean {
        return true;
    }

    /**
     * used to revive the skeleton, sets hp back to max
     * @return returns the skeleton instance the is revived at full hp
     */
    revive(): Actor {
        this.hitPoints = this.getMaxHp();
        return this;
    }

    /**
     * Abstract method to be implemented by subclasses for creating new bones
     */
    newBones(actor: Actor, minRunes: number, maxRunes: number): PileOfBones {
        // Use the default implementation
        return defaultNewBones(this, actor, minRunes, maxRunes);
    }
}