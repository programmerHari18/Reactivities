import { Button, Grid, Header, Tab } from "semantic-ui-react";

import { useState } from "react";
import ProfileEditForm from "./ProfileEditForm";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";


export default observer(function ProfileAbout() {
    const {profileStore} = useStore();
    const {isCurrentUser,profile} = profileStore;
    const [editMode, setEditMode] = useState(false);
    return (
       <Tab.Pane>
            <Grid>
            <Grid.Column width={16}>
                    <Header floated='left' icon='user' content={`About ${profile?.displayName}`} />  
                    {isCurrentUser && (
                    <Button floated="right" 
                      onClick={() => setEditMode(!editMode)}
                      basic content={editMode ? 'Cancel' : 'Edit Profile'} /> )
                    }  
                    
            </Grid.Column>
            <Grid.Column width={16}>
                {editMode ?(
                   <ProfileEditForm setEditMode={setEditMode} />
                ): (
                    <span style={{whiteSpace: 'pre-wrap'}}>{profile?.bio}</span>
                )}
            </Grid.Column>
            </Grid>
       </Tab.Pane>
    )
})