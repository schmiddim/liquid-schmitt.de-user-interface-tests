'use strict';
/**
 * @see https://github.com/smooth-code/jest-puppeteer/blob/master/README.md
 */
const assert = require('assert');
const path = require('path');


const browser = process.argv.includes('--browser');

const sleep = seconds =>
    new Promise(resolve => setTimeout(resolve, (seconds || 1) * 1000));


if (browser) {
    beforeAll(async () => {

    });
    describe('browser tests', () => {
        describe('document', () => {
            describe('#querySelectorAll().length', () => {
                test('should return 1 when the element is present', async () => {
                    const currentValue = await page.evaluate(
                        () => document.querySelectorAll('#jest').length
                    );
                    assert.equal(currentValue, 1)
                })
            })
        })
    })
}
describe('Shopware Put something in the Basket', () => {
    it('should display the Legal Check on page', async () => {
        await page.goto('https://www.liquid-schmitt.de/liquids/momo-liquids/18/momo-soda-lish-0mg-50ml');
        await sleep(5);   //fade in takes a while
        await page.screenshot({
            path: 'screenshots/1_detail_page.png',
            clip: {x: 0, y: 0, width: 1024, height: 800}
        });
        await expect(page).toMatch('Jugendschutz/Altersprüfung');
        await expect(page).toClick('button', {text: 'Bestätigen'});
        await sleep(5);   //fade out too
    }, 15000);

    it('should display "Momo - Soda Lish" text on page', async () => {
        await expect(page).toMatch('Momo - Soda Lish 0mg 50ml')
    });

    it('should put the item in the cart', async () => {
        await page.screenshot({
            path: 'screenshots/2_detail_page_after_click.png',
            clip: {x: 0, y: 0, width: 1024, height: 800}
        });
        await expect(page).toClick('button', {text: 'In den Warenkorb'})

    });

    it('there should be something in the cart', async () => {
        await page.goto('https://www.liquid-schmitt.de/checkout/cart');
        await page.screenshot({
            path: 'screenshots/3_basket_overview.png',
            clip: {x: 0, y: 0, width: 1024, height: 800}
        });
        await expect(page).toMatch('Zur Kasse')

    });

});