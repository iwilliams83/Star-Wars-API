export const characterAPIcall = url => {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json()
    }
    throw new Error("Data not found.")
  })
}

export const filmDataAPIcall = urls => {
  let apiCalls = []
  apiCalls = urls.map(url => fetch(url).then(res => res.json()))

  return Promise.all(apiCalls)
}
