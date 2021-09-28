const faunadb = require('faunadb'),
      q = faunadb.query;

const adminClient = new faunadb.Client({
   secret: process.env.FAUNADB_SERVER_SECRET
});

  exports.handler = async (event, context) => {
    return adminClient.query(
      q.Get(
        q.Ref(q.Collection("storage"),'1')
      )
    )
    .then((response) => {
         /* Success! return the response with statusCode 200 */

        var date1 = response.data.lastAccident;
        var date2 = Date.now();


        console.log({date2})
        var Difference_In_Time = date2 - date1;
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

         return {
              statusCode: 200,
              body: JSON.stringify ( new Date(Difference_In_Days).getTime() )
          }
      }).catch((error) => {
         /* Error! return the error with statusCode 400 */
         return  {
              statusCode: 400,
              body: JSON.stringify(error)
          }
      })
  }

