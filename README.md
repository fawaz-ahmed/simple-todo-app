# simple-todo-app
Project has 3 main folders:
- one for backend service
- one for mobile app
- one for web app

# Run backend service

## tech stack
- mongodb
- expressjs/ts
- express-session for session handling

## pre-requisites
- docker

## run cmds
```
cd service
cp .env.sample .env
./start.sh
```

## database UI - mongo express
http://localhost:3010/db/todo-app-db
- username: admin
- password: pass

# Run mobile app

## tech stack
- react-native

## pre-requisites
- react-native [setup](https://reactnative.dev/docs/0.70/environment-setup)
- nodejs
- ruby
- yarn

## run metro bundler
```
cd mobile
bunlde install (run once)
yarn install (run once)
yarn start
```

## run android
```
cd mobile
yarn android
```

## run ios
```
cd mobile
cd ios
bundle exec pod install (run once)
cd ..
yarn ios
```
if `yarn ios` fails, open file `/mobile/ios/SimpleTodoApp.xcworkspace`in XCode and run the project

# Run web app

## tech stack
- react js

## pre-requisites
- nodejs
- yarn

## run cmds
```
cd web
yarn install (run once)
yarn start
```

