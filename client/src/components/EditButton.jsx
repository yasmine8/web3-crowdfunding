import React from 'react'

const EditButton = () => {
    const handleLog = () =>{
        console.log("lge");
    }
  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
            
        >
     <button type='button' onClick={handleLog}>
Test
        </button>
      </div>
  )
}

export default EditButton