import { useEffect, useState } from "react";
import api from "../../services/api";

function Utilisateurs() {

const [users,setUsers]=useState([]);

const [nom,setNom]=useState("");

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [role,setRole]=useState("Employé");

const [actif,setActif]=useState(true);

const [editingId,setEditingId]=useState(null);

const [showModal,setShowModal]=useState(false);

const [search,setSearch]=useState("");

const [currentPage,setCurrentPage]=useState(1);

const [totalPages,setTotalPages]=useState(1);

const usersPerPage=8;

//charger
const fetchUsers = async () => {

    try{

        const res = await api.get(
            `${import.meta.env.VITE_API_URL}/api/users`
        );

        setUsers(res.data);

    }

    catch(err){

        console.log(err);

    }

};

useEffect(()=>{

    fetchUsers();

},[]);

//ouvrir les modales
const ouvrirAjout=()=>{

    setEditingId(null);

    setNom("");

    setEmail("");

    setPassword("");

    setRole("Employé");

    setActif(true);

    setShowModal(true);

};

const ouvrirModification=(user)=>{

    setEditingId(user._id);

    setNom(user.nom);

    setEmail(user.email);

    setPassword("");

    setRole(user.role);

    setActif(user.actif);

    setShowModal(true);

};

const fermerModal=()=>{

    setShowModal(false);

};

//Ajouter et modifier
const enregistrerUtilisateur = async(e)=>{

e.preventDefault();

try{

const data={

nom,

email,

password,

role,

actif

};

if(editingId){

await api.put(

`${import.meta.env.VITE_API_URL}/api/users/${editingId}`,

data

);

}

else{

await api.post(

`${import.meta.env.VITE_API_URL}/api/users`,

data

);

}

fermerModal();

fetchUsers();

}

catch(err){

console.log(err);

}

};

//supprimer
const supprimerUtilisateur = async(id)=>{

if(!window.confirm("Supprimer cet utilisateur ?"))

return;

try{

await api.delete(

`${import.meta.env.VITE_API_URL}/api/users/${id}`

);

fetchUsers();

}

catch(err){

console.log(err);

}

};

//recherche
const usersFiltres = users.filter(user=>

user.nom.toLowerCase().includes(search.toLowerCase()) ||

user.email.toLowerCase().includes(search.toLowerCase()) ||

user.role.toLowerCase().includes(search.toLowerCase())

);

//pagination
const indexLast=currentPage*usersPerPage;

const indexFirst=indexLast-usersPerPage;

const currentUsers=

usersFiltres.slice(

indexFirst,

indexLast

);

const totalPagesClient=Math.ceil(

usersFiltres.length/usersPerPage

);

return (
  <div className="container-fluid">

    <div className="d-flex justify-content-between align-items-center mb-4">

      <h2>Gestion des utilisateurs</h2>

      <button
        className="btn btn-danger"
        onClick={ouvrirAjout}
      >
        <i className="bi bi-plus-circle"></i>
        {" "}Nouvel utilisateur
      </button>

    </div>

    <div className="row mb-4">

      <div className="col-md-4">

        <input
          type="text"
          className="form-control"
          placeholder="Rechercher..."
          value={search}
          onChange={(e)=>{
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

      </div>

    </div>

    <div className="row mb-4">

      <div className="col-md-3">

        <div className="card shadow border-0">

          <div className="card-body text-center">

            <h6>Total utilisateurs</h6>

            <h2>{users.length}</h2>

          </div>

        </div>

      </div>

      <div className="col-md-3">

        <div className="card shadow border-0">

          <div className="card-body text-center">

            <h6>Actifs</h6>

            <h2 className="text-success">
              {users.filter(u=>u.actif).length}
            </h2>

          </div>

        </div>

      </div>

      <div className="col-md-3">

        <div className="card shadow border-0">

          <div className="card-body text-center">

            <h6>Managers</h6>

            <h2 className="text-primary">
              {
                users.filter(
                  u=>u.role==="Manager"
                ).length
              }
            </h2>

          </div>

        </div>

      </div>

      <div className="col-md-3">

        <div className="card shadow border-0">

          <div className="card-body text-center">

            <h6>Super Admin</h6>

            <h2 className="text-danger">
              {
                users.filter(
                  u=>u.role==="Super Admin"
                ).length
              }
            </h2>

          </div>

        </div>

      </div>

    </div>
    <div className="card shadow border-0">

<div className="card-body">

<div className="table-responsive">

<table className="table table-hover align-middle">

<thead className="table-dark">

<tr>

<th>Nom</th>

<th>Email</th>

<th>Rôle</th>

<th>Statut</th>

<th>Actions</th>

</tr>

</thead>

<tbody>

{currentUsers.length===0? (

<tr>

<td colSpan="5" className="text-center">

Aucun utilisateur

</td>

</tr>

):(

currentUsers.map(user=>(

<tr key={user._id}>

<td>

<strong>{user.nom}</strong>

</td>

<td>{user.email}</td>

<td>

<span className="badge bg-primary">

{user.role}

</span>

</td>

<td>

{user.actif ? (

<span className="badge bg-success">

Actif

</span>

):(

<span className="badge bg-secondary">

Inactif

</span>

)}

</td>

<td>

<div className="d-flex gap-2">

<button

className="btn btn-warning btn-sm"

onClick={()=>ouvrirModification(user)}

>

<i className="bi bi-pencil"></i>

</button>

<button

className="btn btn-danger btn-sm"

onClick={()=>supprimerUtilisateur(user._id)}

>

<i className="bi bi-trash"></i>

</button>

</div>

</td>

</tr>

))

)}

</tbody>

</table>

</div>

</div>

</div>

<div className="d-flex justify-content-center align-items-center gap-3 mt-4">

  <button
    className="btn btn-outline-danger"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    Précédent
  </button>

  <span>

    Page {currentPage} / {totalPagesClient || 1}

  </span>

  <button
    className="btn btn-outline-danger"
    disabled={
      currentPage === totalPagesClient ||
      totalPagesClient === 0
    }
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Suivant
  </button>

</div>
{showModal && (

<div
  className="modal fade show"
  style={{
    display: "block",
    background: "rgba(0,0,0,.5)"
  }}
>

<div className="modal-dialog">

<div className="modal-content">

<div className="modal-header">

<h5 className="modal-title">

{editingId
? "Modifier un utilisateur"
: "Nouvel utilisateur"}

</h5>

<button
className="btn-close"
onClick={fermerModal}
></button>

</div>

<form onSubmit={enregistrerUtilisateur}>

<div className="modal-body">

<div className="mb-3">

<label className="form-label">

Nom

</label>

<input
type="text"
className="form-control"
value={nom}
onChange={(e)=>setNom(e.target.value)}
required
/>

</div>

<div className="mb-3">

<label className="form-label">

Email

</label>

<input
type="email"
className="form-control"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

</div>

<div className="mb-3">

<label className="form-label">

Mot de passe

</label>

<input
type="password"
className="form-control"
value={password}
onChange={(e)=>setPassword(e.target.value)}
placeholder={
editingId
? "Laisser vide pour conserver"
: ""
}
required={!editingId}
/>

</div>

<div className="mb-3">

<label className="form-label">

Rôle

</label>

<select
className="form-select"
value={role}
onChange={(e)=>setRole(e.target.value)}
>

<option>Employé</option>

<option>Manager</option>

<option>Super Admin</option>

</select>

</div>

<div className="form-check">

<input
className="form-check-input"
type="checkbox"
checked={actif}
onChange={(e)=>setActif(e.target.checked)}
/>

<label className="form-check-label">

Utilisateur actif

</label>

</div>

</div>

<div className="modal-footer">

<button
type="button"
className="btn btn-secondary"
onClick={fermerModal}
>

Annuler

</button>

<button
type="submit"
className="btn btn-danger"
>

{editingId
? "Modifier"
: "Ajouter"}

</button>

</div>

</form>

</div>

</div>

</div>

)}

</div>
);
}

export default Utilisateurs;