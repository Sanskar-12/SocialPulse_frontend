import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({name,avatar,userId}) => {
  return (
    <Link to={`/user/${userId}`} className='homeUser'>
        <img src={avatar} alt="userimage"/>
        <Typography>
            {name}
        </Typography>
    </Link>
  )
}

export default Users
