import { createSlice } from "@reduxjs/toolkit";
// import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredients: [], // Array to store ingredients
  mixedIngredient: "",
  mix: [], // Array to store ingredients
  baked: false, // Flag to track if the cake has been baked
  temp: 0,
};

export const motionSlice = createSlice({
  name: "Motion",
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action) => {
        const ingredient = action.payload.ingredient;
        if (!state.baked) {
          if (!state.mix.includes(ingredient)) {
            state.mix.push(ingredient); // Push new ingredient to the array
            console.log(`Added ${ingredient} to the mix.`);
            // Update the cakeDiv to display the new ingredient
            const ingredientsHTML = state.mix
              .map(
                (ingredient) =>
                  `<img src="./public/${ingredient}.jpg" alt="Not Found" width="2000" height="1500">`
              )
              .join("");
            document.getElementById(
              "cakeDiv"
            ).innerHTML = `<h1>Ingredients:</h1><ul>${ingredientsHTML}</ul>`;
          } else {
            console.log(
              `The ingredient '${ingredient}' is already in the mix.`
            );
          }
        } else {
          console.log(
            "The cake has already been baked. You cannot add ingredients now."
          );
        }
      },
      prepare: (ingredient) => ({ payload: { ingredient } }),
    },

    mixIngredient: {
      reducer: (state, action) => {
        if (state.mix.length > 0 && !state.baked) {
          const canvasElement = document.getElementById("cakeDiv");
          if (canvasElement) {
            canvasElement.innerHTML =
              '<video width="100" height="100" autoplay loop muted><source src="./mix.mp4" type="video/mp4">Your browser does not support the video tag.</video>';
            console.log("Mixing ingredients: " + state.mix.join(", "));
            // Additional logic related to mixing ingredients can be added here if needed
          } else {
            console.error("Canvas element not found.");
          }
        } else if (state.baked) {
          console.log("The cake has already been baked.");
        } else {
          console.log("There are no ingredients to mix.");
        }
      },
      prepare: () => ({}), // No need to pass any parameters for mixing ingredients
    },
    bakeCake: {
      reducer: (state, action) => {
        const temp = action.payload;
        state.temp = temp; // Store temperature value

        if (state.mix.length > 0 && !state.baked) {
          console.log("Baking the cake...");
          document.getElementById("cakeDiv").innerHTML =
            "<h2>Baking the cake...</h2>";

          console.log("Temperature:", temp.degrees);
          // Simulate baking process
          if (temp.degrees > 180) {
            console.log("The cake is burnt!"); // Log message if the cake is burnt
            document.getElementById("cakeDiv").innerHTML =
              "<h2>The cake is burnt!</h2>"; // Display message in div
          } else {
            state.baked = true;
          }
        } else if (state.baked) {
          console.log("The cake has already been baked.");
        } else {
          console.log("There are no ingredients to bake.");
          document.getElementById("cakeDiv").innerHTML =
            "<h2>There are no ingredients to bake.</h2>";
        }
      },
      prepare: (degrees, temp) => ({ payload: { degrees, temp } }),
    },
    getIngredients: {
  reducer: (state) => {
    const ingredientsHTML = state.mix
      .map((ingredient) => `<li>${ingredient}</li>`)
      .join("");
    document.getElementById(
      "cakeDiv"
    ).innerHTML = `<h1>Ingredients:</h1><ul>${ingredientsHTML}</ul>`;
  },
  prepare: () => ({}),
},

    getMix: (state) => {
      if (state.baked) {
        return "Cake baked";
      } else {
        return state.mix.join(", ");
      }
    },
    resetCake: (state) => {
      state.mix = [];
      state.baked = false;
    },
  },
});

// Export the action and reducer
export const {
  addIngredient,
  mixIngredient,
  bakeCake,
  getMix,
  resetCake,
  getIngredients,
} = motionSlice.actions;

// Implement custom Blockly blocks and edge case handling logic as described in the previous response

export const { moveSprite } = motionSlice.actions;
export default motionSlice.reducer;
