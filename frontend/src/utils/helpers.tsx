const formatMoney = (num: number): string => {
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatDate = (dt: Date): string => {
  return new Date(dt).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}

export { formatMoney, formatDate }
