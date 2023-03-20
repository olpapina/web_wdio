import Page from './page.js'

class GiftCardPage extends Page {
    get typeOfCard() {
        return $$('[class="bxc-grid__image   bxc-grid__image--light"]')
    }

    async open() {
        await super.open()
    }
}

export default new GiftCardPage()
