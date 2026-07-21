function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
  ];

  return (
    <section className="container py-5">

      <div className="text-center mb-5">

        <i className="bi bi-images display-3 text-danger"></i>

        <h2 className="mt-3">
          Galerie
        </h2>

        <p className="text-muted">
          Découvrez notre restaurant et nos plats
        </p>

      </div>

      <div className="row">

        {images.map((img, index) => (

          <div
            key={index}
            className="col-lg-4 col-md-6 mb-4"
          >

            <div className="card border-0 shadow overflow-hidden">

              <img
                src={img}
                alt={`Galerie ${index + 1}`}
                className="card-img-top"
                style={{
                  height: "250px",
                  objectFit: "cover",
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Gallery;