const { response } = require("express");

const iscritti = [
  {
    name: "Davide",
    surname: "Criscuolo",
    email: "davide123@gmail.com",
    password: "admin",
    misura1: 12,
    misura2: 12,
    misura3: 12,
    misura4: 12,
    misura5: 12,
  },
  {
    name: "Leo",
    surname: "Nati",
    email: "hhl@gmail.com",
    password: "admin",
    misura1: 54,
    misura2: 74,
    misura3: 87,
    misura4: 96,
    misura5: 55,
  },
  {
    name: "Giallo",
    surname: "Pino",
    email: "gg@gmail.com",
    password: "admin",
  },
  {
    name: "Mario",
    surname: "Bianchi",
    email: "ggee@gmail.com",
    password: "admin",
  },
  {
    name: "L",
    surname: "Nat",
    email: "hh@gmail.com",
    password: "admin",
  },
];

const admin = [
  {
    email: "vito@gmail.com",
    password: "admin",
  },
];

/* Per la pagina page_user devono comparire i seguenti dati

Anagrafica
- Nome e Cognome
- email

Misure
-vita
-petto
-gambe
ecc...

Scheda

-Scheda in pdf


Per la pagina admin_page devono comparire i seguenti dati

Selezionare il nome ecognome dell'iscritto tramite un tag select

- Immetere le misure tramite degli input type number

- caricare la scheda 

potrei anche implementare un bottone che al click fa partire un countdown di 1 mese per indicare la scadenza del mensile 














*/

//Elementi Pagina login
const formLoginEL = document.getElementById("formLogin");
const inputEmailEL = document.getElementById("email");
const inputPasswordEL = document.getElementById("password");
const btnLogutEL = document.getElementById("btnLogut");

//Elementi Pagina admin
const formAdminMisureEL = document.getElementById("formAdminMisure");
const formAdminSchedaEL = document.getElementById("formAdminScheda");
const selectUserEl = document.getElementById("selectUser");
const inputMisura1El = document.getElementById("inputMisura1");
const inputMisura2El = document.getElementById("inputMisura2");
const inputMisura3El = document.getElementById("inputMisura3");
const inputMisura4El = document.getElementById("inputMisura4");
const divEmailEl = document.getElementById("titleCard");

const linkAccediEL = document.getElementById("linkAccedi");

if (linkAccediEL) {
  linkAccediEL.addEventListener("click", function (e) {
    e.preventDefault();
    const overlayIndexEl = document.querySelector(".overlayIndex");
    overlayIndexEl.classList.remove("noVisible");
    overlayIndexEl.classList.add("visibleIndex");
  });
}

if (formLoginEL) {
  formLoginEL.addEventListener("submit", function (e) {
    e.preventDefault();

    let emailInput = inputEmailEL.value.toLowerCase();
    let password = inputPasswordEL.value;

    const utenteValid = iscritti.find((iscritto) => {
      if (
        emailInput === iscritto["email"] &&
        password === iscritto["password"]
      ) {
        return true;
      }
    });
    console.log(utenteValid);
    const adminValid = admin.find((admin) => {
      if (emailInput === admin["email"] && password === admin["password"]) {
        return true;
      }
    });
    if (utenteValid) {
      sessionStorage.setItem("userEmail", emailInput); // serve per memorizzare l'email immessa in modo tale da poterci  essere utile dopo
      window.location.href = "./page_user.html";
      return;
    } else if (adminValid) {
      window.location.href = "./admin_page.html";
      sessionStorage.setItem("userEmail", emailInput);

      return;
    } else {
      const allerta = "Email o Password errati";
      alert(allerta);
    }
    console.log(adminValid);
  });
}

