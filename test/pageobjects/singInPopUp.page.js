import Page from './page.js'

class SignInPopUp extends Page {
    get popUpElement() {
        return $('[class="nav-signin-tt nav-flyout"]')
    }
    get singInButton() {
        return $('//*[@id="nav-signin-tooltip"]//*[contains(text(),"Sign in")]')
    }

    async open() {
        await super.open()
    }
}

export default new SignInPopUp()
