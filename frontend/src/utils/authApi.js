
    const baseUrl = process.env.NODE_ENV === 'production'? 'https://api.mestobyolga.nomoredomains.work'
      : 'http://localhost:3000'
    const headers = { "Content-Type": "application/json"}


    const checkResponse = ((response)=>{
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка, статус ошибки ${response.status}`)
    })

  export const signUp = ((password, email)=>{
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "password" : password,
        "email": email
      })
    })
      .then(res=>checkResponse(res))
      })

  export const signIn = ((password, email)=> {
    return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    })
      .then(res=>checkResponse(res))})


 export const verifyUser = ((jwt)=>{
      return fetch(`${baseUrl}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${jwt}`,
        }
      })
        .then(res=>checkResponse(res))})


