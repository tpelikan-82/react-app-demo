// import ListGroup from './components/ListGroup';
import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

 

function App() {

 const items = [ 'Prague', 'Brno', 'Olomouc' ];

const handleSelectedItem = (item: string) => { console.log(item); };

  // return  <div><Alert >children test <span>with complex structure</span></Alert></div>

  // return <div>
  //   <ListGroup heading='Cities' items={items} onSelectItem={handleSelectedItem} /></div>;

  const [visibleALert, isVisibleAlert] = useState(false);

  const handleEmployeeSelect = (employee) => {
    return;
  };
  


  return <div>
    {visibleALert && <Alert onClose={()=> isVisibleAlert(false)}>baf</Alert>}
   

    <BrowserRouter>
      <NavBar onSelectCategory={handleEmployeeSelect} />
       <Routes>
         {/* <Route path="/" element={<Button color="primary" onClick={()=> isVisibleAlert(true)} >My Button</Button>} />  */}
         <Route path="/dashboard" element={<Dashboard />} /> 
       </Routes>
    </BrowserRouter>

    </div>

}

export default App;

