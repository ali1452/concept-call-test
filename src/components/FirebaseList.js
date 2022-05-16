import { Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import {collection,getDocs} from 'firebase/firestore'

const handleChange=()=>{
    console.log('helo')
}
function FirebaseList(props) {
    const [project,setProject] = useState([]);
    const projectCollectionRef = collection(db,"projects")
useEffect(()=>{
const getProject = async ()=>{
const data = await getDocs(projectCollectionRef);
setProject(data.docs.map((doc)=>({...doc.data(),id:doc.id}))) 
}
getProject();
},[]);


    return (
        <table>
              <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Desciption</th>
                    <th>Status</th>
                    </tr>
            {project.map((item)=>{
                return (
                <div>
                    <tr>
                    <td>
                    {item.id} 
                    {item.name} 
                    {item.email} 
                    {item.description} 
                    {item.status}
                    </td>
                    </tr>
                    </div>
                )

            })}
        </table>
    );
}

export default FirebaseList;