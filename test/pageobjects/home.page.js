
import Page from './page.js'

class HomePage extends Page {

    get deliveryLocationIcon() {
        return $('#nav-packard-glow-loc-icon')
    }
    get topMenuButton() {
        return $('#nav-hamburger-menu')
    }
    get actualDeliveryLocation() {
        return $('#glow-ingress-line2')
    }
    get navigateMenu() {
        return $('#nav-xshop')
    }
    get logo() {
        return $('#nav-logo-sprites')
    }
    get signIn() {
        return $('[class="nav-signin-tt nav-flyout"]')
    }

    get giftCardButton() {
        return $('[data-csa-c-slot-id="nav_cs_3"]')
    }

    get deliveryLocationIcon() {
        return $('#nav-packard-glow-loc-icon')
    }

    async open() {
        await super.open()
    }
}

export default new HomePage()
