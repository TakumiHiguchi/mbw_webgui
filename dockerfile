
FROM node:14.3.0

RUN mkdir /mbw_submission
WORKDIR /mbw_submission

RUN yarn add create-react-app
