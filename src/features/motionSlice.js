import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
// Initial state of the sprite
 
const initialState = {
  position: { x: 150, y: 100 }, // Assuming default position
  angle: 0,
  glideClicked: false,
  glideStartPosn: { x: -1, y: -1 },
  glideEndPosn: { x: -1, y: -1, sec: 0 },
  ingredients: [], // Array to store ingredients
  mixedIngredient: "",
};



// Create the slice
export const motionSlice = createSlice({
  name: "Motion",
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action) => {
        const selectedIngredient = action.payload.ingredient;
        state.ingredients.push(selectedIngredient); // Push new ingredient to the array
        console.log("Ingredient added:", selectedIngredient);

        // Update the cakeDiv to display the new ingredient
        const ingredientsHTML = state.ingredients
          .map((ingredient) => `<img src="./public/${ingredient}.jpg" alt="Not Found" width="2000" height="1500">`)
          .join("");
          document.getElementById(
            "cakeDiv"
          ).innerHTML = `<h1>Ingredients:</h1><ul>${ingredientsHTML}</ul>`;
      },
      prepare: (ingredient) => ({ payload: { ingredient } }),
    },

    mixIngredient: {
      reducer: (state, action) => {
        const canvasElement = document.getElementById("cakeDiv");
        if (canvasElement) {
          canvasElement.innerHTML = '<video width="100" height="100" autoplay loop muted><source src="./mix.mp4" type="video/mp4">Your browser does not support the video tag.</video>';


;

          console.log("Mixing ingredient...");
          // Additional logic related to mixing ingredients can be added here if needed
        } else {
          console.error("Canvas element not found.");
        }
      },
      prepare: () => ({}), // No need to pass any parameters for mixing ingredients
    },

    setX: {
      reducer: (state, action) => {
        // Retrieve all stored ingredients from the state
        const storedIngredients = state.ingredients;
        // Print all stored ingredients
        console.log("All ingredients:", storedIngredients);

        // Update the cakeDiv to display all stored ingredients
        const ingredientsHTML = storedIngredients
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("");
        document.getElementById(
          "cakeDiv"
        ).innerHTML = `<h1>All Stored Ingredients:</h1><ul>${ingredientsHTML}</ul>`;
      },
      prepare: () => ({}), // No need to pass any parameters for setting X
    },
    setY: {
      reducer: (state, action) => {
        //state.position.x = action.payload.rightSteps;
        document.getElementById("cakeDiv").innerHTML = '<img src=""C:/Users/Asus/Downloads/egg.jpg"" alt="Egg">';
        state.position.y = action.payload.upSteps;
      },
      prepare: (upSteps) => ({ payload: { upSteps } }),
    },
    goTo: {
      reducer: (state, action) => {
        document.getElementById("cakeDiv").innerHTML =
          "<h1>Ingredent Added</h1>";
        if (action.payload.destination === "random_position") {
          state.position.x = Math.floor(Math.random() * 401) - 200;
          state.position.y = Math.floor(Math.random() * 401) - 200;
        }
      },
      prepare: (destination) => ({ payload: { destination } }),
    },
    goToXY: {
      reducer: (state, action) => {
        document.getElementById("cakeDiv").innerHTML =
          "<h1>Ingredent Added</h1>";
        state.position.x = action.payload.rightSteps;
        state.position.y = action.payload.upSteps;
      },
      prepare: (rightSteps, upSteps) => ({ payload: { rightSteps, upSteps } }),
    },

    changeX: {
      reducer: (state, action) => {
        console.log(action.payload);
        state.position.x += action.payload.dashUnits;
      },
      prepare: (dashUnits) => ({ payload: { dashUnits } }),
    },
    changeY: {
      reducer: (state, action) => {
        state.position.y += action.payload.dashUnits;
      },
      prepare: (dashUnits) => ({ payload: { dashUnits } }),
    },
    setSpritePosition: {
      reducer: (state, action) => {
        state.position.x = action.payload.x;
        state.position.y = action.payload.y;
      },
      prepare: (x, y) => ({ payload: { x, y } }),
    },

    turnLeft: {
      reducer: (state, action) => {
        document.getElementById("cakeDiv").innerHTML = "<h1>Cake Baked</h1>";
      },
      prepare: (angle) => ({ payload: { angle } }),
    },
    pointInDirection: {
      reducer: (state, action) => {
        if (action.payload.angle == -1) {
          let clientX, clientY;

          const move = (event) => {
            clientX = event.clientX;
            clientY = event.clientY;
            console.log(clientX, clientY);
            state.angle = Math.atan2((clientY - state.y) / (clientX - state.x));
          };

          // Initialize clientX and clientY to the current cursor position

          const getCursorPosition = (event) => {
            clientX = event.clientX;
            clientY = event.clientY;
            move({ clientX, clientY });
          };
          window.addEventListener("onmousemove", getCursorPosition);
        } else {
          state.angle = action.payload.angle % 360; // Ensure the angle stays within 0 to 359 degrees
          state.angle %= 360;
        }
      },
      prepare: (angle) => ({ payload: { angle } }),
    },
    rotateSprite: {
      reducer: (state, action) => {
        state.angle = action.payload.rotationAngle;
        state.angle %= 360; // Ensure the angle stays within 0 to 359 degrees
      },
      prepare: (rotationAngle) => ({ payload: { rotationAngle } }),
    },
    ifOnEdgeBounce: {
      reducer: (state, action) => {
        if (
          state.position.x <= -100 ||
          state.position.x >= 300 ||
          state.position.y <= -100 ||
          state.position.y >= 300
        ) {
          state.angle += 270;
          state.angle %= 360;
          console.log("bounce");
        }
      },
    },
    glideSecsXY: {
      reducer: (state, action) => {
        state.glideStartPosn = state.position;
        state.glideEndPosn = action.payload;
        if (state.glideClicked == false) {
          state.glideClicked = true;
          return;
        }
        state.position = action.payload;
      },
      prepare: (x, y, sec) => ({ payload: { x, y, sec } }),
    },
    done: {
      reducer: (state, action) => {
        state.glideClicked = false;
      },
    },
  },
});

