import React from "react";
import React_Datasheet from "react-datasheet";
import '../src/css/spreadsheet.css';


const data = [
  [{ value: "Vanilla" }, { value: "Chocolate" }],
  [{ value: "Strawberry" }, { value: "Cookies" }],
];

class Spreadsheets extends React.Component{
    render(){
        return (
            <body>		
            <header id="header">
            <div id="logo">
                <h1>Spreadsheet</h1>
            </div>
            </header>
                
            <main>
            <div class="innertube">

                <button>Return Home</button>
                <button>Logout</button>
                
            </div>
            <div>
                <React_Datasheet 
                    data={data}
                    valueRenderer={cell => cell.value}
                />
            </div>
            </main>

            <nav id="nav">
            <div class="innertube">
                <h1>Sort By</h1>
            </div>
            </nav>	
            </body>
        )
    }
}

export default Spreadsheets;