import { test, expect } from '@playwright/test';
import { Loginpage } from '../setup/login';
import { getRandomSubjects, getRandomLocation, getRandomHobbies } from '../setup/randomData';
import Person from '../model/person';

//Data for testing
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

const subject = getRandomSubjects(9);
const location = getRandomLocation();
const hobbies = getRandomHobbies(3);

test('fill all of data', async ({ page }) => {
   
  const Login = new Loginpage(page);
  await Login.gotoLoginPage();
  await Login.fillAllDetailPerson(profile);
  await Login.selectSubject(subject);
  await Login.selectLocation(location);
  await Login.selectHobbies(hobbies);

  await Login.Submit.click();

  await expect(page.locator('#example-modal-sizes-title-lg')).toContainText('Thanks for submitting the form');
  await Login.checkDetail(profile, subject, hobbies, location);
});

test('fill must data', async ({ page }) => {

  const mustProfile = profile;
  mustProfile.address = "";
  mustProfile.picture = "";
  mustProfile.email = "";
  mustProfile.birthDate = "";

  const Login = new Loginpage(page);
  await Login.gotoLoginPage();
  await Login.fillMustDetailPerson(mustProfile);

  await Login.Submit.click();

  await expect(page.locator('#example-modal-sizes-title-lg')).toContainText('Thanks for submitting the form');
  await Login.checkDetail(profile);
});
