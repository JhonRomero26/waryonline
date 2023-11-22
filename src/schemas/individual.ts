import { Schema, model } from "mongoose";

export interface Individual {
  id: string;
  code: string;
  description: string;
  references: string[];
  rank: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateIndividual {
  code: string;
  description: string;
}

export interface UpdateIndividual {
  code?: string;
  description?: string;
  references?: string[];
}

const individualSchema = new Schema<Individual>({
  code: {
    type: String,
    required: true,
    index: {
      unique: true,
      name: "codeUniqueKey",
    },
  },
  description: {
    type: String,
    required: true,
  },
  references: [String],
  rank: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

individualSchema.set("toJSON", {
  transform: (_, returnObject) => {
    returnObject.id = returnObject._id;
    delete returnObject._id;
    delete returnObject.__v;
  },
});

export const Individual = model("Individual", individualSchema);
