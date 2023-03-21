import Page from './page.js'

class ProductPage extends Page {
    get deliveryValidationMessage() {
        return $('.a-color-error')
    }

    get deliveryLocation() {
        return $('#contextualIngressPtLabel_deliveryShortLine')
    }

    async open() {
        await super.open()
    }
}

export default new ProductPage()
