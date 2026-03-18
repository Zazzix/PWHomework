import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page';
import { RegisterPage } from '../src/pages/register.page';
import { YourFeedPage } from '../src/pages/yourfeed.page';
import { NewArticlePage } from '../src/pages/newarticle.page';
import { PostedArticlePage } from '../src/pages/postedarticle.page';

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

test.only('User can write an article', async ({ page }) => {
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
