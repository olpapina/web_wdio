import Page from './page.js'

class SelectLocationPage extends Page {
    get dropBelarus() {
        return $('#GLUXCountryList_26')
    }

    get doneButton() {
        return $('//*[contains(text(),"Done")]')
    }

    get applyButton() {
        return $('#GLUXZipUpdate')
    }

    get enterZipCodeField() {
        return $('#GLUXZipUpdateInput')
    }

    get dropDownField() {
        return $('#GLUXCountryListDropdown')
    }

    async clickTab(elementSelector) {
        await browser.keys("\uE004")
    }

    async open() {
        await super.open()
    }
}

export default new SelectLocationPage()
