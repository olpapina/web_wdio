import Page from './page.js'

class LocationPopUp extends Page {
    get changeAddressButton() {
        return $('.glow-toaster-button-submit')
    }
    get notChangeButton() {
        return $('.glow-toaster-button-dismiss')
    }
    get locationPopUpBody() {
        return $('//*[@id="glow-toaster-body"]//*[@class="a-size-base"]')
    }
    async open() {
        await super.open()
    }
}

export default new LocationPopUp()
