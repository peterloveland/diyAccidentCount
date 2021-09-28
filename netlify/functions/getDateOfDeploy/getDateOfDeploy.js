const fetch = require("node-fetch");


exports.handler = async (event, context) => {
  const { token } = process.env;
  const { identity, user } = context.clientContext;
  const usersUrl = `https://api.netlify.com/api/v1/sites/dd3c7e8b-8be1-4352-9e8d-1df6d336edbe/builds`;
  console.log('event', JSON.stringify(event));
  console.log('context', JSON.stringify(context));
  const adminAuthHeader = 'Bearer ' + token;
  let data
  try {
    data = await fetch(usersUrl, {
      method: 'GET',
      headers: {
        Authorization: adminAuthHeader
      },
    }).then((res) => res.json())
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: e.message
      })
    }
  }
  var date1 = Date(  JSON.stringify(data[0].created_at)  );
  var date2 = Date.now();

  date1 = new Date(date1).getTime()
  date2 = new Date(date2).getTime()

  console.log(date1)
  var Difference_In_Time = date2 - date1;
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);


  return {
    statusCode: 200,
    body: JSON.stringify ( new Date(Difference_In_Days).getTime() )
  }
};