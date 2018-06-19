import React from 'react';
import styled from 'react-emotion';
import Loader from '../general/Loader';
import {
  GetLatestNotifications,
  UpdateNotification,
  RemoveNotification,
} from '../firebaseRequests/NotificationRequests';
import RequestNotification from '../notification/RequestNotification';

const RequestNotificationHolder = styled.div`
  display: flex;
  justify-content: center;
`;

export default class NotificationLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      notifications: [],
    };
    this.updateNotification = this.updateNotification.bind(this);
  }
  componentDidMount() {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    GetLatestNotifications(userId).then((data) => {
      console.log(data);
      if (data) {
        this.setState({ loading: false, notifications: data });
      }
      this.setState({ loading: false });
    });
  }
  updateNotification(notificationId, state, key) {
    // UpdateNotification
    UpdateNotification(notificationId, state).then((data) => {
      RemoveNotification(notificationId).then(() => {
        console.log('REMOVE');
        // REMOVE FROM UI
        // for (let i = 0; i < this.state.notifications.length; i += 1) {
        //   this.state.notifications;
        // }
        // array.splice(index, 1);
        const noti = this.state.notifications;
        const newNotifications = noti.splice(key, 1);

        console.log(newNotifications);
        this.setState({ notifications: newNotifications });
      });
      console.log('UPDATED');
    });
  }
  render() {
    const components = [];
    if (!this.state.loading && this.state.notifications.length !== 0) {
      for (let i = 0; i < this.state.notifications.length; i += 1) {
        components.push(<RequestNotification
          key={i}
          user={this.state.notifications[i].user.firstname}
          item={this.state.notifications[i].product.title}
          acceptAction={() => this.updateNotification(this.state.notifications[i].key, 0, i)}
          declineAction={() => this.updateNotification(this.state.notifications[i].key, 2, i)}
        />);
      }
    }
    return this.state.loading ? (
      <Loader />
    ) : (
      <RequestNotificationHolder>{components}</RequestNotificationHolder>
    );
  }
}
