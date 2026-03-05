import dayjs from "dayjs";
import { expect } from "@playwright/test";

exports.Loginpage = class LoginPage {
  constructor(page) {
    this.page = page;

    this.fname_box = page.getByRole("textbox", { name: "First Name" });
    this.lname_box = page.getByRole("textbox", { name: "Last Name" });
    this.email_box = page.getByRole("textbox", { name: "name@example.com" });

    this.mobile_box = page.getByRole("textbox", { name: "Mobile Number" });
    this.birthDate_box = page.locator("#dateOfBirthInput");

    this.Picture_file = page.getByRole("button", { name: "Choose File" });
    this.address_box = page.getByRole("textbox", { name: "Current Address" });

    this.State = page.locator(
      "#state > .css-13cymwt-control > .css-hlgwow > .css-19bb58m",
    );
    this.City = page.locator(
      "#city > .css-13cymwt-control > .css-hlgwow > .css-19bb58m",
    );
    this.Submit = page.getByRole("button", { name: "Submit" });
  }

  async gotoLoginPage() {
    await this.page.goto("https://demoqa.com/automation-practice-form");
  }

  async fillAllDetailPerson(profile) {
    await this.fname_box.fill(profile.fname);
    await this.lname_box.fill(profile.lname);
    await this.email_box.fill(profile.email);
    await this.selectGender(profile.gender);
    await this.selectBirthDate(profile.birthDate);
    await this.mobile_box.fill(profile.mobile);
    await this.address_box.fill(profile.address);
    await this.Picture_file.setInputFiles(profile.picture);
  }

   async fillMustDetailPerson(profile) {
    await this.fname_box.fill(profile.fname);
    await this.lname_box.fill(profile.lname);
    await this.selectGender(profile.gender);
    await this.mobile_box.fill(profile.mobile);
   }

  async selectGender(type) {
    if (type == "") return;
    await this.page.getByRole("radio", { name: type, exact: true }).click();
  }

  async selectHobbies(hobbies) {
    if (hobbies)
      for (const n of hobbies) {
        await this.page.getByRole("checkbox", { name: n }).check();
      }
  }
  
  async selectLocation (location) {
    await this.State.click();
    await this.page.getByRole("option", { name: location.state }).click(); 

    await this.City.click();
    await this.page.getByRole("option", { name: location.city }).click();

  }

  async selectBirthDate(date) {
    const convertDate = dayjs(date);

    await this.birthDate_box.click();
    await this.page
      .locator(
        'xpath=//*[@id="dateOfBirth"]/div[2]/div[2]/div/div/div/div/div[1]/div/div[2]/select',
      )
      .selectOption(String(convertDate.year()));
    await this.page
      .locator(
        "xpath=/html/body/div/div/div/div/div[2]/div[1]/form/div[5]/div[2]/div[2]/div[2]/div/div/div/div/div[1]/div/div[1]/select",
      )
      .selectOption(String(convertDate.month()));
    await this.page
      .getByRole("gridcell", {
        name: `Choose ${convertDate.format("dddd")}, ${convertDate.format("MMMM")} ${convertDate.date()}`,
      })
      .click();
  }

  async selectSubject(subject) {
    if (subject)
      for (const n of subject) {
        await this.page
          .locator(".subjects-auto-complete__input-container")
          .click();
        await this.page.locator("#subjectsInput").fill(n);
        await this.page.locator("#subjectsInput").press("Enter");
      }
  }

  async deleteSubject(subject) {
    for (const n of subject) {
            await this.page.getByRole('button', { name: `Remove ${n}` }).click();
        }
  }

  async getSubjectSelected() {
    const obj = await this.page.locator('.subjects-auto-complete__multi-value.css-1p3m7a8-multiValue').all();
    let subjectsSelected = [];
    for (const o of obj) {
        subjectsSelected.push(await o.innerText());
    }
    return subjectsSelected;
  }


  async checkDetail(profile, subject, hobbies, location) {
    
    // Must have for Login
    await expect(this.page.getByRole("cell", { name: profile.fname + " " + profile.lname }),).toBeVisible();
    await expect(this.page.getByRole("cell", { name: profile.gender })).toBeVisible();
    await expect(this.page.getByRole("cell", { name: profile.mobile })).toBeVisible();

    // Optional
    if (profile.birthDate != "")
      await expect(this.page.getByRole("cell", { name: dayjs( profile.birthDate ).format("D MMMM,YYYY") })).toBeVisible();
    if (profile.email != "")
      await expect(this.page.getByRole("cell", { name: profile.email })).toBeVisible();
    if (subject)
      await expect(this.page.getByRole("cell", { name: subject.join(", ") }),).toBeVisible();
    if (hobbies)
      await expect(this.page.getByRole("cell", { name: hobbies.join(", ") }),).toBeVisible();
    if (profile.picture != "")
      await expect(this.page.getByRole("cell", { name: profile.picture.split("/")[2] }),).toBeVisible();
    if (profile.address != "")
      await expect(this.page.getByRole("cell", { name: profile.address })).toBeVisible();
    if (location)
      await expect(this.page.getByRole("cell", { name: location.state + " " + location.city }),).toBeVisible();
  }
};
