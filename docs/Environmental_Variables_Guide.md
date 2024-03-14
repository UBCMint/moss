# Environmental Variables

Authors: Trevor Liu

Created: 3/11/2024

Updated: 3/14/2024

## Overview

This is all relevant documentation for the Next.js environmental variables, and corresponding .ENV files.

## How to use

1. **Create a .ENV file**: Begin by creating a `.ENV` file in the root directory (Same level as `.env.example`). This file will hold all your environmental variables. Copy the formatting of .ENV.EXAMPLE. 

**Note:** Make sure the .ENV file is included in the .gitignore, so information such as API keys are not posted publically.  

2. **Define Environmental Variables**: Inside the `.ENV` file, define your environmental variables in the format `KEY=VALUE`. For example:

```

NEXT_PUBLIC_API_ROUTE = https://example.com/api

```

4. **Accessing Environmental Variables in Your Code** 

In order to use the key-value pairs, you can directly access your .env file through 'process.env'.

```

const serverUrl = process.env.NEXT_PUBLIC_API_ROUTE;

```