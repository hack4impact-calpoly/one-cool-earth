import React from "react"
import "./css/welcome.css"

class Welcome extends React.Component {
    render(){
    return(
    <body>
        <header>
            <div class='returnHome'>
                <img src="./logo.svg" height="50" alt="Logo"/>
                <button>RETURN HOME</button>
            </div>

            <h1>Welcome, [VOLUNTEER]</h1>
            <div class='logout'>
                <button>LOG OUT</button>
            </div>
        </header>

        <div class='banner'>
            <p1>[BANNER]</p1>
            <br/>
        </div>

        <main>
            <div class='planning'>
                <div class='engagements'>
                    <p1>Current Engagements</p1>
                    <br/>
                    <button>EDIT</button>
                </div>

                <div class='calendar'>
                    <button>Calendar</button>
                </div>
            </div>

            <div class='news'>
                <p1>Organization News / Highlighted Event</p1>
                <br/>
                <img src="./logo.svg" height="200" alt="Highlight"/>
            </div>
        </main>
        
    </body>
    );}
}

export default Welcome;