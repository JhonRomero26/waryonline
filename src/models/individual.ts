import { Individual, type CreateIndividual } from "@/schemas/individual";

class IndividualModel {
  static async createIndividual({
    data,
  }: {
    data: CreateIndividual;
  }): Promise<Individual | null> {
    let individual: Individual;

    try {
      individual = await Individual.create(data);
    } catch (err) {
      return null;
    }

    return individual;
  }
}

export default IndividualModel;
