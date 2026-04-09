import { faker } from '@faker-js/faker';

export class ArticleBuilder {
    withTitle() {
        this.title = faker.lorem.sentence(2);
        return this;
    }

    withDescription() {
        this.description = faker.lorem.sentence(4);
        return this;
    }

    withBody() {
        this.body = faker.lorem.sentence();
        return this;
    }

    withTag() {
        this.tag = faker.lorem.word();
        return this;
    }
    withComment() {
        this.comment = faker.lorem.sentence();
        return this;
    }
    build() {
        const result = { ...this };
        return result;
    }
}