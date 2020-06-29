import dotenv from 'dotenv';
import express from 'express'
import { Express } from 'express-serve-static-core';
import { logger } from './logger';
import initializeDependencies from './util/initializer';
import todoRepository from './repository';

class App {
  public server: Express;

  private port: number;

  constructor () {
    dotenv.config();
    this.server = express();
    this.mountRoutes();
    this.port = (process.env.PORT) ? +process.env.PORT : 3000;
  }

  private mountRoutes (): void {
    const router = express.Router();
    router.get('/', async (req, res) => {
      res.status(200).send('<h1 style="font-family:sans-serif; text-align:center;">The whole enchilada!</h1>')
    });
    this.server.use('/', router);
    /*
    router.delete('/tasks/:id', async (req, res) => {
      const a = await del(req.params.id);
      if (a) {
        res.send().status(204);
      } else {
        res.send().status(404);
      }
      
    });
    
    router.get('/tasks', async (req, res) => {
      const a = await test();
      res.json(a)
    });*/

  }

  public async start() {
    await initializeDependencies();
    this.server.listen(this.port, () =>
      logger.info({
        message: `Server is running at http://localhost:${this.port}`,
      }),
    );
  }

}

const app = new App();
app.start();
