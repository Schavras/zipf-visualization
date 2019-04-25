const maxHeight = 300;


function displayZipfDigram(id, number) {

    const k = getLenghtsOfChains(number);
    const container = document.getElementById(id);
    let node = document.createElement("DIV");
    node.id = id+"-0";
    node.style.height = maxHeight + "px";
    node.style.width = (100 / k.lenghts.length) + "%";
    node.classList.add("red");
    node.classList.add("zipf-column");
    container.appendChild(node);
    let colorIndex = 1;

    for (let i = 1; i < k.lenghts.length; i++) {
        node = document.createElement("DIV");
        node.id = id+"-"+i;
        let height = (k.lenghts[i] / k.lenghts[0]) * maxHeight;
        node.style.width = (100 / k.lenghts.length) + "%";
        node.style.height = "0px";
        // node.style.bottom = "-" + (maxHeight - node.style.height) + "px";
        node.style.bottom = "-" + (maxHeight - height) + "px";


        let nextColor = colorIndex % 3;
        switch (nextColor) {
            case 0:
                node.classList.add("red");
                break;
            case 1:
                node.classList.add("blue");
                break;
            case 2:
                node.classList.add("green");
                break;
            default:
                console.log(nextColor)
        }
        colorIndex++;
        // node.classList.add("red");
        node.classList.add("zipf-column");
        container.appendChild(node);
    }

    for (let i = 1; i < k.lenghts.length; i++) {
        node = document.getElementById(id+"-"+i);
        let height = (k.lenghts[i] / k.lenghts[0]) * maxHeight;
        node.style.height = height + "px";
    }
}

