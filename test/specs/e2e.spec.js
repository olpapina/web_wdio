import HomePage from '../pageobjects/home.page.js'
import SignInPopUp from '../pageobjects/singInPopUp.page.js'
import SignInPage from '../pageobjects/signInPage.page.js'
import SearchBox from '../pageobjects/searchBox.page.js'
import ResultPage from '../pageobjects/result.page.js'
import TopDropMenu from '../pageobjects/topDropMenu.page.js'
import GiftCardPage from '../pageobjects/giftCard.page.js'
import ProductPage from '../pageobjects/product.page.js'
import SelectLocationPage from '../pageobjects/selectlocation.page.js'
import ContinuePage from '../pageobjects/continue.page.js'
import {testRail} from '@zebrunner/javascript-agent-webdriverio'

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
        testRail.testCaseId("C3550");
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
        testRail.testCaseId("C3545");
        const testData = await JSON.parse(fs.readFileSync('test/testData.json'))
        await HomePage.open()

        await HomePage.deliveryLocationIcon.click()
        await expect(SelectLocationPage.dropDownField).toBePresent()
        await expect(SelectLocationPage.dropDownField).toBeClickable()

        await SelectLocationPage.dropDownField.click()
        await SelectLocationPage.dropBelarus.click()

        const fieldFocus = await SelectLocationPage.dropDownField
        await expect(fieldFocus).toHaveAttrContaining('class', 'a-button-focus')
        if (SelectLocationPage.dropDownField.isFocused()) {
            await SelectLocationPage.clickTab('GLUXCountryListDropdown');
        }
        await expect(SelectLocationPage.doneButton).toBeClickable()
        await SelectLocationPage.doneButton.click()

        await expect(HomePage.actualDeliveryLocation).toHaveTextContaining(testData.impossibleDelivery)

        if (HomePage.giftCardButton.isClickable()) {
            await HomePage.giftCardButton.click()
        } else {
            await expect(HomePage.topMenuButton).toBePresent()
            await HomePage.topMenuButton.click()
            await expect(TopDropMenu.giftCardsItem).toBeDisplayed()
            await TopDropMenu.giftCardsItem.click()
            await expect(TopDropMenu.allGiftMCardsItem).toBeDisplayed()
            await TopDropMenu.allGiftMCardsItem.click()
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

    it('verify that delivery is possible to US', async () => {
        testRail.testCaseId("C3547");
        const testData = await JSON.parse(fs.readFileSync('test/testData.json'))
        await HomePage.open()


        await HomePage.deliveryLocationIcon.waitForExist({ timeout: 5000 })
        
        await HomePage.deliveryLocationIcon.click()
        await SelectLocationPage.enterZipCodeField.setValue(testData.zipCode)


        if (SelectLocationPage.enterZipCodeField.isFocused()) {
            await SelectLocationPage.clickTab('GLUXZipUpdateInput');
        }
        await SelectLocationPage.applyButton.click()

        await ContinuePage.continueButton.click()
        await expect(HomePage.actualDeliveryLocation).toHaveTextContaining(testData.possibleDelivery)

        await expect(HomePage.topMenuButton).toBePresent()
        await HomePage.topMenuButton.click()

        await expect(TopDropMenu.seeAllButtons).toBePresent()
        await expect(TopDropMenu.seeAllButtons).toBeDisplayed()
        await TopDropMenu.seeAllButtons[0].waitForExist({ timeout: 5000 })
        await TopDropMenu.seeAllButtons[0].scrollIntoView()
        await TopDropMenu.seeAllButtons[1].scrollIntoView()
        await TopDropMenu.seeAllButtons[1].click()
        await TopDropMenu.giftCardsItem.scrollIntoView()
        await expect(TopDropMenu.giftCardsItem).toBeDisplayed()
        await TopDropMenu.giftCardsItem.click()
        await expect(TopDropMenu.allGiftMCardsItem).toBeDisplayed()
        await TopDropMenu.allGiftMCardsItem.click()
   
        await expect(GiftCardPage.typeOfCard).toBeDisplayed()
        await GiftCardPage.typeOfCard[7].click()
        await expect(ResultPage.productIcon).toBeExisting()
        let results = await ResultPage.productIcon

        for (let i = 1; i < 5; i++) {
            await expect(ResultPage.productIcon[i]).toBeClickable()
            await ResultPage.productIcon[i].click()
            await expect(ProductPage.deliveryValidationMessage).not.toBeDisplayed()
            await expect(ProductPage.deliveryValidationMessage).not.toHaveTextContaining(testData.validationMessage)
            await expect(ProductPage.deliveryLocation).toHaveTextContaining(testData.zipCode)
            await browser.back();
            results = await ResultPage.productIcon
        }
    })
})