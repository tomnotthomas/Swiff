import { Request, Response, NextFunction } from 'express';


 function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

export default ensureAuthenticated;