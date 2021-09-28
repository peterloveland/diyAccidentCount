const faunadb = require('faunadb'),
      q = faunadb.query;

const adminClient = new faunadb.Client({
   secret: process.env.FAUNADB_SERVER_SECRET
});





const saveBookmark = async function(details) {

  let theTime = Date.now()
  
  const data = {
    data: {"lastAccident": theTime}
  };

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

  exports.handler = async (event, context) => {
    try {
    const savedResponse = await saveBookmark(); //Save the URL and the details to Fauna

    if (savedResponse.statusCode === 200) {
        // If successful, return success and trigger a Netlify build
        // await rebuildSite();
        return { statusCode: 200, body: savedResponse.body }
     } else {
        return savedResponse //or else return the error
     }
    } catch (err) {
        return { statusCode: 500, body: `Error: ${err}` };
    }
  }




