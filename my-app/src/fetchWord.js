
async function getWord(){
  let response = await ( await fetch(`https://clemsonhackman.com/api/word?key=${process.env.REACT_APP_API_KEY}`)).json();
  // return await fetch(`https://clemsonhackman.com/api/word?key=${process.env.REACT_APP_API_KEY}`)
  //   .then(res => res.json())
  //   .then((out) => {
  //       out = JSON.stringify(out['word']);
  //       console.log('Output: ', out);
  //     }).catch(err => console.error(err));
  console.log("Word: ",  response);
  // return words
  // return response;
  return response['word'];
}
