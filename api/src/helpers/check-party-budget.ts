import { ICreateService } from '@interfaces/service/IService'

export const checkPartyBudget = (
  budget: number,
  services: Array<ICreateService>,
): boolean => {
  const priceSum = services.reduce(
    (sum, service) => sum + Number(service.price),
    0,
  )

  if (priceSum > budget) {
    return false
  }
  return true
}
