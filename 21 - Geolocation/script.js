const arrow = document.querySelector(".arrow");
const speed = document.querySelector(".speed-value");

navigator.geolocation.watchPosition(
  (data) => {
    console.log(data);
    speed.textContent = data.coords.speed ?? 0;
    arrow.style.transform = `rotate(${data.coords.heading ?? 0}deg)`;
  },
  (err) => {
    console.log(err);
    alert("Você precisa permitir o acesso à localização!");
  }
);
