import express, { Request, Response } from 'express';
import path from 'path';

import Data from './Data';

class App {
  public express: any;

  private data: Data;

  constructor() {
    // Create a new express application instance
    this.express = express();

    this.data = new Data();

    this.config();
    this.mountRoutes();
  }

  private config(): void {
    // Configure Express to use EJS
    this.express.set('views', path.join(__dirname, 'views'));
    this.express.set('view engine', 'ejs');
    this.express.use(express.static(path.join(__dirname, 'public')));
  }

  private mountRoutes(): void {
    const router = express.Router();
    //router.get('/assets/*', function (req: Request, res: Response) {
    //  res.sendFile(path.join(__dirname, req.url));
    //});
    router.get('/', function (req: Request, res: Response) {
      res.redirect('/dashboard');
    });

    router.get('/dashboard', function (req: Request, res: Response) {
      res.render('dashboard', { title: 'alligator', user: 'admin' }); // TODO: hook this to a login!
    });

    router.get('/manage/pods', function (req: Request, res: Response) {
      res.render('manage/pods/main', { title: 'manage' }); // TODO: hook this to a login!
    });

    router.get('/manage/pods/edit', function (req: Request, res: Response) {
      res.render('manage/pods/edit', { title: 'edit', id: req.query.id }); // TODO: hook this to a login!
    });

    router.get('/manage/hatchlings', function (req: Request, res: Response) {
      res.render('manage/hatchlings/main', { title: 'manage' }); // TODO: hook this to a login!
    });

    router.get('/manage/hatchlings/edit', function (req: Request, res: Response) {
      res.render('manage/hatchlings/edit', { title: 'edit', id: req.query.id }); // TODO: hook this to a login!
    });

    router.get('/api/pods/get', (req: Request, res: Response) => {
      console.log('GET pods');
      let query: any = {};
      if (req.query.id) query.id = req.query.id;
      res.status(200).json({
        pods: this.data.getPods(query),
        success: true
      });
    });

    router.get('/api/hatchlings/get', (req: Request, res: Response) => {
      console.log('GET hatchlings');
      let query: any = {};
      if (req.query.id) query.id = req.query.id;
      res.status(200).json({
        hatchlings: this.data.getHatchlings(query),
        success: true
      });
    });

    this.express.use('/', router);
  }
};

export default new App().express;
