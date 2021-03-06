class Clock {
  constructor() {
    // 1. Create a Date object.
    // 2. Store the hours, minutes, and seconds.
    // 3. Call printTime.
    // 4. Schedule the tick at 1 second intervals.
    let date = new Date ();
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();

  }

  printTime() {
    // Format the time in HH:MM:SS
    // Use console.log to print it.
    let hours = this.hours >= 10 ? this.hours : `0${this.hours}`;
    let minutes = this.minutes >= 10 ? this.minutes : `0${this.minutes}`;
    let seconds = this.seconds >= 10 ? this.seconds : `0${this.seconds}`;

    console.log(`${hours}:${minutes}:${seconds}`);
  }

  _tick() {
    // 1. Increment the time by one second.
    // 2. Call printTime.
    this.seconds++;
    if (this.seconds >= 60) {
      this.minutes++;
      this.seconds = 0;
    }

    if (this.minutes >= 60) {
      this.hours++;
      this.minutes = 0;
    }

    if (this.hours >= 24) {
      this.hours = 0;
    }

    this.printTime();
  }
}

const clock = new Clock();

setInterval(function() {
  clock._tick();
}, 1000);

module.exports = Clock;
