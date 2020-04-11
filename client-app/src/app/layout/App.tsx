import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/navbar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import api from "../api/api";

interface IState {
  activities: IActivity[];
}
const App: React.FC = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );

  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: String) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    api.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  };

  const handleEditActivity = (activity: IActivity) => {
    api.Activities.update(activity).then(() => {
      setActivities([
        ...activities.filter((a) => a.id !== activity.id),
        activity,
      ]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  };

  const handleDeleteActivity = (id: string) => {
    api.Activities.delete(id).then(() => {
      setActivities([...activities.filter((a) => a.id !== id)]);
      if (selectedActivity && selectedActivity.id === id) {
        setSelectedActivity(null);
      }
    });
  };

  useEffect(() => {
    api.Activities.list().then((resp) => {
      let acts: IActivity[] = [];
      resp.forEach((a) => {
        a.date = a.date?.split(".")[0];
        acts.push(a);
      });
      setActivities(acts);
    });
  }, []);

  return (
    <div className="App">
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </div>
  );
};

export default App;
