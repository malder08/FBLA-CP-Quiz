import React from 'react';
import './App.css';
import Questions from './components/Questions.js';

function App() {

  // const electron = window.require("electron");

  // const BrowserWindow = electron.remote.BrowserWindow; 

  // var current = document.getElementById('current'); 
  // var options = { 
  //   silent: false, 
  //   printBackground: true, 
  //   color: false, 
  //   margin: { 
  //     marginType: 'printableArea'
  //   }, 
  //   landscape: false, 
  //   pagesPerSheet: 1, 
  //   collate: false, 
  //   copies: 1, 
  //   header: 'Header of the Page', 
  //   footer: 'Footer of the Page'
  // } 

  // current.addEventListener('click', (event) => { 
  //   let win = BrowserWindow.getFocusedWindow(); 
  //   // let win = BrowserWindow.getAllWindows()[0]; 

  //   win.webContents.print(options, (success, failureReason) => { 
  //     if (!success) console.log(failureReason); 

  //     console.log('Print Initiated'); 
  //   }); 
  // }); 

  return (
    <div className="App">
      <Questions></Questions>
    </div>
  );
}

export default App;
