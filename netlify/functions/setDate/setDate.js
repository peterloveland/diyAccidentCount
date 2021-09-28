const faunadb = require('faunadb'),
      q = faunadb.query;

const adminClient = new faunadb.Client({
   secret: process.env.FAUNADB_SERVER_SECRET
});



  exports.handler = async (event, context) => {
    let theTime = Date.now()
    return adminClient.query(
      q.Update(
        q.Ref(q.Collection("storage"),'1'),
        {"lastAccident": theTime}
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




