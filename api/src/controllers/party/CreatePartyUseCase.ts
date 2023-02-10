import { PartyModel } from '@models/Party/Party'
import { ICreateParty } from '@interfaces/party/IParty'
import { isJson } from '@helpers/check-if-is-json'
import { checkPartyBudget } from '@helpers/check-party-budget'

type ResponseType = {
  status: number
  json: ICreateParty | Errors
}

type Errors = {
  errors: string[]
}

export const createPartyUseCase = async ({
  title,
  author,
  description,
  budget,
  date,
  hour,
  image,
  services,
  user_id,
}: ICreateParty): Promise<ResponseType> => {
  const servicesParse = isJson(services) ? JSON.parse(services) : services

  if (servicesParse && !checkPartyBudget(budget, servicesParse)) {
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
      date,
      hour,
      image,
      services: servicesParse,
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
