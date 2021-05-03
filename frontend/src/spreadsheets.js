import React from "react";
import React_Datasheet from "react-datasheet";
import '../src/css/spreadsheet.css';


const data = [
  [{ value: "Vanilla" }, { value: "Chocolate" }, { value: "Value1" }, { value: "Vanilla" }, { value: "Chocolate" }, { value: "Value1" }, { value: "Vanilla" }, { value: "Chocolate" }, { value: "Value1" }, { value: "Vanilla" }, { value: "Chocolate" }, { value: "Value1" }],
  [{ value: "Strawberry" }, { value: "Cookies" }, { value: "Value2" }],
  [{ value: "Vanilla" }, { value: "Chocolate" }, { value: "Value1" }],
  [{ value: "Strawberry" }, { value: "Cookies" }, { value: "Value2" }],
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
                <div class="datasheet">
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