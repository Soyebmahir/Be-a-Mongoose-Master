## Project Initialization

- npm init -y

### Installation

- npm install express
- npm i mongoose
- npm install typescript --save-dev
- npm i cors
- npm i dotenv

### Typescript json file initialize

- tsc -init -- changes the rootdir and outdir path

### create an app.ts file inside src and write down a demo in app.ts

```js
const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});
// we can separate this portion in server.ts
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
```

```js
// server.ts
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('atlas url');
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

# dotenv

### create a folder under src folder and config folder under app folder and index.ts file

### here we define the .env file with process (current Working directory(cwd))

- if we can join the dontenv file to current working directory then It will be easy to process with with dotenv variables

# To join this in app/config/index.ts

```js
app / config / index.ts;
```

```js
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join((process.cwd(), '.env')) });
```

### Typescript Eslint Prettier setup

### https://blog.logrocket.com/linting-typescript-eslint-prettier/

- set some issue with help of that doc

```js
//this part have to include in ts config file inside curly bracket. I set it at top
"include": ["src"], // which files to compile
  "exclude": ["node_modules"], // which files to skip
```

## Then install this

```bash
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

## Then create a configuration file using the CLI. Run the following command in the terminal: need to answer several question

```bash
npx eslint --init

```

## Need to include this to package.json in start

```js
"scripts": {
    "lint": "eslint src --ignore-path .eslintignore --ext .ts"
   },
   //need to add src after eslint and remove the .js extension
```

```bash
// to find out any error manually
npm run lint
```

```bash
// to fix those error
npx eslint src --fix
```

## But we will create a script with this fix command

```bash
"fix":"npx eslint src --fix"
//now we can command - npm run fix
```

## we can set rules inside eslintrc.json ->inside rules{}

```js
"rules": {
        "no-unused-vars": "error",
        "no-unused-expressions":"error",
        "prefer-const":"warn",
        "no-console":"warn",
        "no-undef":"error"
    }
```

### no-undef will error the global variables so we need to set global in eslintrc.json

```js
"rules": {
        "no-unused-vars": "error",
        "no-unused-expressions":"error",
        "prefer-const":"warn",
        "no-console":"warn",
        "no-undef":"error"
    },
    "globals": {
        "process":"readonly"
    }
```

# Now install prettier

## must read doc

```bash
npm install --save-dev prettier
```

### need to create a file called .prettierrc.json in the project’s root directory, where you can define your format options.

```js
// .prettierrc.json
{
  "semi": false, // Specify if you want to print semicolons at the end of statements
  "singleQuote": true, // If you want to use single quotes

}
```

## we can fix any format issue :

```bash
npx prettier --write file-path

```

### we can create script with this

```js
"format": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\""


// package.json

{
  // ...
  "scripts": {
    "dev": "tsc --watch",
    "lint": "eslint --ext .js,.ts .",
    "format": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\""
  },
  // ...
}
```

```js
// settings.json
{
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,
...
}
```

## To avoid conflict between eslint and prettier

add this to .eslintrc.json
"extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],

```bash
npm install --save-dev eslint-config-prettier
```

# start the server

### slow process

- npm run dev
- node .dist/server.js

## fast process

### create script in package.json

```js
"start:prod":"node ./dist/server.js"
"start:dev":"ts-node-dev --respawn --transpile-only .\src\server.ts"
```

# With typescript

# flow

1. interface / type
2. schema
3. model
4. DB Query

# validator

- Build in validate
- custom validate
- npm validator // Third party

```ts
firstName: {
        type: String,
        //build in validators
        required: [true, 'First Name is Required'],
        maxlength: [20, 'First name must be less than 20 character'],
        trim: true,
        // customs validator
        validate: {
            validator: function (value: string) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
                return value === firstNameStr
            },
            message: '{VALUE} should be in capitalize format.'
        }
    },
```

# npm validator

### which is not ts supported by default so we should install these type with dependency

```bash
npm i -D types@validator
```

# joi -> another validator library

# zod -> another validator library which is support ts directly

# Get Current Path

- 1st path

```js
process.cwd();
```

- 2nd way

```js
__dirname;
```

## Configure dotenv :

- create 📁configs at src/app/.
- create a index.ts file :
- Inside index.ts file :-

```js
import dotenv from 'dotenv';
import path from 'path';

// dotenv setup with process.cwd() :
dotenv.config({ path: path.join(process.cwd() + '.env') });
// console.log(process.cwd() + ".env");

export = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URI,
};
```

# Some Middleware

## - Global Error Handler :

```ts
import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = err.message || 'something went wrong';

  return res.status(statusCode).json({
    success: true,
    message,
    err: '',
  });
};

export default globalErrorHandler;
```

# \* NotFound Route Middleware:

```ts
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found',
    error: '',
  });
};
```

# Router Management :

- Create a 📁 routes

- Then create a index.ts file

- create an object with routes and it's path

- then loop the route and use router.use(router.path, router.route)

### Example :

```ts
import express from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { userRouter } from '../modules/user/user.route';

const router = express.Router();

// router.use('/students', StudentRoutes);
// router.use('/users', userRouter);

const modulesRoute = [
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/users',
    route: userRouter,
  },
];

modulesRoute.forEach((route) => router.use(route.path, route.route));

export default router;
```

# Hoc Function In Express JS:

### catchAsync: It's a HOC Function thats helps us to don't repeat try and catch

### Syntax:

```ts
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
```

### use Case:

```ts
const getAllStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const students = await StudentServices.getAllStudentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: students,
  });
});
```

#Utility Functions:

## sendResponse : Send Response helps us don't repeat response code .

### Syntax:

```ts
import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
```

## use Case:

```ts
const getAllStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const students = await StudentServices.getAllStudentFromDB();

  // send response use to send message on client side :
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: students,
  });
});
```
