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

## ⚠️ Risks

- Emissions data for processed foods is hard to calculate.
- Solution: Use **relative scoring** based on key ingredients instead of exact carbon values. Over time we can modify the algorithm to be more accurate.
