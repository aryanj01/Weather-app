
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message1')
const messagetwo = document.querySelector('#message2')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageone.textContent = 'Loading...'
    messagetwo.textContent = ''

    fetch(`/weather?address=${search.value}`).then((response => {
        response.json().then((data) => {
            if(data.error){
                messageone.textContent = data.error
            }else{
                messageone.textContent = `The temperature is ${data.temperature} degrees.`
                messagetwo.textContent = `There are ${data.precipitation}% chances of precipitation.` 
            }
        })
    }))
})