import { test, expect } from '@playwright/test';
import { Loginpage } from '../setup/login';
import Person from '../model/person';

const profile = new Person(
  "Good",
  "Boy",
  "dekdee@gmail.com",
  "Male",
  "0999999999",
  "2005-08-17",
  "2/14 thailand",
  "./data/doraemon.jpg",
);

test.describe('Field Validate check', () => {
    test(`valid mobile number`, async ({ page }) => {
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await expect(page.getByRole("textbox", { name: "Mobile Number" }),).toHaveValue(profile.mobile);

        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible('Thanks for submitting the form');
    });

    test(`invalid mobile number by lenght less than 10`, async ({ page }) => {
      const Login = new Loginpage(page);
      
      await Login.gotoLoginPage();
      await Login.fillAllDetailPerson(profile);
      await Login.mobile_box.fill('012345678');

      await page.getByRole("button", { name: "Submit" }).click();
      await expect(page.locator("#example-modal-sizes-title-lg")).not.toBeVisible("Thanks for submitting the form",);
    });

    test(`invalid mobile number by lenght more than 10`, async ({ page }) => {
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await Login.mobile_box.fill("01234567891");

        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible('Thanks for submitting the form');
        await expect(page.getByRole("textbox", { name: "Mobile Number" }),).toHaveValue("0123456789");
    });

    test(`invalid mobile number by lenght have alphabet`, async ({ page }) => {
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await Login.mobile_box.fill("012356g678");

        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('#example-modal-sizes-title-lg')).not.toBeVisible('Thanks for submitting the form');
    });

    test(`invalid mobile number by have special character`, async ({ page }) => {
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await Login.mobile_box.fill("099-999-9999");

        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('#example-modal-sizes-title-lg')).not.toBeVisible('Thanks for submitting the form');
    });

    test(`valid email`, async ({ page }) => {
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await expect(page.getByRole("textbox", { name: "name@example.com" }),).toHaveValue(profile.email);

        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible('Thanks for submitting the form');
    });

    test(`valid email (special character in mailbox ("."))`, async ({ page }) => {
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await Login.email_box.fill("dek.lnwza@gmail.com");

        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible('Thanks for submitting the form');
    });

    test(`valid email (special character in mailbox ("-"))`, async ({ page }) => {
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await Login.email_box.fill("dek-lnwza@gmail.com");

        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible('Thanks for submitting the form');
    });

    test(`valid email (special character in mailbox ("_"))`, async ({ page }) => {
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await Login.email_box.fill("dek_lnwza@gmail.com");

        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible('Thanks for submitting the form');
    });

    test(`invalid email (without @)`, async ({ page }) => {
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await Login.email_box.fill("deklnwzagmail.com")

        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('#example-modal-sizes-title-lg')).not.toBeVisible('Thanks for submitting the form');
    });

    test(`invalid email (without .)`, async ({ page }) => {
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await Login.email_box.fill("deklnwza@gmailcom")

        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('#example-modal-sizes-title-lg')).not.toBeVisible('Thanks for submitting the form');
    });
    
    test(`invalid email (no character before @)`, async ({ page }) => {
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await Login.email_box.fill("@gmail.com")

        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('#example-modal-sizes-title-lg')).not.toBeVisible('Thanks for submitting the form');
    });

    test(`invalid email (no character between @ and .)`, async ({ page }) => {
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await Login.email_box.fill("deklnwza@.com")

        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('#example-modal-sizes-title-lg')).not.toBeVisible('Thanks for submitting the form');
    });

    test(`invalid email (special character in mailbox)`, async ({ page }) => {
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await Login.email_box.fill("dek#lnwza@gmail.com")

        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('#example-modal-sizes-title-lg')).not.toBeVisible('Thanks for submitting the form');
    });

    test(`invalid email (wrong domain extension)`, async ({ page }) => {
        const Login = new Loginpage(page);

        // Extension less than 2 character
        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await Login.email_box.fill("deklnwza@gmail.c")

        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('#example-modal-sizes-title-lg')).not.toBeVisible('Thanks for submitting the form');

        // Extension more than 5 character
        await Login.email_box.fill("deklnwza@gmail.comkub")

        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('#example-modal-sizes-title-lg')).not.toBeVisible('Thanks for submitting the form');
    });

    test(`valid picture (jpg)`, async ({ page }) => {
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);

        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible('Thanks for submitting the form');

        await Login.checkDetail(profile);
    });

    test(`valid picture (png)`, async ({ page }) => {
        const Login = new Loginpage(page);
        profile.picture = "./data/mario.png";

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);

        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible('Thanks for submitting the form');

        await Login.checkDetail(profile);
    });

});