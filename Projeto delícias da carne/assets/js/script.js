const header = document.querySelector("header");
const menu = document.querySelector(".hamburger");
const sectionOne = document.querySelector(".banner");

const sectionOneOptions = {
  rootMargin: "-200px 0px 0px 0px",
};

const sectionOneObserver = new IntersectionObserver(function (
  entries,
  sectionOneObserver
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      header.classList.add("nav-scrolled");
      menu.style.marginTop = "-1rem";
    } else {
      header.classList.remove("nav-scrolled");
      menu.style.marginTop = "0";
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);

//Carrousel
const controls = [...document.querySelectorAll(".wrapper__control")];
let currentItem = 0;
const items = [...document.querySelectorAll(".localization__carrousel--list")];
const amount = items.length;

const carrousel = (e) => {
  toggleControlClass(e.target);
  currentItem = e.currentTarget.dataset.index;

  items[currentItem].scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
  items.forEach((item) => {
    item.classList.remove("active");
  });
  items[currentItem].classList.add("active");
};

const toggleControlClass = (control) => {
  if (control.classList.contains("active")) {
    return;
  } else {
    controls.forEach((control) => {
      control.classList.remove("active");
    });
    control.classList.add("active");
  }
};

controls.forEach((control) => {
  control.addEventListener("click", carrousel);
});

//Radio
const radios = [...document.querySelectorAll(".radio__button")];

const toggleRadioClass = (e) => {
  const radio = e.target;
  if (radio.classList.contains("active")) {
    return;
  } else {
    radios.forEach((radio) => {
      radio.classList.remove("active");
    });
    radio.classList.add("active");
  }
};

radios.forEach((radio) => {
  radio.addEventListener("click", toggleRadioClass);
});

//Dropdown
const dropdown = document.querySelector(".dropdown__select--selected");
const dropdownList = document.querySelector(".dropdown__select--list");
const dropdownItems = [...document.querySelectorAll(".dropdown__select--item")];
const arrow = document.querySelector(".bx-chevron-down");
let dropdownCurrentText = "";
const dropdownCurrentItem = dropdown.querySelector("span");

const toggleDropdown = () => {
  dropdownList.classList.toggle("active");
  arrow.classList.toggle("active");
};

dropdownItems.forEach((item) => {
  item.addEventListener("click", () => {
    dropdownCurrentText = item.innerText;
    dropdownCurrentItem.innerHTML = dropdownCurrentText;
    dropdownCurrentItem.classList.add("active");
    toggleDropdown();
  });
});

dropdown.addEventListener("click", toggleDropdown);

//Checkbox

document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = [...document.querySelectorAll(".checkbox__button--check")];

  checkboxes.forEach(function (checkbox, index) {
    checkbox.addEventListener("click", function () {
      let isChecked = checkbox.classList.contains("active");

      if (index === 0) {
        checkboxes.forEach(function (innerCheckbox, innerIndex) {
          if (innerIndex !== 0) {
            innerCheckbox.classList.toggle("active", !isChecked);
            innerCheckbox.classList.contains("active")
              ? (innerCheckbox.innerHTML = `<i class="bx bx-check"></i>`)
              : (innerCheckbox.innerHTML = "");
          }
        });

        checkbox.classList.toggle("active", !isChecked);
        checkbox.classList.contains("active")
          ? (checkbox.innerHTML = `<i class="bx bx-check"></i>`)
          : (checkbox.innerHTML = "");
      } else {
        if (!isChecked) {
          checkbox.classList.add("active");
          checkbox.innerHTML = `<i class="bx bx-check"></i>`;
          let allOthersChecked = true;

          for (let i = 1; i < checkboxes.length; i++) {
            if (!checkboxes[i].classList.contains("active")) {
              allOthersChecked = false;
              break;
            }
          }

          if (allOthersChecked) {
            checkboxes[0].classList.add("active");
            checkboxes[0].innerHTML = `<i class="bx bx-check"></i>`;
          }
        } else {
          checkbox.classList.remove("active");
          checkboxes[0].classList.remove("active");
          checkboxes[0].innerHTML = ``;
          checkbox.innerHTML = ``;
        }
      }
    });
  });
});

const validateForm = () => {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#telefone").value;
  const message = document.querySelector("#message").value;
  const phoneWithoutMask = phone.replace(/[\s()+-]/g, "");

  if (name.trim().split(" ").length < 2) {
    alert("O nome deve conter pelo menos 2 nomes.");
    return false;
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    alert("Digite um e-mail válido");
    return false;
  }

  if (phoneWithoutMask.length !== 11) {
    alert("Digite um número de telefone válido com 11 dígitos.");
    return false;
  }

  let atLeastOneChecked = false;
  for (const preference of radios) {
    if (preference.classList.contains("active")) {
      atLeastOneChecked = true;
      break;
    }
  }

  if (!atLeastOneChecked) {
    alert("Selecione pelo menos uma preferência.");
    return false;
  }

  if (dropdownCurrentText === "") {
    alert("Selecione uma opção no dropdown.");
    return false;
  }

  if (message.trim().length < 5) {
    alert("Digite uma mensagem com pelo menos 5 caracteres.");
    return false;
  }

  return true;
};

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm()) {
    alert("Formulário enviado com sucesso!");
  }
});

//Toggle menu
const menuContainer = document.querySelector(".header__menu--mobile");
const close = document.querySelector(".bx-x");
const moblieLinks = [...document.querySelectorAll(".header__menu--mobile a")];

const toggleMenu = () => {
  menuContainer.classList.toggle("active");
};

moblieLinks.forEach((link) => {
  link.addEventListener("click", toggleMenu);
});

close.addEventListener("click", toggleMenu);

menu.addEventListener("click", toggleMenu);
