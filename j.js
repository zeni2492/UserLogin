async function a() {
    const URL = 'http://127.0.0.1:8000/api/auth/'
    const userData = {
        username: 'webmaster',
        password: 'webmaster'
    };
    const res= fetch(URL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    const data = await res;
    return data
}

a().then(res => {
    if (res.status === 200) {
        return res.json()
    }
    else {
        throw new Error('Something went wrong')
    }
}).then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})