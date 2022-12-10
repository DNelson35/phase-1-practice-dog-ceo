// console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", () => {
    // color Array
    const arr = ['red', 'blue', 'green', 'purple', 'pink', 'lightblue']


    // URLs
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'

    // Grabing element
    const imgDiv = document.querySelector("div")
    const ul = document.querySelector('#dog-breeds')
    const selector = document.querySelector('#breed-dropdown')
    

    // fetch request
    fetch(imgUrl)
    .then((resp) => resp.json())
    .then((resp) => addImg(resp))
    .catch((error) => {
        console.log(error.message)
    })

    fetch(breedUrl)
    .then((resp) => resp.json())
    .then((resp) => addingBreed(resp))
    .catch((error) => console.log(error.message))


    // fucntions for creating fetch resp functions
    function randomNum(){
        return Math.floor(Math.random()* arr.length)
    }

    function resetList(){
        if(ul.children){
            while(ul.firstChild){
                ul.firstChild.remove()
            }
        }
    }

    function createBreedList(data){
        Object.keys(data.message).filter((breed) => {
            if(breed.charAt(0) === selector.value){
              condenseIf(breed)
            } else if(selector.value === "all"){
                condenseIf(breed)
            }
        }) 
    }

    function condenseIf(breed){
        const dogBreed = document.createElement('li')
        dogBreed.textContent = breed
        dogBreed.style.fontSize = "large"
        dogBreed.addEventListener('mouseover', () => {
            dogBreed.style.color = arr[randomNum()]
        })
        dogBreed.addEventListener('mouseout', () => {
            dogBreed.style.color = 'black'
        })
        ul.appendChild(dogBreed)
    }


    // Feth resp finished functions
    function addImg(data){
        data.message.forEach(dog => {
            const dogImg = document.createElement('img')
            dogImg.src = dog
            imgDiv.appendChild(dogImg)
            
        });
    }

    function addingBreed(data){
        selector.addEventListener('change', () => {
            resetList()
           createBreedList(data)
        })
    }
})
