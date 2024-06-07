import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

export default observer(function ActivityDetails(){
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity,loadingInitial} = activityStore;
    const {id} = useParams();

    useEffect(() => {
        if(id) loadActivity(id);
    },[id,loadActivity])

    if (!activity || loadingInitial) return <LoadingComponent content={"Loading..."} />

    if(!activity) return;
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>{activity.date}</Card.Meta>
                <Card.Description>{activity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button as={Link} to={`/manage/${activity.id}`} basic color="blue" content='Edit' />
                    <Button as={Link} to='/activities' basic color="grey" content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})