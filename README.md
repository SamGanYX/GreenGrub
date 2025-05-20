# GreenGrub Goals

**GreenGrub** helps users make smarter food choices by combining **nutrition tracking** and **environmental impact** in one app.

## 🎯 Goals

- **Empower users** to eat healthier and reduce their carbon footprint.
- **Simplify decisions** by scanning barcodes for instant product info.
- **Combine insights** on both nutrition and emissions in one platform.
- **Allow comparison** between food items based on health and sustainability.
- **Offer flexibility** to prioritize what matters most (health vs. planet).

## 🆕 Novelty

- Most apps focus on either health or climate—**GreenGrub does both**.
- Goes beyond saying healthy or not healthy to give a more well-rounded analysis.
- Uses **ingredient order** to estimate **relative environmental impact**.

## 🛠️ Tech Stack

- **React Native** for app development.
- **SpringBoot** for backend.
- **Nutrition APIs** + custom/third-party emissions database such as **fatsecret**.

## Operational Usecases

- **User Login**: User can log into app via setting a username and password.
- **Scanning Barcodes**: Can scan the barcodes of foods and add them to the list of foods that the user wants information of.
- **Selective Listing**: Can choose to remove any unwanted/old scanned foods on the list; gives the user the option to update the list however they want.
- **Climate Information**: User can obtain climate impact information regarding the foods they scanned and have on their list.
- **Navigation**: Can navigate from login page to scanning page to Foods Listed page to Food information fluidly.

## ⚠️ Risks

- Emissions data for processed foods is hard to calculate.
- Solution: Use **relative scoring** based on key ingredients instead of exact carbon values. Over time we can modify the algorithm to be more accurate.

## 📋 Running

- Clone the repository
- Make sure you have Git, Node, Expo, Maven, Java, and Typescript installed
- In the backend folder create a .bashrc file. This file has all our secret keys so we will refrain from posting these
- In bash type source .bashrc for Mac, and use git bash for Windows
- In the backend folder this line will run the backend: mvn spring-boot:run
- In the frontend folder this line will run the frontend: npm install; npm start
- To test backend type "mvn test" in the backend folder
- To test frontend type "npm run test" in the frontend folder