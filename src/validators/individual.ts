import { type CreateIndividual } from "@/schemas/individual";
import { INDIVIDUAL_VALIDATIONS_MESSAGES } from "@/utils/constants/validation_messages";
import {
  minLength,
  nonOptional,
  object,
  parse,
  partial,
  string,
  ValiError,
} from "valibot";

const individuakValidator = object({
  code: nonOptional(
    string(INDIVIDUAL_VALIDATIONS_MESSAGES["codeString"], [
      minLength(1, INDIVIDUAL_VALIDATIONS_MESSAGES["codeLength"]),
    ]),
    INDIVIDUAL_VALIDATIONS_MESSAGES["codeRequires"]
  ),
  description: nonOptional(
    string(INDIVIDUAL_VALIDATIONS_MESSAGES["descriptionString"], [
      minLength(1, INDIVIDUAL_VALIDATIONS_MESSAGES["descriptionLength"]),
    ]),
    INDIVIDUAL_VALIDATIONS_MESSAGES["descriptionRequires"]
  ),
});

export const individualValidate = (
  value: CreateIndividual
): CreateIndividual => {
  let result = {} as CreateIndividual;

  try {
    result = parse(individuakValidator, value);
  } catch (err) {
    if (err instanceof ValiError) throw err;
  }

  return result;
};

/**
 * Validates a partial CreateIndividual object.
 *
 * @param {Partial<CreateIndividual>} value - The partial CreateIndividual object to validate.
 * @return {Partial<CreateIndividual>} - The validated partial CreateIndividual object.
 */
export const individualValidatePartial = (
  value: Partial<CreateIndividual>
): Partial<CreateIndividual> => {
  let result = {} as Partial<CreateIndividual>;

  try {
    result = parse(partial(individuakValidator), value);
  } catch (err) {
    if (err instanceof ValiError) throw err;
  }

  return result;
};
