// let studentManagement =
//   JSON.parse(localStorage.getItem("studentManagement")) || [];
// let studentManagement = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
let arrCourse = localStorage.getItem("studentManagement")
  ? JSON.parse(localStorage.getItem("studentManagement"))
  : [];
let arrStudent = [];

function updateArrStudent() {
  //Lưu ý chỉ dùng hàm này để render dữ liệu ko sử dụng khi sửa, xóa,...
  arrStudent = [];
  arrClass = [];
  arrCourse.forEach((course) => {
    course.arrClass.forEach((classInfo) => {
      classInfo.arrStudent.forEach((studentItem) => {
        arrStudent = arrStudent.concat({
          classId: classInfo.classId,
          className: classInfo.className,
          ...studentItem,
        });
      });
    });
  });
}
updateArrStudent(arrStudent);
// Cách dùng map
//   arrClass = [];
//   arrCourse.forEach((course) => {
//     let classArrCourse = course.arrClass.map((classItem) => {
//       return {
//         courseName: course.courseName,
//         courseId: course.courseId,
//         ...classItem,
//       };
//     });
//     arrClass = arrClass.concat(classArrCourse);
//   });
//   console.log(arrClass);
//   localStorage.setItem("arrClass", JSON.stringify(arrClass));
// }
document.getElementById("btnLogout").addEventListener("click", function () {
  //Xóa item có tên userLogin trong localStorage
  localStorage.removeItem("userLogin");
  //Điều hướng về Login
  window.location.href = "login.html";
});
// let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];

let action = "Create";
//Phân trang

let currentPage = 1;
let recordsPerPage = 3;

function renderData(page) {
  // Hiển thị số trang
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
  if (lastIndex > arrStudent.length) {
    lastIndex = arrStudent.length;
  }

  let listStudent = document.getElementById("listStudent");
  listStudent.innerHTML = "";
  for (let index = firstIndex; index < lastIndex; index++) {
    listStudent.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${arrStudent[index].studentId}</td>
                <td>${arrStudent[index].studentName}</td>                
                <td>${arrStudent[index].year}</td>
                <td>${arrStudent[index].address}</td>
                <td>${arrStudent[index].email}</td>
                <td>${arrStudent[index].phone}</td>
                <td>${arrStudent[index].gender}</td>
                <td>${arrStudent[index].status}</td>
                <td>${arrStudent[index].className}</td>
                <td>
                    <button id="btnEditStudent" class="btn btn-success" onclick="displayDataToEdit('${
                      arrStudent[index].studentId
                    }')"> 
                    <i class="fa-solid fa-pen-to-square" ></i></button>
                    <button id="btnDeleteStudent" class="btn btn-danger" onclick="deleteStudent('${
                      arrStudent[index].studentId}','${arrStudent[index].classId}')"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
  }
}

function getTotalPage() {
  return Math.ceil(arrStudent.length / recordsPerPage);
}

function clickPage(page) {
  currentPage = page;
  // let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
  renderData(page, arrStudent);
}
// Hàm previewPage
function previewPage() {
  currentPage--;
  // render lại dữ liệu lên table
  // let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
  renderData(currentPage, arrStudent);
}
// Hàm nextPage
function nextPage() {
  currentPage++;
  renderData(currentPage, arrStudent);
}

var newStudentModal = new bootstrap.Modal(document.getElementById("newStudent"), {
  keyboard: false,
});

//Thẽm mới lớp học
function createStudent() {
  //2. Lấy dữ liệu trên modal
  let newStudent = getDataForm();

  if (!validateStudentId(studentId)) {
    return;
  }
  // if (!validateStudentName(studentName)) {
  //   return;
  // }
  
  //thêm mới
  let classIdOfNewStudent = newStudent.classId;
  let classIndex = getClassIdOfStudent(arrClass, classIdOfNewStudent);
  delete newStudent.classId;
  if (classIndex == -1) {
    return;
  }
  arrStudent[classIndex].arrStudent.push(newStudent);

  localStorage.setItem("studentManagement", JSON.stringify(arrStudent));
  updateArrClass(arrStudent);

  //5. Đóng modal
  document.getElementById("classId").value = "";
  document.getElementById("studentId").value = "";
  document.getElementById("studentName").value = "";
  document.getElementById("year").value = "";
  document.getElementById("address").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("status").value = "";
  // document.getElementById("inActive").selected = true;
  // let optionFirst = document.getElementById("courseName");
  // if (optionFirst.length != 0) {
  //   optionFirst[0].selected = true;
  // }
  newStudentModal.hide();
  //render lại dữ liệu
  renderData(currentPage);
}
// let modalCloseCreateData = document.getElementById("se");
// modalCloseCreateData.addEventListener("hide.bs.modal", function () {
//   clearForm();
//   // document.getElementById("courseId").readOnly = false;
// });

