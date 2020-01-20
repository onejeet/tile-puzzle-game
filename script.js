
// Mode to Grid Mapping
const modeToGridMapping = {
    easy: 3,
    medium: 4,
    difficult: 5,
    custom: 6
}

// state
const state = {
    mode: "easy",
    emptyBlockId: 9,
    dataSeries: []
}

const init = () => {
     renderGrid();
}

// hanle clicks on mode selectors
document.getElementsByClassName("modesWrapper")[0].addEventListener('click', (e) => {
    state.mode = e.target.innerHTML.toLowerCase();
    document.getElementsByClassName("mode selected")[0].classList.remove("selected");
    e.target.classList += " selected";
    renderGrid();
});


const renderGrid = () => {
    let gridContainer = document.getElementById("grid");
    clearGrid(gridContainer);
    document.getElementById("grid").style.gridTemplateRows = `repeat(${modeToGridMapping[state.mode]}, 50px)`;
    document.getElementById("grid").style.gridTemplateColumns = `repeat(${modeToGridMapping[state.mode]}, 50px)`;
    let numOfBlocks = Math.pow(modeToGridMapping[state.mode], 2);
    for(let i = 1; i <= numOfBlocks; i++){
        let el = document.createElement("div"); 
        let dragStatus = adjacentBlockOfEmpty(numOfBlocks);
        let blockNum = Math.floor(Math.random() * Math.floor(numOfBlocks));
        el.setAttribute("class", "block");
        el.setAttribute("id", i);
        el.setAttribute("draggable", "true");
        el.ondragstart = (e) => {dragBlock(e, numOfBlocks);}
        el.ondrop = (e) => {dropTheBlock(e);}
        el.ondragover = (e) => {allowDrop(e);}
        el.innerText = i === numOfBlocks ? "" : blockNum;
        gridContainer.appendChild(el);
        state.dataSeries.push()
    }
}

const dragBlock = (e, numOfBlocks) => {
    e.dataTransfer.setData("num", e.target.innerText);
    e.target.innerText="";
    // e.target.style.position = 'absolute';
    // e.target.style.zIndex = 1000;
    // moveBlock(e.pageX, e.pageY, e.target);
}

const dropTheBlock = (e) => {
    e.preventDefault();
    e.target.id = e.dataTransfer.getData("id");
    e.target.innerText = e.dataTransfer.getData("num");
}

const allowDrop = (e) => {
    e.preventDefault();
}

const clearGrid = (gridContainer) => {
    gridContainer.innerHTML = "";
}

const adjacentBlockOfEmpty = (id) => {

}

//Initialise the App
init();