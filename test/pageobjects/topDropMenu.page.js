import Page from './page.js'

class TopDropMenu extends Page {
    get seeAllButtons() {
        return $('.hmenu-compressed-btn')
    }
    get giftCardsItem() {
        return $('//*[@id="hmenu-content"]//*[contains(text(),"Gift Cards")]')
    }

    get allGiftMCardsItem() {
        return $('//*[contains(@class,"hmenu-translateX")]//*[contains(text(),"All gift cards")]')
    }

    async open() {
        await super.open()
    }
}

export default new TopDropMenu()
