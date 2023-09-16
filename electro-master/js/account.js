let accountLogin = JSON.parse(localStorage.getItem("AccountToken"));


function getAll() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + accountLogin.token,

        },
        url: "http://localhost:8080/accounts/admin",
        success: function (data) {
            show(data);
        },
        error: function (err) {
            console.log(err)
            //Lỗi
        }
    });
}


function show(arr) {
    let str = "";
    for (const a of arr) {
        str += ` <tr>
              <td>${a.id}</td>
              <td>${a.username}</td>
              <td><a href="order.html?id=${a.id}" >${a.fullName}</a></td>
              <td>${a.role.name}</td>
              <td><button type="button" class="btn btn-warning" onclick="showEdit(${a.id})" data-toggle="modal" data-target="#modalEdit" >Edit</button></td>
              <td><button type="button" class="btn btn-danger" onclick="deleteA(${a.id})" >Delete</button></td>
             </tr>`
    }
    document.getElementById("show").innerHTML = str;
}

function deleteA(idA) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/accounts/admin/delete/" + idA,
        "Authorization": "Bearer " + accountLogin.token,

        success: function (data) {
            getAll();
        },
        error: function (err) {
            console.log(err)
        }
    });
}

function showEdit(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + accountLogin.token,
        },
        url: "http://localhost:8080/accounts/" + id,
        success: function (data) {
            document.getElementById("idE").value = data.id;
            document.getElementById("usernameE").value = data.username;
            document.getElementById("passwordE").value = data.password;
            document.getElementById("fullNameE").value = data.fullName;
            document.getElementById("imgE").value = data.img;
            document.getElementById("phoneE").value = data.phone;
            document.getElementById("addressE").value = data.address;
            document.getElementById("idRoleE").value = data.role.id;
        },
        error: function (err) {
            console.log(err)
        }
    });
}

function edit() {
    let id = document.getElementById("idE").value;
    let username = document.getElementById("usernameE").value;
    let password = document.getElementById("passwordE").value;
    let fullName = document.getElementById("fullNameE").value;
    let img = document.getElementById("imgE").value;
    let phone = document.getElementById("phoneE").value;
    let address = document.getElementById("addressE").value;
    let idRole = document.getElementById("idRoleE").value;

    let account = {id, username, password, fullName, img, phone, address, role: {id: idRole}};

    $.ajax({
        type: "Post",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + accountLogin.token,

        },
        url: "http://localhost:8080/accounts",
        data: JSON.stringify(account),
        success: function (data) {
            getAll();
        },
        error: function (err) {
            console.log(err)
        }
    });
}



// function search() {
//     let search = $("#search").val();
//     $.ajax({
//         type: "GET",
//         headers: {
//             'Accept': 'application/json',
//         },
//         url: "http://localhost:8080/admin/accounts/search?name=" + search,
//         success: function (data) {
//             show(data);
//         },
//         error: function (err) {
//             console.log(err)
//         }
//     });
// }
function getAllNameSearch() {
    let name = document.getElementById("search").value;
    if (name !== ""){
    return $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + accountLogin.token,
        },
        url: "http://localhost:8080/accounts/admin/search/" + name,
        success: function (data) {
            show(data)
        },
        error: function () {
            console.log(err)
        }
    });}else {
        getAll()
    }

}
getAll()