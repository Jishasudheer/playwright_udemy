import { test } from "@playwright/test";
import { ProductsPage } from "./../page-objects/ProductPage";
import { Navgation } from "../page-objects/Navigation";
import { Checkout } from "../page-objects/Checkout";
import { Login } from "../page-objects/login";
import { RegisterPage } from "../page-objects/RegisterPage";
import { v4 as uuidv4 } from "uuid";
import { DeliveryDetails } from "../page-objects/DeliveryDetails";
import { deliveryDetails as userAddress } from "../data/deliveryDetails";
import { PaymentPage } from "../page-objects/PaymentPage";
import { paymentDetails  } from "../data/payementDetails";

test.skip('new user ful journey',async({page})=>{
    const productsPage=new ProductsPage(page)
    await productsPage.visit(); 
    await productsPage.sortByCheapest();   
    await productsPage.addProdcutToBasket(0);
    await productsPage.addProdcutToBasket(1);
    await productsPage.addProdcutToBasket(2);
    
    const navigation=new Navgation(page);
    await navigation.gotoCheckout();
    
    const checkout=new Checkout(page);
    await checkout.removeCheapestProduct();
    await checkout.continueToCheckout();
    
    const login=new Login(page);
    await login.moveToSignUp();

    const registerPage=new RegisterPage(page);
    const emailId=uuidv4()+"@gmail.com";
    const password=uuidv4();
    await registerPage.newUserRegister(emailId,password);

    const deliveryDetails=new DeliveryDetails(page);
    await deliveryDetails.fillDetails(userAddress);
    await deliveryDetails.saveDetails();
    await deliveryDetails.continueToPayment();

    const paymentpage = new PaymentPage(page);
    await paymentpage.activateDiscount();

    await paymentpage.fillPaymentDetails(paymentDetails);
    await paymentpage.savePaymentDetails();

})

