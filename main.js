function btnAdd1(){
  let showAdd=  document.getElementById("show-add")
  showAdd.style.display="block"
// alert("hello")
  
}

function closeForm(){
    let showAdd=  document.getElementById("show-add")
    showAdd.style.display="none"
    let fname = document.getElementById("fname")
    let lname = document.getElementById("lname")
    let idCard = document.getElementById("idCard")

    fname.readOnly=false
    lname.readOnly=false
    idCard.readOnly=false
    
    fname.value=""
    lname.value=""
    idCard.value=""
}
let editingRowIndex = null;
function btnAdd2(){
    let fname = document.getElementById("fname")
    let lname = document.getElementById("lname")
    let idCard = document.getElementById("idCard")
    
    let tbody = document.getElementById("tbody-add")
    if((fname.readOnly==true)&(lname.readOnly==true)&(idCard.readOnly==true)){
      alert("امکان اضافه شدن فرم وجود ندارد")
      return
    }

    if(fname.value==""){
      alert("لطفا نام خود را وارد کنید")
      return;
    }

    if(lname.value==""){
        alert("لطفا نام خانوادگی خود را وارد کنید")
        return;
    }

    if(idCard.value==""){
        alert("لطفا شماره کارت ملی خود را وارد کنید")
        return;
    }

    let rowNumber = tbody.rows.length + 1;

    if (editingRowIndex !== null) {
      // Editing existing row
      let row = tbody.rows[editingRowIndex];
      row.cells[1].innerText = fname.value;
      row.cells[2].innerText = lname.value;
      row.cells[3].innerText = idCard.value;
      editingRowIndex = null; // Reset editing state
} else {
   let operator = "<td>"+
    `<i class="fa fa-eye operator"  onclick="see(event)"> مشاهده</i>
    <i class="fa fa-pen operator" onclick="edit(event)"> ویرایش</i>
    <i class="fa fa-recycle operator" onclick="remove(event)"> حذف</i>
    <i class="fa fa-map-marker-alt operator"> نقشه</i>
    <i class="fa fa-user-alt operator"> لاگین</i>` + "</td>"

    let helpVar = "<tr>"
    helpVar += "<td>"+rowNumber+"</td>"
    helpVar += "<td>"+fname.value+"</td>"
    helpVar += "<td>"+lname.value+"</td>"
    helpVar += "<td>"+idCard.value+"</td>"
    helpVar += operator + "</tr>"



    tbody.innerHTML+=helpVar
  }
    fname.value=""
    lname.value=""

    idCard.value=""



}

function see(event){

  tbody = document.getElementById("tbody-add");
     // Prevent the default action of the click event
     console.log(event.preventDefault());

     // Get the row that contains the clicked icon
     let row = event.target.closest('tr');
 
     // Extract the text content of each cell in the row
     let formattedText = Array.from(row.cells).map(cell => cell.innerText.trim());
 
     // Log the formatted text to the console
     console.log(formattedText);
  let showAdd = document.getElementById("show-add")
  
  showAdd.style.display="block"
  let fname = document.getElementById("fname")
  let lname = document.getElementById("lname")
  let idCard = document.getElementById("idCard")

  fname.value=formattedText[1]
  fname.readOnly=true
  lname.value=formattedText[2]
  lname.readOnly=true
  idCard.value=formattedText[3]
  idCard.readOnly=true

  // let arr = ["first name","last name","idCard"]
}

function edit(event){
  event.preventDefault();
  let row = event.target.closest('tr');
  editingRowIndex = row.rowIndex - 1; // Adjust for header row

  let fname = document.getElementById("fname");
  let lname = document.getElementById("lname");
  let idCard = document.getElementById("idCard");

  fname.value = row.cells[1].innerText;
  lname.value = row.cells[2].innerText;
  idCard.value = row.cells[3].innerText;

  fname.readOnly = false;
  lname.readOnly = false;
  idCard.readOnly = false;

  let showAdd = document.getElementById("show-add");
  showAdd.style.display = "block";

}

function remove(event) {
  event.preventDefault();
  let row = event.target.closest('tr');
  let tbody = document.getElementById("tbody-add");
  let rowNumber = row.cells[0].innerText;
  // Ask for confirmation before deleting
  if (!confirm(" ایا شما از حذف ردیف"+rowNumber+  "اطمینان دارید ؟")) {
      return; // Exit the function if the user does not confirm
  }

  // Remove the row from the table
  tbody.removeChild(row);

  let rows = tbody.rows;
  for (let i = 0; i < rows.length; i++) {
      rows[i].cells[0].innerText = i + 1; // Update the row number
  }
}




function search() {
  let fnameSearch = document.getElementById("fname-search").value;
  let lnameSearch = document.getElementById("lname-search").value;
  let idCardSearch = document.getElementById("idCard-search").value;

  let tbody = document.getElementById("tbody-add");
  let rows = tbody.rows;

  for (let i = 0; i < rows.length; i++) {
      let cells = rows[i].cells;
      if (cells[1].innerText === fnameSearch &&
          cells[2].innerText === lnameSearch &&
          cells[3].innerText === idCardSearch) {
          // If all values match, print the row number
          alert("Row number: " + (i + 1));
          return; // Exit the function after finding the first match
      }
  }

  // If no match is found, print a message
  alert("No matching row found.");
}