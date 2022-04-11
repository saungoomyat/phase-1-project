const menuList = document.querySelector('#food-list')
const searchBar = document.getElementById('searchBar')
let foodList = []

const showFood = async () => {
    try {
        const res = await fetch('http://localhost:3000/food')
        foodList = await res.json()
        makeFoodList(foodList)
    } catch (err) {
        console.error(err)
    }
};


function makeFood(newFood) {
    fetch('http://localhost:3000/food', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFood)
    })
        .then(res => res.json())
        .then(data => {
            foodList.push(data)
            makeFoodList(foodList)
        })
        .catch(error => console.error('Error:', error))
}


function deleteEntry(id) {
    fetch(`http://localhost:3000/food/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

        .catch(error => console.error('Error:', error))
}


function handleSubmit(e) {
    e.preventDefault()
    let newFood = {
        name: e.target.name.value,
        imageUrl: e.target.image_url.value,
        Fat: e.target.fat.value,
        Carbs: e.target.carbs.value,
        Protein: e.target.protein.value,
        Calories: e.target.calories.value,
    }
    makeFood(newFood)


}

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value

    const filteredCalories = foodList.filter((cal) => {
        return (
            cal.Calories.includes(searchString)
        );
    });
    makeFoodList(filteredCalories)
});

document.querySelector('form').addEventListener('submit', handleSubmit)



const makeFoodList = function (food) {
    const htmlString = food
        .map((mcFood) => {
            return `
            <li class="food">
                <h3>${mcFood.name}</h3>
                <img src="${mcFood.imageUrl}"></img>
                <p>Calories: ${mcFood.Calories}</p>
                <p>Total Fat: ${mcFood.Fat}</p>
                <p>Total Carbs: ${mcFood.Carbs}</p>
                <p>Protein: ${mcFood.Protein}</p>
                
                <button class="delete" name=${mcFood.id}>Delete</button>
            </li>
        `;
        })
        .join('')










    menuList.innerHTML = htmlString;

    let btnDelete = document.getElementsByClassName("delete")
    for (let i = 0; i < btnDelete.length; i++) {
        btnDelete[i].addEventListener("click", (e) => {
            e.target.parentNode.remove()
            deleteEntry(Number(e.target.name))
        })
    }

}

function initialize() {
    document.querySelector('#food-list').innerHTML = ''
    showFood()

}
initialize()

