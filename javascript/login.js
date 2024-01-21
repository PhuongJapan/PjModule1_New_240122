        let btnLogin = document.getElementById("btnLogin");
        btnLogin.addEventListener("click", function (event) {
            event.preventDefault();
            // B1: lấy ra email và password người dùng nhập
            let userList = JSON.parse(localStorage.getItem("userList")) || [];
            //2. Lấy thông tin trên form đăng nhập: email, password
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            //3. Kiểm tra email và passwrord có trùng với tài khoản hệ thống đang ở trạng thái hoạt động
            let indexUserLogin = userList.findIndex(user => user.email == email && user.password == password);
            //4. Điều hướng trang sang trang thích hợp
            if (indexUserLogin == -1) {
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                alert("Email hoặc password không chính xác. Vui lòng nhập lại");
            } else {
                //Kiểm tra trạng thái user
                if (userList[indexUserLogin].status) {
                    //set thông tin người dùng đăng nhập vào localStorage
                    localStorage.setItem("userLogin", email);
                    //User đăng nhập đang hoạt động --> điều hướng sang trang chủ
                    window.location.href = "../page_html/dashboard.html";
                } else {
                    alert("Tài khoản đăng nhập đang bị khóa");
                }
            }
            }
        )