# Travelala
A website for booking travel tours

# Project structure
├── config
│   └── auth.js
├── controllers
│   ├── address.js
│   ├── auth.js
│   ├── order.js
│   ├── tour.js
│   ├── trip.js
│   └── user.js
├── errors
│   ├── CustomeError.js
│   └── errorCodes.js
├── index.html
├── index.js
├── middlewares
│   ├── async.js
│   ├── auth.js
│   ├── authorize.js
│   ├── camelCaseReq.js
│   ├── errorHandlers.js
│   ├── snakeCaseRes.js
│   └── validate.js
├── models
│   ├── address.js
│   ├── mongoose.js
│   ├── order.js
│   ├── timeline.js
│   ├── tour.js
│   ├── trip.js
│   └── user.js
├── node_modules
├── routers
│   ├── address.js
│   ├── auth.js
│   ├── index.js
│   ├── order.js
│   ├── tour.js
│   ├── trip.js
│   └── user.js
├── services
│   ├── address.js
│   ├── auth.js
│   ├── order.js
│   ├── tour.js
│   ├── trip.js
│   └── user.js
├── utils
│   ├── constants.js
│   ├── logUtil.js
│   ├── publicRoute.js
│   └── random.js
├── uploads
├── docker-compose.yml
├── Dockerfile
├── open-api.json
├── package-lock.json
├── package.json
├── gitlab-deploy-prod.sh
├── README.md
└── yarn.lock

# Features

- Users can login, register to become a member of the system.
- Users can search the tours, trips, by start point, end point, the time leaving.
- Users can view details of a trip, and whole information about that trip. 
- Users and members can book online trips as well as services with specific  requirements.
- Users and Members can view the result of the booking operation.
- Members can edit his profile.
- Members can add a bank account for payment.
- Admin can CRUD  trip.
- Admin can manage the booking of users.

#Framework and language: 

- Nodejs, javascript
-	Mongodb
- Deploy:
  -	Docker, Azure virtual machine, Gitlab runner.
  - Using docker for running mongodb and nodejs backend.
  - Using Gitlab for setting up CI/CD and Gitlab runner for running the command of this CI/CD.
  - Using azure virtual machine for deploying backend.
