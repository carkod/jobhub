import React, {useRef} from 'react';
import { Icon } from 'semantic-ui-react';

export default function Upload(props) {

  const refFile = useRef(null);

  return (
    <>
    { props.active && <button
      className="btn btn-upload" 
      name="append" onClick={props.handleUpload} >
      {props.loading ? <Icon loading name="file archive outline" className="white" /> : <Icon name="upload" className="white" /> }
    </button>
    }
    <input name="files" type="file" id="input" onChange={props.handleChange} ref={props.forwardedRef}/>
    </>
  )
}