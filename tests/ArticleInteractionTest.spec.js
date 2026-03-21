import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page';
import { RegisterPage } from '../src/pages/register.page';
import { YourFeedPage } from '../src/pages/yourfeed.page';
import { NewArticlePage } from '../src/pages/newarticle.page';
import { PostedArticlePage } from '../src/pages/postedarticle.page';
import { EditArticlePage } from '../src/pages/editarticle.page';
import { ProfilePage } from '../src/pages/profile.page';

const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.person.fullName(),
}

const article = {
    title: faker.lorem.sentence(2),
    description: faker.lorem.sentence(4),
    body: faker.lorem.sentence(),
    tag: faker.lorem.word(),
}

test('User can register with a valid data', async ({ page }) => {
    const main = new MainPage(page);
    const register = new RegisterPage(page);
    const yourfeed = new YourFeedPage(page);


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

    const newComment = faker.lorem.sentence();

    await main.open();
    await main.gotoRegister();
    await register.signup(user);
    await newarticle.createArticle();
    await newarticle.publishArticle(article);
    await postedarticle.leaveComment(newComment);
    await expect(page.getByText(newComment)).toBeVisible();
});

test('User can delete own comment', async ({ page }) => {
    const main = new MainPage(page);
    const register = new RegisterPage(page);
    const newarticle = new NewArticlePage(page);
    const postedarticle = new PostedArticlePage(page);

    const newComment = faker.lorem.sentence();


    await main.open();
    await main.gotoRegister();
    await register.signup(user);
    await newarticle.createArticle();
    await newarticle.publishArticle(article);
    await expect(page.getByText(newComment)).not.toBeVisible();
    await postedarticle.leaveComment(newComment);
    await expect(page.getByText(newComment)).toBeVisible();
    await postedarticle.deleteComment();
    await expect(page.getByText(newComment)).not.toBeVisible();
});

test('User can edit article', async ({ page }) => {
    const main = new MainPage(page);
    const register = new RegisterPage(page);
    const newarticle = new NewArticlePage(page);
    const postedarticle = new PostedArticlePage(page);
    const editarticle = new EditArticlePage(page)

    const newTitle = faker.lorem.sentence(2);


    await main.open();
    await main.gotoRegister();
    await register.signup(user);
    await newarticle.createArticle();
    await newarticle.publishArticle(article);
    await expect(postedarticle.getArticleTitle()).toContainText(article.title);
    await postedarticle.editArticle();
    await editarticle.updateArticle(newTitle);
    await expect(postedarticle.getArticleTitle()).toContainText(newTitle);
});


test.only('User can delete an article', async ({ page }) => {
    const main = new MainPage(page);
    const register = new RegisterPage(page);
    const newarticle = new NewArticlePage(page);
    const postedarticle = new PostedArticlePage(page);
    const profilePage = new ProfilePage(page);


    await main.open();
    await main.gotoRegister();
    await register.signup(user);
    await newarticle.createArticle();
    await newarticle.publishArticle(article);
    await expect(postedarticle.getArticleTitle()).toContainText(article.title);
    await postedarticle.deleteArticle();
    await expect(page.getByText("Articles not available.")).toBeVisible();
    await profilePage.openProfile();
    await expect(page.getByText(`${user.username} doesn't have articles.`)).toBeVisible();
});