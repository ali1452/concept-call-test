import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import {collection,getDocs} from 'firebase/firestore'


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
              <tr style={{display:"flex", justifyContent:"space-around"}}>
                    <th style={{width: "100px",margin:"10px", textAlign:"center"}}>Name</th>
                    <th style={{width: "140px",margin:"10px", textAlign:"center"}}>Email</th>
                    <th style={{width: "100px",margin:"10px", textAlign:"center"}}>Desciption</th>
                    <th style={{width: "100px",margin:"10px", textAlign:"center"}}>Status</th>
                    </tr>
            {project.map((item)=>{
                return (
                <div>
               <tr style={{display:"flex", justifyContent:"space-around", direction:"columns"}}>
                    <td style={{width: "100px",margin:"10px", textAlign:"center"}}>
                    {item.name} 
                    </td>
                    <td style={{width: "140px",margin:"10px", textAlign:"center"}}>
                    {item.url} 
                    </td>
                    <td style={{width: "100px",margin:"10px", textAlign:"center"}}>
                    {item.description} 
                    </td>
                    <td style={{width: "100px",margin:"10px", textAlign:"center"}}>
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