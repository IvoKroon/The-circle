import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { MainColor, White, Shadow } from '../general/GlobalCss';
import Button from '../form/Button';
import BoxIcon from '../icons/BoxIcon';

const Holder = styled.div`
  display: flex;
  height: auto;
  width: 50%;
  align-items: center;
  ${Shadow};
  margin-bottom: 10px;
`;
const Icon = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  height: 25px;
`;
const MessageHolder = styled.div`
  margin-left: 10px;
  margin-top: 10px;
`;

const Message = styled.div``;

const ButtonHolder = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display:flex;
`;

// const AcceptButton = styled.div`
//   background
// `;

const RequestNotification = ({ user, item }) => (
  //   let text = '';
  //   if (type === 'Searching') {
  //     text = (
  //       <Message>
  //         is <strong>Searching</strong> for a <strong>{item}</strong>
  //       </Message>
  //     );
  //   } else if (type === 'Lent') {
  //     text = (
  //       <Message>
  //         just <strong>Lent</strong> a <strong>{item}</strong>
  //       </Message>
  //     );
  //   }

  <Holder>
    <Icon>
      <BoxIcon />
    </Icon>
    <MessageHolder>
      <Message>
        <b>{user}</b> would like to <b>lent a {item}</b>
      </Message>
      <ButtonHolder>
        <Button textColor={White} backgroundColor={MainColor}>
          Accept
        </Button>
        <Button>Decline</Button>
      </ButtonHolder>
    </MessageHolder>
  </Holder>
);
RequestNotification.propTypes = {
  item: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default RequestNotification;
