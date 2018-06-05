import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { Shadow, Grey } from '../general/GlobalCss';
import ArrowIcon from '../icons/ArrowIcon';
import BoxIcon from '../icons/BoxIcon';

const Holder = styled.div`
  display: flex;
  height: 70px;
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
const ActionArrow = styled.div`
  margin-right: 15px;
  margin-left: auto;
`;
const MessageHolder = styled.div`
  margin-left: 10px;
`;
const Name = styled.div`
  font-weight: bold;
`;

const Message = styled.div`
  color: ${Grey};
`;

const Notification = ({ item, name, type }) => {
  let text = '';
  if (type === 'Searching') {
    text = (
      <Message>
        is <strong>Searching</strong> for a <strong>{item}</strong>
      </Message>
    );
  } else if (type === 'Lent') {
    text = (
      <Message>
        just <strong>Lent</strong> a <strong>{item}</strong>
      </Message>
    );
  }

  return (
    <Holder>
      <Icon>
        <BoxIcon />
      </Icon>
      <MessageHolder>
        <Name>{name}</Name>
        {text}
      </MessageHolder>
      <ActionArrow>
        <ArrowIcon height="20" />
      </ActionArrow>
    </Holder>
  );
};

Notification.propTypes = {
  item: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Notification;
