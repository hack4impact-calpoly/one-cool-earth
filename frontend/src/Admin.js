import React from "react";
import "./css/Admin.css";

class Admin extends React.Component {
	render() {
		return(
			<body>
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
