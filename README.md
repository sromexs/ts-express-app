# **Code Improvement and Documentation**

### Introduction

This project aims to enhance an existing codebase by making improvements and providing comprehensive documentation. The code will be modified to enhance its functionality, efficiency, and readability, while the documentation will provide a clear explanation of the changes made.

### Goals

- Improve code functionality: Analyze the existing codebase and identify areas that can be enhanced to optimize performance and address any bugs or issues.
- Enhance code efficiency: Review the code for any redundant or inefficient operations and implement more efficient alternatives.
- Refactor code readability: Rewrite complex or convoluted sections of code to make it more readable, maintainable, and easier to understand for other developers.
- Version control with Git: Upload the modified codebase and documentation to a GitHub repository to track changes.

### Technologies Used

- Programming Language: Typescript
- Version Control: Git

### Steps

1. Analyze the existing codebase: Thoroughly examine the original code to identify areas for improvement, such as performance bottlenecks, redundant operations, or complex sections that can be simplified.
2. Modify the code: Make the necessary changes to enhance functionality, efficiency, and readability. Focus on improving algorithmic efficiency, removing code duplication, and enhancing error handling.
3. Add comments: Insert detailed comments throughout the codebase, explaining the purpose of each function, class, and major code block. These comments should provide insights into the logic behind the code.
4. Upload to GitHub: Create a repository on GitHub and push the modified codebase and the Markdown file. Ensure that the repository is well-organized with clear instructions on how to navigate and utilize the code.

## Package.json Changes

### Simplified Dependencies

The list of dependencies has been significantly reduced. Unnecessary or redundant dependencies have been removed, resulting in a leaner package.

### Updated Dependency Versions

The versions of some dependencies have been updated to their latest compatible versions. This ensures that the project benefits from bug fixes, performance improvements, and new features provided by the updated dependencies.

### Updated Scripts

The scripts section has been modified to reflect the changes made in the project structure and build process.

The `"dev"` script now uses Nodemon to monitor changes in the `"build/index.js"` file and automatically restart the server.
The `"watch"` script uses the `"tsup"` package to watch for changes in the TypeScript files and recompiles them.
The `"start"` script first compiles the TypeScript files using `"tsup"` and then runs the compiled `"build/index.js"` file using Node.
The `"pm2"` script utilizes the `"pm2"` package to start the application with PM2, a process manager for Node.js applications.

### Updated Development Dependencies

The devDependencies section includes updated versions of development-specific dependencies and added `"@types/node"` to provide TypeScript definitions for Node.js.

### Removed Unused Dependencies

Some devDependencies and dependencies, such as `"chart.js"`, `"dotenv"`, `"body-parser"`, `"lodash"`, `"luxon"`, and `"@typescript-eslint/eslint-plugin,"` have been removed as they may no longer be needed in the revised project structure.

## Tsconfig.json Changes

- `"target": "ESNext"`: Sets the target ECMAScript version to the latest available, which allows the usage of the newest JavaScript features and syntax.

- `"lib": ["ESNext", "DOM"]`: Specifies the libraries to be included automatically during compilation. In this case, it includes "ESNext" and "DOM," providing typings for browser-related APIs.

## Code Changes

### Router.ts

The global `router.ts` file is used to control all APIs for better management and to avoid missing or losing any APIs. This approach offers several benefits:

- **Better Control:** Having a single file to manage all APIs provides better control and organization, ensuring that no APIs are overlooked or lost.
- **Improved Readability:** Keeping routes in one file enhances code readability, making it easier to understand the API endpoints and their corresponding controllers.
- **Code Maintainability:** With all routes consolidated in a single file, code maintenance becomes more straightforward, allowing for easier updates or modifications.
- **Leveraging Experience:** This idea stems from years of experience, recognizing the benefits of a centralized router for improved code organization.

### Mongodb And Mongoose

In this code, we have replaced multiple instances of using MongoDB in the previous code with just one instance. We now only need to connect to MongoDB with Mongoose `version 7` once at the beginning of the program. There is no longer a need to connect and disconnect multiple times.

```typescript
async connectMongodb() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(Config.dbConfig);
    console.log("\x1b[33m%s\x1b[0m", "Connected to Database Successfully.");
  } catch {
    throw new Error("Failed To Connect Database.");
  }
}
```

Additionally, with Mongoose 7, there is no need to use `"useNewUrlParser"` and `"useUnifiedTopology"`, so we have removed these parts as well. We have moved the Mongoose connect function to an outer file called `"starter.ts"` and included it in the "index.ts" file.

### DotEnv

We decided to remove the `dotenv` package due to its occasional compatibility issues with `ESNext`. Instead, we opted for a custom local script called `EnvConfig.ts` to read the content of the `.env` file and retrieve the data from it. This approach ensures a more reliable solution, especially when working with different ESNext versions. Additionally, the retrieved data is stored in variables within `mainConfig.ts`, providing a more organized and manageable configuration process.

### Controllers

- We introduced controllers to encapsulate the functionality and make the code more readable and maintainable. Inside the controllers, we utilized a singleton class approach to ensure that the class is instantiated only once, avoiding unnecessary complications.

- By using controllers, we adopted a better approach compared to declaring functions directly inside the router, as done in the previous code. This design pattern promotes modularization and separation of concerns, making the codebase more organized and easier to navigate.

- Using a singleton class ensures that only a single instance of the class is created throughout the application, preventing duplication and potential conflicts. This approach enhances code efficiency and helps maintain consistency in data handling.

### Function Enhancement

Previous Code

```typescript
async (req, res) => {
  const favorite = await Favorite.find().lean();
  console.log(favorite);
  res.json({ favorite });
};
```

New Code

