import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./CommonStore";
import UserStore from "./userStore";
import modalStore from "./modalStore";
import ProfileStore from "./profileStore";
import CommentStore from "./CommentStore";

interface Store{
    activityStore: ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: modalStore;
    profileStore: ProfileStore;
    commentStore: CommentStore;
}

export const store : Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore : new UserStore(),
    modalStore: new modalStore(),
    profileStore : new ProfileStore(),
    commentStore : new CommentStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}