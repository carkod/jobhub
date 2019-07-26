import React, { Fragment } from 'react';
import { Icon } from 'semantic-ui-react';

export default function IconText({text, iconName}) {
  return <Fragment >
    <Icon fitted name={iconName} /> {text}
  </Fragment>
}