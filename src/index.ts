import App from "./app";

class Main {
  constructor() {
    this.init();
  }

  private init(): void {
    App.settings();
    App.middlewares();
    App.routes();
    App.start();
  }
}

new Main();
