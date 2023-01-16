import { PartyModel } from '@models/Party/Party'

export const deletePartyUseCase = async (
  id: string,
): Promise<Response | any> => {
  try {
    const party = await PartyModel.findById(id)

    if (!party) {
      return { status: 404, json: { errors: ['Festa não encontrada.'] } }
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
