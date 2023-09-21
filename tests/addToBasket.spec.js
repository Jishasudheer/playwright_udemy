import {test,expect} from "@playwright/test"
import { isDesktopViewport } from "../utils/isDesktopViewport";
test.skip("Product Page Add to Basket",async({page}) =>{
   await page.goto("/");
   const addToBakset=page.locator('[data-qa="product-button"]').first();
   const basketCounter=page.locator('[data-qa="header-basket-count"]')
 
   await addToBakset.waitFor();
   await expect(addToBakset).toHaveText("Add to Basket");
   await expect(basketCounter).toHaveText("0")

   await addToBakset.click();

   await expect(addToBakset).toHaveText("Remove from Basket");
   await expect(basketCounter).toHaveText("1");
   if(!isDesktopViewport(page)){
   const mobileBurgerButton = page.locator('[data-qa="burger-button"]')
   await mobileBurgerButton.waitFor();
   await mobileBurgerButton.click();  
   }
   const checkoutLink=page.getByRole('link', { name: 'Checkout' });
   await checkoutLink.waitFor();
   await checkoutLink.click();
   await page.waitForURL("/basket");
})
