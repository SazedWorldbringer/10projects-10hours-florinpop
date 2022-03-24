const meals = document.getElementById("meals"); // the element in which we store our random meal
const favoriteContainer = document.getElementById("fav-meals"); // the element in which we store our random meal
getRandomMeal();
fetchFavMeals();

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
          <div class="meal-header">
            ${random ? '<span class="random">Random Recipe</span>' : ""}
            <img
              src="${mealData.strMealThumb}"
              alt="${mealData.strMeal}"
            />
          </div>
          <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
              <i class="bx bxs-heart"></i>
            </button>
          </div>
    `;

  // event listener for the favorite meal button(heart) button
  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealFromLocalStorage(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealToLocalStorage(mealData.idMeal);
      btn.classList.add("active");
    }
  });

  meals.appendChild(meal);
}

// fetch random meals from TheMealDB api
async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];

  console.log(randomMeal);
  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const respData = await resp.json();
  const meal = respData.meals[0];
  return meal;
}

async function getMealsBySearch(term) {
  const meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
}

function removeMealFromLocalStorage(mealId) {
  const mealIds = getMealsFromLocalStorage();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function addMealToLocalStorage(mealId) {
  const mealIds = getMealsFromLocalStorage();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function getMealsFromLocalStorage() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
  const mealIds = getMealsFromLocalStorage();

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    meal = await getMealById(mealId);
    addMealFav(meal);
  }
}

function addMealFav(mealData) {
  const favMeal = document.createElement("li");

  favMeal.innerHTML = `
            <img
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
            <span>${mealData.strMeal}</span>
    `;

  favoriteContainer.appendChild(favMeal);
}
