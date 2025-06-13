const iscritti = [
  {
    email: "davide123@gmail.com",
    password: "admin",
  },
  {
    email: "davidee@gmail.com",
    password: "admin",
  },
  {
    email: "gg@gmail.com",
    password: "admin",
  },
  {
    email: "ggee@gmail.com",
    password: "admin",
  },
  {
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

const formEl = document.querySelector("form");
const inputEmailEL = document.getElementById("email");
const inputPasswordEL = document.getElementById("password");
const btnLogutEL = document.getElementById("btnLogut");

if (formEl) {
  formEl.addEventListener("submit", function (e) {
    e.preventDefault();

    let emailInput = inputEmailEL.value;
    let password = inputPasswordEL.value;

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

btnLogutEL.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("logut");
  window.location.href = "./login.html";
});
