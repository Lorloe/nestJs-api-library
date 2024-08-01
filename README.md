## Check this everyday

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
# take note
# User update(just update email and name, password has been change from can update to can not update because can not hash password after update)
# Now you have to login take a token(bearer token) to create a book(will add this to another endpoint)
# Save id user when you create a book
# +1 idea: when you update a book, it's save id user into a book but do not overriding to the id user has been created a book before

