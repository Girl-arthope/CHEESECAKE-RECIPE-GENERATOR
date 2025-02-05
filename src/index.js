function displayRecipe(response) {
  if (response.data && response.data.answer) {
    new Typewriter("#recipe", {
      strings: response.data.answer,
      autoStart: true,
      delay: 1,
      cursor: "",
    });
  } else {
    console.error("Recipe data not found in the response.");
  }
}

function generateRecipe(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");

  let apiKey = "o26te0f2d5dba0a4524b73ca31ad79a0";
  let context =
    "You are a professional cheesecake recipe expert and love to write creative recipes. Your mission is to generate a 10-line cheesecake recipe in basic HTML, separating each step with <br />. Make sure to follow the user instructions. Do not include a title in the recipe.Results can appear in bullet point form.Stop including this '```html' in the beginning of every recipe you generate. Sign the recipe with 'girl_arthope ai' in pink inside a <strong> element at the end of the recipe and NOT at the beginning.";

  let prompt = `User instructions: Generate a recipe for a ${instructionsInput.value} dish.`;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  console.log("API URL:", apiUrl);

  let recipeElement = document.querySelector("#recipe");
  recipeElement.classList.remove("hidden");
  recipeElement.innerHTML = `<div class="generating">⏳ Generating recipe for ${instructionsInput.value} cheesecake...</div>`;

  axios
    .get(apiUrl)
    .then(displayRecipe)
    .catch((error) => {
      console.error("Error fetching the recipe:", error);
    });
}

let recipeFormElement = document.querySelector("#recipe-generator-form");
recipeFormElement.addEventListener("submit", generateRecipe);
