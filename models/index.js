const ENGINE_DB = process.env.ENGINE_DB;

const pathModels = ENGINE_DB === "nosql" ? "./nosql" : "./postgres";

const models = {
  usersModel: require(`${pathModels}/users`),
  tracksModel: require(`${pathModels}/tracks`),
  storageModel: require(`${pathModels}/storage`),
};

module.exports = models;