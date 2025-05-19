# Developer Documentation  

The developer documentation is designed to give guidance to software developers introduced in contributing to **GreenGrub**.  

## Obtaining The Source Code  

All the project code is hosted in this GreenGrub directory so downloaded it is simple just follow these steps.

- In command prompt navigate to the directory you want the code in.  
- Type the following command:  
 > git clone https://github.com/SamGanYX/GreenGrub.git

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