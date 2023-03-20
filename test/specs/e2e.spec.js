import HomePage from '../pageobjects/home.page.js'
import SignInPopUp from '../pageobjects/singInPopUp.page.js'
import SignInPage from '../pageobjects/signInPage.page.js'
import SearchBox from '../pageobjects/searchBox.page.js'
import ResultPage from '../pageobjects/result.page.js'
import LocationPopUp from '../pageobjects/locationPopUp.page.js'
import TopDropMenu from '../pageobjects/topDropMenu.page.js'
import GiftCardPage from '../pageobjects/giftCard.page.js'
import ProductPage from '../pageobjects/product.page.js'
import SelectLocationPage from '../pageobjects/selectlocation.page.js'

import fs from 'fs'

describe('Tests for SignIn and Search with filtering', async () => {
    it('Sign In is impossible for non-registed user', async () => {
        const testData = await JSON.parse(fs.readFileSync('test/testData.json'))
        await HomePage.open()
        await expect(SignInPopUp.singInButton).toBePresent()
        await SignInPopUp.singInButton.click()
        await SignInPage.emailField.setValue(testData.email)
        await SignInPage.continue.click()
        await expect(SignInPage.emailField).toHaveValue(testData.email)
        await expect(SignInPage.errorMessage).toHaveTextContaining(testData.messageFailedSignIn)
    })

    it('verify Searching and Filtering', async () => {
        const testData = await JSON.parse(fs.readFileSync('test/testData.json'))
        await HomePage.open()
        await SearchBox.searchField.setValue(testData.searchText)
        await SearchBox.searchButton.click()
        await expect(ResultPage.resultSearchLinks).toHaveTextContaining(testData.searchText)
        await expect(ResultPage.filters).toBeDisplayed()
        await expect(ResultPage.filterBlock).toBeExisting()
        await ResultPage.checkbox.click()
        await expect(ResultPage.resultLinks).toHaveTextContaining(testData.expectedFilter)
    })
})

describe('Tests for Gift cards page for differents locations', async () => {
    it('verify that delivery is impossible to Belarus', async () => {
        const testData = await JSON.parse(fs.readFileSync('test/testData.json'))
        await HomePage.open()
        if (LocationPopUp.notChangeButton.isPresent()) {
            await LocationPopUp.notChangeButton.click()
        } else {
            await expect(LocationPopUp.notChangeButton).not.toBePresent()
        }

        if (HomePage.giftCardButton.isClickable()) {
            await HomePage.giftCardButton.click()
        } else if (HomePage.topMenuButton.isClickable()) {
            await HomePage.topMenuButton.click()
            await TopDropMenu.giftCardsItem.click()
        }
        else {
            await HomePage.deliveryLocationIcon.click()
            await expect(SelectLocationPage.dropDownField).toBePresent()
            await expect(SelectLocationPage.dropDownField).toBeClickable()

            await SelectLocationPage.dropDownField.click()
            await SelectLocationPage.dropBelarus.click()

            const fieldFocus = await SelectLocationPage.dropDownField
            await expect(fieldFocus).toHaveAttrContaining('class', 'a-button-focus')
            if (SelectLocationPage.dropDownField.isFocused()) {
                await SelectLocationPage.triggerBlur('GLUXCountryListDropdown');
            }
            await expect(SelectLocationPage.doneButton).toBePresent()
            await browser.buttonDown(button).click()
        }

        await GiftCardPage.typeOfCard[7].click()
        await expect(ResultPage.productIcon).toBeExisting()
        let results = await ResultPage.productIcon

        for (let i = 1; i < 5; i++) {
            await expect(ResultPage.productIcon[i]).toBeClickable()
            await ResultPage.productIcon[i].click()
            await expect(ProductPage.deliveryValidationMessage).toBeDisplayed()
            await expect(ProductPage.deliveryValidationMessage).toHaveTextContaining(testData.validationMessage)
            await browser.back();
            results = await ResultPage.productIcon
        }
    })
})