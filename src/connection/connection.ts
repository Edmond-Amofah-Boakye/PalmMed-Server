import mongoose from 'mongoose';
export const DBCONNECTION = () => {
  return new Promise<void>((resolve, reject) => {
    mongoose
      .connect(`${process.env.MONGO_URL}`)
      .then((res) => {
        console.log(
          `database is running on ${res.connection.host}/${res.connection.db.databaseName}`
        );
        resolve();
      })
      .catch((err) => {
        reject();
        console.log(`error occured ${err}`);
      });
  });
};
