# playwright-countriestrevorblade_api

GraphQl API testing in [Trevorblades Countries](https://trevorblades.github.io/countries/queries/continent). This project contains basic examples on how to use playwright to test GraphQl API tests. Good practices such as hooks, custom commands and tags, among others, are used. All the necessary support documentation to develop this project is placed here.

# Pre-requirements:

| Requirement                   | Version | Note                                                            |
| :---------------------------- |:--------| :---------------------------------------------------------------|
| Node.js                       | 18.18.0 | -                                                               |
| npm                           | 10.2.4  | -                                                               |
| Playwright                    | 1.52.0  |                                                                 |
| Visual Studio Code            | 1.89.1  | -                                                               |
| Playwright Test for VSCode    | 1.1.14  | Optional. Recommended so you can run tests in VSC.              |               

# Installation:

- See [Node.js page](https://nodejs.org/en) and install the aforementioned Node.js version. Keep all the preferenced options as they are.
- Execute ```npm init playwright@latest``` to start a project.
  - Hit :point_right:**Enter** to select TypeScript.
  - Hit :point_right:**Enter** to put your end-to-end tests in \tests.
  - Hit :point_right:**y** to add a GitHub Actions workflow.
  - Hit :point_right:**Enter** to install Playwright browsers.
- See [Visual Studio Code page](https://code.visualstudio.com/) and install the latest VSC stable version. Keep all the prefereced options as they are until you reach the possibility to check the checkboxes below: 
  - :white_check_mark: Add "Open with code" action to Windows Explorer file context menu. 
  - :white_check_mark: Add "Open with code" action to Windows Explorer directory context menu.
Check then both to add both options in context menu.
- Look for Playwright Test for VSCode in the extensions marketplace and install the one from Microsoft.

# Tests:

- Execute ```npx playwright test tests/api/languages.spec.ts``` to run tests in languages.spec.ts. 
- Execute ```npx playwright test``` to run all tests.
- Hit :point_right:**Testing** button on left side bar in VSC and choose the tests you want to execute.tags in Powershell.

# Support:

- [Installation](https://playwright.dev/docs/intro)
- [Read/Write JSON Files with Node.js](https://heynode.com/tutorial/readwrite-json-files-nodejs/?utm_source=youtube&utm_medium=referral+&utm_campaign=YT+description&utm_content=read-write-json-iles-with-nodejs)
- [Assertions](https://playwright.dev/docs/test-assertions)
- [How to Delete a File From a Directory with Node.js](https://coderrocketfuel.com/article/how-to-delete-a-file-from-a-directory-with-node-js)
- [How to resolve Node.js: "Error: ENOENT: no such file or directory"](https://stackoverflow.com/a/62363729/10519428)
- [How to wait for a specific API response in your Playwright end-to-end tests](https://www.youtube.com/watch?v=5CER0dKweyw)
- [How to remove specific character surrounding a string?](https://stackoverflow.com/a/44537491/10519428)
- [Tag tests](https://playwright.dev/docs/test-annotations#tag-tests)
- [[Feature]: Support Ubuntu 24.04 #30368](https://github.com/microsoft/playwright/issues/30368)
- [countries.trevorblades](https://countries.trevorblades.com/)
- [API testing](https://playwright.dev/docs/api-testing)
- [Introduction to GraphQL](https://graphql.org/learn/)
- [continent](https://trevorblades.github.io/countries/queries/continent)
- [Command line](https://playwright.dev/docs/test-cli)

# Tips:

- Try keep GraphQL requests easy to read/code.
