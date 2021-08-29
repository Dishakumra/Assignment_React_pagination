import React,{useEffect,useState} from 'react';
import axios from 'axios';
import './App.css';



function App() {
  const [pageNumber,setPageNumber]=useState(1);
  const [listData,setListData]=useState([]);
  const isprevdisabled=pageNumber===1;
  useEffect(()=>{
    axios.get(`https://reqres.in/api/users?page=${pageNumber}`)
    .then((res)=>{
      const users=res.data.data;
      setListData(users);
     
    }).catch((error)=>{
      alert('Some Error Occured')
      console.log(error);
     
    })
  },[pageNumber])
  return (
    <div className="container">
      <div><h2>Page Number :{pageNumber}</h2></div>
       {listData.length>0 ?
      <table>
        <thead>
        <tr>
          <th> ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Image</th>
        </tr>
        </thead>
        <tbody>
         
        {listData.map((data,index)=>{
          return <tr key={index}>
            <td>{data.id}</td>
            <td>{data.email}</td>
            <td>{data.first_name}</td>
            <td>{data.last_name}</td>
            <td><img className='node'src={data.avatar} alt='No img'/></td>
          </tr>
        })}
        </tbody>
        
      </table>:<div>NO DATA FOUND</div>}
      <button disabled={isprevdisabled} onClick={()=>{
        setPageNumber(pageNumber-1);
      }}>Prev</button>
      <button  onClick={()=>{
        setPageNumber(pageNumber+1);
      }}>Next</button>
    </div>
  );
}

export default App;
