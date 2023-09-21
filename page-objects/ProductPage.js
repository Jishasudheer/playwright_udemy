import { expect } from "@playwright/test";
import { Navgation, navgation } from "./Navigation";
import { isDesktopViewport } from "../utils/isDesktopViewport";

export class ProductsPage{
    constructor(page){
        this.page=page;
        this.addButtons=page.locator('[data-qa="product-button"]')
        this.sortDropDown=page.locator('[data-qa="sort-dropdown"]')
        this.productTitles=page.locator('[data-qa="product-title"]')
        // this.basketCounter=page.locator('[data-qa="header-basket-count"]')

    }
    visit = async() =>{
        await this.page.goto("/")
    }
    // getBasketCount = async() =>{
    //     await this.basketCounter.waitFor();
    //     const basketCountText=await this.basketCounter.innerText()
    //     return parseInt(basketCountText);
    // }
    
    addProdcutToBasket = async(index)=>{
        const specificAddButton=this.addButtons.nth(index);
        await specificAddButton.waitFor();
        const navigation=new Navgation(this.page);
        await expect(specificAddButton).toHaveText("Add to Basket")
        let basketCountBeforeAdding
        if(isDesktopViewport(this.page)){
            basketCountBeforeAdding=await navigation.getBasketCount();
        }
        await specificAddButton.click();
        await expect(specificAddButton).toHaveText("Remove from  Basket")
        if(isDesktopViewport(this.page)){
            const basketCountAfterAdding=await navigation.getBasketCount();
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
        }
        // await this.page.pause();
    }
    sortByCheapest = async()=>{
        await this.sortDropDown.waitFor();
        await this.productTitles.first().waitFor();
        const productTitlesBeforeSorting=await this.productTitles.allInnerTexts();
        await this.sortDropDown.selectOption("price-asc");
        const productTitlesAfterSorting=await this.productTitles.allInnerTexts();
        expect (productTitlesBeforeSorting).not.toEqual(productTitlesAfterSorting);
        // await this.page.pause();
    }
}