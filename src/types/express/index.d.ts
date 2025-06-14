declare namespace Express {
  interface Request {
    admin: {
      id: string;
      email: string;
      name: string;
    };
  }
}
