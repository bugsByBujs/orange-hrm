import { Page, Locator, expect } from "@playwright/test";

export type clickType = 'singleClick' | 'doubleClick' | 'rightClick';

export class BasePage {
    constructor(protected page: Page) { }

    /*
    * Self-healing locator: use '||' to chain fallback selectors
    * e.g. '[data-test="username"] || #user-name || input[name="user-name"]'
    */
    protected resolve(locator: string | Locator): Locator {
        if (typeof locator !== 'string') return locator;

        const candidates = locator
            .split('||')
            .map(s => s.trim())
            .map(sel => this.page.locator(sel));

        // chain them with .or() — Playwright resolves to whichever actually matches
        return candidates.reduce((acc, loc) => acc.or(loc));
    }

    /*
      todo:
      *goto
      *click [double click, single click]
      *fill [send keys, normal submit clicking button]
      *getText 
      *isVisible 
    */
    async goto(url: string) {
        await this.page.goto(url);
    }

    async click(locator: string | Locator, type: clickType) { 
        switch(type) {
            case "singleClick": 
                await this.resolve(locator).click();
                break

            case "doubleClick":
                await this.resolve(locator).dblclick();
                break

            case "rightClick":
                await this.resolve(locator).click({ button: 'right' });
        }
    }

    async fill(locator: string | Locator, value: string) {
        await this.resolve(locator).fill(value);
    }

    async getText(locator: string | Locator) {
        return await this.resolve(locator).textContent();
    }

    async isVisible(locator: string | Locator) {
        await expect.soft(this.resolve(locator)).toBeVisible();
    }
}