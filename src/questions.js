const genQuestion = (data) => {
  const id = data.map(x => JSON.stringify(x)).join('');

  const statement = typeof data[1] === 'string' ? {
    type: 'text',
    text: data[1].replace(/\s/g, "\u00a0")
    .replace('\u00a0=\u00a0', '\u00a0= ')
    .replace('\u00a0?', ' ?'),
  } : data[1];
  
  const challenge = data[2].type ? (
    data[2]
  ) : {
    type: 'select',
    choices: data.slice(2).map(p => ({
      text: p.replace(/#/g, '')
            .replace('YES', '👍').replace('NO', '👎')
      ,
      isAnswer: p.includes('#'),
    }))
  };

  const result = {
    id,
    level: data[0],
    statement,
    challenge,
    tags: [],
  }

  const getEnrichedQuestion = (question) => {
    return {
      ...question,
      withTags: (newTags) => {
        return getEnrichedQuestion({
          ...question,
          tags: [...question.tags, ...newTags]
        })
      }
    }
  }

  return getEnrichedQuestion(result);
}


const dices = (numbers) => ({ type: 'dices', numbers });

const vocal = (text) => ({ type: 'vocal', text });

const sorting = (items, expectedOrder) => {
  return {
    type: 'sorting',
    items: items.map(item => item.type ? item : { type: 'text', text: item }),
    expectedOrder,
  }
}

export const questions = [
  
  // SORT
  genQuestion([1, vocal("Mets les nombres du plus petit au plus grand"), sorting(['4','8','6'],[0,2,1])]).withTags(['sorting']),
  genQuestion([1, vocal("Mets les nombres du plus petit au plus grand"), sorting(['9','7','8'],[1,2,0])]).withTags(['sorting']),
  

  genQuestion([2, vocal("Mets les nombres du plus petit au plus grand"), sorting(['7','8','2','9'],[2,0,1,3])]).withTags(['sorting']),
  genQuestion([2, vocal("Mets les nombres du plus petit au plus grand"), sorting(['8','6','0','3','10'],[2,3,1,0,4])]).withTags(['sorting']),
  genQuestion([2, vocal("Mets les nombres du plus grand au plus petit"), sorting(['6','2','4'],[0,2,1])]).withTags(['sorting']),

  genQuestion([3, vocal("Mets les nombres du plus grand au plus petit"), sorting(['11','13','12','9','10'],[1,2,0,4,3])]).withTags(['sorting']),
  genQuestion([3, vocal("Mets les nombres du plus petit au plus grand"), sorting(['0','21','17','25','23'],[0,2,1,4,3])]).withTags(['sorting']),
  genQuestion([3, vocal("Mets les nombres du plus petit au plus grand"), sorting(['20','30','10','60','50'],[2,0,1,4,3])]).withTags(['sorting','tens']),
  genQuestion([3, vocal("Mets les nombres du plus grand au plus petit"), sorting(['80','10','0','30','50'],[0,4,3,1,2])]).withTags(['sorting','tens']),
  genQuestion([3, vocal("Mets les nombres du plus petit au plus grand"), sorting(['70','90','80','60'],[3,0,2,1])]).withTags(['sorting','tens']),
  genQuestion([3, vocal("Mets les nombres du plus petit au plus grand"), sorting(['1','0','-1'],[2,1,0])]).withTags(['sorting','negative-numbers']),
  genQuestion([3, vocal("Mets les nombres du plus petit au plus grand"), sorting(['-2','0','-1'],[0,2,1])]).withTags(['sorting','negative-numbers']),

  genQuestion([4, vocal("Mets les nombres du plus petit au plus grand"), sorting(['-1','2','-2','0','1'],[2,0,3,4,1])]).withTags(['sorting','negative-numbers']),
  genQuestion([4, vocal("Mets les nombres du plus petit au plus grand"), sorting(['47','78', '39','52','48','91'],[2,0,4,3,1,5])]).withTags(['sorting']),
  genQuestion([4, vocal("Mets les nombres du plus petit au plus grand"), sorting(['24','72', '19','58','92','57'],[2,0,4,3,1,5])]).withTags(['sorting']),

  // VOCALS
  
  genQuestion([1, vocal("Clique sur 10"), '#10','11','12']).withTags(['decimal','10-20', 'tens']),
  genQuestion([1, vocal("Clique sur 11"), '#11','12','13']).withTags(['decimal','10-20']),
  genQuestion([1, vocal("Clique sur 12"), '10','#12','13']).withTags(['decimal','10-20']),
  genQuestion([1, vocal("Clique sur 21"), '11','#21','31']).withTags(['decimal']),
  genQuestion([1, vocal("Clique sur 17"), '15','#17','27']).withTags(['decimal']),
  genQuestion([1, vocal("Clique sur 45"), '35','54','45']).withTags(['decimal']),
  genQuestion([1, vocal("Clique sur le plus petit nombre"), '#2','5','4']).withTags(['min-max']),
  genQuestion([1, vocal("Clique sur le plus petit nombre"), '4','#2','3']).withTags(['min-max']),
  genQuestion([1, vocal("Clique sur le plus grand nombre"), '#9','2','5']).withTags(['min-max']),
  genQuestion([1, vocal("Clique sur le plus grand nombre"), '7','6','#8']).withTags(['min-max']),


  genQuestion([2, vocal("Clique sur 13"), '12','#13','15']).withTags(['decimal','10-20']),
  genQuestion([2, vocal("Clique sur 14"), '#14','15','16']).withTags(['decimal','10-20']),
  genQuestion([2, vocal("Clique sur 15"), '13','#15','27']).withTags(['decimal','10-20']),
  genQuestion([2, vocal("Clique sur 16"), '13','14','#16']).withTags(['decimal','10-20']),
  genQuestion([2, vocal("Clique sur 17"), '#17','18','19']).withTags(['decimal','10-20']),
  genQuestion([2, vocal("Clique sur 18"), '17','#18','19']).withTags(['decimal','10-20']),
  genQuestion([2, vocal("Clique sur 19"), '15','17','#19']).withTags(['decimal','10-20']),
  genQuestion([2, vocal("Clique sur 20"), '10','15','#20']).withTags(['decimal','10-20', 'tens']),
  genQuestion([2, vocal("50 est plus grand que 30"), 'NO', '#YES']).withTags(['min-max','tens']),
  genQuestion([2, vocal("40 est plus grand que 30"), 'NO', '#YES']).withTags(['min-max','tens']),
  genQuestion([2, vocal("40 est plus grand que 60"), '#NO', 'YES']).withTags(['min-max','tens']),
  genQuestion([2, vocal("Continue après moi. 17, 18, 19 ?"), '10','#20','30']).withTags(['decimal','tens']),
  genQuestion([2, vocal("Quel nombre est le plus proche de 7 ?"), '1', '2', '#6']).withTags(['decimal']),
  genQuestion([2, vocal("Clique sur le plus petit nombre"), '#7','12','27']).withTags(['min-max']),
  genQuestion([2, vocal("Clique sur le plus petit nombre"), '12','#3','27']).withTags(['min-max']),
  genQuestion([2, vocal("Clique sur le plus petit nombre"), '30','#20','40']).withTags(['min-max', 'tens']),
  genQuestion([2, vocal("Clique sur le plus grand nombre"), '#12','8','10']).withTags(['min-max']),

  genQuestion([3, vocal("Clique sur 33"), '23','30','#33']).withTags(['decimal']),
  genQuestion([3, vocal("Clique sur 29"), '19','#29','39']).withTags(['decimal']),
  genQuestion([3, vocal("27 est plus petit que 29"), 'NO', '#YES']).withTags(['min-max','decimal']),
  genQuestion([3, vocal("17 est plus petit que 15"), '#NO', 'YES']).withTags(['min-max','decimal']),
  genQuestion([3, vocal("Continue après moi. 47, 48, 49 ?"), '40','#50','60']),
  genQuestion([3, vocal("Clique sur 30"), '20','#30','40']).withTags(['decimal', 'tens']), 
  genQuestion([3, vocal("Clique sur le plus petit nombre"), '55','62','#50']).withTags(['min-max']),
  genQuestion([3, vocal("Clique sur le plus petit nombre"), '90','#70','80']).withTags(['min-max','tens']),
  genQuestion([3, vocal("Clique sur le plus petit nombre"), '50','40','#30']).withTags(['min-max','tens']),
  genQuestion([3, vocal("Clique sur le plus grand nombre"), '40','30','#50']).withTags(['min-max','tens']),
  genQuestion([3, vocal("Clique sur le plus grand nombre"), '55','59','#60']).withTags(['min-max','tens']),
  genQuestion([3, vocal("Clique sur moins 3"), '-5','3','#-3']).withTags(['negative-numbers']),
  genQuestion([3, vocal("Clique sur moins 11"), '-13','-12','#-11']).withTags(['negative-numbers']),
  
  genQuestion([4, vocal("Clique sur 41"), '11','31','41']).withTags(['decimal']),
  genQuestion([4, vocal("Clique sur 39"), '29','#39','49']).withTags(['decimal']),
  genQuestion([4, vocal("Clique sur 42"), '24','33','#42']).withTags(['decimal']),
  genQuestion([4, vocal("Clique sur 40"), '20','30','#40']).withTags(['decimal', 'tens']), 
  genQuestion([4, vocal("Clique sur 50"), '30','40','#50']).withTags(['decimal', 'tens']),
  genQuestion([4, vocal("Clique sur 60"), '40','50','#60']).withTags(['decimal', 'tens']),
  genQuestion([4, vocal("Clique sur 70"), '#70','80','90']).withTags(['decimal', 'tens']),  
  genQuestion([4, vocal("Clique sur 80"), '70','#80','90']).withTags(['decimal', 'tens']),
  genQuestion([4, vocal("Clique sur 90"), '70','80','#90']).withTags(['decimal', 'tens']),  

  genQuestion([4, vocal("51 est plus petit que 42"), '#NO', 'YES']).withTags(['min-max','decimal']),
  genQuestion([4, vocal("45 est plus petit que 54"), 'NO', '#YES']).withTags(['min-max','decimal']),
  genQuestion([4, vocal("Continue après moi. 67, 68, 69 ?"), '#70','80','90']).withTags(['decimal','tens']),
  genQuestion([4, vocal("Quel nombre est le plus proche de 42 ?"), '33', '#44', '55']),
  genQuestion([4, vocal("Quel nombre est le plus proche de 17 ?"), '#15', '25', '47']),
  genQuestion([4, vocal("Clique sur le plus grand nombre"), '89','79','#99']).withTags(['min-max']),
  genQuestion([4, vocal("Clique sur le plus grand nombre"), '#81','68','79']).withTags(['min-max']),
  genQuestion([4, vocal("Clique sur le plus grand nombre"), '68','45','29','61','#72','59']).withTags(['min-max']),
  genQuestion([4, vocal("Clique sur le plus petit nombre"), '22','31','89','75','90','#19']).withTags(['min-max']),
  
  genQuestion([5, vocal("Clique sur le plus petit nombre"), '22','-31','89','#-75','90','-19']).withTags(['min-max','negative-numbers']),
  genQuestion([5, vocal("Clique sur le plus petit nombre"), '18','#-21','35','20','-10','19']).withTags(['min-max','negative-numbers']),
  

  // DICES
  
  genQuestion([0, dices([4]), '#4','5','6']).withTags(['counting']),
  genQuestion([0, dices([5]), '4','#5','6']).withTags(['counting']),
  genQuestion([0, dices([6]), '4','5','#6']).withTags(['counting']),
  genQuestion([0, dices([1,1]), '1','#2','4']).withTags(['counting']),
  genQuestion([0, dices([2,2]), '2','3','#4']).withTags(['counting']),
  genQuestion([0, dices([3,1]), '3','#4','5']).withTags(['counting']),
  genQuestion([0, dices([1,1,1]), '1','2','#3']).withTags(['counting']),
  
  genQuestion([1, dices([4,3]), '5','6','#7']).withTags(['counting']),
  genQuestion([1, dices([3,4]), '6','#7','8']).withTags(['counting']),
  genQuestion([1, dices([4,4]), '#8','9', '10']).withTags(['counting']),
  genQuestion([1, dices([5,5]), '8','9','#10']).withTags(['counting']),
  genQuestion([1, dices([2,2,2]), '#6','7','8']).withTags(['counting']),
  

  
  genQuestion([2, dices([4,5]), '7','8','#9']).withTags(['counting']),
  genQuestion([2, dices([5,4]), '8','#9','10']).withTags(['counting']),
  genQuestion([2, dices([3,3,3]), '7','8','#9']).withTags(['counting']),
  genQuestion([2, dices([3,2,3]), '7','#8','9']).withTags(['counting']),
  genQuestion([2, dices([2,2,4]), '7','#8','9']).withTags(['counting']),
  genQuestion([2, dices([5,6]), '10','#11','12']).withTags(['counting','10-20']),
  genQuestion([2, dices([6,5]), '#11','12','13']).withTags(['counting','10-20']),
  genQuestion([2, dices([6,6]), '10','#12','14']).withTags(['counting','10-20']),
  genQuestion([2, dices([4,3,1]), '#8','9','10']).withTags(['counting','10-20']),
  genQuestion([2, dices([4,4,4]), '10','#12','14']).withTags(['counting','10-20']),

  
  genQuestion([3, dices([5,5,5]), '10','#15','20']).withTags(['counting','10-20']),
  genQuestion([3, dices([5,5,5,5]), '10','15','#20']).withTags(['counting','10-20']),
  genQuestion([3, dices([5,5,1]), '10','#11','#12']).withTags(['counting','10-20']),
  genQuestion([3, dices([5,5,2]), '10','11','#12']).withTags(['counting','10-20']),
  genQuestion([3, dices([5,5,3]), '#13','14','15']).withTags(['counting','10-20']),
  genQuestion([3, dices([5,5,4]), '13','#14','15']).withTags(['counting','10-20']),
  
  genQuestion([4, dices([5,5,5,6]), '20','#21','22']).withTags(['counting']),
  genQuestion([4, dices([6,6,6]), '#18','20', '22']).withTags(['counting','10-20']),
  
  
  genQuestion([0, '1 + 1 = ?','1','#2','3']).withTags(['addition']),
  genQuestion([0, '2 + 1 = ?','#3','4','5']).withTags(['addition']),
  genQuestion([0, '1 + 2 = ?','2','#3','4']).withTags(['addition']),
  genQuestion([0, '2 + 3 = ?','4','#5','6']).withTags(['addition']),
  genQuestion([0, '4 + 1 = ?','#5','6','7']).withTags(['addition']),
  genQuestion([0, '3 + 2 = ?','3','4','#5']).withTags(['addition']),
  genQuestion([0, '5 + 1 = ?','#6','7','8']).withTags(['addition']),
  genQuestion([0, '2 + 2 = ?','3','#4','5']).withTags(['addition']),
  genQuestion([0, '2 + 2 = 4 ?','NO','#YES']).withTags(['addition']),
  genQuestion([0, '3 + 2 = 5 ?','NO','#YES']).withTags(['addition']),
  genQuestion([0, '2 + 2 = 5 ?','#NO','YES']).withTags(['addition']),
  genQuestion([0, '3 + 2 = 2 + 3 ?','NO','#YES']).withTags(['addition']),


  genQuestion([1, '1 + 4 = ?','#5','6','7']).withTags(['addition']),
  genQuestion([1, '3 + 3 = ?','5','#6','7']).withTags(['addition']),
  genQuestion([1, '3 + 4 = ?','5','6','#7']).withTags(['addition']),
  genQuestion([1, '4 + 3 = ?','#7','8','9']).withTags(['addition']),
  genQuestion([1, '2 + 5 = ?','5','6','#7']).withTags(['addition']),
  genQuestion([1, '5 + 2 = ?','#7','8','9']).withTags(['addition']),
  genQuestion([1, '1 + 1 + 1 = ?','2','#3','4']).withTags(['addition']),
  genQuestion([1, '2 + 2 + 1 = ?','#5','6','7']).withTags(['addition']),
  genQuestion([1, '1 + 2 + 2 = ?','3','4','#5']).withTags(['addition']),
  genQuestion([1, '2 + 2 + 2 = ?','5','#6','7']).withTags(['addition']),
  genQuestion([1, '3 - 2 = ?','#1','2','5']).withTags(['substraction']),
  genQuestion([1, '4 - 1 = ?','1','2','#3']).withTags(['substraction']),
  genQuestion([1, '5 - 2 = ?','2','#3','4']).withTags(['substraction']),
  genQuestion([1, '9 - 1 = ?','6','7','#8']).withTags(['substraction']),
  genQuestion([1, '8 - 1 = ?','6','#7','8']).withTags(['substraction']),
  genQuestion([1, '7 - 7 = ?','#0','1','2']).withTags(['substraction']),
  genQuestion([1, '10 - 5 = 5 ?','NO','#YES']).withTags(['substraction']),
  genQuestion([1, '7 + 2 = 7 + 3 ?','#NO','YES']).withTags(['addition', 'comparison']),
  genQuestion([1, '7 + 6 = 6 + 7 ?','NO','#YES']).withTags(['addition', 'comparison']),
  genQuestion([1, '1 + 1 + 1 + 1 = 2 × 1 ?','#NO','YES']).withTags(['multiplication', 'comparison']),
  genQuestion([1, '1 + 1 + 1 ?','2 × 1','#3 × 1', '4 × 1']).withTags(['multiplication', 'comparison']),
  
  
  genQuestion([2, '4 + 4 = ?','6','#8','10']).withTags(['addition']),
  genQuestion([2, '1 + 2 + 3 = ?','5','#6','7']).withTags(['addition']),
  genQuestion([2, '3 + 2 + 3 = ?','6','7','#8']).withTags(['addition']),
  genQuestion([2, '9 - 7 = ?','1','#2','3']).withTags(['substraction']),
  genQuestion([2, '12 - 12 = ?','#0','1','2']).withTags(['substraction']),
  genQuestion([2, '1 + ? = 2','#1','2','3']).withTags(['hole-addition']),
  genQuestion([2, '1 + ? = 3','1','#2','3']).withTags(['hole-addition']),
  genQuestion([2, '2 + ? = 4','#2','3','4']).withTags(['hole-addition']),
  genQuestion([2, '? + 2 = 4','1','#2','3']).withTags(['hole-addition']),
  genQuestion([2, '2 + 2 = 2 × 2 ?','NO','#YES']).withTags(['multiplication', 'comparison']),
  genQuestion([2, '4 + 4 + 4 = 3 × 4 ?','NO','#YES']).withTags(['multiplication', 'comparison']),
  genQuestion([2, '2 + 2 + 2 + 2 = 4 × 2 ?','NO','#YES']).withTags(['multiplication', 'comparison']),
  genQuestion([2, '2 + 2 + 2 + 2 = 2 × 4 ?','NO','#YES']).withTags(['multiplication', 'comparison']),
  genQuestion([2, '5 + 5 + 5 = 2 × 5 ?','#NO','YES']).withTags(['multiplication', 'comparison']),
  genQuestion([2, '5 × 3 = 3 + 3 + 3 + 3 + 3 ?','NO','#YES']).withTags(['multiplication', 'comparison']),
  genQuestion([2, '6 + 6 + 6','#6 × 3','6 × 2', '6 × 1']).withTags(['multiplication']),
  

  genQuestion([3, '4 + 1 + 2 = ?','#7','8','9']).withTags(['addition']),
  genQuestion([3, '4 + 5 = ?','7','#9','10']).withTags(['addition']),
  genQuestion([3, '9 + 2 = ?','10','#11','12']).withTags(['addition']),
  genQuestion([3, '5 + 4 = ?','8','#9','10']).withTags(['addition']),
  genQuestion([3, '4 + 5 = ?','7','8','#9']).withTags(['addition']),
  genQuestion([3, '? + 2 = 5','#3','4','5']).withTags(['hole-addition']),
  genQuestion([3, '8 - 2 = ?','5','#6','7']).withTags(['substraction']),
  genQuestion([3, '9 - 3 = ?','5','#6','7']).withTags(['substraction']),
  genQuestion([3, '9 - 6 = ?','#3','4','5']).withTags(['substraction']),
  genQuestion([3, '10 - 6 = ?','2','3','#4']).withTags(['substraction']),
  genQuestion([3, '5 + ? = 6','0','#1','2']).withTags(['hole-addition']),
  genQuestion([3, '3 + ? = 5','0','1','#2']).withTags(['hole-addition']),
  genQuestion([3, '4 + ? = 5','#1','2','3']).withTags(['hole-addition']),
  genQuestion([3, '9 - 5 = ?','2','3','#4']).withTags(['substraction']),
  genQuestion([3, '7 + 7 + 7 + 7 + 7 + 7','7 × 3','#7 × 6', '7 × 7']).withTags(['multiplication']),
  genQuestion([3, '3 + 3 + 3 + 3 + 3','2 × 3','4 × 3', '#5 × 3']).withTags(['multiplication']),
  genQuestion([3, '11 + 11 + 11','#3 × 11','4 × 11', '5 × 11']).withTags(['multiplication']),
  genQuestion([3, '14 + 14','3 × 11','#2 × 14', '14 × 3']).withTags(['multiplication']),
  genQuestion([3, '3 - (1 + 1) = 1 ?','NO','#YES']).withTags(['substraction', 'parentheses']),
  
  genQuestion([4, '5 + 5 + 2 = ?','10','11','#12']).withTags(['addition']),
  genQuestion([4, '6 + 6 = ?','10','11','#12']).withTags(['addition']),
  genQuestion([4, '7 + 4 = ?','10','#11','12']).withTags(['addition']),
  genQuestion([4, '12 - 10 = ?','1','#2','3']),
  genQuestion([4, '10 + 10 = ?','18','#20','22']).withTags(['addition','10-20','tens','decimal']),
  genQuestion([4, '10 + 3 = ?','#13','15','17']).withTags(['addition','10-20','decimal']),
  genQuestion([4, '10 + 6 = ?','14','15','#16']).withTags(['addition','10-20','decimal']),
  genQuestion([4, '10 + 2 = ?','11','#12','13']).withTags(['addition','10-20','decimal']),
  genQuestion([4, '10 + 8 = ?','16','#18','20']).withTags(['addition','10-20','decimal']),
  genQuestion([4, '3 + ? = 4','#1','2','3']).withTags(['hole-addition']),
  genQuestion([4, '4 + ? = 6','#2','3','4']).withTags(['hole-addition']),
  genQuestion([4, '? + 2 = 5','#3','4','5']).withTags(['hole-addition']),
  genQuestion([4, '5 + ? = 7','1','#2','3']).withTags(['hole-addition']),
  genQuestion([4, '5 - ? = 4','#1','2','3']).withTags(['hole-substraction']),
  genQuestion([4, '6 - ? = 3','1','2','#3']).withTags(['hole-substraction']),
  genQuestion([4, '2 × 4 = 3 × 3 ?','#NO','YES']).withTags(['multiplication', 'comparison']),
  genQuestion([4, '5 × 4 = 4 × 5 ?','NO','#YES']).withTags(['multiplication', 'comparison']),
  genQuestion([4, '2 × (1 + 1) = 4','NO','#YES']).withTags(['multiplication', 'parentheses']),
  genQuestion([4, '0 - 1 = ?','0','#-1','-2']).withTags(['substraction', 'negative-numbers']),
  genQuestion([4, '0 - 2 = ?','2','-1','#-2']).withTags(['substraction', 'negative-numbers']),
  genQuestion([4, '1 - 2 = ?','1','0','#-1']).withTags(['substraction', 'negative-numbers']),

  genQuestion([5, '20 + 10 = ?','28','#30','32']).withTags(['addition','10-20','tens','decimal']),
  genQuestion([5, '20 + 3 = ?','#23','25','27']).withTags(['addition','10-20','decimal']),
  genQuestion([5, '20 + 6 = ?','24','25','#26']).withTags(['addition','10-20','decimal']),
  genQuestion([5, '20 + 2 = ?','21','#22','23']).withTags(['addition','10-20','decimal']),
  genQuestion([5, '20 + 8 = ?','26','#28','30']).withTags(['addition','10-20','decimal']),
  genQuestion([5, '2 + ? = 7','4','#5','6']).withTags(['hole-addition']),
  genQuestion([5, '? + 4 = 7','2','#3','4']).withTags(['hole-addition']),
  genQuestion([5, '3 + ? = 7','#4','5','6']).withTags(['hole-addition']),
  genQuestion([5, '2 + ? + 2 = 6','#2','3','4']).withTags(['hole-addition']),
  genQuestion([5, '20 + 7 = ?','25','#27','29']).withTags(['addition', 'decimal']),
  genQuestion([5, '7 - (2 + 2) = ?','#3','5','7']).withTags(['substraction', 'parentheses']),
  genQuestion([5, '5 - (3 + 2) = ?','#0','2','3']).withTags(['substraction', 'parentheses']),
  genQuestion([5, '5 - (3 - 2) = ?','2','3','#4']).withTags(['substraction', 'parentheses']),
  genQuestion([5, '(7 - 2) - 2 = ?','2','#3','4']).withTags(['substraction', 'parentheses']),
  genQuestion([5, '15 - 14 = ?','#1','2','3']).withTags(['substraction']),
  genQuestion([5, '7 + 7 = ?','10','12','#14']).withTags(['addition']),
  genQuestion([5, '5 + 5 + 5 = ?','10','#15','20']).withTags(['addition']),
  genQuestion([5, '3 + 3 + ? = 9','1','2','#3']).withTags(['hole-addition']),
  genQuestion([5, '9 - ? = 3','5','#6','7']).withTags(['hole-substraction']),
  genQuestion([5, '5 + 5 + 5 = 3 + 3 + 3 + 3 + 3 ?','NO','#YES']).withTags(['multiplication', 'comparison']),
  genQuestion([5, '1 - ? = -1','#2','3','4']).withTags(['substraction', 'negative-numbers']),
  genQuestion([5, '1 - ? = -2','1','2','#3']).withTags(['substraction', 'negative-numbers']),
];

console.log({ questions })