// Export the action and reducer

export const {
  addIngredient,
  setX,
  setY,
  goTo,
  goToXY,
  setSpritePosition,
  mixIngredient,
  turnLeft,
  pointInDirection,
  rotateSprite,
  changeX,
  changeY,
  ifOnEdgeBounce,
  glideSecsXY,
  done
} = motionSlice.actions;

// export default motionSlice.reducer;

export const moveSpriteToMousePointer = () => (dispatch) => {
  const handleMouseMove = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Dispatch action to update sprite position
    dispatch(setSpritePosition(mouseX, mouseY));
  };

  const handleEscPress = (e) => {
    if (e.key === "Escape") {
      // Cleanup: remove event listener when 'Esc' is pressed
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleEscPress);
    }
  };

  // Add event listeners
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("keydown", handleEscPress);

  // Cleanup: remove event listeners on component unmount or as needed
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("keydown", handleEscPress);
  };
};

// export const glideSecsXY = (x, y, time) => (dispatch) => {
//   const spritePosition = useSelector((state) => state.motionSlice.position);
//   console.log("Sprite Position:", spritePosition);
//   const startX = spritePosition.x;
//   const startY = spritePosition.y;
//   const distanceX = x - startX;
//   const distanceY = y - startY;
//   const steps = time / 10;
//   let currentStep = 0;

//   const intervalId = setInterval(() => {
//     currentStep++;
//     const newX = startX + (distanceX * currentStep) / steps;
//     const newY = startY + (distanceY * currentStep) / steps;
//     dispatch(glideSecsXY(newX, newY));

//     if (currentStep >= steps) {
//       clearInterval(intervalId);
//       dispatch(goToXY(x, y));
//     }
//   }, 10);
// };
//     name: "Motion",
//     initialState,
//     reducers: {
//         moveSprite: {
//             reducer: (state, action) => {
//                 state.position.x += action.payload.rightSteps;
//                 state.position.y += action.payload.upSteps;
//             },
//             prepare: (rightSteps, upSteps) => ({ payload: { rightSteps, upSteps } })
//         },
//     },
// });

// Export the action and reducer
export const { moveSprite } = motionSlice.actions;
export default motionSlice.reducer;
