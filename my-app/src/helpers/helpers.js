export function showNotification(setter) {
  setter(true);
  setTimeout(() => {
    setter(false);
  }, 2000);
}

export async function getWord(url){
  var response = await fetch(url)
  .then(response => response.json())
  .then(data => data.word.toLowerCase());
  return response
}

export function checkWin(correct, wrong, word) {
  let status = 'win';

  // Check for win
  word.split('').forEach(letter => {
    if(!correct.includes(letter)){
      status = '';
    }
  });

  // Check for lose
  if(wrong.length === 9) status = 'lose';

  return status
}
