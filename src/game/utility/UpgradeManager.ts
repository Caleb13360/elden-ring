/**
 * A HP upgrade manager class that manages the upgrading costs of the HP upgrades
 * Created by: Caleb Smith
 */
export class UpgradeManager {
    /**
     * Only instance of UpgradeManager in existence (singleton)
     */
    private static instance: UpgradeManager;

    /**
     * The current cost of upgrading HP
     */
    private maxHpUpgradeCost: number = 200;

    /**
     * Private constructor for UpgradeManager
     */
    private constructor() {}

    /**
     * Getter of the sole instance of UpgradeManager, creates the instance if one is yet to exist
     * @return the singleton instance
     */
    public static getInstance(): UpgradeManager {
        if (!UpgradeManager.instance) {
            UpgradeManager.instance = new UpgradeManager();
        }
        return UpgradeManager.instance;
    }

    /**
     * Increases the cost of the HP upgrade
     */
    public increaseCost(): void {
        this.maxHpUpgradeCost += 100;
    }

    /**
     * Gets the current cost of a HP upgrade
     * @return current cost of HP upgrade
     */
    public getCost(): number {
        return this.maxHpUpgradeCost;
    }
}