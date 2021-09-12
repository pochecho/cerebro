import "reflect-metadata";
const express = require("express");
import {} from "aws-sdk/clients/dynamodb";
import AWS from "aws-sdk/global";
import S3 from "aws-sdk/clients/s3";
// import Container from "typedi";
import {} from "@decorators/di";
import { attachControllers } from "@decorators/express";
import { MutantsController } from "./features/mutant/access/http/mutant.controller";

const app = express();
const port = 8080;
app.use(express.json());


attachControllers(app, [MutantsController]);

app.listen(port, () => {
  console.log("Listening");
});
