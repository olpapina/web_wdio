export default class Page {
    open(path) {
        return browser.url(`https://amazon.com/${path}`)
    }
}
