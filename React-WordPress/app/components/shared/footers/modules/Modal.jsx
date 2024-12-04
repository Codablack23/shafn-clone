
export default function Modal({closeModal,isOpen,children,theme}){
    const bg = theme?theme ==="light"?"bg-white":"modal-dark":"modal-dark"
    return(
      <div className={`modal ${isOpen?"modal-shown":"modal-hidden"} left-0 fixed w-full h-full p-2 top-0 ${bg}`}>
          <header className="my-4 flex justify-end">
              <button onClick={closeModal} className="bg-gray-300 rounded-full flex items-center justify-center h-8 w-8">
                  <i className="bi bi-x-lg"></i>
              </button>
          </header>
       {children}
      </div>
    )
  }


// const Modal = ({ onClose, children, title }) => {
//     const handleCloseClick = (e) => {
//         setTimeout(() => {
//             onClose();
//         }, 5000);
//     };

//     const modalContent = (

//         <div className="absolute bottom-0 top-0 left-0 ml-52 w-[full] h-[full] flex justify-center items-center bg-[rgba(0, 0, 0, 0.5)] ">
//                           <div className="w-[600px] h-[600px]" >
//                             <div className="bg-white h-[100%] w-[100%] rounded-md p-4 ">
//                               <div className="flex justify-end text-2xl">
//                                 <a href="#" onClick={handleCloseClick}>x</a>
//                               </div>
//                                 {title && <h1>{title}</h1>}
//                                 <div className="pt-3">
//                                     {children}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//     );
// return (
//     modalContent
// );
// };

// export default Modal;