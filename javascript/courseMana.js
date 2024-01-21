let studentManagement =
  JSON.parse(localStorage.getItem("studentManagement")) || [];
document.getElementById("btnLogout").addEventListener("click", function () {
  //Xóa item có tên userLogin trong localStorage
  localStorage.removeItem("userLogin");
  //Điều hướng về Login
  window.location.href = "login.html";
});
let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];

let action = "Create";
//Phân trang

let currentPage = 1;
let recordsPerPage = 3;

function renderData(page) {
  // let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
  //Hiển thị số trang
  let totalPage = getTotalPage();
  let listPage = document.getElementById("listPage");
  listPage.innerHTML = "";
  for (let i = 1; i <= totalPage; i++) {
    listPage.innerHTML += `
       <li><a href="javascript:clickPage('${i}')">${i}</a></li>
       `;
  }
  // Nếu ở trang 1 thì ẩn preview còn nếu ở trang cuối thì ẩn next
  if (page == 1) {
    document.getElementById("preview").style.visibility = "hidden";
  } else {
    document.getElementById("preview").style.visibility = "visible";
  }
  if (page == totalPage) {
    document.getElementById("next").style.visibility = "hidden";
  } else {
    document.getElementById("next").style.visibility = "visible";
  }
  //Tính index của dữ liệu hiển thị trên table
  let firstIndex = (page - 1) * recordsPerPage;
  let lastIndex = page * recordsPerPage;
  if (lastIndex > arrCourse.length) {
    lastIndex = arrCourse.length;
  }
  let listCourse = document.getElementById("listCourse");
  listCourse.innerHTML = "";
  //forEach(functionCallback,thisValue)
  //functionCallback(element,index,arr)
  // arrCourse.forEach((course, index) => {
  for (let index = firstIndex; index < lastIndex; index++) {
    listCourse.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${arrCourse[index].courseId}</td>
                <td>${arrCourse[index].courseName}</td>
                <td>${arrCourse[index].courseTime}</td>
                <td>${
                  arrCourse[index].status ? "Hoạt động" : "Không hoạt động"
                }</td>
                <td>
                    <button id="btnEditCourse" class="btn btn-success" onclick="displayDataToEdit('${
                      arrCourse[index].courseId
                    }')"> 
                    <i class="fa-solid fa-pen-to-square" ></i></button>
                    <button id="btnDeleteCourse" class="btn btn-danger" onclick="deleteCourse('${
                      arrCourse[index].courseId
                    }')"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
  }
}

function getTotalPage() {
  return Math.ceil(arrCourse.length / recordsPerPage);
}

function clickPage(page) {
  currentPage = page;
  // let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
  let arrCourse = localStorage.getItem("studentManagement")
    ? JSON.parse(localStorage.getItem("studentManagement"))
    : [];
  renderData(page, arrCourse);
}
// Hàm previewPage
function previewPage() {
  currentPage--;
  renderData(currentPage, arrCourse);
}
// Hàm nextPage
function nextPage() {
  currentPage++;
  renderData(currentPage, arrCourse);
}

var newCourseModal = new bootstrap.Modal(document.getElementById("newCourse"), {
  keyboard: false,
});

function createCourse() {
  
  let courseId = document.getElementById("courseId").value;
  let courseName = document.getElementById("courseName").value;
  let courseTime = document.getElementById("courseTime").value;
  let status =
    document.querySelector("input[type='radio']:checked").value == "true"
      ? true
      : false;
  let newCourse = { courseId, courseName, courseTime, status, arrClass: [] };
  if (!validateCourseId(courseId)) {
    return;
  }
  if (!validateCourseName(courseName)) {
    return;
  }
  
  arrCourse.push(newCourse);
  // Đẩy arrCourse vào localStorage
  localStorage.setItem("studentManagement", JSON.stringify(arrCourse));
  //Đóng modal
  document.getElementById("courseId").value = "";
  document.getElementById("courseName").value = "";
  document.getElementById("courseTime").value = "";
  document.getElementById("active").checked = true;
  newCourseModal.hide();
  //render lại dữ liệu
  renderData(currentPage);
}

// function validate courseId
function validateCourseId(courseId) {
  let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
  let indexToFind = arrCourse.findIndex(
    (element) => element.courseId === courseId
  );
  if (indexToFind >= 0) {
    //Đã tồn tại mã danh mục trong arrCourse
    // document.getElementById("courseId").style.backgroundColor=="yellow";
    alert("Mã khóa học đã tồn tại");
    return false;
  }
  // document.getElementById("courseId").style.backgroundColor =="";
  return true;
}
function validateCourseName(courseName) {
  let indexToFind = arrCourse.findIndex(
    (element) => element.courseName === courseName
  );
  //Nếu indexToFind>=0 tức là index đã tồn tại trong mảng
  if (indexToFind >= 0) {
    document.getElementById("courseName").style.backgroundColor == "yellow";
    alert("Tên khóa học đã tồn tại");
    return false;
  }
  document.getElementById("courseName").style.backgroundColor == "";
  return true;
}

// Hàm lấy dữ liệu trên inputForm
function getDataForm() {
  let courseId = document.getElementById("courseId").value;
  let courseName = document.getElementById("courseName").value;
  let courseTime = document.getElementById("courseTime").value;
  // let status = document.querySelector("input[type='radio']:checked").value;
  let status =
    document.querySelector("input[type='radio']:checked").value == "true"
      ? true
      : false;
  let course = { courseId, courseName, courseTime, status, arrClass: [] };
  return course;
}

