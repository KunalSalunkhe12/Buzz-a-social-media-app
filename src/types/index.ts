export type TNewUser = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type TUser = {
  token: string;
  result: {
    _id: string;
    name: string;
    username: string;
    email: string;
    bio: string;
    imageUrl: string;
  };
};