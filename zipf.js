function getZipfChains(TOTAL_NUMBER) {
    let chains = [];

    let i = 0;
    while (i < TOTAL_NUMBER) {
        let n1 = Math.floor(Math.random() * TOTAL_NUMBER);
        let n2 = Math.floor(Math.random() * TOTAL_NUMBER);
        while (n1 === n2) {
            n2 = Math.floor(Math.random() * TOTAL_NUMBER);
        }

        let index1;
        let index2;
        for (let [index, chain] of chains.entries()) {
            let flag = false;
            for (let item of chain) {
                flag = false;
                if (item === n1) {
                    index1 = index;
                    flag = true;
                }
                if (item === n2) {
                    index2 = index;
                    flag = true;
                }
                if (index1 && index2) break;
            }
            if (index1 && index2) break;

        }

        if (index1 === undefined && index2 === undefined) {
            chains.push([n1, n2])
        } else {
            if (index2 === undefined) {
                chains[index1].push(n2);
            } else if (index1 === undefined) {
                chains[index2].push(n1);
            } else if (index1 && index2) {
                // console.log(chains.splice(index1, 1))
                chains[index2] = chains[index2].concat(chains[index1]);
                chains.splice(index1, 1);
            }
        }
        i++;
    }
    chains.sort((a, b) => b.length - a.length);
    // printChain(chains);
    const valid = checkValidity(chains, TOTAL_NUMBER);
    // console.log(valid ? "Valid! :D" : "Not valid :(");
    return valid ? chains : null;
}


function printChain(chains) {
    for (let chain of chains) {
        let str = "";
        for (let item of chain) {
            str += item + " -> "
        }
        console.log(str.substring(0, str.length - 3))
    }
}

function checkValidity(chains, TOTAL_NUMBER) {
    let array = [];
    for (let i = 0; i < TOTAL_NUMBER; i++) {
        array[i] = false;
    }

    for (let chain of chains) {
        for (let item of chain) {
            if (array[item]) {
                return false;
            } else {
                array[item] = true;
            }
        }

    }
    return true;
}

function getChainsSize(totalNumber) {
    const chains = getZipfChains(totalNumber);
    if (!chains) return {lenghts: [0], total: 0}
    const lenghts = [];
    for (let i = 0; i < chains.length; i++) {
        lenghts[i] = chains[i].length;
    }
    return lenghts
}
