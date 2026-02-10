export class Timer {
  private time = 0
  private duration = 0
  private paused = false
  private running = false

  /** Fully stop reset the timer */
  public reset() {
    this.time = 0
    this.duration = 0
    this.running = false
    this.paused = false
  }

  /**
   * Set up  the timer with a new duration
   * @param duration The total duration (in milliseconds) of the session
   */
  public setup(duration: number) {
    this.reset()
    this.duration = Math.floor(duration)
  }

  /** Start the timer */
  public start() {
    this.running = true
    this.paused = false
    this.time = 0
  }

  /** Stop the timer and set as complete */
  public stop() {
    this.running = false
    this.paused = false
    this.time = this.duration
  }

  /** Pause the timer */
  public pause() {
    this.paused = true
  }

  /** Resume the timer */
  public resume() {
    this.paused = false
  }

  /**
   * Update timer's internal time and fire the time up callback when finishes
   * @param delta The delta time in milliseconds
   */
  public update(delta: number) {
    if (!this.running || this.paused) return
    this.time += delta
    if (this.time >= this.duration) {
      this.stop()
    }
  }

  /** Check if is paused */
  get isPaused() {
    return this.paused
  }

  /** CHeck if the timer is running, even if its paused */
  get isRunning() {
    return this.running
  }

  /** Get current time */
  get currentTime() {
    return this.time
  }

  /** Get current time remaining */
  get getTimeRemaining() {
    return this.duration - this.time
  }
}
