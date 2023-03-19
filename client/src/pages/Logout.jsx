import React from 'react'
import {useDisconnect } from '@thirdweb-dev/react'
import { useNavigate } from 'react-router-dom';
import {CustomButton} from '../components'
const Logout = () => {
    const  disconnect  = useDisconnect ();
    const navigate = useNavigate()
 
const handleDisconnect  = () => {
    disconnect();
    navigate('/')
}
  return (
    <CustomButton 
      btnType="button"
      title="Log Out"
      styles="bg-[#8c6dfd]"
      handleClick={handleDisconnect}
    />
  )
}

export default Logout