export class PostedArticlePage {
    constructor(page) {
        this.page = page;
        this.articleHeader = page.getByRole("heading");
        this.enterCommentField = page.getByRole("textbox", { name: "Write a comment..." });
        this.postCommentButton = page.getByRole("button", { name: "Post Comment" });
        this.commentText = page.locator('.card-block').getByRole("paragraph");
        this.deleteCommentButton = page.locator(".card-footer").getByRole("button").locator("i");
        this.editArticleButton = page.locator(".banner").getByRole("button", { name: "Edit Article" })
        this.deleteArticleButton = page.locator(".banner").getByRole("button", { name: "Delete Article" })
    }
    getArticleTitle() {
        return this.articleHeader;
    }
    getCommentText() {
        return this.commentText;
    }
    async leaveComment(comment) {
        await this.enterCommentField.click();
        await this.enterCommentField.fill(comment);
        await this.postCommentButton.click();
    }
    async deleteComment() {
        this.page.once('dialog', async (dialog) => {

            await dialog.accept()
        });
        await this.deleteCommentButton.click();

    }
    async editArticle() {
        await this.editArticleButton.click();
    }
    async deleteArticle() {
        this.page.once('dialog', async (dialog) => {

            await dialog.accept()
        });
        await this.deleteArticleButton.click();
    }
}

