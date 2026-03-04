import { test, expect } from '@playwright/test';
import { Loginpage } from '../setup/login';
import { getRandomSubjects, getRandomLocation, getRandomHobbies } from '../setup/randomData';
import Person from '../model/person';

test.describe('Must fields check', () => {
  test(`shouldn't submit (First name blanks)`, async ({ page }) => {
    const profile = new Person(
      "",
      "Boy",
      "dekdee@gmail.com",
      "Male",
      "0999999999",
      "2005-08-17",
    );
  
    const Login = new Loginpage(page);

    await Login.gotoLoginPage();
    await Login.fillMustDetailPerson(profile);
    
    await Login.Submit.click();
    await expect(page.locator('#example-modal-sizes-title-lg')).not.toBeVisible('Thanks for submitting the form');
  });

  test(`shouldn't submit (Last name blanks)`, async ({ page }) => {
    const profile = new Person(
      "Good",
      "",
      "dekdee@gmail.com",
      "Male",
      "0999999999",
      "2005-08-17",
    );

    const Login = new Loginpage(page);

    await Login.gotoLoginPage();
    await Login.fillMustDetailPerson(profile);

    await Login.Submit.click();
    await expect(page.locator("#example-modal-sizes-title-lg")).not.toBeVisible(
      "Thanks for submitting the form",
    );
  });

  test(`shouldn't submit (Gender blanks)`, async ({ page }) => {
    const profile = new Person(
      "Good",
      "Boy",
      "dekdee@gmail.com",
      "",
      "0999999999",
      "2005-08-17",
    );

    const Login = new Loginpage(page);

    await Login.gotoLoginPage();
    await Login.fillMustDetailPerson(profile);

    await Login.Submit.click();
    await expect(page.locator("#example-modal-sizes-title-lg")).not.toBeVisible(
      "Thanks for submitting the form",
    );
  });

  test(`shouldn't submit (Mobile number blanks)`, async ({ page }) => {
    const profile = new Person(
      "Good",
      "Boy",
      "dekdee@gmail.com",
      "Male",
      "",
      "2005-08-17",
    );

    const Login = new Loginpage(page);

    await Login.gotoLoginPage();
    await Login.fillMustDetailPerson(profile);

    await Login.Submit.click();
    await expect(page.locator("#example-modal-sizes-title-lg")).not.toBeVisible(
      "Thanks for submitting the form",
    );
  });

  test(`shouldn't submit (All must blanks)`, async ({ page }) => {
    const profile = new Person(
      "",
      "",
      "dekdee@gmail.com",
      "",
      "",
      "2005-08-17",
    );

    const Login = new Loginpage(page);

    await Login.gotoLoginPage();
    await Login.fillMustDetailPerson(profile);

    await Login.Submit.click();
    await expect(page.locator("#example-modal-sizes-title-lg")).not.toBeVisible(
      "Thanks for submitting the form",
    );
  });
});