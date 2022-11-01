# Hacking JWT - Toptal

Sample Express REST API with JWT authentication/authorization.

## Creating the Project

Starting with an empty folder, initialize the Node project:

```bash
npm init -y
```

The following dependencies are required:

```bash
npm install typescript ts-node-dev express body-parser --save-dev
npm install @types/express @types/mongoose --save-dev
npm install mongoose
```

A `tsconfig` file is required for TypeScript:

```bash
npx tsc --init
```

Create a new file `src/index.ts` with the entrypoint of the API:

```typescript
import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.listen(3000, () => {
    console.log('server is listening on port 3000');
});
```

Set the scripts in the `package.json` file to:

```json
"scripts": {
    "start": "ts-node-dev src/index.ts"
  },
```

## JWT Secrets

For this set up we will be using HS256 as the algorithm for JWT. We need a secret in order to sign the payload. For this we will use the `Node` CLI to generate a secret:

```javascript
require('crypto').randomBytes(128).toString('hex');
```

Using the `crypto` package, we can generate a random string and get it's hexadecimal version. This will be our JWT secret

## MongoDB Setup

Start by checking the MongoDB version you are using:

```bash
mongo --version
```

You might receive a similar response to this:

```bash
MongoDB shell version v5.0.2
Build Info: {
    "version": "5.0.2",
    "gitVersion": "6d9ec525e78465dcecadcff99cce953d380fedc8",
    "modules": [],
    "allocator": "system",
    "environment": {
        "distarch": "x86_64",
        "target_arch": "x86_64"
    }
}
```

TODO: Homebrew expects an unexistent version of XCode on MacOS.
