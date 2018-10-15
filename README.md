# FreeGenes backend
In Development. A Node Express Server that interfaces with the [FreeGenes React Client](www.example.com).

## View Client Demo
(**FIX**)Demo is visible at [biohacking.services](https://biohacking.services).

## View API Demo
(**FIX**)The [OpenFoundry API](https://gitlab.com/koeng/openfoundry-js) Demo is visible at [api.biohacking.services](https://api.biohacking.services).

## Install

### Clone
From your terminal:
```
git clone https://github.com/Koeng101/freegenes-backend.git
```

### Install Modules
```
npm install
```

### Change Directory To Project
```
cd freegenes-backend
```

### Run
```
npm start
```

### Run Tests
```
npm test
```

## Configure
In local development, the environment variables are expected to be located in `/config/env.js` which is not included in the git commit as it contains secure information not to be shared with the public.  
In production the environment variables should be applied prior to deployment.  
Below is an example that you can fill out and save to `/config/env.js`:
```
// /config/env.js
process.env.DB_USERNAME = "myDbUsername";
process.env.DB_PASSWORD = 'myDbPassword';
process.env.DB_URI = 'ds123456.mlab.com:12345/mydbname';
process.env.DB_TEST_URI = 'ds123456.mlab.com:12345/mytestdbname';
process.env.JWT_SECRET = 'mySuperSecretPasswordPhrase';
process.env.NODE_ENV = 'development';
```


