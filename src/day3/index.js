export function solve(input) {
    let graph = {};

    for (let row = 0; row < input.length; row++) {
        const element = input[row];
        let newDigit = '';

        let initRowColum = []
        for (let colum = 0; colum < input[row].length; colum++) {
            // const element = input[row][colum];   
            
            if((parseInt(input[row][colum]) > 0)){
                // graph[`${row}-`]
                newDigit = newDigit + input[row][colum];
                if(newDigit.length === 1){
                    initRowColum = [row, colum];
                }
            } else {
                if(newDigit.length > 0){
                    graph[`${row+colum}-${newDigit}`] = [...initRowColum, row, colum]
                }
                newDigit = '';
                initRowColum = [];

                if(isSymbolExceptDot( input[row][colum] )){
                    graph[`${row+colum}-*`] = [row, colum];
                }
            }
        }
    }
    const getCoord = findAdjacentNodes(graph);

    return getCoord;
}

function findAdjacentNodes(graph) {
    // Function to check if two nodes are adjacent (including diagonally)
    function isAdjacent(nodes, nodeCheck) {
        const node1 = [nodes[0], nodes[1]];
        const node2 = [nodes[2], nodes[3]];
        const node3 = [nodeCheck[0], nodeCheck[1]];
        const [x1, y1] = node1;
        const [x2, y2] = node2;
        const [x0, y0] = node3;

        const dist0  = Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
        const dist1  = Math.sqrt(Math.pow(x0 - x2, 2) + Math.pow(y0 - y2, 2));
        
        // console.log('distance of x1', dist0);
        // console.log('distance of x2', dist1);

        return dist0 <= 1 || dist1 <= 1;
    }

    // Find the coordinates of the '*' node
    let allCoordinatesVector = []
    for(const key in graph){
        if(key.includes('*')){
            allCoordinatesVector.push(graph[key]);
        }
    }
    
    let sum = 0;
    for(const key in graph){
        if(key.includes('*')) continue;

        const nodeNumber = parseInt(key.split('-')[1]);

        console.log(key, graph[key])
        for(const symbolVec of allCoordinatesVector){
            console.log(isAdjacent(graph[key], symbolVec))
            console.log(symbolVec)
            if(isAdjacent(graph[key], symbolVec)){
                sum += nodeNumber;
                break
            }
        }
    }
    return sum
}

function isSymbolExceptDot(char) {
    // This regex matches any character that is not a letter, number, whitespace, or dot
    return /[^A-Za-z0-9\s.]/.test(char);
}
