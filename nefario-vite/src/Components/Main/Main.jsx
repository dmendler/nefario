import React from "react";
import MainList from "./MainList";
import "../../styles.css"

/* MAIN MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const MainModule = () => {
  return (
    <section>
      <h1 class="indent">Welcome to The Swim App</h1>
      <p class="indent">Dive into a better way to track and compare your swimmers.
        With the Swim App, you can easily view swimmer times, explore rankings,
        and even set up head-to-head matchups to see how athletes stack up against
        each other.
      </p>
      <p class="indent">Whether you're a coach, swimmer, or just a fan of the sport, this app
        is designed to help you make the most of your swimming experience.
        Get started today and take your swimming to the next level!
      </p>
      <MainList />
    </section>
  );
};

export default MainModule;
