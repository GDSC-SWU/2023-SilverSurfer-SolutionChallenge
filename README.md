# Silver Surfer 🌊
2023 Google Solution Challenge

### Contents
1. [Problem](#problem)
2. [About Silver Surfer](#about-silver-surfer)
3. [Our SDGs Goal](#our-sdgs-goal)
4. [Technology Stack](#technology-stack)
5. [Our Website](#our-website)
6. [Demo Video](#demo-video)
7. [Design](#design)
8. [How to Start](#how-to-start)
9. [How to Run Our Service on Local](#how-to-run-our-service-on-local)
10. [Contribution](#contribution)

<br/>

## Problem
With the advancement of technology and the post-COVID-19 era, South Korea has kiosks in most stores and a generation of people carrying smartphones. But is everyone feeling the convenience of these digital advancements?

The answer is no. There are digital marginalized groups with low levels of access to digital information, and seniors have the lowest level of access to information from the digital society. When it comes to using services, seniors are often intimidated by the complexity and difficulty of understanding features, and they continue to be marginalized from the digital society.

To solve this problem, the government is conducting digital education programs for seniors, but even with education, there are still seniors who struggle with complex screens.

<br/>

## About Silver Surfer
### “Silver Surfer : For A World Where all seniors surf the digital sea”
Silver Surfer aims to create a world where seniors can easily access digital information and surf the digital world freely. Therefore, we provide designers and developers with mobile interface guidelines that address the challenges of seniors using smartphones, as well as UX/UI guidelines and implementation code. We hope that through these silver surfers, many service producers will produce apps with seniors in mind.

<br/>

## Our SDGs Goal
#### 10 Reduced Inequalities
<img src="https://user-images.githubusercontent.com/68212300/229172914-77626e4f-2ee1-43d3-9517-6e6084c96c12.png" width="180" height="180"/>

Aligned with the UN Sustainable Development Goals of __‘Reduced Inequalities’__, Silver Surfer provides developers and designers with UX/UI guidelines and implementation code to guide the creation of various services. By doing so, we hope to ensure that older adults are no longer marginalized and can surf the digital world freely.


<br/>

## Technology Stack
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)

- Google Cloud Platform (VM Instance, App Engine, Cloud Storage)
- Google OAuth 2.0
- React v18.2.0
- Redux v4.2.1
- Node JS v16.18.1
- Redis v4.0.6

<br/>

## Our Website
https://silversurfer-382505.du.r.appspot.com/

<br/>

## Demo Video
https://youtu.be/Fk8QXYKD50U

<br />

## Design
<img src="https://user-images.githubusercontent.com/68212300/229183392-d85cb9e4-42ed-49ea-bbc6-d9a29ff64c5d.png" width="100%" height="100%"/>
<img src="https://user-images.githubusercontent.com/68212300/229183783-f79c1b86-8299-4e69-b99a-cbae4c128e29.gif" width="100%" height="100%"/>
<img src="https://user-images.githubusercontent.com/68212300/229183793-0960ad2f-43c7-4916-86bd-9a13ceadf23e.gif" width="100%" height="100%"/>
<img src="https://user-images.githubusercontent.com/68212300/229183798-09c309fe-fb3a-40d6-ad3e-d0f8b99b6fc2.gif" width="100%" height="100%"/>
<img src="https://user-images.githubusercontent.com/68212300/229183804-f110f08d-d83d-41a6-a4fe-3a1d81e213fc.gif" width="100%" height="100%"/>
<img src="https://user-images.githubusercontent.com/68212300/229183806-8b49d7fe-fe2f-40fa-aadb-3377cf45ab84.gif" width="100%" height="100%"/>
<img src="https://user-images.githubusercontent.com/68212300/229183812-92da9bb7-2981-4207-81f1-47a31a06cd17.gif" width="100%" height="100%"/>

<br/>

## How to Start
### Visit Deployed Service
https://silversurfer-382505.du.r.appspot.com/

<br/>

## How to Run Our Service on Local
#### 1. Clone this repository
```zsh
git clone https://github.com/GDSC-SWU/2023-SilverSurfer-SolutionChallenge.git
```
#### 2. Move to backend directory
```zsh
cd server
```
#### 3. Create `.env` file
```env
# For Creating HTTP Server
SERVER_PORT=[YOUR_SERVER_PORT]

# For Database
DATABASE_SPRINT_HOST=[YOUR_DATABASE_HOST]
DATABASE_SPRINT_USER=[YOUR_DATABASE_USER]
DATABASE_SPRINT_PASSWORD=[YOUR_DATABASE_PASSWORD]
DATABASE_NAME=[YOUR_DATABASE_NAME]

# For Authentication
FE_CLIENT_ID=[YOUR_GOOGLE_OAUTH2_CLIENT_ID]
JWT_SECRET=[YOUR_JWT_SECRET_KEY]

# For Redis
REDIS_HOST=[YOUR_REDIS_SERVER_HOST]
REDIS_PORT=[YOUR_REDIS_SERVER_PORT]
REDIS_PASSWORD=[YOUR_REDIS_DATABASE_PASSWORD]

# For CORS policy
CORS_DOMAIN_LOCAL=[YOUR_APP_URL]
```
#### 4. Install dependencies
```zsh
npm install
```
#### 5. Run the server
```zsh
node server
```
#### 6. Move to frontend directory
```zsh
cd client
```
#### 7. Create `.env` file
```env
# For Authentication (Google OAuth 2.0)
REACT_APP_GOOGLE_CLIENT_ID=[YOUR_GOOGLE_OAUTH2_CLIENT_ID]

# For API
REACT_APP_API_BASE_URL=[YOUR_SERVER_URL]
```
#### 8. Install dependencies
```zsh
npm install
```
#### 9. Run the app
```zsh
npm start
```

<br/>

## Contribution
|Name|Bokyung Park|Wookyeong Yu|Yeonsu Kim|Yusun Choi|
|:---:|:---:|:---:|:---:|:---:|
|Profile Image|<img src="https://user-images.githubusercontent.com/68212300/229185723-172b3d27-e78a-4e0a-b432-a4090f690876.png"/>|<img src="https://user-images.githubusercontent.com/68212300/229185707-8f417d47-8cf9-4d9b-ab92-22a25f766103.png"/>|<img src="https://user-images.githubusercontent.com/68212300/229185677-16652d43-669d-4579-8a81-09849c8890ab.png"/>|<img src="https://user-images.githubusercontent.com/68212300/229188901-ad5319ef-8241-45e7-b7a1-d4bb6ad0b33f.png"/>|
|Role|UX/UI Designer|UX/UI Designer|Front-End Developer|Back-End Developer|
