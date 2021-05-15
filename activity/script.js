let addbuttonContainer = document.querySelector(".add_sheet_container");
let sheetList = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");
let Allcells = document.querySelectorAll(".grid .col");

let addressBar = document.querySelector(".address-box");
let address;
let arid = 0;
let acid = 0;
let selectedcell;
let sheetidx = 0;
let fontsizeselect = document.querySelector(".font-size");
let alignmentbtns = document.querySelectorAll(".alignment-container .align-btn");
let downloadButton = document.querySelector(".download");
let saveButton = document.querySelector(".save");
let newButton = document.querySelector(".new");
let openButton = document.querySelector(".open");
let colourselect = document.querySelector("#color");
let bgcolourselect = document.querySelector("#bg-color");
let boldbtn = document.querySelector(".bold");
let italicbtn = document.querySelector(".italic");
let underlinebtn = document.querySelector(".underline");
let fontfamilyselect = document.querySelector(".font-family");
let formulaInput = document.querySelector(".formula-box");
let topLeftBlock = document.querySelector(".top-left-block");
let gridContainer = document.querySelector(".grid_container");
let sheetDB = workSheetDB[0];
initUI();
let cellObject;
let filename;





gridContainer.addEventListener("scroll", function() {

        let top = gridContainer.scrollTop;
        let left = gridContainer.scrollLeft;
        topLeftBlock.style.top = top + "px";
        topRow.style.top = top + "px";
        topLeftBlock.style.left = left + "px";
        leftCol.style.left = left + "px";

    })
    ////////////////////////// alignment buttons events//////////////////////////////////////////
for (let i = 0; i < alignmentbtns.length; i++) {
    alignmentbtns[i].addEventListener("click", function d() {
        // console.log("hello")
        for (let j = 0; j < alignmentbtns.length; j++) {
            alignmentbtns[j].classList.remove("active-btn");
        }
        alignmentbtns[i].classList.add("active-btn");
        console.log(alignmentbtns[i].classList[1]);

        cellObject.halign = alignmentbtns[i].classList[1];
        selectedcell.style.textAlign = alignmentbtns[i].classList[1];
    });
}

firstSheet.addEventListener("click", handleActiveSheet);
//>>>>>>>>>>>   ADD button click event <<<<<<<<<<<<<<<<<<<<
addbuttonContainer.addEventListener("click", function() {
    console.log("add button clicked");
    let sheetArr = document.querySelectorAll(".sheet");
    let lastSheetElem = sheetArr[sheetArr.length - 1];
    let idx = lastSheetElem.getAttribute("sheetIdx");
    idx = Number(idx);
    let NewSheet = document.createElement("div");
    NewSheet.setAttribute("class", "sheet");
    NewSheet.setAttribute("sheetIdx", idx + 1);
    NewSheet.innerText = ` Sheet ${idx + 1}`;
    sheetList.appendChild(NewSheet);
    //remove active sheet class from all sheets
    sheetArr.forEach(function(sheet) {
        sheet.classList.remove("active-sheet");
    });

    //get latestAdded sheet
    let newSheetArr = document.querySelectorAll(".sheet");
    // add active sheet class to latest added sheet
    newSheetArr[newSheetArr.length - 1].classList.add("active-sheet");
    // initialise new sheetdb database
    initCurrentSheetDb();
    sheetDB = workSheetDB[idx];

    // initialise new page with new values
    initUI();
    NewSheet.addEventListener("click", handleActiveSheet);
});

function handleActiveSheet(e) {
    let MySheet = e.currentTarget;
    let sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr.forEach(function(sheet) {
        sheet.classList.remove("active-sheet");
    });
    if (!MySheet.classList[1]) {
        MySheet.classList.add("active-sheet");
    }
    let sheetIdx = MySheet.getAttribute("sheetIdx");
    sheetDB = workSheetDB[sheetIdx - 1];
    //set  UI from clicked sheet according to database
    setUI(sheetDB);
}
//>>>>>>>>>>>>>>>>>click event for every cell<<<<<<<<<<<<<<<<<<<
//............................select event for cells............................./////////////////////
for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("click", function handleCell() {
        let rid = Number(Allcells[i].getAttribute("rid"));
        let cid = Number(Allcells[i].getAttribute("cid"));
        let rowAdd = rid + 1;

        let colAdd = String.fromCharCode(cid + 65);

        address = colAdd + rowAdd;
        addressBar.value = address;
        addressBar.setAttribute("rid", rid);
        addressBar.setAttribute("cid", cid);
        acid = cid;
        arid = rid;
        let cell = document.querySelector(`.col[rid ="${arid}"][cid = "${acid}"]`);
        selectedcell = cell;

        //make changed in  top ui according to clicked cell
        cellObject = sheetDB[rid][cid];
        if (cellObject.bold == true) {
            boldbtn.classList.add("active-btn");
        } else {
            boldbtn.classList.remove("active-btn");
        }
        if (cellObject.italic == true) {
            italicbtn.classList.add("active-btn");
        } else {
            italicbtn.classList.remove("active-btn");
        }
        if (cellObject.underline == true) {
            underlinebtn.classList.add("active-btn");
        } else {
            underlinebtn.classList.remove("active-btn");
        }

        for (let i = 0; i < alignmentbtns.length; i++) {
            alignmentbtns[i].classList.remove("active-btn");
        }
        if (cellObject.halign == "left") {
            alignmentbtns[0].classList.add("active-btn");
        } else if (cellObject.halign == "center") {
            alignmentbtns[1].classList.add("active-btn");
        } else if (cellObject.halign == "right") {
            alignmentbtns[2].classList.add("active-btn");
        }
        fontfamilyselect.value = cellObject.fontFamily;
        fontsizeselect.value = cellObject.fontSize;
        bgcolourselect.value = cellObject.bgColor;
        colourselect.value = cellObject.color;
        formulaInput.value = cellObject.formula;
        //value at the time of click in clicked cell
        cellObject.initialValue = Allcells[i].innerText;
    });
}
Allcells[0].click();