function getClassIdOfStudent(arrClass, classId) {
  for (let i = 0; i < arrClass.length; i++) {
    if (arrClass[i].classId === classId) {
      return i;
    }
  }
  return -1;
}

// function validate StudentId
function validateStudentId(studentId) {
  let indexToFind = arrClass.findIndex(
    (element) => element.studentId === studentId
  );
  if (indexToFind >= 0) {
    //Đã tồn tại mã danh mục trong arrCourse
    // document.getElementById("courseId").style.backgroundColor=="yellow";
    alert("Mã sinh viên đã tồn tại");
    return false;
  }
  // document.getElementById("courseId").style.backgroundColor =="";
  return true;
}
//Không cần validate trùng với tên sinh viên
// function validateStudentName(studentName) {
//   let indexToFind = arrStudent.findIndex(
//     (element) => element.studentName === studentName
//   );
//   //Nếu indexToFind>=0 tức là index đã tồn tại trong mảng
//   if (indexToFind >= 0) {
//     document.getElementById("studentName").style.backgroundColor == "yellow";
//     alert("Tên sinh viên đã tồn tại");
//     return false;
//   }
//   document.getElementById("studentName").style.backgroundColor == "";
//   return true;
// }

// Hàm lấy dữ liệu trên inputForm
function getDataForm() {
  let classId = document.getElementById("classId").value;
  let studentId = document.getElementById("studentId").value;
  let studentName = document.getElementById("studentName").value;
  let year = document.getElementById("year").value;
  let address = document.getElementById("address").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let gender = document.getElementById("gender").value;
  let status = document.getElementById("status").value;
  let classStudent = {
    classId,
    studentId,
    studentName,
    year,
    address,
    email,
    phone,
    gender,
    status
  };
  return classStudent;
}
document
  .getElementById("btnCreateStudent")
  .addEventListener("click", function (event) {
    event.preventDefault();

    if (action == "Create") {
      createStudent();
      newStudentModal.hide();
    } else {
      editStudent();
    }
  });

// function getDataFormEdit() {
//   let courseId = document.getElementById("courseIdEdit").value;
//   let courseName = document.getElementById("courseNameEdit").value;
//   let courseTime = document.getElementById("courseTimeEdit").value;
//   // let status = document.querySelector("input[type='radio']:checked").value;
//   let status =
//     document.querySelector("input[type='radio']:checked").value == "true"
//       ? true
//       : false;
//   let class = { courseId, courseName, courseTime, status, arrClass: [] };
//   return class;
// }
//Function clearForm
function clearForm() {
  document.getElementById("studentId").value = "";
  document.getElementById("studentName").value = "";
  document.getElementById("year").value = "";
  document.getElementById("address").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("status").value = "";

  // document.getElementById("inActive").selected = true;
  // let optionFirst = document.getElementById("courseName");
  // if (optionFirst.length != 0) {
  //   optionFirst[0].selected = true;
  // }
}

// // Xử lý EditClass
// let myModalEditClass= new bootstrap.Modal(document.getElementById("editClass"), {
//   keyboard: false,
// });
// function displayDataToEdit(classId) {
//   myModalEditCourse.show();getElementById()

//   let indexUpdate = getCourseById(courseId);
//   if (indexUpdate >= 0) {
//     document.getElementById("courseIdEdit").value = arrCourse[indexUpdate].courseId;
//     document.getElementById("courseNameEdit").value =
//       arrCourse[indexUpdate].courseName;
//     document.getElementById("courseTimeEdit").value =
//       arrCourse[indexUpdate].courseTime;
//     if (arrCourse[indexUpdate].status == "true") {
//       document.getElementById("activeEdit").value = "Hoạt động";
//     } else {
//       document.getElementById("inActiveEdit").value = "Không hoạt động";
//     }
//   }
//   action = "Edit";
// }

// let modalCloseUpdateData = document.getElementById("editCourse");
// modalCloseUpdateData.addEventListener("hide.bs.modal", function () {
//   clearForm();
// document.getElementById("courseId").readOnly = false;
// });


// function editCourseInfo() {
//   let editCourseInfo = getDataFormEdit();
//   let index = getCourseById(editCourseInfo.courseId);
//   if (index > -1) {
//     arrCourse[index] = editCourseInfo;
//   }
//   localStorage.setItem("studentManagement", JSON.stringify(arrCourse));

