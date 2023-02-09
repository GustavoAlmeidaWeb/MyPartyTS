import { ICreateService } from '@interfaces/service/IService'

export const checkPartyBudget = (
  budget: number,
  services: Array<ICreateService>,
): boolean => {
  // const priceSum = services.reduce((sum, service) => sum + service.price, 0)

  let priceSum = 0
  services.forEach(service => (priceSum += service.price))

  if (priceSum > budget) {
    return false
  }
  return true
}
