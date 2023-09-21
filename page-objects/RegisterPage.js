
export class RegisterPage{
    constructor(page){
        this.page=page;
        this.emailInput=page.getByPlaceholder('E-Mail');
        this.passwordInput=page.getByPlaceholder('Password');
        this.registerButton=page.getByRole('button', { name: 'Register' })


    }
    newUserRegister = async(emailId,password)=>{
        await this.emailInput.waitFor();
        await this.emailInput.fill(emailId);
        await this.passwordInput.waitFor();
        await this.passwordInput.fill(password);
        await this.registerButton.waitFor();
        await this.registerButton.click();     

    }
}