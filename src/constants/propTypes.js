import PropTypes from 'prop-types';

export const team = PropTypes.shape({
  id: PropTypes.number.isRequired,
  org: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
});

export default {
  team,
};
