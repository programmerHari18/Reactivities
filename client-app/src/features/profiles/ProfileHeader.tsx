import { useState } from "react";
import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from "semantic-ui-react";
import { Profile } from "../../app/models/Profile";
import { observer } from "mobx-react-lite";

interface Props{
    profile: Profile;
}
export default observer(function ProfileHeader({profile}: Props) {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleButtonClick = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size="small" src={profile.image || `/assets/user.png`} />
                            <Item.Content verticalAlign="middle">
                                <Header as='h1' content={profile.displayName} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={2}>
                        <Statistic label='Followers' value='5' />
                        <Statistic label='Following' value='342' />
                    </Statistic.Group>   
                    <Divider />
                    <Reveal animated="move">
                        <Reveal.Content visible style ={{width: '100%'}}>
                            <Button fluid color="teal" content='following'/>
                        </Reveal.Content>
                        <Reveal.Content hidden style ={{width: '100%'}}>
                        <Button
                                fluid
                                basic
                                color={isFollowing ? 'red' : 'green'}
                                content={isFollowing ? 'Unfollow' : 'Follow'}
                                onClick={handleButtonClick}
                            />
                        </Reveal.Content>
                    </Reveal>                 
                </Grid.Column>
            </Grid>
        </Segment>
    )
})