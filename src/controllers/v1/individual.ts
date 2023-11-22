import IndividualModel from "@/models/individual";
import { CreateIndividual, type Individual } from "@/schemas/individual";
import {
  INDIVIDUAL_RESPONSES,
  SERVER_RESPONSE_TYPES,
} from "@/utils/constants/responses";
import { individualValidate } from "@/validators/individual";
import { type Context } from "elysia";
import { ValiError } from "valibot";
// import { MongooseError } from 'mongoose'

export type ResponseJsonIndividual = ResponseJsonData<Individual>;
export type ResponseJsonIndividuals = ResponseJsonData<Individual[]>;

interface IndividualControllerConstructor {
  model: typeof IndividualModel;
}

class IndividualController {
  #model: typeof IndividualModel;

  constructor({ model }: IndividualControllerConstructor) {
    this.#model = model;
  }

  getIndividuals = async ({ set }: Context) => {
    set.headers = { "Content-Type": "application/json" };

    set.status = 200;
    return { hello: "World" };
  };

  async getIndividual({ params, set }: Context<{ params: { id: string } }>) {
    set.headers = { "Content-Type": "application/json" };
    const { id } = params;

    set.status = 200;
    return { id: id };
  }

  createIndividual = async ({ body, set }: Context) => {
    set.headers = { "Content-Type": " application/json" };
    let data = {} as CreateIndividual;

    try {
      data = individualValidate(body as CreateIndividual);
    } catch (err) {
      set.status = 400;
      if (err instanceof ValiError)
        return <ResponseJsonInfo>{
          type: SERVER_RESPONSE_TYPES["validationError"],
          message: err.message,
        };
    }

    let result: Individual | null = null;
    try {
      result = await this.#model.createIndividual({ data });
    } catch (err) {
      set.status = 400;
      if (err instanceof Error) {
        const { message } = err;
        const errorKey = Object.keys(INDIVIDUAL_RESPONSES).find((key) =>
          message.includes(key)
        );

        return <ResponseJsonInfo>{
          type: SERVER_RESPONSE_TYPES["internalServerError"],
          message:
            INDIVIDUAL_RESPONSES[errorKey as keyof typeof INDIVIDUAL_RESPONSES],
        };
      }
    }

    set.status = 201;
    return result;
  };

  updateIndividual = async ({
    params,
    body,
    set,
  }: Context<{ params: { id: string } }>) => {
    const { id } = params;
    set.headers = { "Content-Type": "application/json" };

    set.status = 200;
  };

  deleteIndividual = async ({
    params,
    set,
  }: Context<{ params: { id: string } }>) => {
    const { id } = params;
    set.headers = { "Content-Type": "application/json" };

    set.status = 200;
  };
}

export default IndividualController;
