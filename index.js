const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const PORT = 4000;
const schema = require("./Schemas/index");
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
