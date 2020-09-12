import React,{useState} from 'react';
import noimg from '../noimg.png';
import {Img} from 'react-image';
import styled from 'styled-components';
import SanitizedHTML from 'react-sanitized-html';
import { Button, Modal } from 'react-bootstrap';
import "../App.css";
import CustomSelect from './CustomSelect';
import 'bootstrap/dist/css/bootstrap.min.css';


const EmployeeContainer = styled.div`
  padding: .75rem 1.25rem;
  backgroundColor: #fff;
  border: 1px solid rgba(0,0,0,.125);
`;

const options=[
  {label:'Blue',value:'#0000FF'},
  {label:'Red',value:'#FF0000'},
  {label:'Green',value:'#008000'},
  {label:'Yellow',value:'#FFFF00'},
];

 const theme = theme => ({
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "#f3f3f3",
        primary: "pink"
      }
    });

const Employees = ({ employees, load }) => {

  const [ modalOn, setModalOn ] = useState(false);
  const [ currentEmployee, setCurrentEmployee ] = useState(0);
  const [ backgroundOn, setBackgroundOn ] = useState('');
  const [ currentBackground, setCurrentBackground ] = useState('');
  const [ backgroundArray, setBackgroundArray ] = useState([]);
  const [ tagID, setTagID ] = React.useState('');
  const [ tag, setTag ] = React.useState('');
  const [ tagArray, setTagArray ] = useState([]);


  const handleModalClose = () => setModalOn(false);

  function handleModalOpen(currentindex) {
    setModalOn(!modalOn);
    setCurrentEmployee(currentindex);
  }

  function handleMouseEvent(e, employeeID) {
    setTag('');
    setTagID(employeeID);
  }

  function handleChange(e) {
    setTag(e.target.value);
  }

  function handleTagClick(e, id, tag) {
     setTagArray({
      ...tagArray,
      [id]: tag
    });
  }

  const onChangeBgInput = index => (option) => {
    setBackgroundArray({
      ...backgroundArray,
      [index]: option.value
    });
  }

  if (!load) {
    return <h2>Loading...</h2>;
  }

  return (
  <div className="container">
    <div className='list-group mb-4'>
      {employees.map((employee, index) => (
        <EmployeeContainer key={employee.uuid} 
          style={
              [employee.uuid] ? 
              { backgroundColor: backgroundArray[employee.uuid]}
              : { backgroundColor: 'white' }}  
        >
          
          <div className="row">
            <div className= "col-md-2">
            <Img
              src={[employee.avatar, noimg]} onClick={()=>handleModalOpen(index)}
            />


            <Modal show={modalOn} onHide={handleModalClose} animation={false} style = {{width:"100vw"}}>      
                {modalOn && index === currentEmployee &&(
                <Img style = {{width:"40vw"}}
                  src={[employees[currentEmployee].avatar, noimg]} onClick={handleModalClose}
                />
                )}
            </Modal>
            </div>  

            <div className="col-md-3">
              {employee.name}
            </div>  
            <div className="col-md-3">
              {employee.company}
            </div>  
            <div className="col-md-4">
            <SanitizedHTML
              allowedTags={[ 'b', 'i', 'em', 'strong', 'p' ]}
              html={ employee.bio }
            />
            </div>
          </div>

          <div className="row">
          <CustomSelect
            onChange={onChangeBgInput(employee.uuid)} 
            options={options} 
            label="Choose Background Color"
            theme="theme" 
          />  

          <div className="col-md-3">                    
            <input 
              type="text" value={ tagID && tagID === employee.uuid ? tag : ''} 
              onMouseDown={(e) => {handleMouseEvent(e,employee.uuid)}} 
              onChange={handleChange}/>  

          </div> 

          <div className="col-md-6">
            <button type="button" 
              className="btn btn-outline-dark" 
              onClick={(e) => {handleTagClick(e,employee.uuid, tag)}}>Save Tag</button>  
            </div>
            <div className="col-md-3">
              Label: {tagArray[employee.uuid]}
            </div>
          </div>
        
        </EmployeeContainer>

      ))}
    </div>
  </div>  
  );
};

export default Employees;