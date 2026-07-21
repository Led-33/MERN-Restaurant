import { useEffect, useState } from "react";
import axios from "axios";

function Parametres() {

  const [form, setForm] = useState({
    nomRestaurant: "",
    slogan: "",
    adresse: "",
    telephone: "",
    email: "",
    siteWeb: "",
    ouverture: "",
    fermeture: "",
    facebook: "",
    instagram: "",
    whatsapp: "",
    devise: "Ar",
    maxReservation: 10,
  });

  const [logo, setLogo] = useState(null);
  const [cover, setCover] = useState(null);

  const fetchSettings = async () => {
    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/settings`
      );

      setForm(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const enregistrer = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (logo) {

        formData.append("logo", logo);

      }

      if (cover) {

        formData.append("cover", cover);

      }

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/settings`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert("Paramètres enregistrés.");

      fetchSettings();

    } catch (err) {

      console.log(err);

      alert("Erreur.");

    }

  };

  return (
    <div className="container-fluid">

      <h2 className="mb-4">
        Paramètres du restaurant
      </h2>

      <form
        onSubmit={enregistrer}
        className="card shadow p-4"
      >

        <div className="row">

                    <div className="col-md-6 mb-3">

            <label>Nom du restaurant</label>

            <input
              type="text"
              name="nomRestaurant"
              className="form-control"
              value={form.nomRestaurant}
              onChange={handleChange}
            />

          </div>

          <div className="col-md-6 mb-3">

            <label>Slogan</label>

            <input
              type="text"
              name="slogan"
              className="form-control"
              value={form.slogan}
              onChange={handleChange}
            />

          </div>

          <div className="col-md-12 mb-3">

            <label>Adresse</label>

            <input
              type="text"
              name="adresse"
              className="form-control"
              value={form.adresse}
              onChange={handleChange}
            />

          </div>

          <div className="col-md-6 mb-3">

            <label>Téléphone</label>

            <input
              type="text"
              name="telephone"
              className="form-control"
              value={form.telephone}
              onChange={handleChange}
            />

          </div>

          <div className="col-md-6 mb-3">

            <label>Email</label>

            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />

          </div>

          <div className="col-md-12 mb-3">

            <label>Site Web</label>

            <input
              type="text"
              name="siteWeb"
              className="form-control"
              value={form.siteWeb}
              onChange={handleChange}
            />

          </div>

          <div className="col-md-6 mb-3">

<label>Ouverture</label>

<input
type="time"
name="ouverture"
className="form-control"
value={form.ouverture}
onChange={handleChange}
/>

</div>

<div className="col-md-6 mb-3">

<label>Fermeture</label>

<input
type="time"
name="fermeture"
className="form-control"
value={form.fermeture}
onChange={handleChange}
/>

</div>

<div className="col-md-4 mb-3">

<label>Facebook</label>

<input
type="text"
name="facebook"
className="form-control"
value={form.facebook}
onChange={handleChange}
/>

</div>

<div className="col-md-4 mb-3">

<label>Instagram</label>

<input
type="text"
name="instagram"
className="form-control"
value={form.instagram}
onChange={handleChange}
/>

</div>

<div className="col-md-4 mb-3">

<label>WhatsApp</label>

<input
type="text"
name="whatsapp"
className="form-control"
value={form.whatsapp}
onChange={handleChange}
/>

</div>

<div className="col-md-6 mb-3">

<label>Logo</label>

<input
type="file"
className="form-control"
onChange={(e)=>setLogo(e.target.files[0])}
/>

</div>

<div className="col-md-6 mb-3">

<label>Bannière</label>

<input
type="file"
className="form-control"
onChange={(e)=>setCover(e.target.files[0])}
/>

</div>

<div className="col-md-6 mb-3">

<label>Devise</label>

<select
name="devise"
className="form-select"
value={form.devise}
onChange={handleChange}
>

<option>Ar</option>
<option>€</option>
<option>$</option>

</select>

</div>

<div className="col-md-6 mb-3">

<label>Nombre maximal de personnes</label>

<input
type="number"
name="maxReservation"
className="form-control"
value={form.maxReservation}
onChange={handleChange}
/>

</div>

        </div>

        <button
          className="btn btn-danger mt-3"
          type="submit"
        >
          Enregistrer les paramètres
        </button>

      </form>

    </div>
  );
}

export default Parametres;