//   action = "Create";
//   clearForm();
//   myModalEditCourse.hide();
//   renderData(currentPage);
// }
// document.getElementById("btnEditSave").addEventListener("click", function(event){
//     event.preventDefault();
//     editCourseInfo();
// })

//Hàm xóa class
// let myModalDeleteStudent = new bootstrap.Modal(
//   document.getElementById("deleteStudent"),
//   {
//     keyboard: false,
//   }
// );
function getStudentIndexInClass(arrStudentInClass, studentId) {
  for (let i = 0; i < arrStudentInClass.length; i++) {
    if (arrStudentInClass[i].studentId === studentId) {
      return i;
    }
  }
  return -1;
}
function deleteStudent(studentId, classId) {
  myModalDeleteStudent.show();

  let yesToDeleteStudent = document.getElementById("yesToDeleteStudent");
  let noToDeleteStudent = document.getElementById("noToDeleteStudent");
  yesToDeleteStudent.onclick = function () {
    let arrClass = localStorage.getItem("studentManagement")
      ? JSON.parse(localStorage.getItem("studentManagement"))
      : [];

    let classIndex = getClassIdOfStudent(arrClass, classId);
    let studentIndex = getStudentIndexInClass(
      arrClass[classIndex].arrStudent,
      studentId
    );
    
    arrClass[classIndex].arrStudent.splice(studentIndex, 1);

    localStorage.setItem("studentManagement", JSON.stringify(arrStudent));
    updateArrStudent(arrStudent);
    renderData(currentPage);
    myModalDeleteStudent.hide();
  };
  noToDeleteStudent.onclick = function () {
    myModalDeleteStudent.hide();
  };
}

    //     if (index !== -1) {
    //   let courseId = arrClass[index].courseId;
    //   arrClass.splice(index, 1);
    //   localStorage.setItem("arrClass", JSON.stringify(arrClass));
    //   let deleteArrClass=localStorage.getItem("arrClass") ? JSON.parse(localStorage.getItem("arrClass")) : [];
    //   let courseIndex = deleteArrClass.findIndex(
    //     (item)=>item.courseId===courseId
    //   );
    //   if(courseIndex!==-1){
    //     let classIndex = deleteArrClass.findIndex(
    //       (item)=>item.classId===id
    //     );
    //     if (classIndex!==1) {
    //       deleteArrClass.splice(classIndex,1);
    //       localStorage.setItem("arrClass",JSON.stringify(arrClass));

    //     }
    //   }
    //   renderData(currentPage);

    // }
    // myModalDeleteClass.hide();
 

//Lấy thông tin class của student
function checkId(listClass, classId) {
  for (let i = 0; i < listClass.length; i++) {
    if (listClass[i].classId === classId) {
      return i;
    }
  }
  return -1;
}

//Thực hiện search khóa học
document
  .getElementById("btnSearchStudentName")
  .addEventListener("click", function () {
    let btnSearchStudentName = document.getElementById("btnSearchStudentName").value;
    let searchArrStudent = localStorage.getItem("arrStudent")
      ? JSON.parse(localStorage.getItem("arrStudent"))
      : [];
    // let searchArrCourse = JSON.parse(localStorage.getItem("arrCourse"));
    let filterData = searchArrStudent.filter((item) =>
      item.studentName.toLowerCase().includes(btnSearchStudentName.toLowerCase())
    );

    if (filterData.length < 1) {
      alert("Không tìm thấy kết quả");
    } else if (filterData.length > 0) {
      arrStudent = filterData;
      renderData(1);
    }
  });

//Thực hiện sort dữ liệu
function orderStudentName() {
  let arrStudentSort = localStorage.getItem("arrStudent")
    ? JSON.parse(localStorage.getItem("arrStudent"))
    : [];
  let sortStudentNameVal = document.getElementById("orderStudentName").value;
  switch (sortStudentNameVal) {
    case "nameASC":
      arrStudentSort.sort((a, b) =>
        a.studentName > b.studentName ? 1 : a.studentName < b.studentName ? -1 : 0
      );
      break;
    case "nameDESC":
      arrStudentSort.sort((a, b) =>
        a.studentName < b.studentName ? 1 : a.studentName > b.studentName ? -1 : 0
      );
      break;
  }
  arrStudent = arrStudentSort;
  renderData(1);
}

document
  .getElementById("orderStudentName")
  .addEventListener("change", function () {
    orderStudentName();
  });

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
