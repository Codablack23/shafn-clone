import {useEffect, useState} from 'react'

export const CustomModal=({children,isOpen,toggleModal})=>{
       if(isOpen){
        return(
            <div className="custom-modal-container">
                <div className="close-btn-container"><span className="close-btn text-light" onClick={toggleModal}>Close</span></div>
                <div className="custom-modal-content">
                    {children}
                </div>
            </div>
        )}else{
            return(
              <div>
                
             </div>
            )
        }
}
export const CustomSlider=({images,imgIndex,video})=>{
    const [current,setCurrent] =useState(imgIndex)
    const [currentImg,setCurrentImg] = useState(images.filter(img=>img.id==current)[0])
    const [currentVideo,setCurrentVideo]=useState(false)

    useEffect(()=>{
      setCurrentImg(images.filter(img=>img.id==current)[0])
    },current)

    return  images.length >0 || video !=""?(
        <div className="custom-slider-container">
            <div className={`custom-slide ${video && "bg-dark"}`}>
               {currentVideo != true?<>
                <img style={
                   {
                    height:"95vh",
                    width:"100%",
                    objectFit:"contain"
                   }
                }
                src={currentImg.url} />
               </>:(
                   <button className="play-btn"><i class="bi bi-play-circle"></i></button>
               )}
            </div>
            <a className="prev">&#10094;</a>
            <a className="next">&#10095;</a>

            <div className="slider-thumbnails">
            <div className="d-flex mt-2 text-center">
                {video != "" &&(
                <div key={img.id} 
                className={`column demo ${img.id==current && "active"}`}
                onClick={()=>{setCurrent(img.id)}}
                >
                </div>
                )}
              {images.map(img=>(
                <div key={img.id} 
                className={`column m-2 demo ${img.id==current && "active"}`}
                onClick={()=>{setCurrent(img.id)}}
                >
               </div>
              ))}
            </div>
            </div>
       </div>
    ):(
        <div>You Have No Product Files</div>
    )
   }


  