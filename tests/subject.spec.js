import { test, expect } from '@playwright/test';
import { Loginpage } from '../setup/login';
import { getRandomSubjects, getRandomLocation, getRandomHobbies } from '../setup/randomData';

const subject = getRandomSubjects(5);

test.describe('Subject check', () => {

    // test(`subjects can be show multiple when selected more than one`, async ({ page }) => {
    //     const Login = new Loginpage(page);
        
    //     await Login.gotoLoginPage();
    //     await Login.selectSubject(subject);

    //     let subjectSelected = await Login.getSubjectSelected();
    //     await expect(subjectSelected).toEqual(subject);
    // });

    test(`subjects can show removeable button for each subject after selected`, async ({ page }) => {
        const Login = new Loginpage(page);

        await Login.gotoLoginPage();
        await Login.selectSubject(subject);

        // Get all subjects that entered on website
        let subjectSelected = await Login.getSubjectSelected();

        // Random position for remove
        const Idx = Math.floor(Math.random() * subjectSelected.length);
        const subjectForRemove = [subjectSelected[Idx]];
        subjectSelected.splice(Idx, 1);

        // Click remove subjects
        await Login.deleteSubject(subjectForRemove);

        // Recheck in website
        let subjectSelectedNew = await Login.getSubjectSelected(page);

        await expect(subjectSelectedNew.length).toEqual(subjectSelected.length);
        await expect(subjectSelectedNew).toEqual(subjectSelected);
    });

});