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
    email: "vito@gmail.com",
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
    if (utenteValid) {
      window.location.href = "./page_user.html";
    } else {
      const allerta = "Email o Password errati";
      alert(allerta);
    }

    const adminValid = admin.find((admin) => {
      if (emailInput === admin["email"] && password === admin["password"]) {
        return true;
      }
    });
    if (adminValid) {
      window.location.href = "./admin_page.html";
    } else {
      const allerta = "Email o Password errati";
      alert(allerta);
    }
    console.log(adminValid);
  });
}

//pagina Utente

//

btnLogutEL.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("logut");
  window.location.href = "./login.html";
});

// Azioni pagina admin

iscritti.forEach((iscritto) => {
  let nome = iscritto.name;
  let surname = iscritto.surname;

  let fullName = `${nome} ${surname}`;

  const optionEl = document.createElement("option");
  optionEl.value = fullName;
  optionEl.textContent = fullName;
  selectUserEl.appendChild(optionEl);
});
const optionEl = document.querySelector("option");

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
  console.log(iscritti);
});
