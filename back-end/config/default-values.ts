interface DefaultValues {
  port: number;
  mongoDbUrl: string;
  frontEndUrl: string;
}

export const defaultValues: DefaultValues = {
  port: 4000,
  mongoDbUrl: 'mongodb://localhost:27017/test',
  frontEndUrl: 'http://localhost:3000',
};
