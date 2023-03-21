import Page from './page.js'

class SignInPage extends Page {
    get emailField() {
        return $('#ap_email')
    }
    get continue() {
        return $('#continue')
    }

    get errorMessage() {
        return $('#auth-error-message-box')
    }

    async open() {
        await super.open()
    }
}

export default new SignInPage()
