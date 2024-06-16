const findMyState = (state) => {
  const status = document.querySelector(".navbar-center");
  const success = (position) => {
    console.log(position);
  }
  navigator.geolocation.getCurrentPosition(success,error)
};