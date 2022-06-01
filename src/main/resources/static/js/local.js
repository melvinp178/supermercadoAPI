//funciones propias de la app
async function login(){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    var settings={
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    }
    const request = await fetch("api/auth/login",settings);
    console.log(await request.text());
    if(request.ok){
        location.href= "dashboard.html";
    }
}

function listar(){
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("/producto/all",settings)
        .then(response => response.json())
        .then(function(data){

            //if(data.lenght>0){
            var productos = '';
            for(const producto of data){

                productos += '<tr>'+
                    '<th scope="row">'+producto.idProducto+'</th>'+
                    '<td>'+producto.nombre+'</td>'+
                    '<td>'+producto.codigoBarras+'</td>'+
                    '<td>'+producto.cantidadStock+'</td>'+
                    '<td>'+producto.estado+'</td>'+
                    '<td>'+producto.precioVenta+'</td>'+
                    '<td>'+
                    '<button type="button" class="btn btn-outline-danger" onclick="eliminaUsuario(\''+producto.idProducto+'\')"><i class="fa-solid fa-user-minus"></i></button>'+
                    '<a href="#" onclick="verModificarUsuario(\''+producto.idProducto+'\')" class="btn btn-outline-warning"><i class="fa-solid fa-user-pen"></i></a>'+
                    '<a href="#" onclick="verUsuario(\''+producto.idProducto+'\')" class="btn btn-outline-info"><i class="fa-solid fa-eye"></i></a>'+
                    '</td>'+
                    '</tr>';
            }
            document.getElementById("listar").innerHTML = productos;
            //}
        })
}



async function sendData(path){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(path, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    myForm.reset();
    console.log(await request.text())
}

function eliminaUsuario(id){
    var settings={
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/users/"+id,settings)
        .then(response => response.json())
        .then(function(data){
            listar();
            alertas("Se ha eliminado el usuario exitosamente!",2)
        })
}

function verModificarUsuario(id){
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/users/"+id,settings)
        .then(response => response.json())
        .then(function(usuario){
            var cadena='';
            if(usuario){
                cadena = '<div class="p-3 mb-2 bg-light text-dark">'+
                    '<h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Modificar Usuario</h1>'+
                    '</div>'+

                    '<form action="" method="post" id="myForm">'+
                    '<input type="hidden" name="id" id="id" value="'+usuario.id+'">'+
                    '<label for="firstName" class="form-label">First Name</label>'+
                    '<input type="text" class="form-control" name="firstName" id="firstName" required value="'+usuario.firstName+'"> <br>'+
                    '<label for="lastName"  class="form-label">Last Name</label>'+
                    '<input type="text" class="form-control" name="lastName" id="lastName" required value="'+usuario.lastName+'"> <br>'+
                    '<label for="email" class="form-label">Email</label>'+
                    '<input type="email" class="form-control" name="email" id="email" required value="'+usuario.email+'"> <br>'+
                    '<label for="password" class="form-label">Password</label>'+
                    '<input type="password" class="form-control" id="password" name="password" required> <br>'+
                    '<button type="button" class="btn btn-outline-warning" onclick="modificarUsuario(\''+usuario.id+'\')">Modificar</button>'+
                    '</form>';
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
        })
}

async function modificarUsuario(id){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch("api/users/"+id, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    listar();
    alertas("Se ha modificado el usuario exitosamente!",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function verUsuario(id){
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/users/"+id,settings)
        .then(response => response.json())
        .then(function(usuario){
            var cadena='';
            if(usuario){
                cadena = '<div class="p-3 mb-2 bg-light text-dark">'+
                    '<h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Visualizar Usuario</h1>'+
                    '</div>'+
                    '<ul class="list-group">'+
                    '<li class="list-group-item">Nombre: '+usuario.firstName+'</li>'+
                    '<li class="list-group-item">Apellido: '+usuario.lastName+'</li>'+
                    '<li class="list-group-item">Correo: '+usuario.email+'</li>'+
                    '</ul>';

            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
        })
}

function alertas(mensaje,tipo){
    var color ="";
    if(tipo == 1){//success verde
        color="success"
    }
    else{//danger rojo
        color = "danger"
    }
    var alerta ='<div class="alert alert-'+color+' alert-dismissible fade show" role="alert">'+
        '<strong><i class="fa-solid fa-triangle-exclamation"></i></strong>' +
        mensaje+
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'+
        '</div>';
    document.getElementById("datos").innerHTML = alerta;
}

function registerForm(){
    cadena = '<div class="p-3 mb-2 bg-light text-dark">'+
        '<h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Registrar Producto</h1>'+
        '</div>'+

        '<form action="" method="post" id="myForm">'+
        '<input type="hidden" name="id" id="id">'+
        '<label for="firstName" class="form-label">nombre</label>'+
        '<input type="text" class="form-control" name="firstName" id="firstName" required> <br>'+
        '<label for="lastName"  class="form-label">codigo de barras</label>'+
        '<input type="text" class="form-control" name="lastName" id="lastName" required> <br>'+
        '<label for="email" class="form-label">precio</label>'+
        '<input type="email" class="form-control" name="email" id="email" required> <br>'+
        '<label for="password" class="form-label">cantidad</label>'+
        '<input type="password" class="form-control" id="password" name="password" required> <br>'+
        '<label for="estado" class="form-label">estado</label> <br>'+
        '<select class="form-select" name="estado" id="estado" >'+
        '<option value="true">opcion 1</option>'+
        '<option value="false">opcion 2</option>'+
        '</select><br> <br> <br>'+
        '<button type="button" class="btn btn-outline-info" onclick="registrarUsuario()">Registrar</button>'+
        '</form>';
    document.getElementById("contentModal").innerHTML = cadena;
    var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
    myModal.toggle();
}

async function registrarUsuario(){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch("api/users", {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    listar();
    alertas("Se ha registrado el usuario exitosamente!",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function modalConfirmacion(texto,funcion){
    document.getElementById("contenidoConfirmacion").innerHTML = texto;
    var myModal = new bootstrap.Modal(document.getElementById('modalConfirmacion'))
    myModal.toggle();
    var confirmar = document.getElementById("confirmar");
    confirmar.onclick = funcion;
}