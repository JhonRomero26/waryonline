import { Elysia } from "elysia";
import { individualApiRoutes } from "./individual";
import IndividualModel from "@/models/individual";

export const apiV1Routes = new Elysia().use(
  individualApiRoutes({ model: IndividualModel })
);
