export class PostedArticlePage {
    constructor(page) {
        this.page = page;
        this.articleHeader = page.getByRole("heading");
        this.enterCommentField = page.getByRole("textbox", { name: "Write a comment..." });
        this.postCommentButton = page.getByRole("button", { name: "Post Comment" });
        this.commentText = page.getByRole("paragraph");
        this.deleteCommentButton = page.locator(".card-footer").getByRole("button").locator("i");
    }
    getArticleTitle() {
        return this.articleHeader;
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
}

