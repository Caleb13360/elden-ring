import { Action } from './Action.js';

/**
 * A thin wrapper for Array<Action> that does not allow nulls to be added.
 */
export class ActionList implements Iterable<Action> {
    private actions: Action[] = [];

    /**
     * Constructs an empty list.
     */
    constructor();
    /**
     * Constructs a collection containing a single (non-null) Action.
     * @param action the Action to add
     */
    constructor(action: Action);
    constructor(action?: Action) {
        if (action) {
            this.add(action);
        }
    }

    /**
     * Appends the contents of another Actions list to this one.
     * @param actions the Actions to append
     */
    add(actions: ActionList): void;
    /**
     * Appends the contents of any Array<Action> to this one.
     * @param actions the Array<Action> to append
     */
    add(actions: Action[]): void;
    /**
     * Appends a single Action to this collection, if it is non-null.
     * @param action the Action to append
     * @return true unconditionally
     */
    add(action: Action): boolean;
    add(arg: ActionList | Action[] | Action): void | boolean {
        if (arg instanceof ActionList) {
            for (const action of arg) {
                this.add(action);
            }
        } else if (Array.isArray(arg)) {
            for (const action of arg) {
                this.add(action);
            }
        } else {
            if (arg != null) {
                this.actions.push(arg);
            }
            return true;
        }
    }

    /**
     * Returns an Iterator for the underlying collection.
     */
    [Symbol.iterator](): Iterator<Action> {
        return this.actions.slice().values();
    }

    /**
     * Returns a sorted copy of the list of Actions.
     * @param comparator a function that can compare two Actions and determine their ordering
     * @return a sorted shallow copy of the list of Actions
     */
    sorted(comparator: (a: Action, b: Action) => number): Action[] {
        return [...this.actions].sort(comparator);
    }

    /**
     * Delete the contents of this collection, leaving it empty.
     */
    clear(): void {
        this.actions = [];
    }

    /**
     * Count the number of Actions in the collection.
     * @return the number of Actions in the collection.
     */
    size(): number {
        return this.actions.length;
    }

    /**
     * Remove the first occurrence of an Action from the collection, if it is present.
     * @param action the Action to remove
     */
    remove(action: Action): void {
        const index = this.actions.indexOf(action);
        if (index !== -1) {
            this.actions.splice(index, 1);
        }
    }

    /**
     * Return the i'th Action in the collection.
     * @param i index of the Action to retrieve
     * @return the i'th Action in the collection
     */
    get(i: number): Action {
        return this.actions[i];
    }

    /**
     * Create and return an unmodifiable copy of the contents of the collection.
     * @return a readonly array of Action
     */
    getUnmodifiableActionList(): ReadonlyArray<Action> {
        return Object.freeze([...this.actions]);
    }
    
}