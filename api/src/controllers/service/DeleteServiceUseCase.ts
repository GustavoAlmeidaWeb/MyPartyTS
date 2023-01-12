import { ServiceModel } from '@models/Service/Service'

export const deleteServiceUseCase = async (
  id: string,
): Promise<Response | any> => {
  try {
    const service = await ServiceModel.findById(id)

    if (!service) {
      return {
        status: 404,
        json: { errors: ['Serviço não encontrado.'] },
      }
    }

    await service.delete()

    return { status: 200, json: { message: 'Serviço excluído com sucesso.' } }
  } catch (e) {
    return {
      status: 422,
      json: {
        errors: [
          'Houve algum problema na requisição, tente novamente mais tarde.',
        ],
      },
    }
  }
}
