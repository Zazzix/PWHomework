export class YourFeedPage {
    constructor(page) {
        this.page = page;
        this.profileName = page.getByRole('navigation');
        this.articlesFeed = page.locator('.article-preview');
    }
    getProfileName() {
        return this.profileName;
    }
    getArticleFeed() {
        return this.articlesFeed;
    }
}

