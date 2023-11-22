import { Elysia } from "elysia";
import IndividualController from "@/controllers/v1/individual";
import IndividualModel from "@/models/individual";

export function individualApiRoutes({
  model,
}: {
  model: typeof IndividualModel;
}) {
  const controller = new IndividualController({ model });
  const router = new Elysia({ prefix: "/individuals" });

  return router
    .get("/", controller.getIndividuals)
    .post("/", controller.createIndividual)
    .get("/:id", controller.getIndividual)
    .patch("/:id", controller.updateIndividual)
    .delete("/:id", controller.deleteIndividual);
}
