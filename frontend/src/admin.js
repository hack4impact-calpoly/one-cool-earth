import React from "react";
import "./css/Admin.css";

class Admin extends React.Component {
	render() {
		return(
			<body>
				<div id="header">
					<div id="home">
						<button>RETURN HOME</button>
					</div>
					<div id="logout">
						<button>LOGOUT</button>
					</div>
				</div>
				<div id="main">
					<div id="createEventBox">
						<button>CREATE EVENT</button>
					</div>
					<div id="viewVolunteerDataBox">
						<button>VIEW VOLUNTEER DATA</button>
					</div>
				</div>
			</body>
		);
	}
}

export default Admin;
