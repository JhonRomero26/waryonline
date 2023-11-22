import Elysia from "elysia";
import { apiV1Routes } from "./api/v1";

class App {
  #app = new Elysia();

  constructor(port: number) {
    this.#routes();
    this.#app.listen(port);
  }

  #routes() {
    this.#app.group("/api", (app) =>
      app.use(apiV1Routes).group("/v1", (app) => app.use(apiV1Routes))
    );
  }

  getServer() {
    return this.#app;
  }
}

export default App;
