import { faker } from '@faker-js/faker';

export const RANDOM_ID = faker.number.int({ min: 1, max: 10 }).toString();
export const NAME_USER = faker.person.firstName();
export const EMPTY = "";
export const LAST_NAME_USER = faker.person.lastName();
export const MAILINATOR_DOMAIN = "@mailinator.com";
export const EMAIL_USER = `${NAME_USER}${RANDOM_ID}${MAILINATOR_DOMAIN}`;
export const COMPANY = faker.company.name();
export const MESSAGE = `Hello, I'm ${NAME_USER} ${LAST_NAME_USER} of the company ${COMPANY}. This is my email: ${EMAIL_USER}`;