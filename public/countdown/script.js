import data from "./data.json.js";
const headingText = data.heading;
const subheadingText = data.subheading;
const titleText = data.title;
const bgPic = `url('${data.background}')`;
const facebook = data.social.facebook;
const twitter = data.social.twitter;
const instagram = data.social.instagram;
const formspreeId = data.formspreeId;

const subheading = document.getElementById("subheading");
const heading = document.getElementById("heading");
const title = document.getElementById("title");
const body = document.getElementById("body");
const fblink = document.getElementById("fblink");
const twlink = document.getElementById("twlink");
const iglink = document.getElementById("iglink");
const form = document.getElementById("form");

subheading.innerHTML = subheadingText;
heading.innerHTML = headingText;
title.innerHTML = titleText;
body.style.backgroundImage = bgPic;
fblink.href = "https://www.facebook.com/" + `${facebook}`;
twlink.href = "https://www.twitter.com/" + `${twitter}`;
iglink.href = "https://www.instagram.com/" + `${instagram}`;
form.action = "https://formspree.io/f/" + `${formspreeId}`;

function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const daysSpan = clock.querySelector(".days");
  const hoursSpan = clock.querySelector(".hours");
  const minutesSpan = clock.querySelector(".minutes");
  const secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    const t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(
  `${data.deadline.year}`,
  `${data.deadline.month}` - 1,
  `${data.deadline.day}`,
  `${data.deadline.hours}`,
  `${data.deadline.minutes}`,
  `${data.deadline.seconds}`
);

console.log(deadline);

initializeClock("clockdiv", deadline);
