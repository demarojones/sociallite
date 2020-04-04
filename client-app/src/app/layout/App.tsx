import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { List, Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/navbar";

interface IState {
  activities: IActivity[];
}
const App: React.FC = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/activities").then((resp) => {
      console.log(resp.data);
      setActivities(resp.data);
    });
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <List>
          {activities.map((activity: IActivity) => {
            return <List.Item key={activity.id}>{activity.title}</List.Item>;
          })}
        </List>
      </Container>
    </div>
  );
};

export default App;
