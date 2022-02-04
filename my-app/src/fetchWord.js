

export default function Word(){
  return fetch(
    'https://clemsonhackman.com/api/word?key=${REACT_APP_API_KEY}'
  )
    .then(res => res.json())
    .then(res => res.results.map(result => result.word));
}