function getDataFormEdit() {
  let courseId = document.getElementById("courseIdEdit").value;
  let courseName = document.getElementById("courseNameEdit").value;
  let courseTime = document.getElementById("courseTimeEdit").value;
  // let status = document.querySelector("input[type='radio']:checked").value;
  let status =
    document.querySelector("input[type='radio']:checked").value == "true"
      ? true
      : false;
  let course = { courseId, courseName, courseTime, status, arrClass: [] };
  return course;
}
//Function clearForm
function clearForm() {
  document.getElementById("courseId").value = "";
  document.getElementById("courseName").value = "";
  document.getElementById("courseTime").value = "";
  document.getElementById("active").checked = true;
}

//Xử lý EditCourse
let myModalEditCourse= new bootstrap.Modal(document.getElementById("editCourse"), {
  keyboard: false,
});
function displayDataToEdit(courseId) {
  myModalEditCourse.show();
  let indexUpdate = getCourseById(courseId);
  if (indexUpdate >= 0) {
    document.getElementById("courseIdEdit").value = arrCourse[indexUpdate].courseId;
    document.getElementById("courseNameEdit").value =
      arrCourse[indexUpdate].courseName;
    document.getElementById("courseTimeEdit").value =
      arrCourse[indexUpdate].courseTime;
    if (arrCourse[indexUpdate].status == "true") {
      document.getElementById("activeEdit").value = "Hoạt động";
    } else {
      document.getElementById("inActiveEdit").value = "Không hoạt động";
    }
  }
  action = "Edit"; 
 
}


let modalCloseUpdateData = document.getElementById("editCourse");
modalCloseUpdateData.addEventListener("hide.bs.modal", function () {
  clearForm();
  document.getElementById("courseId").readOnly = false;
});

//Hàm lấy thông tin course theo Id
function getCourseById(courseId) {
  for (let index = 0; index < arrCourse.length; index++) {
    if (arrCourse[index].courseId == courseId) {
      return index;
    }
  }
  return -1;
}

function editCourseInfo() {
  let editCourseInfo = getDataFormEdit();
  let index = getCourseById(editCourseInfo.courseId);
  if (index > -1) {
    arrCourse[index] = editCourseInfo;
  }
  localStorage.setItem("studentManagement", JSON.stringify(arrCourse));

  action = "Create";
  clearForm();
  myModalEditCourse.hide();
  renderData(currentPage);
}
document.getElementById("btnEditSave").addEventListener("click", function(event){
    event.preventDefault();
    editCourseInfo();
})
document
  .getElementById("btnCreateCourse")
  .addEventListener("click", function (event) {
    event.preventDefault();
    if (action == "Create") {
      createCourse();
    } else {
      editCourseInfo();
    }
  });

//Hàm xóa course
let myModalDeleteCourse= new bootstrap.Modal(document.getElementById("deleteCourse"), {
  keyboard: false,
});
function deleteCourse(courseId) {
  // myModalDeleteCourse.show();
 
  myModalDeleteCourse.show();

  let yesToDeleteCourse = document.getElementById("yesToDeleteCourse");
  let noToDeleteCourse = document.getElementById("noToDeleteCourse");
  yesToDeleteCourse.onclick = function () {
    let index = getCourseById(courseId);
    if (arrCourse[index].arrClass.length >= 1) {
      myModalDeleteCourse.hide();
      showToastError();
    } else {
      arrCourse.splice(index, 1);
      localStorage.setItem("studentManagement", JSON.stringify(arrCourse));
      renderData(currentPage);
      myModalDeleteCourse.hide();
      
    }
  };
  noToDeleteCourse.onclick = function () {
    myModalDeleteCourse.hide();
    
  };
}

//Báo lỗi
function showToastError() {
  let toastLiveShow = document.getElementById("liveToastDeleteError");
  let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveShow);
  toastBootstrap.show();
  let autoCloseTimeout = 2000;
  setTimeout(() => {
    toastBootstrap.hide();
  }, autoCloseTimeout);
}

//Thực hiện search khóa học
document.getElementById("btnSearchCourseName").addEventListener("click",function () {
  let searchCourseName=document.getElementById("searchCourseName").value;
  let searchArrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
  // let searchArrCourse = JSON.parse(localStorage.getItem("arrCourse"));
  let filterData = searchArrCourse.filter(course=>course.courseName.toLowerCase().includes(searchCourseName.toLowerCase()));

if (filterData.length<1) {
  alert("Không tìm thấy kết quả");
  
}else if(filterData.length>0){
 
 arrCourse=filterData;
  renderData(1);
}
})

//Thực hiện sort dữ liệu
function orderCourseName(){
  let arrCourseSort = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
  let sortCourseNameVal = document.getElementById("orderCourseName").value;
  switch (sortCourseNameVal) {
    case "nameASC":
      arrCourseSort.sort((a,b)=>(a.courseName>b.courseName)?1:(a.courseName<b.courseName)?-1:0);
      break;
    case "nameDESC":
          arrCourseSort.sort((a,b)=>(a.courseName<b.courseName)?1:(a.courseName>b.courseName)?-1:0);
          break;
  }
  arrCourse=arrCourseSort;
  renderData(1);
}

document.getElementById("orderCourseName").addEventListener("change",function(){
  orderCourseName();
})

function redirectDashboard() {
  window.location.href = "dashboard.html";
}
function redirectCourseManagement() {
  window.location.href = "courseMana.html";
}
function redirectClassManagement() {
  window.location.href = "classMana.html";
}
function redirectStudentManagement() {
  window.location.href = "studentMana.html";
}
window.onload = renderData(currentPage);
