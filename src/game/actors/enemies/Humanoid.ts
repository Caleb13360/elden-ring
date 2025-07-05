import { RegularEnemy } from './RegularEnemy.js';

/**
 * Abstract class for humanoid type enemies
 * Author: Rvinder Sandhu
 */
export abstract class Humanoid extends RegularEnemy {
    constructor(name: string, displayChar: string, hitPoints: number, minRunes: number, maxRunes: number) {
        super(name, displayChar, hitPoints, minRunes, maxRunes);
    }
}