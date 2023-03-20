import Page from './page.js'

class ResultPage extends Page {
    get filters() {
        return $('#filters')
    }

    get filterBlock() {
        return $$('[data-csa-c-slot-id="nav-ref"]')
    }
    get resultLinks() {
        return $$('[class="a-size-mini a-spacing-none a-color-base s-line-clamp-4"]')
    }

    get resultSearchLinks() {
        return $$('[class = "a-size-mini a-spacing-none a-color-base s-line-clamp-2"]')
    }

    get checkbox() {
        return $('//*[@class="a-size-base a-color-base" and contains(text(),"128 GB")]')
    }

    get productIcon() {
        return $$('[class="a-section aok-relative s-image-square-aspect"]')
    }

    async open() {
        await super.open()
    }
}

export default new ResultPage()
