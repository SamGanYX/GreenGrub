# GreenGrub

**GreenGrub** helps users make smarter food choices by combining **nutrition tracking** and **environmental impact** in one app.

## 🎯 Goals
- **Empower users** to eat healthier and reduce their carbon footprint
- **Simplify decisions** by scanning barcodes for instant product info
- **Combine insights** on both nutrition and emissions in one platform
- **Allow comparison** between food items based on health and sustainability
- **Offer flexibility** to prioritize what matters most (health vs. planet)

## 🆕 Novelty
- Most apps focus on either health or climate—**GreenGrub does both**
- Goes beyond saying "healthy" or "not healthy" to give a more well-rounded analysis
- Uses **ingredient order** to estimate **relative environmental impact**

## 🛠️ Tech Stack
- **React Native** for app development
- **SpringBoot** for backend
- **Nutrition APIs** + custom/third-party emissions database such as **FatSecret**

## Operational Use Cases
- **User Login**: User can log into app via setting a username and password
- **Scanning Barcodes**: Can scan the barcodes of foods and add them to the list of foods that the user wants information of
- **Selective Listing**: Can choose to remove any unwanted/old scanned foods on the list; gives the user the option to update the list however they want
- **Climate Information**: User can obtain climate impact information regarding the foods they scanned and have on their list
- **Navigation**: Can navigate from login page to scanning page to Foods Listed page to Food information fluidly

## ⚠️ Risks
- Emissions data for processed foods is hard to calculate
- **Solution**: Use **relative scoring** based on key ingredients instead of exact carbon values. Over time we can modify the algorithm to be more accurate

## 📋 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (includes npm)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Maven](https://maven.apache.org/install.html)
- [Java 11+](https://www.oracle.com/java/technologies/downloads/)
- [TypeScript](https://www.typescriptlang.org/download)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SamGanYX/GreenGrub
   cd greengrub
   ```

2. **Backend Setup**
   ```bash
   cd backend
   # Create .bashrc file with your secret keys (not included in repo)
   # For Mac/Linux:
   source .bashrc
   # For Windows: use Git Bash
   ```

3. **Install Dependencies**
   
   **Backend** (from backend folder):
   ```bash
   mvn clean install
   ```
   
   **Frontend** (from frontend folder):
   ```bash
   npm install
   ```

### Running the Application

**Start Backend** (from backend folder):
```bash
mvn spring-boot:run
```

**Start Frontend** (from frontend folder):
```bash
npm start
```

### Testing

**Backend Tests** (from backend folder):
```bash
mvn test
```

**Frontend Tests** (from frontend folder):
```bash
npm run test
```

## 📚 Documentation
For detailed developer documentation and user manual, navigate to the `docs/` folder.

## 🤝 Contributing
Please read our contributing guidelines in the `docs/` folder before submitting pull requests.
