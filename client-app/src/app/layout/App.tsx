import React, { useState, useEffect, SyntheticEvent } from "react";
import "./styles.css";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/navbar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import api from "../api/api";
import { LoadingComponent } from "./LoadingComponent";

interface IState {
  activities: IActivity[];
}
const App: React.FC = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handleSelectActivity = (id: String) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    api.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    api.Activities.update(activity)
      .then(() => {
        setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(event.currentTarget.name);
    setSubmitting(true);
    api.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter((a) => a.id !== id)]);
        if (selectedActivity && selectedActivity.id === id) {
          setSelectedActivity(null);
        }
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    api.Activities.list()
      .then((resp) => {
        let acts: IActivity[] = [];
        resp.forEach((a) => {
          a.date = a.date?.split(".")[0];
          acts.push(a);
        });
        setActivities(acts);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <LoadingComponent inverted={false} content="Loading Activities..." />
    );

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
          submitting={submitting}
          target={target}
        />
      </Container>
    </div>
  );
};

export default App;
