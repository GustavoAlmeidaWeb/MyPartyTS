const showPassword = (cls: string | null, id: string | null) => {
  document.querySelector(`.${cls}`).addEventListener('mousedown', () => {
    const ipt = document.querySelector(`#${id}`) as HTMLInputElement
    ipt.type = 'text'
  })

  document.querySelector(`.${cls}`).addEventListener('mouseup', () => {
    const ipt = document.querySelector(`#${id}`) as HTMLInputElement
    ipt.type = 'password'
  })
}

export { showPassword }
