let studentManagement = JSON.parse(localStorage.getItem("studentManagement"))||[];
document.getElementById("btnLogout").addEventListener("click", function () {
  //Xóa item có tên userLogin trong localStorage
  localStorage.removeItem("userLogin");
  //Điều hướng về Login
  window.location.href = "login.html";
});

function statistic() {
  //Hàm thống kê
  let cntCourse = 0;
  let cntClass = 0;
  let cntClassActive = 0;
  let cntClassFinish = 0;
  let cntClassPending = 0; //Chờ lớp
  let cntStudent = 0;
  let cntStudentActive = 0;
  let cntStudentPending = 0;
  let cntStudentGraduate = 0;
  let cntStudentSuspension = 0;
  studentManagement.forEach((course) => {
    cntCourse++;
    course.arrClass.forEach((classItem) => {
      cntClass++;
      //    console.log(c);
      if (classItem.status === "Đang hoạt động") {
        cntClassActive++;
      }
      if (classItem.status == "Kết thúc") {
        cntClassFinish++;
      }
      if (classItem.status == "Đang chờ") {
        cntClassPending++;
      }
      classItem.arrStudent.forEach((student) => {
        cntStudent++;
        if (student.status == "Đang học") {
          cntStudentActive++;
        }
        if (student.status == "Đang chờ") {
          cntStudentPending++;
        }
        if (student.status == "Bảo lưu") {
          cntStudentSuspension++;
        }
        if (student.status == "Tốt nghiệp") {
          cntStudentGraduate++;
        }
      });
    });
  });
  document.getElementById("cntCourse").innerText += cntCourse;
  document.getElementById("cntClass").innerText += cntClass;
  document.getElementById("cntClassActive").innerText += cntClassActive;
  document.getElementById("cntClassFinish").innerText += cntClassFinish;
  document.getElementById("cntClassPending").innerText += cntClassPending;
  document.getElementById("cntStudent").innerText += cntStudent;
  document.getElementById("cntStudentActive").innerText += cntStudentActive;
  document.getElementById("cntStudentPending").innerText += cntStudentPending;
  document.getElementById("cntStudentSuspension").innerText +=
    cntStudentSuspension;
  document.getElementById("cntStudentGraduate").innerText += cntStudentGraduate;
}

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

window.onload = function () {
  statistic();
};
