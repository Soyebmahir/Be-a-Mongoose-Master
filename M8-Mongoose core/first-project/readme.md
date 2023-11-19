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
