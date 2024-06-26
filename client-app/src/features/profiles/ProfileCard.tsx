import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../app/models/Profile"
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

interface Props{
    profile: Profile;
}
export default observer(function ProfileCard({profile} : Props) {
    function truncatedText(sample: string | undefined){
        if (sample) {
            return sample.length > 40 ? sample.substring(0, 37) + '...' : sample;
}
    }
    return (
        <Card as={Link} to={`/profiles/${profile.username}`}>
            <Image src = {profile.image || `/assets/user.png`}/>
            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Description>{truncatedText(profile.bio)}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name="user" /> 
                20 followers
            </Card.Content>
        </Card>
    )
})