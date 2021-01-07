import React from 'react';
import Barcode from 'react-barcode';
import { Panel, FlexboxGrid } from 'rsuite';

const Label = ({ returnNo }) => {
  return (
    <div>
      <FlexboxGrid justify='center'>
        <FlexboxGrid.Item colspan={24}>
          <Panel>
            <h5>Company name </h5>
            <h5>Company unit </h5>
            <h5>Company address </h5>
            <h5>Company region </h5>
            <h5>Company address </h5>
          </Panel>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <Barcode value={returnNo} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
};

export default Label;
