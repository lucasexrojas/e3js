const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

// ---------------------------------------------------------------------------------------

// Aca empieza mi codigo
const form = document.getElementById("form");
const container = document.getElementById("container");
const inputNum = document.getElementById("input-number");
const btn = document.getElementById("btn");

const getPizzaId = () => {
  return parseInt(localStorage.getItem("ultimaPizza")) || 0;
};

const setPizzaId = (pizzaId) => {
  localStorage.setItem("ultimaPizza", pizzaId);
};

const isEmpty = (input) => {
  return !input.value.length;
};

const showError = (input, msj) => {
  const formField = input.parentElement;
  formField.classList.add("incorrect");
  formField.classList.remove("correct");
  const error = formField.querySelector("small");
  error.style.display = "block";
  error.style.color = "red";
  error.textContent = msj;
};

const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.add("correct");
  formField.classList.remove("incorrect");
  const error = formField.querySelector("small");
  error.style.display = "none";
  error.textContent = "";
};

const existsNum = (input) => {
  return pizzas.some((pizza) => pizza.id === parseInt(input.value));
};

const createCard = (pizza) => {
  return `
    <div class="info">
      <h2>${pizza.nombre}</h2>
      <p class="price">$${pizza.precio}</p>
      <p class="ingredients">${pizza.ingredientes.join(", ")}</p>
    </div>
    <img class="img" src="${pizza.imagen}" alt="${pizza.nombre}">
  `;
};

const checkNumInput = (input) => {
  let valid = false;
  if (isEmpty(input)) {
    showError(input, "El campo está vacío");
    return;
  }
  if (!existsNum(input)) {
    showError(input, "El número no corresponde a las opciones indicadas");
    return;
  }
  showSuccess(input);
  valid = true;
  return valid;
};

const renderCard = () => {
  const pizzaId = parseInt(inputNum.value);
  const pizza = pizzas.find((pizza) => pizza.id === pizzaId);
  if (pizza) {
    container.innerHTML = createCard(pizza);
    setPizzaId(pizzaId);
  } else {
    container.innerHTML = "";
    setPizzaId(0);
  }
};

const submitHandler = (e) => {
  e.preventDefault();
  form.reset();
};

const init = () => {
  form.addEventListener("submit", submitHandler);
  inputNum.addEventListener("input", () => checkNumInput(inputNum));
  btn.addEventListener("click", renderCard);
  inputNum.value = getPizzaId(); // Carga la ultima pizza
  renderCard();
};

init();