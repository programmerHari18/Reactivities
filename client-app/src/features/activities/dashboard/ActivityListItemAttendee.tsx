import { observer } from "mobx-react-lite"
import { Image, List, Popup, PopupContent } from "semantic-ui-react"
import { Profile } from "../../../app/models/Profile";
import ProfileCard from "../../profiles/ProfileCard";

interface Props{
    attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({attendees} : Props){
    return(
        <List horizontal>
            {attendees.map(attendee => (
                <Popup
                    hoverable
                    key={attendee.username}
                    trigger={
                        <List.Item>
                            <Image size="mini" circular src={attendee.image || "/assets/user.png" }/>
                        </List.Item>
                    }
                >
                    <PopupContent>
                        <ProfileCard profile={attendee}/>
                    </PopupContent>
                </Popup>
                
            ))}
            
        </List>
    )
})