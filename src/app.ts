import dotenv from 'dotenv';
import express from 'express'
import { Express } from 'express-serve-static-core';
import { logger } from './logger';
import initializeDependencies from './util/initializer';
import todoRepository from './repository';
import bodyParser from 'body-parser';

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
    const parser = bodyParser.json();
    const context = '/api/v1/tasks';
    
    this.server.use('/', router);
    this.server.use(parser);

    router.get('/', async (req, res) => {
      res.status(200).send('<h1 style="font-family:sans-serif; text-align:center;">The whole enchilada!</h1>')
    });

    router.get(`${context}`, async (req, res) => {
      const a = await todoRepository.findAll();
      res.json(a)
    });

    router.get(`${context}/:id`, async (req, res) => {
      const a = await todoRepository.findOne(req.params.id);
      if (a.length == 0) {
        res.status(404).json({
          message: `Task not found`
        });
      } else {
        res.json(a);
      }
    });

    router.delete(`${context}/:id`, async (req, res) => {
      const a = await todoRepository.delete(req.params.id);
      res.status(200).json({
        message: `Successfully deleted task ${req.params.id}`
      })
    });

    router.post(`${context}`, parser,  async (req, res) => {
      const a = await todoRepository.create(req.body);
      res.status(201).location(`${context}/${a.values().next().value.id}`).send();
    });

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
