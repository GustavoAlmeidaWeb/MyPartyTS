import { IDeleteParty } from '@interfaces/party/IParty'
import { PartyModel } from '@models/Party/Party'

type ResponseType = {
  status: number
  json: ErrorsOrMsg
}

type ErrorsOrMsg = {
  errors?: string[]
  message?: string
}

export const deletePartyUseCase = async ({
  user_id,
  id,
}: IDeleteParty): Promise<ResponseType> => {
  try {
    const party = await PartyModel.findById(id)

    if (!party) {
      return { status: 404, json: { errors: ['Festa não encontrada.'] } }
    }

    if (!party.user_id.equals(user_id)) {
      return {
        status: 401,
        json: { errors: ['Você não tem permissão para executar essa ação.'] },
      }
    }

    await PartyModel.findByIdAndDelete(id)

    return { status: 200, json: { message: 'Festa excluída com sucesso.' } }
  } catch (e) {
    return {
      status: 422,
      json: {
        errors: ['Houve algum problema na requisição, tente mais tarde.'],
      },
    }
  }
}