//>>>>>>>>>>>>>>>>>>>>>font family drop down event management<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
fontfamilyselect.addEventListener("change", function() {
    console.log(fontfamilyselect.value);
    selectedcell.style.fontFamily = fontfamilyselect.value;
    cellObject.fontFamily = fontfamilyselect.value;
    console.log("font-family changed");
});

//>>>>>>>>>>>>>>>>>>>>>font size drop down event management<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
fontsizeselect.addEventListener("change", function() {
    console.log(selectedcell.getAttribute("rid"));
    selectedcell.style.fontSize = fontsizeselect.value + "px";
    console.log("font-size changed");
    cellObject.fontSize = fontsizeselect.value;
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>colour container<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
colourselect.addEventListener("change", function() {
    selectedcell.style.color = colourselect.value;
    cellObject.color = colourselect.value;
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>background  colour container<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
bgcolourselect.addEventListener("change", function() {
    selectedcell.style.backgroundColor = bgcolourselect.value;
    cellObject.bgColor = bgcolourselect.value;
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>bold button event<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
boldbtn.addEventListener("click", function() {
    if (selectedcell.style.fontWeight == "bold") {
        selectedcell.style.fontWeight = "normal";
        boldbtn.classList.remove("active-btn");
        cellObject.bold = false;
    } else {
        selectedcell.style.fontWeight = "bold";
        cellObject.bold = true;
        boldbtn.classList.add("active-btn");
    }
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>italic button event<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
italicbtn.addEventListener("click", function() {
    if (selectedcell.style.fontStyle == "italic") {
        italicbtn.classList.remove("active-btn");
        cellObject.italic = false;
        selectedcell.style.fontStyle = "normal";
    } else {
        cellObject.italic = true;
        italicbtn.classList.add("active-btn");
        selectedcell.style.fontStyle = "italic";
    }
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>underline button event<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
underlinebtn.addEventListener("click", function() {
    if (selectedcell.style.textDecoration == "underline") {
        underlinebtn.classList.remove("active-btn");
        cellObject.underline = false;
        selectedcell.style.c = "none";
    } else {
        cellObject.underline = true;
        underlinebtn.classList.add("active-btn");
        selectedcell.style.textDecoration = "underline";
    }
});

function initUI() {
    for (let i = 0; i < Allcells.length; i++) {
        Allcells[i].style.fontWeight = "normal";
        Allcells[i].style.fontStyle = "normal";
        Allcells[i].style.textDecoration = "none";
        Allcells[i].style.fontFamily = "Arial";
        Allcells[i].style.fontSize = "12px";
        Allcells[i].style.fontColor = "#000000";
        Allcells[i].style.color = "#000000";
        Allcells[i].style.backgroundColor = "#ffffff";
        Allcells[i].style.textAlign = "left";
        Allcells[i].innerText = "";
        Allcells[i].formula = "";
        Allcells[i].children = [];
    }
    Allcells[0].click();
}

//add event on every cell so it can update value in its corresponding database

//input from keyboard  event for every cell
for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("keyup", function handleCell(e) {
        let obj = Allcells[i].getBoundingClientRect();
        let height = obj.height;
        // let address = addressBar.value;
        // let { rid, cid } = getRIdCIdfromAddress(address);
        let leftCol = document.querySelectorAll(".left-col .left-col-box")[arid];
        leftCol.style.height = height + "px";
        cellObject.value = Allcells[i].innerText;
    });
    Allcells[i].addEventListener("blur", function() {
        if (cellObject.value != cellObject.initialValue) {
            //if value changed
            if (cellObject.formula) {
                removeFormula(cellObject);
            }
            updateChildren(cellObject);
        }
    });
}

function setUI(sheetDB) {
    for (let i = 0; i < sheetDB.length; i++) {
        for (let j = 0; j < sheetDB[i].length; j++) {
            let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let {
                bold,
                italic,
                underline,
                fontFamily,
                fontSize,
                halign,
                value,
                fontColor,
                bgColor,
                color,
            } = sheetDB[i][j];
            cell.style.fontWeight = bold == true ? "bold" : "normal";
            cell.innerText = value;
            cell.style.fontStyle = italic;
            cell.style.textDecoration = underline;
            cell.style.fontSize = fontSize;
            cell.style.fontFamily = fontFamily;
            cell.style.textAlign = halign;
            cell.style.backgroundColor = bgColor;
            cell.style.fontColor = fontColor;
            cell.style.color = color;
        }
    }
    Allcells[0].click();
}

formulaInput.addEventListener("keydown", function(e) {
    if (e.key == "Enter" && formulaInput.value != "") {
        let newFormula = formulaInput.value;
        // getCurrentCell

        let prevFormula = cellObject.formula;
        if (prevFormula == newFormula) {
            return;
        }
        if (prevFormula != "") {
            removeFormula(cellObject);
        }

        let evaluatedValue = evaluateFormula(newFormula);
        // alert(value);
        //    UI change
        // setUIByFormula(value, arid, acid);

        setFormula(evaluatedValue, newFormula);
        // db -> works
        // setcontentInDB(value, formula);
        updateChildren(cellObject);
    }
});

function evaluateFormula(formula) {
    // "( A1 + A2 )"
    let formulaTokens = formula.split(" ");
    // split
    // [(, A1, +, A2,)]
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {
            // console.log(formulaTokens[i]);
            let { rid, cid } = getRIdCIdfromAddress(formulaTokens[i]);
            let cellObject = sheetDB[rid][cid];
            // let { value } = cellObject;
            let value = cellObject.value;
            //replace formula token with their corresponding values
            formula = formula.replace(formulaTokens[i], value);
        }
    }
    // infix evaluation

    let ans = eval(formula);
    return ans;
    // DB-> A1 ,A2-> 10,20
    // [(,10 + ,20, )]
    // eval
    // ( 10 + 20 )
}

function setUIByFormula(value, rid, cid) {
    document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`).innerText = value;

}

// ***********helper fn**********************

function getRIdCIdfromAddress(adress) {
    // A1
    let cellColAdr = adress.charCodeAt(0);
    // console.log(cellColAdr);
    let cellrowAdr = adress.slice(1);
    let cid = cellColAdr - 65;
    let rid = Number(cellrowAdr) - 1;
    return { rid, cid };
}

function removeFormula(cellObject) {
    let formula = cellObject.formula;
    let formulaTokens = formula.split(" ");
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {
            // console.log(formulaTokens[i]);
            //get parent cell
            let parentRIdCid = getRIdCIdfromAddress(formulaTokens[i]);
            let parentCellObject = sheetDB[parentRIdCid.rid][parentRIdCid.cid];
            //  getting value from  db
            let childrenOfParentArray = parentCellObject.children;
            //remove cell from children array of parent
            let idx = childrenOfParentArray.indexOf(address);
            childrenOfParentArray.splice(idx, 1);
        }
    }
    cellObject.formula = "";
}

function setFormula(evaluatedValue, formula) {
    selectedcell.innerText = evaluatedValue;

    cellObject.value = evaluatedValue;
    cellObject.formula = formula;
    let formulaTokens = formula.split(" ");
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (
            firstCharOfToken >= 65 &&
            firstCharOfToken <= 90 &&
            formulaTokens[i] != addressBar.value
        ) {
            // console.log(formulaTokens[i]);
            let parentRIdCid = getRIdCIdfromAddress(formulaTokens[i]);

            let parentCellObject = sheetDB[parentRIdCid.rid][parentRIdCid.cid];
            //  getting value from  db
            //push cell to parent's children array,as it will be affected whenever parent will get new value
            parentCellObject.children.push(address);
            // console.log(addressBar.value);
        }
    }
}

function updateChildren(cellObject) {
    let childrenArray = cellObject.children;
    // console.log(childrenArray);
    //go to every child and update its value....
    for (let i = 0; i < childrenArray.length; i++) {
        let chAddress = childrenArray[i];
        let chRICIObj = getRIdCIdfromAddress(chAddress);
        // console.log("chobj=", chRICIObj);
        let childcellObj = sheetDB[chRICIObj.rid][chRICIObj.cid];
        let formula = childcellObj.formula;
        let evaluatedValue = evaluateFormula(formula);
        setUIByFormula(evaluatedValue, chRICIObj.rid, chRICIObj.cid);
        childcellObj.value = evaluatedValue;
        //recursive call so that work will be done to every level
        updateChildren(childcellObj);
    }
}