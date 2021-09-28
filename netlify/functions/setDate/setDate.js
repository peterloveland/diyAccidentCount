const faunadb = require('faunadb'),
      q = faunadb.query;

const adminClient = new faunadb.Client({
   secret: process.env.FAUNADB_SERVER_SECRET
});

const saveBookmark = async function(details) {
  const data = {
     data: details
  };
  
  return adminClient.query(q.Create(q.Collection("links"), data))
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


  exports.handler = async (event, context) => {
    saveBookmark()
  }