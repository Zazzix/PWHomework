export class ProfilePage {
    constructor(page) {
        this.page = page;
        this.dropDownMenu = page.getByRole('navigation').locator('.dropdown-toggle');
        this.profile = page.getByRole('link', { name: 'Profile' });
    }
    async openProfile() {
        await this.dropDownMenu.click();
        await this.profile.click();
    }
}