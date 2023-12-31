import React, { useEffect, useState } from 'react'
import "./NewPost.css"
import { Button, Typography } from '@mui/material'
import {useDispatch, useSelector} from "react-redux"
import {useAlert} from "react-alert"
import { createPostAction } from '../Actions/Post'

const NewPost = () => {
    const [image,setImage]=useState(null)
    const [caption,setCaption]=useState("")

    const {loading,error,message}=useSelector(state=>state.likeorUnlikePost)

    const dispatch=useDispatch()
    const alert=useAlert()



    const handleImage=(e)=>{
        const file=e.target.files[0]
        const Reader=new FileReader()
        Reader.readAsDataURL(file)
        Reader.onload=()=>{
            if(Reader.readyState===2)
            {
                setImage(Reader.result)
            }
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(createPostAction(caption,image))
        setImage(null)
        setCaption("")
    }

    useEffect(()=>{
      if(error)
      {
        alert.error(error)
        dispatch({type:"clearError"})
      }

      if(message)
      {
        alert.success(message)
        dispatch({type:"clearMessage"})
      }
    },[dispatch,error,message,alert])
  return (
    <div className='newPost'>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <Typography variant='h3'>New Post</Typography>
        {image && <img src={image} alt='post'/>}
        <input type="file" accept='image/*' onChange={handleImage}/>
        <input type="text" placeholder='Caption...' value={caption} onChange={(e)=>setCaption(e.target.value)}/>
        <Button type='submit' disabled={loading}>Post</Button>
      </form>
    </div>
  )
}

export default NewPost
