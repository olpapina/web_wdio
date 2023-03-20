import Page from './page.js'

class SelectLocationPage extends Page {
    get dropBelarus() {
        return $('#GLUXCountryList_26')
    }

    get doneButton() {
        return $('#a-autoid-3')
    }

    get applyButton() {
        return $('#GLUXZipUpdate-announce')
    }

    get enterZipCodeField() {
        return $('#GLUXZipUpdateInput')
    }

    get dropDownField() {
        return $('#GLUXCountryListDropdown')
    }

    async triggerBlur(elementSelector) {
        await browser.executeAsync((f) => {
            document.getElementById(f).blur()
        }, elementSelector);
    }

    async open() {
        await super.open()
    }
}

export default new SelectLocationPage()
