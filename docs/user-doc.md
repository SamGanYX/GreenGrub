# GreenGrub User Manual

## What is GreenGrub?

GreenGrub is an innovative application that helps users make smarter food choices by combining nutrition tracking and environmental impact analysis in one platform. Unlike most apps that focus on either health or environmental sustainability, GreenGrub provides insights on both aspects, allowing you to make informed decisions that benefit both your health and the planet.

### Key Features

- **Barcode Scanning**: Instantly access product information by scanning food barcodes
- **Nutrition Tracking**: View detailed nutritional information for scanned products
- **Environmental Impact Analysis**: Understand the climate impact of your food choices
- **Comparison Tools**: Compare different food items based on both health and sustainability metrics
- **Personalized Priorities**: Flexibility to prioritize what matters most to you (health vs. planet)

## Installation

### Prerequisites

Before installing GreenGrub, ensure you have the following tools installed:

- Git
- Node.js
- Expo
- Maven
- Java
- TypeScript

### Installation Steps

1. Clone the repository:
git clone https://github.com/SamGanYX/GreenGrub.git

2. Backend Setup:
- Navigate to the backend folder
- Create a `.bashrc` file with the required API keys
- Run the following command:
  - Mac/Linux: `source .bashrc`
  - Windows: Use Git Bash and run the same command

## Running the Software

1. **Start the Backend**:
- Navigate to the backend folder
- Run: `mvn spring-boot:run`

2. **Start the Frontend**:
- Navigate to the frontend folder
- Run: `npm install; npm start`

3. The application should now be running and ready to use.

## How to Use GreenGrub

### User Login
1. Open the GreenGrub application
2. Set a username and password to create an account or log in with existing credentials

### Scanning Barcodes
1. Navigate to the scanning page
2. Point your camera at a food product's barcode
3. Hold steady until the app successfully scans the barcode
4. The scanned item will be added to your food list

### Managing Your Food List
1. View all scanned food items on the Food List page
2. Remove unwanted or old scanned foods by selecting the remove option
3. Keep your list updated with current items of interest

### Viewing Climate & Nutrition Information
1. Select any food item from your list
2. View detailed information including:
- Carbon footprint scoring (Work in Progress)
- Water usage metrics (Work in Progress)
- Land use impact (Work in Progress)
- Sustainability comparisons (Work in Progress)
- Nutritional breakdown (Work in Progress)
- Allergen identification (Work in Progress)
- Comparative health ratings (Work in Progress)

### Navigation
The app provides fluid navigation between:
- Login page
- Scanning page
- Foods List page
- Food Information page

## Testing

- To test the backend: Navigate to the backend folder and run `mvn test`
- To test the frontend: Navigate to the frontend folder and run `npm run test`

## Work in Progress Features

The following features are currently under development:
- User recommendation system
- More flexible comparison graphics
- Detailed climate impact analysis
- Complete nutritional breakdown
- Allergen identification
- Comparative health ratings

## Known Issues

- Local testing issues being addressed
- Limited emissions data available for some processed products
- Barcode recognition may be inconsistent in poor lighting conditions

## Reporting Bugs

If you encounter any issues while using GreenGrub, please report them through our issue tracker:
https://github.com/SamGanYX/GreenGrub/issues

When submitting a bug report, please include:
- A clear, descriptive title
- Detailed steps to reproduce the issue
- Expected behavior vs. actual behavior
- Screenshots (if applicable)
- Your device model and OS version
- App version number

Your feedback helps us improve GreenGrub for everyone!

