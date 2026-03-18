export class NewArticlePage {
    constructor(page) {
        this.page = page;
        this.articleTitle = page.getByRole("textbox", { name: "Article Title" });
        this.articleDesc = page.getByRole("textbox", { name: "What's this article about?" });
        this.articleContent = page.getByRole("textbox", { name: "Write your article (in markdown)" });
        this.articleTag = page.getByRole("textbox", { name: "Enter tags" });
        this.articlePublish = page.getByRole("button", { name: "Publish Article" });
        this.newarticle = page.getByRole('link', { name: 'New Article' });
    }
    async createArticle() {
        await this.newarticle.click();
    }
    
    async publishArticle(article) {
        const { title, description, body, tag } = article;

        await this.articleTitle.click();
        await this.articleTitle.fill(title);
        await this.articleDesc.click();
        await this.articleDesc.fill(description);
        await this.articleContent.click();
        await this.articleContent.fill(body);
        await this.articleTag.click();
        await this.articleTag.fill(tag);
        await this.articlePublish.click();
    }
}

/*
    1. Перейти на страницу New article через yourfeed --
    2. Заполнить тайтл. --
    3. заполнить описание.
    4. заполнить тело статьи.
    5. заполнить тег.
    6. нажать publish article.
    7. Проверить что на странице опубликованной статьи заголовок совпадает с вписанным заголовком
*/