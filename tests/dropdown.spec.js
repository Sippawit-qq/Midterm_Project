import { test, expect } from '@playwright/test';
import { Loginpage } from '../setup/login';
import { getRandomSubjects, getRandomLocation, getRandomHobbies } from '../setup/randomData';
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

const subject = getRandomSubjects(3);
const location = getRandomLocation();
const hobbies = getRandomHobbies(2);


test.describe('Dorpdown check', () => {
    test(`city shouldn't click before stated is selected`, async ({ page }) => {
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await Login.selectSubject(subject);
        await Login.selectHobbies(hobbies);

        // Check city dropdown shouldn't click.
        await expect(Login.City).not.toBeVisible();
    });

    test(`city should click after stated is selected`, async ({ page }) =>{
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await Login.selectSubject(subject);
        await Login.selectHobbies(hobbies);

        await Login.State.click();
        await page.getByRole("option", { name: location.state }).click();

        // Check city dropdown should click.
        await expect(Login.City).toBeVisible();
    });

    test(`city should show by associcated with state (NCR)`, async ({ page }) =>{
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await Login.selectSubject(subject);
        await Login.selectHobbies(hobbies);

        await Login.State.click();
        await page.getByRole("option", { name: "NCR" }).click();

        await Login.City.click();
        await expect(page.getByRole("option", { name: "Delhi" })).toBeVisible();
        await expect(page.getByRole("option", { name: "Gurgaon" })).toBeVisible();
        await expect(page.getByRole("option", { name: "Noida" })).toBeVisible();

    });

    test(`city should show by associcated with state (Uttar Pradesh)`, async ({ page }) =>{
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await Login.selectSubject(subject);
        await Login.selectHobbies(hobbies);

        await Login.State.click();
        await page.getByRole("option", { name: "Uttar Pradesh" }).click();

        await Login.City.click();
        await expect(page.getByRole("option", { name: "Agra" })).toBeVisible();
        await expect(page.getByRole("option", { name: "Lucknow" })).toBeVisible();
        await expect(page.getByRole("option", { name: "Merrut" })).toBeVisible();

    });

    test(`city should show by associcated with state (Haryana)`, async ({ page }) =>{
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await Login.selectSubject(subject);
        await Login.selectHobbies(hobbies);

        await Login.State.click();
        await page.getByRole("option", { name: "Haryana" }).click();

        await Login.City.click();
        await expect(page.getByRole("option", { name: "Karnal" })).toBeVisible();
        await expect(page.getByRole("option", { name: "Panipat" })).toBeVisible();

    });

    test(`city should show by associcated with state (Rajasthan)`, async ({ page }) =>{
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.fillAllDetailPerson(profile);
        await Login.selectSubject(subject);
        await Login.selectHobbies(hobbies);

        await Login.State.click();
        await page.getByRole("option", { name: "Rajasthan" }).click();

        await Login.City.click();
        await expect(page.getByRole("option", { name: "Jaipur" })).toBeVisible();
        await expect(page.getByRole("option", { name: "Jaiselmer" })).toBeVisible();

    });

})