import { faker } from '@faker-js/faker';

export class UserBuilder {
    withUsername() {
        this.username = faker.person.fullName();
        return this;
    }

    withEmail() {
        this.email = faker.internet.email();
        return this;
    }

    withPassword() {
        this.password = faker.internet.password();
        return this;
    }

    build() {
        const result = {...this};
        return result;
    }
}