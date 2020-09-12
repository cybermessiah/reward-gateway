import React,{useEffect,useState} from 'react';
import axios from 'axios';
import noimg from './noimg.png';
import './App.css';
import {Img} from 'react-image';
import Employees from './components/Employees';
import Pagination from './components/Pagination';


function App() {

    const [employees, setEmployees] = useState([]);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);

    
    useEffect(() => {
        axios.get('.......',{
                   auth: {
                      username: '....',
                      password: '....'
                    }
                  }  
                  )
            .then(res => {
                setEmployees(res.data);
                setLoad(true);
            })
            .catch(err => {
                setError(err.message);
                setLoad(false)
            })
    }, []);

      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = employees.slice(indexOfFirstPost, indexOfLastPost);

      const paginate = pageNumber => setCurrentPage(pageNumber);   
    

    return (    
    <div className='container mt-5'>  
        <Employees employees={currentPosts} load={load} />
          <Pagination
          postsPerPage={postsPerPage}
          totalPosts={employees.length}
          paginate={paginate}
        />
    </div>);
    
 
}

export default App;
