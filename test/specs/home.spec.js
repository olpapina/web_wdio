import HomePage from '../pageobjects/home.page.js'
import LocationPopUp from '../pageobjects/locationPopUp.page.js'
import SignInPopUp from '../pageobjects/singInPopUp.page.js'
import fs from 'fs'

describe('Assertion for Amazom Home Page', async () => {
    it('verify Amazon Logo', async () => {
        const testData = await JSON.parse(fs.readFileSync('test/testData.json'))
        await HomePage.open()
        await expect(HomePage.logo).toExist()
        await expect(HomePage.logo).toHaveAttribute('aria-label')
        await expect(HomePage.logo).toHaveAttributeContaining('aria-label', testData.brand)
    })

    it('verify Delivery Location', async () => {
        const testData = await JSON.parse(fs.readFileSync('test/testData.json'))
        await HomePage.open()
        await expect(HomePage.actualDeliveryLocation).toHaveTextContaining(testData.actualDelivery)
    })

    it('verify Location Pop-up disappears', async () => {
        await HomePage.open() 
        await expect(LocationPopUp.notChangeButton).not.toBeDisplayed()
    })

    it('verify SignIn pop up', async () => {
        await HomePage.open()
        await expect(SignInPopUp.popUpElement).toBePresent()
        await expect(SignInPopUp.singInButton).toBePresent()
        await SignInPopUp.singInButton.click()
    })

})