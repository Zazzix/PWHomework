export class PostedArticlePage {
    constructor(page) {
        this.page = page;
        this.articleHeader = page.getByRole("heading");
    }
    getArticleTitle(){
        return this.articleHeader;
    }
}