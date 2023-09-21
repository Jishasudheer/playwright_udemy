import { expect } from "@playwright/test";

export class PaymentPage{
    constructor(page){
        this.page=page;
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                              .locator('[data-qa="discount-code"]') 
        this.discountCodeInput = page.locator('[data-qa="discount-code-input"]')
        this.submitDiscount = page.locator('[data-qa="submit-discount-button"]')
        this.discountActiveMessage=page.locator('[data-qa="discount-active-message"]')
        this.totalValue=page.locator('[data-qa="total-value"]')
        this.totalDiscountValue=page.locator('[data-qa="total-with-discount-value"]')
        this.creditCardOwnerName=page.getByPlaceholder('Credit card owner');
        this.creditCardNumber=page.getByPlaceholder('Credit card number');
        this.creditCardValidity=page.getByPlaceholder('Valid until');
        this.creditCardCVC=page.getByPlaceholder('Credit card CVC');
        this.paymentButton=page.getByRole('button', { name: 'Pay' });

        
    }
    activateDiscount = async() =>{
        await this.discountCode.waitFor();
        const code=await this.discountCode.innerText();
        await this.discountCodeInput.waitFor();
        //option1 using fill and await expect
        await this.discountCodeInput.fill(code);
        await expect(this.discountCodeInput).toHaveValue(code)

        //option2 using keyboard slow typing
        // await this.discountCodeInput.focus();
        // await this.page.keyboard.type(code,{delay:1000})
        expect(await this.discountActiveMessage.isVisible()).toBe(false);
        expect(await this.totalDiscountValue.isVisible()).toBe(false);
        
        await this.submitDiscount.waitFor();
        await this.submitDiscount.click();
        await this.discountActiveMessage.waitFor();
        await this.totalValue.waitFor()
        const totalValueStringwithoutDiscount=await this.totalValue.innerText();
        const totalValueWithoutDollar=parseInt(totalValueStringwithoutDiscount.replace("$",""));
       
        await this.totalDiscountValue.waitFor();
        const totalValueStringwithDiscount=await this.totalDiscountValue.innerText();
        const totalDiscountWithoutDollar=parseInt(totalValueStringwithDiscount.replace("$",""))
        expect(totalValueWithoutDollar).toBeGreaterThan(totalDiscountWithoutDollar);       
    }
    
    fillPaymentDetails = async(payementDetails) => {
        await this.creditCardOwnerName.waitFor();
        await this.creditCardOwnerName.fill(payementDetails.owner);
        await this.creditCardNumber.waitFor();
        await this.creditCardNumber.fill(payementDetails.number);
        await this.creditCardValidity.waitFor();
        await this.creditCardValidity.fill(payementDetails.validUntil);
        await this.creditCardCVC.waitFor();
        await this.creditCardCVC.fill(payementDetails.cvc);
    }
    savePaymentDetails = async()=>{
        await this.paymentButton.waitFor();
        await this.paymentButton.click();
        await this.page.waitForURL(/\/thank-you/, {timout : 3000});
    }
}