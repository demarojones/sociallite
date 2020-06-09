import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import api from "../api/api";

configure({ enforceActions: "always" });
class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable selectedActivity: IActivity | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action
  loadActivities = async () => {
    this.loadingInitial = true;
    try {
      console.log("Loading activities");
      const activities = await api.Activities.list();
      runInAction(() => {
        console.log(activities);
        activities.forEach((a) => {
          a.date = a.date?.split(".")[0];
          this.activityRegistry.set(a.id, a);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }
  };

  @action
  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  };

  @action
  setSelectedActivity = (activity: IActivity | undefined) => {
    this.selectedActivity = activity;
  };

  @action
  createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      console.log("Adding Activity: ", activity);
      let created = await api.Activities.create(activity);
      runInAction("Activity Created", () => {
        console.log("Created: ", created);
        this.activityRegistry.set(activity.id, activity);
        console.log(activity);
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("Create Activity Error", () => {
        console.log(error);
        this.submitting = false;
      });
    }
  };

  @action
  openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };

  @action
  editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await api.Activities.update(activity);
      runInAction("Edit Activity: ", () => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (err) {
      console.log(err);
    }
  };

  @action
  deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.target = event.currentTarget.name;
    this.submitting = true;
    try {
      await api.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        if (this.selectedActivity && this.selectedActivity.id === id) {
          this.selectedActivity = undefined;
          this.submitting = false;
        }
      });
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  @action
  setEditMode = (mode: boolean) => {
    this.editMode = mode;
  };
}

export default createContext(new ActivityStore());
