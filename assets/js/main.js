const iscritti = [
  {
    name: "Davide",
    surname: "Criscuolo",
    email: "davide123@gmail.com",
    password: "admin",
  },
  {
    name: "Marco",
    surname: "Rossi",
    email: "davidee@gmail.com",
    password: "admin",
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
    name: "Leo",
    surname: "Nati",
    email: "hh@gmail.com",
    password: "admin",
  },
];
const iscrittiMisure = [
  {
    name: "Davide",
    surname: "Criscuolo",
    email: "davide123@gmail.com",
    password: "admin",
    misura1: 12,
    misura2: 45,
    misura3: 77,
    misura4: 88,
    misura5: 15,
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
console.log(divEmailEl);
if (formLoginEL) {
  formLoginEL.addEventListener("submit", function (e) {
    e.preventDefault();

    let emailInput = inputEmailEL.value.toLowerCase();
    let password = inputPasswordEL.value;
    console.log(emailInput);
    const utenteValid = iscritti.find((iscritto) => {
      if (
        emailInput === iscritto["email"] &&
        password === iscritto["password"]
      ) {
        return true;
      }
    });

    const adminValid = admin.find((admin) => {
      if (emailInput === admin["email"] && password === admin["password"]) {
        return true;
      }
    });
    if (utenteValid) {
      sessionStorage.setItem("userEmail", emailInput); // serve per memorizzare l'email immessa in modo tale da poerci essere utile dopo
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
if (window.location.pathname.endsWith("page_user.html")) {
  const email = sessionStorage.getItem("userEmail");
  const viewFullNameEl = document.createElement("h2");
  viewFullNameEl.innerHTML = email;
  divEmailEl.appendChild(viewFullNameEl);
  console.log((viewFullNameEl.innerHTML = email));
  console.log(divEmailEl);

  iscrittiMisure.forEach((iscritto) => {
    if (iscritto.email === email) {
      generaMisure(iscrittiMisure);
    } else {
      const colMisureEl = document.getElementById("colMisure");
      colMisureEl.classList.add("d-none");
      const rowEl = document.querySelector(".row");
      rowEl.classList.remove("row-cols-md-2");
    }
  });
}

if (btnLogutEL) {
  btnLogutEL.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("logut");
    window.location.href = "./login.html";
  });
}

// Azioni pagina admin
if (formAdminMisureEL) {
  iscritti.forEach((iscritto) => {
    let nome = iscritto.name;
    let surname = iscritto.surname;

    let fullName = `${nome} ${surname}`;
    const optionEl = document.createElement("option");
    optionEl.value = fullName;
    optionEl.textContent = fullName;
    selectUserEl.appendChild(optionEl);
  });

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
      trovato.misuraUno = misura1;
      trovato.misuraDue = misura2;
      trovato.misuraTre = misura3;
      trovato.misuraQuattro = misura4;
      console.log("Dati salvati per:", trovato);
    } else {
      console.log("Nessun iscritto trovato.");
    }
    console.log(trovato);
  });
}

// funzione pagina Utente
function generaMisure(array) {
  array.forEach((iscritto) => {
    console.log(iscritto.misura1);
    console.log(iscritto);
    const ulMisureEl = document.getElementById("ListMisure");
    ulMisureEl.classList.add("list-group");

    const markup = `<li class="list-group-item py-3"><span>Spalle : </span>${iscritto.misura1} cm</li>
<li class="list-group-item py-3"><span>Petto : </span>${iscritto.misura2} cm</li>
<li class="list-group-item py-3"><span>Bicipite Destro :</span> ${iscritto.misura3} cm</li>
<li class="list-group-item py-3"><span>Bicipite Sinistro : </span>${iscritto.misura4} cm</li>
<li class="list-group-item py-3"><span>Vita : </span>${iscritto.misura5} cm</li>`;
    ulMisureEl.innerHTML = markup;
  });
}

//
