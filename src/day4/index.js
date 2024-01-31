export function solve(input) {
    let lotterySystem = null;
    let index = 1;
    for (const element of input) {
        const extractNumbers = element.split(': ')[1];
        const allNumbers = extractNumbers.split(' | ');
        
        const cardNumber = allNumbers[0].split(' ');
        const winningNumbers = allNumbers[1].split(' ').filter(d => d != '');

        const newState = findWinningNumber(cardNumber, winningNumbers, index);
        lotterySystem = {
            ...lotterySystem, 
            ...newState
        }
        // console.log(cardNumber, winningNumbers);
        index++;
    }

    console.log(lotterySystem);
    return 'not yet';
}

function findWinningNumber(cardNumbers, winningNumbers, i){
    let state = {};    
    let j = 1

    for (const cardNumber of cardNumbers) {
        for (const winninNumber of winningNumbers) {
           if(cardNumber === winninNumber){

                if(!state[i]){
                    state[i] = { nums: [], points: 0, length: j}
                }

                state[i] = {
                    ...state[i],
                    nums: [...state[i].nums, winninNumber],
                    points: j > 2 ? j * 2 : j,
                    length: j
                }
                // console.log('j', j)
                j++
           } 
        }
    }
    return state
}