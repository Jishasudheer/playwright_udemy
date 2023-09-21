
import { isDesktopViewport } from "../utils/isDesktopViewport";
export class Navgation{
    constructor(page){
        this.page=page;
        this.basketCounter=page.locator('[data-qa="header-basket-count"]');
        this.checkoutLink=page.getByRole('link', { name: 'Checkout' });
        this.mobileBurgerButton = page.locator('[data-qa="burger-button"]')
    }
    getBasketCount = async() =>{
        await this.basketCounter.waitFor();
        const basketCountText=await this.basketCounter.innerText()
        return parseInt(basketCountText);
    }
    gotoCheckout = async()=>{
        if(!isDesktopViewport(this.page)){
            await this.mobileBurgerButton.waitFor();
            await this.mobileBurgerButton.click();
        }
        await this.checkoutLink.waitFor();
        await this.checkoutLink.click();
        await this.page.waitForURL("/basket");
    }
    
}