// Page User
if (window.location.pathname.endsWith("page_user.html")) {
  const emailSession = sessionStorage.getItem("userEmail");
  const viewEmailEl = document.createElement("h2");
  viewEmailEl.innerHTML = emailSession;
  divEmailEl.appendChild(viewEmailEl);
  console.log((viewEmailEl.innerHTML = emailSession));
  console.log(divEmailEl);

  // async function getIscritto(email) {
  //   try {
  //     const url = `http://localhost:3080/gym/${email}`; // Costruisci l'URL
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Errore nella richiesta: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     const emailIscritto = data.email;
  //     console.log("Iscritto trovato:");
  //     return { email: emailIscritto };
  //   } catch (error) {
  //     console.error("Errore durante la chiamata AJAX:", error);
  //     throw error;
  //   }
  // }
  const trovataIscritto = iscritti.find((iscritto) => {
    if (iscritto.email === emailSession && "misura1" in iscritto) {
      console.log(iscritto.misura1);
      const ulMisureEl = document.getElementById("ListMisure");
      ulMisureEl.classList.add("list-group");
      //il markup che genera gli elementi della colonna msiure
      const markup = `<li class="list-group-item py-3"><span>Spalle : </span>${iscritto.misura1} cm</li>
       <li class="list-group-item py-3"><span>Petto : </span>${iscritto.misura2} cm</li>
       <li class="list-group-item py-3"><span>Bicipite Destro :</span> ${iscritto.misura3} cm</li>
       <li class="list-group-item py-3"><span>Bicipite Sinistro : </span>${iscritto.misura4} cm</li>
       <li class="list-group-item py-3"><span>Vita : </span>${iscritto.misura5} cm</li>`;
      ulMisureEl.innerHTML = markup;
      console.log(ulMisureEl);
      return true;
    } else {
      //   const colMisureEl = document.getElementById("colMisure");
      //   colMisureEl.classList.add("d-none");
      //   const rowEl = document.querySelector(".row");
      //   rowEl.classList.remove("row-cols-md-2");
      return false;
    }
  });
  console.log(trovataIscritto);

  // se l iscritto non ha misure viene nascosta la colonna misure
  if (trovataIscritto === undefined) {
    const colMisureEl = document.getElementById("colMisure");
    colMisureEl.classList.add("d-none");
    const rowEl = document.querySelector(".row");
    rowEl.classList.remove("row-cols-md-2");
  }

  //   console.log(iscritto.email === email);
  //   if (iscritto.email === email) {
  //     generaMisure(iscritti);
  //   } else {
  //     const colMisureEl = document.getElementById("colMisure");
  //     colMisureEl.classList.add("d-none");
  //     const rowEl = document.querySelector(".row");
  //     rowEl.classList.remove("row-cols-md-2");
  //   }
  // });
}

// bottone logout
if (btnLogutEL) {
  btnLogutEL.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("logut");
    window.location.href = "./index.html";
  });
}

// Azioni pagina admin
if (formAdminMisureEL) {
  iscritti.forEach((iscritto) => {
    let nome = iscritto.name;
    let surname = iscritto.surname;

    // appende il nome e cognome del cliente all interno del select quindi come option
    let fullName = `${nome} ${surname}`;
    const optionEl = document.createElement("option");
    optionEl.value = fullName;
    optionEl.textContent = fullName;
    selectUserEl.appendChild(optionEl);
  });

  //eventListner per andare a creare una nuva chiave valore nell oggetto
  formAdminMisureEL.addEventListener("submit", function (e) {
    e.preventDefault();
    const misura1 = Number(inputMisura1El.value);
    const misura2 = Number(inputMisura2El.value);
    const misura3 = Number(inputMisura3El.value);
    const misura4 = Number(inputMisura4El.value);
    const selectedName = selectUserEl.value;
    const trovato = iscritti.find(
      ({ name, surname }) => `${name} ${surname}` === selectedName
    );

    if (trovato) {
      trovato.misura1 = misura1;
      trovato.misura2 = misura2;
      trovato.misura3 = misura3;
      trovato.misura4 = misura4;
      const modalEl = document.querySelector(".overlay");
      modalEl.classList.remove("d-none");
      modalEl.classList.add("d-flex");
      const textModal = document.querySelector(".text_intern_modal");
      textModal.innerHTML = `<h5 class="p-1">Hai salvato con successo le misure!</h5>`;
      console.log(modalEl);
      console.log("Dati salvati per:", trovato);
    } else {
      console.log("Nessun iscritto trovato.");
    }
  });
}

// Modale per le misure caricate
if (window.location.pathname.endsWith("admin_page.html")) {
  const btnCloseModal = document.getElementById("closeModal");
  btnCloseModal.addEventListener("click", function () {
    const modalEl = document.querySelector(".overlay");
    modalEl.classList.remove("d-flex");
    modalEl.classList.add("d-none");
  });
}

// effetto delle card nella pagina index
if (window.location.pathname.endsWith("index.html")) {
  const colServiceEl = document.querySelectorAll(".col");
  console.log(colServiceEl);
  colServiceEl.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const cardBody = card.querySelector(".cardBodyHome");
      if (cardBody) {
        cardBody.classList.add("visible");
      }
    });
    card.addEventListener("mouseleave", function () {
      const cardBody = card.querySelector(".cardBodyHome");
      if (cardBody) {
        cardBody.classList.remove("visible");
      }
    });
  });
  //modale per il login

  //chisura modale per login
  const closeModaleEl = document.querySelector(".closeModal");

  closeModaleEl.addEventListener("click", function (e) {
    e.preventDefault();
    const overlayIndexEl = document.querySelector(".overlayIndex");
    overlayIndexEl.classList.remove("visibleIndex");
    overlayIndexEl.classList.add("noVisible");
  });
}

// boxcontainerEl.forEach((box) => {
//   const boxDescEl = box.querySelector(".dec_box");
//   let timeUotiid;
//   console.log(boxDescEl);
//   box.addEventListener("mouseenter", function () {
//     box.style.height = "400px";
//     timeUotiid = setTimeout(() => {
//       //per ritardare la visone del testo
//       boxDescEl.classList.add("visible");
//     }, 400);
//   });

//   box.addEventListener("mouseleave", function () {
//     box.style.height = "200px";
//     boxDescEl.classList.remove("visible");
//     clearTimeout(timeUotiid);
//   });
// });
