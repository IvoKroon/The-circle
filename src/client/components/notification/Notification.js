import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { Shadow, Grey } from '../general/GlobalCss';
import ArrowIcon from '../icons/ArrowIcon';
import BoxIcon from '../icons/BoxIcon';

const Holder = styled.div`
  display: flex;
  height: 70px;
  width: 80%;
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
  color: black;
  font-weight: bold;
`;
const Strong = styled.strong`
  color: black;
`;

const Message = styled.div`
  color: ${Grey};
`;

const Notification = ({
  item, name, type, price,
}) => {
  let text = '';
  if (type === 2) {
    text = (
      <Message>
        is <Strong>Searching</Strong> for a <Strong>{item}</Strong>
      </Message>
    );
  } else if (type === 'Lent') {
    text = (
      <Message>
        just <Strong>Lent</Strong> a <Strong>{item}</Strong>
      </Message>
    );
  } else if (type === 1) {
    text = (
      <Message>
        asks to buy together a <Strong>{item}</Strong> coast <Strong>€{price}</Strong>
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
  type: PropTypes.number.isRequired,
  price: PropTypes.number,
};

Notification.defaultProps = {
  price: 0,
};

export default Notification;
