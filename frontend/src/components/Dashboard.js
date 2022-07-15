import { Button } from "primereact/button";
import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <div>
            Dashboard
            <div style={{ marginTop: "100px" }}>
                {" "}
                <Button>
                    <Link to="/edit" style={{ color: "white" }}>
                        Create New Form
                    </Link>{" "}
                </Button>
            </div>
        </div>
    );
}

export default Dashboard;