```typescript
async (_req, res) => {
  try {
    const all = await Favorite.find().lean();
    res.status(200).json(all);
  } catch (err: any) {
    console.log(`getAllFavorites: ${err.message}`);
    res.status(500).json({ msg: err.message });
  }
};
```

### In the updated code, several improvements have been made:

- **Error Handling:** A try-catch block has been added to handle potential errors that may occur during the execution of the code. If an error occurs, it is caught and logged to the console with a specific error message indicating the function where the error occurred, in this case, getAllFavorites. This helps in quickly identifying the problematic section of the code for debugging purposes.

- **Improved Naming:** The variable name favorite has been changed to `all` to better reflect that it contains all the favorites.

- **Response Status:** Instead of a generic 200 OK status, the response status has been explicitly set to 200 using `res.status(200)`. This makes it clear that the request was successful.

- **Simplified Response:** Instead of wrapping the all variable in an object with the key favorite and then sending it as `res.json({ favorite })`, the `all` variable itself is directly sent as the JSON response `res.json(all)`. This simplifies the response structure and makes it easier to work with the data on the client-side.

Overall, these improvements enhance error handling by providing specific error messages with function names, improve naming conventions, provide clearer response status, and simplify the response structure. This way, the code becomes easier to understand, maintain, and debug when errors occur in the `getAllFavorites` function.

Previous Code

```typescript
router.post("/api/profile", async (req, res) => {
  var { email, name, nickname } = req.body;

  let profile = await Profile.findOne({
    $or: [{ email }, { nickname }],
  }).exec();

  if (!profile) {
    profile = await Profile.create({ name, email, nickname });
  }

  res.json(profile);
});
```

New Code

```typescript
getOneProfile: TRoute = async (req, res) => {
  try {
    const { email, name, nickname } = <IProfileBody>req.body;

    if (!email && !name && !nickname) {
      throw new Error(
        "At least one of the fields (email, name, or nickname) must be provided"
      );
    }

    const searchCriteria = { $or: [] };
    if (email) searchCriteria.$or.push({ email });
    if (name) searchCriteria.$or.push({ name });
    if (nickname) searchCriteria.$or.push({ nickname });

    let profile = await Profile.findOne(searchCriteria).lean();

    if (!profile) {
      profile = await Profile.create({ name, email, nickname });
    }

    res.status(200).json(profile);
  } catch (err: any) {
    console.log(`getOneProfile: ${err.message}`);
    res.status(500).json({ msg: err.message });
  }
};
```

The new code improves upon the previous code in several ways:

1. **Error handling:** The new code uses a try-catch block to handle errors, which allows for better error reporting and handling. If an error occurs, the code logs the error message and returns a 500 status code with the error message in the response. This makes it easier to debug issues in the code.

2. **Input validation:** The new code checks if at least one of the fields (email, name, or nickname) is provided. If none of them are provided, it throws an error with an appropriate message. This ensures that the search criteria are valid before querying the database.

3. **Dynamic search criteria:** Instead of hardcoding the search criteria with email and nickname, the new code creates a dynamic search criteria object using the provided fields. This makes the code more flexible and easier to maintain.

4. **Lean query:** The new code uses .lean() when querying the database. This returns plain JavaScript objects instead of Mongoose documents, which can improve performance when you don't need the additional features provided by Mongoose documents.

### Seed Function

New Code

```typescript
async seed() {
  const profile = await Profile.create({
    capital: 0,
    divisa: "divisa",
    email: "email@gmail.com",
    name: "profile name",
    nickname: "nickname",
    prefered_cryptocurrency: "Bitcoin",
  });

  const profile_id = profile._id;

  await Simulator.create({
    profile_id,
    cryptocurrency: "Bitcoin",
    dateRecorded: Date.now(),
    euros: 12,
    price: 10,
    quantity: 100,
  });

  await Favorite.create({
    favorite3: "Third",
    name: "favorite name",
    profile_id,
    favorite1: "First",
    favorite2: "Second",
  });
}
```

The improvements made in the updated code are as follows:

- **Consistent Naming:** The variable names in the code have been made more descriptive and consistent. For example, idProfile has been renamed to profile_id to maintain consistency with the naming convention.

- **Async/Await:** The code now uses async/await syntax instead of .then() to handle promises. This improves code readability and makes it easier to understand the control flow.

Overall, these improvements make the code more readable, maintainable, and aligned with best practices.

### New Model Type
```typescript
import { Schema, model, Types } from "mongoose";

export interface IFavorite {
  profile_id: Schema.Types.ObjectId | string;
  name: string;
  favorite1: string;
  favorite2: string;
  favorite3: string;
}

export type ILeanFavorite = IFavorite & { _id: Types.ObjectId };

const schema = new Schema<IFavorite>(
  {
    profile_id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    favorite1: { type: String, default: "" },
    favorite2: { type: String, default: "" },
    favorite3: { type: String, default: "" },
  },
  { timestamps: true }
);

const Favorite = model<IFavorite>("Favorite", schema);
export default Favorite;
```
In the updated code, we have utilized the latest model structure provided by Mongoose, which is considered the best practice for declaring models in Mongoose 7. This updated approach enhances the readability and maintainability of the code. Mongoose introduced this new model declaration syntax on its website, promoting its usage as the recommended way to define models. By adopting this new version of Mongoose, we have effectively upgraded the model from the old version to the new one, resulting in improved code quality.

## Conclusion:
I have made several changes and added important updates to this readme. However, you will notice a significant improvement by reading the code that I have refactored. For instance, I have utilized `tsup` and `pnpm` instead of `tsc` and `npm` respectively. These are new packages that facilitate the development of better and more modern websites. I hope that I have captured your attention and that I am considered for the job.