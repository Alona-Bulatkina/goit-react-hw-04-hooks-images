import PropTypes from 'prop-types';

const Message = ({ children }) => (
  <div>{children}</div>
);

Message.propTypes = {
  children: PropTypes.node,
};

export default Message;