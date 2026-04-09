export class EditArticlePage {
    constructor(page) {
        this.page = page;
        this.articleBody = page.getByRole("textbox", { name: "Article Title" });
        this.updateButton = page.getByRole("button", {name: "Update Article"});
    }
    async updateArticle(title) {
        await this.articleBody.clear();
        await this.articleBody.fill(title);
        await this.updateButton.click();
    }
}