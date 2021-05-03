import React from "react";
import "./css/Header.css";

class Header extends React.Component {
	render() {
		return(
				<div id="header">
					<div id="home">
						<button>RETURN HOME</button>
					</div>
					<div id="logout">
						<button>LOGOUT</button>
					</div>
				</div>
		);
	}
}

export default Header;