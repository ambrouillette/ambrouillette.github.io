const genQuestion = (data) => {
  const id = data.join('');

  const statement = typeof data[1] === 'string' ? {
    type: 'text',
    text: data[1].replace(/\s/g, "\u00a0")
    .replace('\u00a0=\u00a0', '\u00a0= ')
    .replace('\u00a0?', ' ?'),
  } : data[1];
  
  return {
    id,
    level: data[0],
    statement,
    answers: data.slice(2).map(p => ({
      text: p.replace(/#/g, '')
            .replace('YES', '👍').replace('NO', '👎')
      ,
      isAnswer: p.includes('#'),
    }))
  }
}


const dices = (numbers) => ({ type: 'dices', numbers });

const vocal = (text) => ({ type: 'vocal', text });

export const questions = [
  
  // VOCALS
  
  genQuestion([1, vocal("Clique sur 21"), '11','#21','31']),
  genQuestion([1, vocal("Clique sur 17"), '15','#17','27']),

  genQuestion([2, vocal("Clique sur 11"), '#11','12','13']),
  genQuestion([2, vocal("Clique sur 15"), '13','#15','27']),
  genQuestion([2, vocal("Clique sur 16"), '13','14','#16']),
  genQuestion([2, vocal("50 est plus grand que 30"), 'NO', '#YES']),
  genQuestion([2, vocal("Continue après moi. 17, 18, 19..."), '10','#20','30']),
  genQuestion([2, vocal("Quel nombre est le plus proche de 7 ?"), '1', '2', '#6']),

  genQuestion([3, vocal("Clique sur 33"), '23','30','#33']),
  genQuestion([3, vocal("Clique sur 29"), '19','#29','39']),
  genQuestion([3, vocal("Clique sur 27 est plus petit que 29"), 'NO', '#YES']),
  genQuestion([3, vocal("Clique sur 17 est plus petit que 15"), '#NO', 'YES']),
  genQuestion([3, vocal("Continue après moi. 47, 48, 49"), '40','#50','60']),

  genQuestion([4, vocal("Clique sur 41"), '11','31','41']),
  genQuestion([4, vocal("Clique sur 39"), '29','#39','49']),
  genQuestion([4, vocal("Clique sur 42"), '24','33','#42']),
  genQuestion([4, vocal("Clique sur 50"), '30','40','#50']),  
  genQuestion([4, vocal("51 est plus petit que 42"), '#NO', 'YES']),
  genQuestion([4, vocal("45 est plus petit que 54"), 'NO', '#YES']),
  genQuestion([4, vocal("Quel nombre est le plus proche de 42 ?"), '33', '#44', '55']),
  genQuestion([4, vocal("Quel nombre est le plus proche de 17 ?"), '#15', '25', '47']),
  

  // DICES
  
  genQuestion([0, dices([4]), '#4','5','6']),
  genQuestion([0, dices([5]), '4','#5','6']),
  genQuestion([0, dices([6]), '4','5','#6']),
  genQuestion([0, dices([1,1]), '1','#2','4']),
  genQuestion([0, dices([2,2]), '2','3','#4']),
  genQuestion([0, dices([3,1]), '3','#4','5']),
  genQuestion([0, dices([1,1,1]), '1','2','#3']),
  
  genQuestion([1, dices([4,3]), '5','6','#7']),
  genQuestion([1, dices([3,4]), '6','#7','8']),
  genQuestion([1, dices([4,4]), '#8','9', '10']),
  genQuestion([1, dices([5,5]), '8','9','#10']),
  genQuestion([1, dices([2,2,2]), '#6','7','8']),
  

  
  genQuestion([2, dices([4,5]), '7','8','#9']),
  genQuestion([2, dices([5,4]), '8','#9','10']),
  genQuestion([2, dices([3,3,3]), '7','8','#9']),
  genQuestion([2, dices([3,2,3]), '7','#8','9']),
  genQuestion([2, dices([2,2,4]), '7','#8','9']),
  genQuestion([2, dices([5,6]), '10','#11','12']),
  genQuestion([2, dices([6,5]), '#11','12','13']),
  genQuestion([2, dices([6,6]), '10','#12','14']),
  genQuestion([2, dices([4,3,1]), '#8','9','10']),
  genQuestion([2, dices([4,4,4]), '10','#12','14']),

  
  genQuestion([3, dices([5,5,5]), '10','#15','20']),
  genQuestion([3, dices([5,5,5,5]), '10','15','#20']),
  genQuestion([3, dices([5,5,1]), '10','#11','#12']),
  genQuestion([3, dices([5,5,2]), '10','11','#12']),
  genQuestion([3, dices([5,5,3]), '#13','14','15']),
  genQuestion([3, dices([5,5,4]), '13','#14','15']),
  genQuestion([3, dices([5,5,5,6]), '20','#21','22']),
  
  genQuestion([4, dices([6,6,6]), '#18','20', '22']),
  
  
  genQuestion([0, '1 + 1 = ?','1','#2','3']),
  genQuestion([0, '2 + 1 = ?','#3','4','5']),
  genQuestion([0, '1 + 2 = ?','2','#3','4']),
  genQuestion([0, '2 + 3 = ?','4','#5','6']),
  genQuestion([0, '4 + 1 = ?','#5','6','7']),
  genQuestion([0, '3 + 2 = ?','3','4','#5']),
  genQuestion([0, '5 + 1 = ?','#6','7','8']),
  genQuestion([0, '2 + 2 = ?','3','#4','5']),
  genQuestion([0, '2 + 2 = 4 ?','NO','#YES']),
  genQuestion([0, '3 + 2 = 5 ?','NO','#YES']),
  genQuestion([0, '2 + 2 = 5 ?','#NO','YES']),
  genQuestion([0, '3 + 2 = 2 + 3 ?','NO','#YES']),


  genQuestion([1, '1 + 4 = ?','#5','6','7']),
  genQuestion([1, '3 + 3 = ?','5','#6','7']),
  genQuestion([1, '3 + 4 = ?','5','6','#7']),
  genQuestion([1, '4 + 3 = ?','#7','8','9']),
  genQuestion([1, '2 + 5 = ?','5','6','#7']),
  genQuestion([1, '5 + 2 = ?','#7','8','9']),
  genQuestion([1, '1 + 1 + 1 = ?','2','#3','4']),
  genQuestion([1, '2 + 2 + 1 = ?','#5','6','7']),
  genQuestion([1, '1 + 2 + 2 = ?','3','4','#5']),
  genQuestion([1, '2 + 2 + 2 = ?','5','#6','7']),
  genQuestion([1, '3 - 2 = ?','#1','2','5']),
  genQuestion([1, '4 - 1 = ?','1','2','#3']),
  genQuestion([1, '5 - 2 = ?','2','#3','4']),
  genQuestion([1, '9 - 1 = ?','6','7','#8']),
  genQuestion([1, '8 - 1 = ?','6','#7','8']),
  genQuestion([1, '7 - 7 = ?','#0','1','2']),
  genQuestion([1, '10 - 5 = 5 ?','NO','#YES']),
  genQuestion([1, '7 + 2 = 7 + 3 ?','#NO','YES']),
  genQuestion([1, '7 + 6 = 6 + 7 ?','NO','#YES']),
  genQuestion([1, '1 + 1 + 1 + 1 = 2 × 1 ?','#NO','YES']),
  
  genQuestion([2, '4 + 4 = ?','6','#8','10']),
  genQuestion([2, '1 + 2 + 3 = ?','5','#6','7']),
  genQuestion([2, '3 + 2 + 3 = ?','6','7','#8']),
  genQuestion([2, '9 - 7 = ?','1','#2','3']),
  genQuestion([2, '12 - 12 = ?','#0','1','2']),
  genQuestion([2, '1 + ? = 2','#1','2','3']),
  genQuestion([2, '1 + ? = 3','1','#2','3']),
  genQuestion([2, '2 + ? = 4','#2','3','4']),
  genQuestion([2, '? + 2 = 4','1','#2','3']),
  genQuestion([2, '2 + 2 = 2 × 2 ?','NO','#YES']),
  genQuestion([2, '4 + 4 + 4 = 3 × 4 ?','NO','#YES']),
  genQuestion([2, '2 + 2 + 2 + 2 = 4 × 2 ?','NO','#YES']),
  genQuestion([2, '2 + 2 + 2 + 2 = 2 × 4 ?','NO','#YES']),
  genQuestion([2, '5 + 5 + 5 = 2 × 5 ?','#NO','YES']),
  genQuestion([2, '5 × 3 = 3 + 3 + 3 + 3 + 3 ?','NO','#YES']),
  
  genQuestion([3, '4 + 1 + 2 = ?','#7','8','9']),
  genQuestion([3, '4 + 5 = ?','7','#9','10']),
  genQuestion([3, '9 + 2 = ?','10','#11','12']),
  genQuestion([3, '5 + 4 = ?','8','#9','10']),
  genQuestion([3, '4 + 5 = ?','7','8','#9']),
  genQuestion([3, '? + 2 = 5','#3','4','5']),
  genQuestion([3, '8 - 2 = ?','5','#6','7']),
  genQuestion([3, '9 - 3 = ?','5','#6','7']),
  genQuestion([3, '9 - 6 = ?','#3','4','5']),
  genQuestion([3, '10 - 6 = ?','2','3','#4']),
  genQuestion([3, '5 + ? = 6','0','#1','2']),
  genQuestion([3, '3 + ? = 5','0','1','#2']),
  genQuestion([3, '4 + ? = 5','#1','2','3']),
  genQuestion([3, '9 - 5 = ?','2','3','#4']),
  
  genQuestion([4, '5 + 5 + 2 = ?','10','11','#12']),
  genQuestion([4, '6 + 6 = ?','10','11','#12']),
  genQuestion([4, '7 + 4 = ?','10','#11','12']),
  genQuestion([4, '12 - 10 = ?','1','#2','3']),
  genQuestion([4, '10 + 10 = ?','18','#20','22']),
  genQuestion([4, '10 + 3 = ?','#13','15','17']),
  genQuestion([4, '10 + 6 = ?','14','#16','18']),
  genQuestion([4, '3 + ? = 4','#1','2','3']),
  genQuestion([4, '4 + ? = 6','#2','3','4']),
  genQuestion([4, '? + 2 = 5','#3','4','5']),
  genQuestion([4, '5 + ? = 7','1','#2','3']),
  genQuestion([4, '5 - ? = 4','#1','2','3']),
  genQuestion([4, '6 - ? = 3','1','2','#3']),
  genQuestion([4, '2 × 4 = 3 × 3 ?','#NO','YES']),
  genQuestion([4, '5 × 4 = 4 × 5 ?','NO','#YES']),

  genQuestion([5, '2 + ? = 7','4','#5','6']),
  genQuestion([5, '? + 4 = 7','2','#3','4']),
  genQuestion([5, '3 + ? = 7','#4','5','6']),
  genQuestion([5, '2 + ? + 2 = 6','#2','3','4']),
  genQuestion([5, '20 + 7 = ?','25','#27','29']),
  genQuestion([5, '7 - (2 + 2) = ?','#3','5','7']),
  genQuestion([5, '5 - (3 + 2) = ?','#0','2','3']),
  genQuestion([5, '5 - (3 - 2) = ?','2','3','#4']),
  genQuestion([5, '(7 - 2) - 2 = ?','2','#3','4']),
  genQuestion([5, '15 - 14 = ?','#1','2','3']),
  genQuestion([5, '7 + 7 = ?','10','12','#14']),
  genQuestion([5, '5 + 5 + 5 = ?','10','#15','20']),
  genQuestion([5, '3 + 3 + ? = 9','1','2','#3']),
  genQuestion([5, '9 - ? = 3','5','#6','7']),
  genQuestion([5, '5 + 5 + 5 = 3 + 3 + 3 + 3 + 3 ?','NO','#YES']),
];


