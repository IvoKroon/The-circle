import styled from 'react-emotion';

const MainColor = '#00A9AF';
const TextColor = '#050505';
const SecondaryTextColor = 'rgba(5, 5, 5, 0.1)';
const Grey = 'rgba(5, 5, 5, 0.4)';
const Shadow = 'box-shadow:0 3px 6px #d1cccc;';

const MainContainer = styled('div')`
  height: 100%;
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
`;

const CapitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

export {
  Grey,
  CapitalizeFirstLetter,
  MainContainer,
  MainColor,
  TextColor,
  SecondaryTextColor,
  Shadow,
};
