import React, { useEffect, useContext } from "react";
import "./styles.css";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/navbar";
import { LoadingComponent } from "./LoadingComponent";
import activityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

const App: React.FC = () => {
  const aStore = useContext(activityStore);

  useEffect(() => {
    aStore.loadActivities();
  }, [aStore]);

  if (aStore.loadingInitial)
    return (
      <LoadingComponent inverted={false} content="Loading Activities..." />
    );

  return (
    <div className="App">
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </div>
  );
};

export default observer(App);
