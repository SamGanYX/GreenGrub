# Developer Documentation  

The developer documentation is designed to give guidance to software developers introduced in contributing to **GreenGrub**.  

## Obtaining The Source Code  

All the project code is hosted in this GreenGrub directory so downloaded it is simple just follow these steps.

- In command prompt navigate to the directory you want the code in.  
- Type the following command:  
 > `git clone https://github.com/SamGanYX/GreenGrub.git`

> **Important Note:** The code has several secret Keys for our database and APIs for the code to run you will need to set one up in the frontend and backend folder and contact us to get access to these.

## Directory Structure

We follow a standard directory layout for apps with a frontend and backend.
This breakdown includes all the most important folders to know about.

GREENGRUB/
├── docs/              # User and developer documentation
├── .github/           # GitHub-specific configurations (e.g., workflows)
├── .vscode/           # VSCode-specific configurations (e.g., workflows)
├── README.md          # Project overview and usage
├── backend/           # Contains all backend source code
    └──  src/          # Backend source code
         ├── tests/         # Unit and integration tests for backend
         └──  main/          # Contains backend folders for MVC architecture (model, controller, repository)
└──  frontend/         # Contains all frontend source code
     ├── app/              # Entry point and routing for the app (e.g., navigation, screens)
     ├── assets/           # Static resources such as images, fonts, and icons
     ├── components/       # Reusable UI components used across screens
     └── constants/        # Centralized configuration (e.g., theme, colors, strings)

## How to build the software

To build the backend:
- Navigate to the backend folder.
- Run the following command:
> `mvn spring-boot:run` (if maven is installed globally)
> `./mvnw spring-boot:run` (otherwise)

To build the frontend:
- Navigate to the frontend folder.
- Run the following command:
> `npm start`

## Running the tests

To run the backend tests:
- Naviage to the backend folder.
- Type the following command:
> `mvn test`

To run the frontend tests:
- Naviage to the frontend folder.
- Type the following command:
> `npm run test`

## Contributing new tests:

We have some general guidelines and then specific guidelines for frontend or backend tests.

General Guidelines:
- Each test should have the word test in the method name
- Each test should have a descriptive method name to describe what it is testing
- Test each branch your code could go into (for example if there's an if statement write at least one test where the code in the if is executed and one where it isn't).

Frontend Guidelines:
- We use Jest.
- Refer to this website with questions: https://jestjs.io/docs/getting-started

Backend Guidelines:
- We use JUnit.
- Refer tho this website with questions: https://junit.org/junit5/docs/current/user-guide/
- Tests should be written in the FullstackBackendApplicationTests.java file

## Build a Release of this Software

`Note:` This is still being setup
- Make sure all tests build
- Run the following lines of code:
> `git tag -a vX.Y.Z -m "Release vX.Y.Z"`
> `git push origin vX.Y.Z`
- Update to the latest version number in the release notes.