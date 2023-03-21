import Page from './page.js'

class ContinuePage extends Page {
    get continueButton() {
        return $('//*[@class="a-popover-footer"]//*[contains(@type,"submit")]')
    }
    
    async open() {
        await super.open()
    }
}

export default new ContinuePage()
