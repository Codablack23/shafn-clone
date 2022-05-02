import React from "react";

const ProductImages = ({ count, images, onSelect, onClick, onDelete }) =>
  Array(count)
    .fill("")
    .map((el, i) => {
      let image = images.find((img) => img.id === `img-${i + 1}`);

      return (
        <div key={i} style={{ ...styles.filesSelect }}>
          {image === undefined ? (
            <div>
              <input
                id={`img-${i + 1}`}
                type="file"
                accept="image/*"
                required
                hidden
                onChange={onSelect}
              />
              <label
                htmlFor={`img-${i + 1}`}
                className="m-1 border p-3 text-center"
                style={{
                  width: "20vh",
                  height: "21vh",
                  margin: "2% auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span>Add A Photo</span>
                <br />
                <i
                  className="fa fa-file-image-o text-secondary"
                  style={{ fontSize: 38, marginTop: 10, marginBottom: 10 }}
                  aria-hidden="true"
                ></i>
                <br />
                {i === 0 ? <p>Primary</p> : null}
              </label>
            </div>
          ) : (
            <div
              key={image.id}
              className="m-1 bg-dark"
              style={{
                position: "relative",
                width: "20vh",
                minHeight: "20vh",
                margin: "2% auto",
              }}
              onClick={() => {
                onClick(image.id);
              }}
            >
              <img src={image.url} style={styles.image} />

              <div
                className="ps-btn ps-btn--sm"
                style={styles.imageDel}
                onClick={(e) => {
                  onDelete(e, image.id);
                }}
              >
                <i
                  style={{
                    fontSize: 15,
                    marginLeft: 7,
                    marginTop: 5,
                    color: "white",
                  }}
                  className="bi bi-trash"
                ></i>
              </div>
            </div>
          )}
        </div>
      );
    });

export default ProductImages;

let styles = {
  variationSelect: {
    border: "none",
  },
  variationBtnSubmit: {
    minWidth: 120,
  },
  variationInput: {
    border: "1px solid lightgrey",
    borderRadius: 8,
  },
  imagesWrapper: { display: "flex", flexWrap: "wrap" },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    maxHeight: 300,
    backgroundColor: "black",
    marginLeft: 20,
    marginBottom: 10,
    position: "relative",
  },
  image: {
    width: "20vh",
    height: "21vh",
    objectFit: "cover",
    cursor: "pointer",
  },
  imageDel: {
    position: "absolute",
    fontSize: 15,
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 75,

    background: "rgba(250,0,0)",
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  filesStyles: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
  },
  fileSelect: {
    minWidth: "33%",
    minHeight: "30vh",
    marginRight: "2%",
  },
  attrWrapper: { marginBottom: 20 },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  removeBtn: { color: "red", cursor: "pointer" },
  attrVal: {
    padding: 5,
    marginBottom: 10,
    marginLeft: 10,
    fontWeight: "bold",
    cursor: "pointer",
    color: "#888",
  },
};
