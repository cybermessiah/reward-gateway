import React from 'react'
import Select from 'react-select'


const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: 300,
      borderBottom: '1px dotted pink',
      padding: 10,
      backgroundColor:'rgba(100,100,50,0.8)',
    }),
  
    control: (_, { selectProps: { width }}) => ({
      width: width
    }),
  
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }


function CustomSelect({style,label,options,onChange}){
    return <div className="col-md-3" style={style}>
        <h6>{label}</h6>
        <Select 
          styles={customStyles} 
          options={options} 
          onChange={onChange} 
          className="mb-3"
        />
    </div>
}

export default CustomSelect;