const MAX_HEIGHT = 300;

function displayItems(total) {
    const id = `diagram-${total}`;

    const container = document.getElementById("container");

    let node = document.createElement("DIV");

    let title = document.createElement("H1");
    title.innerText = `${total} Items`;
    node.appendChild(title);

    let info = document.createElement("H4");
    info.id = `${id}-info`;
    node.appendChild(info);

    let diagram = document.createElement("DIV");
    diagram.id = `${id}`;
    diagram.classList = "diagram";
    node.appendChild(diagram);

    let clear = document.createElement("DIV");
    clear.classList = "clearfix";
    node.appendChild(clear);

    container.appendChild(node);

    displayZipfDigram(id, total);
}

function displayZipfDigram(id, number) {
    let date1 = new Date();
    const chains = getChainsSize(number);
    const container = document.getElementById(id);
    container.innerHTML = "";
    let colorIndex = 0;
    for (let i = 0; i < chains.length; i++) {
        let node = document.createElement("DIV");
        node.id = id + "-" + i;
        node.classList.add("zipf-column");

        let height = (chains[i] / chains[0]) * MAX_HEIGHT;
        node.style.width = (100 / chains.length) + "%";
        node.style.height = "0px";
        node.style.bottom = "-" + (MAX_HEIGHT - height) + "px";

        addColorToNode(node, colorIndex);
        colorIndex++;
        container.appendChild(node);
    }

    setTimeout(() => {
        // document.getElementById(id + "-0").style.height = MAX_HEIGHT + "px";
        for (let i = 0; i < chains.length; i++) {
            let node = document.getElementById(id + "-" + i);
            let height = (chains[i] / chains[0]) * MAX_HEIGHT;
            node.style.height = height + "px";
        }
    }, 500);

    let date2 = new Date();
    let diff = date2 - date1; //milliseconds interval
    let duration;
    if (diff > 1000) {
        duration = (diff / 1000) + " s"
    } else {
        duration = diff + " ms"
    }
    const infoNode = document.getElementById(id + "-info");
    let infoStr = `Duration: ${duration}`;
    infoStr += ` | Number of chains: ${chains.length}`;
    infoStr += ` | First chain size: ${chains[0]}`;
    infoStr += ` | Second chain size: ${chains[1]}`;
    infoStr += ` | Third chain size: ${chains[2]}`;
    infoNode.innerText = infoStr;
}

function addColorToNode(node, colorIndex) {
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
}

function refreshDiagrams() {
    const container = document.getElementsByClassName("diagram");
    for (let child of container) {
        const number = child.id.substring(8, child.id.length );
        displayZipfDigram(child.id, number);
    }
}
