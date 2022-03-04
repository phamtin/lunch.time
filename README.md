# lunch.time

# Getting Started with lunchtime

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## set up

- `docker compose --env-file ./api/.env up`  
  Install the package to be used

- Create folder .docker with db-entrypoint.sh file:

  `echo 'Creating application user and db'

  mongo ${DB_NAME} \
    --host localhost \
    --port ${DB_PORT} \
    -u ${MONGO_INITDB_ROOT_USERNAME} \
    -p ${MONGO_INITDB_ROOT_PASSWORD} \
    --authenticationDatabase admin \
    --eval "db.createUser({user: '${DB_USER}', pwd: '${DB_PASSWORD}', roles:[{role:'dbOwner', db: '${DB_NAME}'}]});"
  `

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### others

You can find the vscode configuration file in .vscode.
For typescript rules, check tsconfig.json.
