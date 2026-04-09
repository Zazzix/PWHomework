import { test, expect } from '@playwright/test';
import { MainPage } from '../src/pages/main.page';
import { RegisterPage } from '../src/pages/register.page';
import { YourFeedPage } from '../src/pages/yourfeed.page';
import { NewArticlePage } from '../src/pages/newarticle.page';
import { PostedArticlePage } from '../src/pages/postedarticle.page';
import { EditArticlePage } from '../src/pages/editarticle.page';
import { ProfilePage } from '../src/pages/profile.page';
import { UserBuilder, ArticleBuilder } from '../src/helpers/builders/index';


test('User can register with a valid data', async ({ page }) => {
    const main = new MainPage(page);
    const register = new RegisterPage(page);
    const yourfeed = new YourFeedPage(page);
    const user = new UserBuilder().withUsername().withEmail().withPassword().build();

    await main.open();
    await main.gotoRegister();
    await register.signup(user);
    await expect(yourfeed.getProfileName()).toContainText(user.username);
});

test('User can write an article', async ({ page }) => {
    const main = new MainPage(page);
    const register = new RegisterPage(page);
    const newarticle = new NewArticlePage(page);
    const postedarticle = new PostedArticlePage(page);
    const user = new UserBuilder().withUsername().withEmail().withPassword().build();
    const article = new ArticleBuilder().withTitle().withDescription().withBody().withTag().build();


    await main.open();
    await main.gotoRegister();
    await register.signup(user);
    await newarticle.createArticle();
    await newarticle.publishArticle(article);
    await expect(postedarticle.getArticleTitle()).toContainText(article.title);
});

test('User can comment own article', async ({ page }) => {
    const main = new MainPage(page);
    const register = new RegisterPage(page);
    const newarticle = new NewArticlePage(page);
    const postedarticle = new PostedArticlePage(page);
    const user = new UserBuilder().withUsername().withEmail().withPassword().build();
    const article = new ArticleBuilder().withTitle().withDescription().withBody().withTag().build();

    const newComment = new ArticleBuilder().withComment().build();

    await main.open();
    await main.gotoRegister();
    await register.signup(user);
    await newarticle.createArticle();
    await newarticle.publishArticle(article);
    await postedarticle.leaveComment(newComment.comment);
    await expect(postedarticle.getCommentText()).toContainText(newComment.comment);
});

test('User can delete own comment', async ({ page }) => {
    const main = new MainPage(page);
    const register = new RegisterPage(page);
    const newarticle = new NewArticlePage(page);
    const postedarticle = new PostedArticlePage(page);
    const user = new UserBuilder().withUsername().withEmail().withPassword().build();
    const article = new ArticleBuilder().withTitle().withDescription().withBody().withTag().build();

    const newComment = new ArticleBuilder().withComment().build();

    await main.open();
    await main.gotoRegister();
    await register.signup(user);
    await newarticle.createArticle();
    await newarticle.publishArticle(article);
    await expect(postedarticle.getCommentText()).not.toBeVisible();
    await postedarticle.leaveComment(newComment.comment);
    await expect(postedarticle.getCommentText()).toBeVisible();
    await postedarticle.deleteComment();
    await expect(postedarticle.getCommentText()).not.toBeVisible();
});

test('User can edit article', async ({ page }) => {
    const main = new MainPage(page);
    const register = new RegisterPage(page);
    const newarticle = new NewArticlePage(page);
    const postedarticle = new PostedArticlePage(page);
    const editarticle = new EditArticlePage(page)
    const user = new UserBuilder().withUsername().withEmail().withPassword().build();
    const article = new ArticleBuilder().withTitle().withDescription().withBody().withTag().build();

    const newTitle = new ArticleBuilder().withTitle().build();


    await main.open();
    await main.gotoRegister();
    await register.signup(user);
    await newarticle.createArticle();
    await newarticle.publishArticle(article);
    await expect(postedarticle.getArticleTitle()).toContainText(article.title);
    await postedarticle.editArticle();
    await editarticle.updateArticle(newTitle.title);
    await expect(postedarticle.getArticleTitle()).toContainText(newTitle.title);
});


test('User can delete an article', async ({ page }) => {
    const main = new MainPage(page);
    const register = new RegisterPage(page);
    const newarticle = new NewArticlePage(page);
    const postedarticle = new PostedArticlePage(page);
    const profilePage = new ProfilePage(page);
    const yourfeed = new YourFeedPage(page);
    const user = new UserBuilder().withUsername().withEmail().withPassword().build();
    const article = new ArticleBuilder().withTitle().withDescription().withBody().withTag().build();


    await main.open();
    await main.gotoRegister();
    await register.signup(user);
    await newarticle.createArticle();
    await newarticle.publishArticle(article);
    await expect(postedarticle.getArticleTitle()).toContainText(article.title);
    await postedarticle.deleteArticle();
    await expect(yourfeed.getArticleFeed()).toContainText("Articles not available.");
    await profilePage.openProfile();
    await expect(profilePage.getArticlesList()).toContainText(`${user.username} doesn't have articles.`);
});