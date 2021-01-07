import React from 'react';
import { Button, Panel, FlexboxGrid } from 'rsuite';
import { connect } from 'react-redux';
import Pdf from 'react-to-pdf';

import Label from '../components/Label';

const LabelPrint = ({ returnNo, user }) => {
  const ref = React.createRef();

  return (
    <FlexboxGrid justify='center' align='bottom' style={{ height: 400 }}>
      <FlexboxGrid.Item colspan={18}>
        <div ref={ref}>
          <Label returnNo={returnNo} />
        </div>

        <Panel header={`Thank you ${user}`}>
          You can return items with Royal Mail at over 13,000 locations at Post
          Office® branches. download your return label by click the button below
          <br></br>
          <Pdf
            x={-80}
            y={110}
            targetRef={ref}
            filename={`${returnNo}-code-example.pdf`}
          >
            {({ toPdf }) => (
              <Button
                appearance='ghost'
                color='green'
                style={{ margin: 27 }}
                onClick={toPdf}
              >
                DOWNLOAD
              </Button>
            )}
          </Pdf>
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};
const mapStateToProps = (state) => ({
  returnNo: state.returnOrder.returnNo,
  user: state.returnOrder.name,
});

export default connect(mapStateToProps)(LabelPrint);
