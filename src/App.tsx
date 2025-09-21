// import ListGroup from './components/ListGroup';
import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddEmployee from "./components/AddEmployee";
import Home from "./components/Home";
import { AppProvider } from "./Context/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

 

function App() {
  
  const [cart, setCart] = useState([]);

  const items = [ 'Prague', 'Brno', 'Olomouc' ];



const handleSelectedItem = (item: string) => { console.log(item); };

  // return  <div><Alert >children test <span>with complex structure</span></Alert></div>

  // return <div>
  //   <ListGroup heading='Cities' items={items} onSelectItem={handleSelectedItem} /></div>;

  const [visibleALert, isVisibleAlert] = useState(false);

  // const handleEmployeeSelect = (employee) => {
  //   return;
  // };


  return <div>
    {visibleALert && <Alert onClose={()=> isVisibleAlert(false)}>baf</Alert>}
   
    <AppProvider>
      <BrowserRouter>
        {/* <NavBar onSelectCategory={handleEmployeeSelect} /> */}
        <NavBar />
        <Routes>
        
          {/* <Route path="/" element={<Button color="primary" onClick={()=> isVisibleAlert(true)} >My Button</Button>} />  */}
          <Route path="/" element={<Home />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add_employee" element={<AddEmployee />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>

    </div>

}

export default App;

