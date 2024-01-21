 /*
            Khóa học chứa 1 mảng các lớp
            Lớp chứa 1 mảng các sinh viên
        */
             let studentManagement = [
                {
                    "courseId": "RA01",
                    "courseName": "JS Fullstack",
                    "courseTime": 1200,
                    "status": true,
                    "arrClass": [
                        {
                            "classId": "C001",
                            "className": "JS230508",
                            "descriptions": "Lớp học Fukuoka",
                            "studentNumber": 3,
                            "teacher": "Nguyễn Duy Quang",
                            "status": "Đang hoạt động",
                            "arrStudent": [
                                {
                                    "studentId": "SV001",
                                    "studentName": "Nguyễn Van A",
                                    "year": 2000,
                                    "address": "Hà Nội",
                                    "email": "a@gmail.com",
                                    "phone": "0123456789",
                                    "gender": true,
                                    "status": "Đang học"
                                },
                                {
                                    "studentId": "SV002",
                                    "studentName": "Nguyễn Van B",
                                    "year": 2001,
                                    "address": "Đà Nẵng",
                                    "email": "b@gmail.com",
                                    "phone": "0980978895",
                                    "gender": false,
                                    "status": "Đang chờ"
                                },
                                {
                                    "studentId": "SV003",
                                    "studentName": "Nguyễn Van C",
                                    "year": 2001,
                                    "address": "Đà Nẵng",
                                    "email": "c@gmail.com",
                                    "phone": "0980978895",
                                    "gender": false,
                                    "status": "Bảo lưu"
                                }
                            ]
                        },
                        {
                            "classId": "C002",
                            "className": "JS230629",
                            "descriptions": "Lớp học Fukuoka tháng 6",
                            "studentNumber": 3,
                            "teacher": "Nguyễn Quảng An",
                            "status": "Đang chờ",
                            "arrStudent": [
                                {
                                    "studentId": "SV004",
                                    "studentName": "Nguyễn Van D",
                                    "year": 2000,
                                    "address": "Hà Nội",
                                    "email": "d@gmail.com",
                                    "phone": "0123456789",
                                    "gender": true,
                                    "status": "Đang học"
                                },
                                {
                                    "studentId": "SV005",
                                    "studentName": "Nguyễn Van E",
                                    "year": 2001,
                                    "address": "Đà Nẵng",
                                    "email": "e@gmail.com",
                                    "phone": "0123456789",
                                    "gender": false,
                                    "status": "Bảo lưu"
                                },
                                {
                                    "studentId": "SV006",
                                    "studentName": "Nguyễn Van F",
                                    "year": 1999,
                                    "address": "Cần Thơ",
                                    "email": "f@gmail.com",
                                    "phone": "0123456789",
                                    "gender": false,
                                    "status": "Đang học"
                                },
                            ]
                        }
                    ]
                },
                {
                    "courseId": "RA02",
                    "courseName": "JS Fullstack 2",
                    "courseTime": 1000,
                    "status": true,
                    "arrClass": [
                        {
                            "classId": "C003",
                            "className": "JS230807",
                            "descriptions": "Lớp học Fukuoka",
                            "studentNumber": 2,
                            "teacher": "Nguyễn Huy",
                            "status": "Kết thúc",
                            "arrStudent": [
                                {
                                    "studentId": "SV007",
                                    "studentName": "Nguyễn Van I",
                                    "year": 2000,
                                    "address": "Hà Nội",
                                    "email": "i@gmail.com",
                                    "phone": "0123456789",
                                    "gender": true,
                                    "status": "Tốt nghiệp"
                                },
                                {
                                    "studentId": "SV008",
                                    "studentName": "Nguyễn Van G",
                                    "year": 2001,
                                    "address": "Đà Nẵng",
                                    "email": "g@gmail.com",
                                    "phone": "0123456789",
                                    "gender": false,
                                    "status": "Tốt nghiệp"
                                }
                            ]
                        },
                        {
                            "classId": "C004",
                            "className": "JS230929",
                            "descriptions": "Lớp học Fukuoka",
                            "studentNumber": 29,
                            "teacher": "Nguyễn Văn A",
                            "status": "Đang hoạt động",
                            "arrStudent": [
                                {
                                    "studentId": "SV009",
                                    "studentName": "Nguyễn Van H",
                                    "year": 2000,
                                    "address": "Hà Nội",
                                    "email": "h@gmail.com",
                                    "phone": "0123456789",
                                    "gender": true,
                                    "status": "Đang học",
                                },
                                {
                                    "studentId": "SV010",
                                    "studentName": "Nguyễn Van J",
                                    "year": 2001,
                                    "address": "Đà Nẵng",
                                    "email": "j@gmail.com",
                                    "phone": "0123456789",
                                    "gender": false,
                                    "status": "Đang chờ"
                                },
                            ]
                        }
                    ]
                }
            ]

    localStorage.setItem("studentManagement", JSON.stringify(studentManagement));

            let userList = [
                { email: "user1@gmail.com", password: "123456", fullName: "Hoàng Lan", status: false },
                { email: "user2@gmail.com", password: "234567", fullName: "Vũ Anh Tuấn", status: true },
                { email: "user3@gmail.com", password: "345678", fullName: "Nguyễn Thị Ngoan", status: true},
            ];
    localStorage.setItem("userList", JSON.stringify(userList));