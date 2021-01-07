import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FetchOrderData, NewReturn } from '../Actions';
import { useHistory } from 'react-router-dom';

import {
  Button,
  HelpBlock,
  FormControl,
  ControlLabel,
  FormGroup,
  FlexboxGrid,
  Form,
  Panel,
  IconButton,
  Icon,
} from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

const Returns = ({ UserOrder, activeOrder, isLoading, startUp, message }) => {
  const [userOrderNumber, setuserOrderNumer] = useState('');

  useEffect(() => {
    startUp();
  }, []);

  const history = useHistory();

  console.log(userOrderNumber);

  const HandleSubmit = () => {
    UserOrder(userOrderNumber);
  };

  const handleNext = () => {
    history.push(`/myreturns/:${userOrderNumber}`);
  };

  return (
    <div>
      <FlexboxGrid justify='center' align='middle' style={{ height: 600 }}>
        <FlexboxGrid.Item colspan={18}>
          <Panel header={<h2>returns</h2>} bordered>
            <Form
              onChange={(formValue) => {
                const value = formValue.orderNumber;
                setuserOrderNumer(value);
              }}
              fluid
            >
              <FormGroup>
                <ControlLabel>Order number</ControlLabel>
                <FormControl name='orderNumber' />
                <HelpBlock tooltip>Required</HelpBlock>
              </FormGroup>

              {message && (
                <div>
                  <small>{message}</small>
                </div>
              )}
              <FlexboxGrid justify='space-around'>
                <Button
                  onClick={HandleSubmit}
                  style={{ margin: 7 }}
                  loading={isLoading ? true : false}
                  disabled={userOrderNumber.length < 10 ? true : false}
                >
                  Submit
                </Button>

                {activeOrder ? (
                  <IconButton
                    style={{ margin: 7 }}
                    onClick={handleNext}
                    icon={<Icon icon='arrow-right' />}
                  >
                    Next
                  </IconButton>
                ) : null}
              </FlexboxGrid>
            </Form>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  activeOrder: state.activeOrder.userOrder,
  isLoading: state.activeOrder.loading,
  message: state.activeOrder.message,
});

const mapDispatchToProps = (dispatch) => {
  return {
    UserOrder: (userOrderNum) => dispatch(FetchOrderData(userOrderNum)),
    startUp: () => dispatch(NewReturn()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Returns);
