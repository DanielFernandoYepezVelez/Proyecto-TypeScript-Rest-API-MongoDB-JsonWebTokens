import { connect } from "mongoose";

class Connection {
  public async connect(): Promise<void> {
    try {
      const connected = await connect("mongodb://localhost/authenticate", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });

      if (connected) {
        console.log(`>>> Database Is Connected`);
      }
    } catch {
      console.log(`Conexión Falló`);
    }
  }
}

const db = new Connection();
export default db.connect();
