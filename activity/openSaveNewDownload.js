newButton.addEventListener("click", function() {
    let confirm = window.confirm("Do you want to save current file");
    if (confirm) {
        save();

    }
    initNewWorksheet();
})

openButton.addEventListener("click", function() {
    let inputElement = document.createElement("input");
    inputElement.setAttribute("type", "file");
    inputElement.addEventListener("change", handleFiles, false);

    function handleFiles() {
        const fileList = this.files;
        console.log(fileList[0].name);
        filename = (fileList[0].name);
        let reader = new FileReader();

        reader.addEventListener("load", function(e) {
            let file = e.target.result;
            file = JSON.parse(file);
            // console.log();
            console.log(file);

            workSheetDB = file;
            initUIForOpen(workSheetDB);
            // This is a regular expression to identify carriage 
            // Returns and line breaks

        })

        reader.addEventListener("error", function(e) {
            alert(e.target.error.name);
        })

        reader.readAsText(fileList[0]); /* now you can work with the file list */
    }
    inputElement.click();
})


saveButton.addEventListener("click", save);

function save() {
    const data = JSON.stringify(workSheetDB);

    const blob = new Blob([data], {
        type: 'application/json'
    });

    // Create new URL
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    let name = prompt("Enter name of file", filename);
    a.style.display = 'none';
    a.href = url;
    // the filename you want
    a.download = name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    alert('your file has downloaded!');

}

downloadButton.addEventListener("click", function() {
    const data = JSON.stringify(workSheetDB);

    const blob = new Blob([data], {
        type: 'application/json'
    });

    // Create new URL
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    let name = prompt("Enter name of file", "excel");
    a.style.display = 'none';
    a.href = url;
    // the filename you want
    a.download = name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    alert('your file has downloaded!');
})





function initUIForOpen(worksh) {
    let totalSheets = worksh.length;
    console.log(sheetList.childNodes.length);
    // sheetList.removeChild(sheetList.childNodes[0]);
    while (sheetList.childNodes.length > 0) {
        sheetList.removeChild(sheetList.childNodes[0]);
    }
    for (let i = 0; i < totalSheets; i++) {
        let NewSheet = document.createElement("div");
        NewSheet.setAttribute("class", "sheet");
        NewSheet.setAttribute("sheetIdx", i + 1);
        NewSheet.innerText = ` Sheet ${i + 1}`;
        sheetList.appendChild(NewSheet);
        NewSheet.addEventListener("click", handleActiveSheet);

    }
    sheetList.childNodes[0].click();
    Allcells[0].click();

}

function initNewWorksheet() {
    while (sheetList.childNodes.length > 0) {
        sheetList.removeChild(sheetList.childNodes[0]);
    }
    initUI();

    workSheetDB = [];
    initCurrentSheetDb();
    let NewSheet = document.createElement("div");
    NewSheet.setAttribute("class", "sheet");
    NewSheet.setAttribute("sheetIdx", 1);
    NewSheet.innerText = ` Sheet ${1}`;
    sheetList.appendChild(NewSheet);
    NewSheet.addEventListener("click", handleActiveSheet);
    sheetList.childNodes[0].click();
    Allcells[0].click();
    // let sheetArr = document.querySelectorAll(".sheet");
    // sheetArr[0].click();
    // initCurrentSheetDb();


}