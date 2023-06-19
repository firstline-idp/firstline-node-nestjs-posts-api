# Firstline NestJS Integration Example (Posts Api)

This examples feature a NestJS application using Firstline as Identity Provider. It is secured using JWTs which are verified by passport using your organisation JWKS.

This example also shows how to use roles and scopes for access management and has placeholders for where you could fetch your users if you choose to connect this sample with a database.

## How to use

- go to https://admin.firstline.sh and complete the quickstart (you should now have atleast 1 application and 1 api)
- copy sample.env as .env
- replace tenant with your {tenant} which can be found on under your organisation settings
- replace {audience} with the your Api identifier

```bash
yarn install
yarn start:dev
```

you can also use npm here

We recommend using one of our Frontend Examples to interact with the Posts-Api:

- https://github.com/firstline-idp/firstline-react-posts-api
- https://github.com/firstline-idp

