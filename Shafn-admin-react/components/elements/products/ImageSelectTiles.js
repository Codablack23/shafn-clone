import React, { useState, useEffect } from "react"
import { notification } from "antd"
import Lightbox from "react-image-lightbox"

const Placeholder = ({ index, onSelect }) => (
  <div>
    <input
      id={`img-${index + 1}`}
      type="file"
      accept="image/*"
      required
      hidden
      onChange={onSelect}
    />
    <label
      htmlFor={`img-${index + 1}`}
      className="m-1 border p-3 text-center"
      style={{
        width: "20vh",
        height: "21vh",
        margin: "2% auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
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
      {index === 0 ? <p>Primary</p> : null}
    </label>
  </div>
)

const Image = ({ url, onClick, onDelete }) => (
  <div
    className="m-1 bg-dark"
    style={{
      position: "relative",
      width: "20vh",
      minHeight: "20vh",
      margin: "2% auto",
    }}
    onClick={onClick}
  >
    <img src={url} style={styles.image} />

    <div
      className="ps-btn ps-btn--sm"
      style={styles.imageDel}
      onClick={onDelete}
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
)

const ImageSelectTiles = ({
  numOfTiles,
  defaultImages,
  onSelect,
  onDelete,
}) => {
  const [images, setImages] = useState([])
  const [viewImages, setViewImages] = useState(false)
  const [index, setIndex] = useState("")

  const handleImageSelection = (e) => {
    e.persist()

    let image = e.target.files[0]
    let type = image.type.split("/").pop()
    let allowedTypes = ["jpeg", "jpg", "png", "gif"]

    if (image) {
      if (allowedTypes.includes(type)) {
        const img = {
          id: e.target.id,
          url: URL.createObjectURL(image),
        }

        setImages((current) => [...current, img])

        const imgFile = {
          id: e.target.id,
          file: image,
        }

        onSelect(imgFile)

        URL.revokeObjectURL(image)
      } else {
        notification["error"]({
          message: "Invalid image type!",
          description: "Image must be a jpg, png or gif",
        })
      }
    }
  }

  const deleteImage = (e, id) => {
    e.stopPropagation()
    setImages((current) => current.filter((img) => img.id !== id))
    onDelete(id)
  }

  const viewImage = (id) => {
    setViewImages(true)
    let imgIndex = images.findIndex((img) => img.id === id)
    setIndex(imgIndex)
  }

  let imageView = Array(numOfTiles)
    .fill(null)
    .map((_, i) => {
      let image = images.find((img) => img.id === `img-${i + 1}`)

      return (
        <div key={Math.random().toString()} style={{ ...styles.filesSelect }}>
          {image === undefined ? (
            <Placeholder index={i} onSelect={handleImageSelection} />
          ) : (
            <Image
              url={image.url}
              onClick={() => viewImage(image.id)}
              onDelete={(e) => deleteImage(e, image.id)}
            />
          )}
        </div>
      )
    })

  let imageSlider = viewImages && (
    <Lightbox
      mainSrc={images[index].url}
      nextSrc={images[(index + 1) % images.length].url}
      prevSrc={images[(index + images.length - 1) % images.length].url}
      onCloseRequest={() => setViewImages(false)}
      onMovePrevRequest={() =>
        setIndex((index + images.length - 1) % images.length)
      }
      onMoveNextRequest={() => setIndex((index + 1) % images.length)}
    />
  )

  useEffect(() => {
    if (defaultImages) {
      setImages(defaultImages)
    }
  }, [defaultImages])

  return (
    <>
      {imageView}
      {imageSlider}
    </>
  )
}

export default ImageSelectTiles

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

    background: "rgba(250,0,0,0.7)",
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
}
