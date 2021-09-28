const faunadb = require('faunadb'),
      q = faunadb.query;

const adminClient = new faunadb.Client({
   secret: process.env.FAUNADB_SERVER_SECRET
});


let theTime = Date.now()

const data = {
  data: {"lastAccident": theTime}
};


  exports.handler = async (event, context) => {
    await adminClient.query(
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




