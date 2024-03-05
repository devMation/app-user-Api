let userData = [];

const fetchUser = async () => {
  await fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json())
    .then((data) => (userData = data.results));
  console.log(userData);
};

const userDisplay = async () => {
  await fetchUser();
  const dateParse = (date) => {
    let newDate = new Date().toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return newDate;
  };

  const dateCalc = (date) => {
    let today = new Date();
    let todayTimeStamp = Date.parse(today);
    let TimeStamp = Date.parse(date);
    return Math.ceil((todayTimeStamp - TimeStamp) / 8.64e7);
  };
  document.body.innerHTML = userData
    .map(
      (user) =>
        `
        <div class="card">
        <img src="${user.picture.large}" + "${user.name.last}"  >
          <h3>${user.name.first} ${user.name.last}</h3>
          <p>${user.location.city}, ${dateParse(user.dob.date)}</p>
          <em>Membre depuis :  ${dateCalc(user.registered.date)} jour</em>
        </div>
  `
    )
    .join(" / ");
};

userDisplay();
