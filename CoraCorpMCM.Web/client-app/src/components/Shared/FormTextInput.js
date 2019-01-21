import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

const FormTextInput = ({ validationText, label, id, ...rest }) => {
  const { required } = rest;
  id = id || uuidv4();
  return (
    <div>
      <div>
        <label htmlFor={id}>
          {label}
          {required && '*'}
        </label>
      </div>
      <input {...rest} id={id} />
      {validationText}
    </div>
  );
};

FormTextInput.propTypes = {
  validationText: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default FormTextInput;
