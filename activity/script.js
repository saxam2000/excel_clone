let addbuttonContainer = document.querySelector(".add_sheet_container");
let sheetList = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");
let Allcells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address-box");
let arid = 0;
let acid = 0;
let affectedcell = document.querySelector(`.col[rid ="${arid}"][cid = "${acid}"]`);
// addressBar.value = address;



////////////////////////// alignement buttons events//////////////////////////////////////////
let alignmentbtns = document.querySelectorAll(".alignment-container .align-btn")
for (let i = 0; i < alignmentbtns.length; i++) {
    alignmentbtns[i].addEventListener("click", function d() {
        // console.log("hello")

        console.log(alignmentbtns[i].classList[1]);
        // console.log()
        let rid = Number(addressBar.getAttribute("rid"));
        let cid = Number(addressBar.getAttribute("cid"));
        arid = rid;
        acid = cid;

        let cell = document.querySelector(`.col[rid ="${arid}"][cid = "${acid}"]`);
        cell.style.textAlign = alignmentbtns[i].classList[1]
    })
}
firstSheet.addEventListener("click", handleActiveSheet);
addbuttonContainer.addEventListener("click", function() {
    console.log("hello");
    let sheetArr = document.querySelectorAll(".sheet");
    let lastSheetElem = sheetArr[sheetArr.length - 1];
    let idx = lastSheetElem.getAttribute("sheetIdx");
    idx = Number(idx);
    let NewSheet = document.createElement("div");
    NewSheet.setAttribute("class", "sheet");
    NewSheet.setAttribute("sheetIdx", idx + 1);
    NewSheet.innerText = ` Sheet ${ idx + 1 }`;
    sheetList.appendChild(NewSheet);
    NewSheet.addEventListener("click", handleActiveSheet);
})

function handleActiveSheet(e) {
    let MySheet = e.currentTarget;
    let sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr.forEach(function(sheet) {
        sheet.classList.remove("active-sheet");
    })
    if (!MySheet.classList[1]) {
        MySheet.classList.add("active-sheet");
    }
}


//............................select event for cells///////////////////////////////
for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("click", function handleCell() {
        let rid = Number(Allcells[i].getAttribute("rid"));
        let cid = Number(Allcells[i].getAttribute("cid"));
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(cid + 65);
        let address = colAdd + rowAdd;
        addressBar.value = address;
        addressBar.setAttribute("rid", rid);
        addressBar.setAttribute("cid", cid);
        acid = cid;
        arid = rid;
        let cell = document.querySelector(`.col[rid ="${arid}"][cid = "${acid}"]`);
        afffectedcell = cell;
    });
}
Allcells[0].click();



//>>>>>>>>>>>>>>>>>>>>>font family drop down event management<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


let fontfamilyselect = document.querySelector(".font-family");
fontfamilyselect.addEventListener("change", function() {
    console.log(fontfamilyselect.value);
    let cell = document.querySelector(`.col[rid ="${arid}"][cid = "${acid}"]`);
    console.log(cell.getAttribute("rid"));
    cell.style.fontFamily = fontfamilyselect.value;
    console.log("font-family changed");
})

//>>>>>>>>>>>>>>>>>>>>>font size drop down event management<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


let fontsizeselect = document.querySelector(".font-size");
fontsizeselect.addEventListener("change", function() {
    let cell = document.querySelector(`.col[rid ="${arid}"][cid = "${acid}"]`);
    console.log(cell.getAttribute("rid"));
    cell.style.fontSize = fontsizeselect.value + "px";
    console.log("font-size changed");
})


//>>>>>>>>>>>>>>>>>>>>>>>>>>>colour container<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

let colourselect = document.querySelector("#color");
colourselect.addEventListener("change", function() {
    let cell = document.querySelector(`.col[rid ="${arid}"][cid = "${acid}"]`);
    cell.style.color = colourselect.value;

})




//>>>>>>>>>>>>>>>>>>>>>>>>>>>background  colour container<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

let bgcolourselect = document.querySelector("#bg-color");
bgcolourselect.addEventListener("change", function() {
    let cell = document.querySelector(`.col[rid ="${arid}"][cid = "${acid}"]`);
    cell.style.backgroundColor = bgcolourselect.value;

})