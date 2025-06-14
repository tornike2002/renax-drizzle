declare namespace Express {
  interface Request {
    admin: {
      id: string;
      name: string;
      email: string;
    };
  }
}
