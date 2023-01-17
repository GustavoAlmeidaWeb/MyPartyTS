import { checkPartyBudget } from '@helpers/check-party-budget'
import { ICreateParty } from '@interfaces/party/IParty'
import { PartyModel } from '@models/Party/Party'

export const createPartyUseCase = async ({
  title,
  author,
  description,
  budget,
  image,
  services,
  user_id,
}: ICreateParty): Promise<Response | any> => {
  if (services && !checkPartyBudget(budget, services)) {
    return {
      status: 406,
      json: { errors: ['O seu orçamento é insuficiente.'] },
    }
  }

  if (!image) {
    image = null
  }

  try {
    const party = await PartyModel.create({
      title,
      author,
      description,
      budget,
      image,
      services,
      user_id,
    })

    return { status: 201, json: party }
  } catch (e) {
    return {
      status: 422,
      json: {
        errors: [
          'Houve algum problema na requisição, por favor tente mais tarde.',
        ],
      },
    }
  }
}
