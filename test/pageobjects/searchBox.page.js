import Page from './page.js'

class SearchBox extends Page {
    get searchField() {
        return $('#twotabsearchtextbox')
    }
    get searchButton() {
        return $('#nav-search-submit-button')
    }

    async open() {
        await super.open()
    }
}

export default new SearchBox()
