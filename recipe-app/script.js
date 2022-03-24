const mealsEl = document.getElementById("meals"); // the element in which we store our random meal
const favoriteContainer = document.getElementById("fav-meals"); // the element in which we store our random meal

const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

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

    fetchFavMeals();
  });

  const mealImg = meal.querySelector("img");

  mealImg.addEventListener("click", () => {
    showMealInfo(mealData);
  });
  //  meal.addEventListener("click", () => {
  //    showMealInfo(mealData);
  //  });

  mealsEl.appendChild(meal);
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
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );

  const respData = await resp.json();
  const meals = respData.meals;

  return meals;
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
  // clean the container
  favoriteContainer.innerHTML = "";

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
            <button class="clear"><i class='bx bx-x'></i></button>
    `;
  const btn = favMeal.querySelector(".clear");
  btn.addEventListener("click", () => {
    removeMealFromLocalStorage(mealData.idMeal);
    fetchFavMeals();
  });

  const favMealImg = favMeal.querySelector("img");

  favMealImg.addEventListener("click", () => {
    showMealInfo(mealData);
  });

  favoriteContainer.appendChild(favMeal);
}

function showMealInfo(mealData) {
  // clean the element
  mealInfoEl.innerHTML = "";
  // update the meal info
  const mealEl = document.createElement("div");

  const ingredients = [];

  //get ingredients and measurements
  for (let i = 0; i < 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
      );
    }
  }

  mealEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
    <img
        src="${mealData.strMealThumb}"
        alt="${mealData.strMeal}"
     />
    <h3>Ingredients:</h3>
    <ul>
    ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
    </ul>
    <p>${mealData.strInstructions}</p>
    `;

  mealInfoEl.appendChild(mealEl);
  //show the popup
  mealPopup.classList.remove("hidden");
}

searchBtn.addEventListener("click", async () => {
  // clean the container
  mealsEl.innerHTML = "";
  const search = searchTerm.value;
  const meals = await getMealsBySearch(search);
  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal);
    });
  }
});

popupCloseBtn.addEventListener("click", () => {
  mealPopup.classList.add("hidden");
});
