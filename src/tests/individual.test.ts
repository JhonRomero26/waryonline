import { beforeEach, describe, it } from "vitest";
import { app } from "@/index";
import request from "supertest";
import { CreateIndividual, Individual } from "@/schemas/individual";
import { afterAll } from "bun:test";
import mongoose from "mongoose";

const api = request(app);

const individuals: Partial<Individual>[] = [
  {
    code: "0000000000",
    description: "Description 1",
    references: ["reference1", "reference2"],
    rank: 1,
  },
  {
    code: "0000000001",
    description: "Description 2",
    references: ["reference3", "reference4"],
    rank: 2,
  },
];

beforeEach(async () => {
  await Individual.deleteMany({});
  await Individual.insertMany(individuals);
});

afterAll(async () => {
  await mongoose.connection.close();
  const server = app.getServer();
  server.stop();
});

describe("Test Individual API Routes", () => {
  it("Create valid individual", async () => {
    const newIndividual: CreateIndividual = {
      code: "1111111111",
      description: "Description 3",
    };

    //   const response = await api
    //     .post("/api/individuals")
    //     .send(newIndividual)
    //     .expect(201)
    //     .expect("Content-Type", /json/);
  });
});
