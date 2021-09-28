const faunadb = require('faunadb'),
      q = faunadb.query;

const adminClient = new faunadb.Client({
   secret: process.env.FAUNADB_SERVER_SECRET
});



const data = {
  data: {"lastAccident": Date.now()}
};


  exports.handler = async (event, context) => {
    return adminClient.query(
      q.Update(
        q.Ref(q.Collection("storage"),'1'),
        data
      )
    )
    .then((response) => {
         /* Success! return the response with statusCode 200 */
         return {
              statusCode: 200,
              body: JSON.stringify(response)
          }
      }).catch((error) => {
         /* Error! return the error with statusCode 400 */
         return  {
              statusCode: 400,
              body: JSON.stringify(error)
          }
      })
  }




