import React, { useState } from 'react';
import ItemCard from '../components/ItemCard';
import { connect } from 'react-redux';
import { PostReturnData } from '../Actions';
import { reasons } from '../components/reasons';

import {
  HelpBlock,
  Form,
  FormControl,
  FormGroup,
  IconButton,
  Icon,
  FlexboxGrid,
  InputPicker,
  Schema,
  Button,
} from 'rsuite';
import { useHistory, useParams } from 'react-router';

const ItemSelect = ({
  activeOrder,
  orderNumber,
  postReturn,
  postReasons,
  returnData,
  message,
}) => {
  const { StringType } = Schema.Types;
  const model = Schema.Model({
    name: StringType().isRequired('This field is required.'),
    email: StringType()
      .isEmail('Please enter a valid email address.')
      .isRequired('This field is required.'),
  });

  const { order } = useParams();

  const [returnOrder, setReturnOrder] = useState();
  const [returnitems, setReturnitems] = useState([]);
  const [formError, setFormError] = useState();

  const show = activeOrder;

  const returnInfo = {};

  returnInfo.name = returnOrder ? returnOrder.name : null;
  returnInfo.items = returnitems;
  returnInfo.contact = returnOrder ? returnOrder.email : null;

  const history = useHistory();

  const handleConfirm = () => {
    postReturn(returnInfo);
  };

  const handleNext = () => {
    history.push('/printlabel');
  };

  return (
    <div>
      <FlexboxGrid justify='center'>
        <FlexboxGrid.Item colspan={18}>
          <h1>Returns</h1>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={18}>
          <h4>Order Number: {returnData}</h4>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={20}>
          <Form
            onCheck={(formError) => {
              setFormError(formError);
            }}
            model={model}
            fluid
            onChange={(formValue) => {
              setReturnOrder(formValue);
            }}
          >
            <FormGroup name='items'>
              {show &&
                show.map((items, index) => {
                  return (
                    <div key={items.itemid}>
                      <FlexboxGrid justify='center' align='top'>
                        <FlexboxGrid.Item colspan={23}>
                          <ItemCard items={items} />
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={17}>
                          <InputPicker
                            block
                            style={{ margin: 24 }}
                            cleanable={false}
                            data={reasons}
                            onChange={(value) => {
                              let newArr = [...returnitems];
                              newArr[index] = {
                                reason: value,
                                item: items.itemid,
                                itemName: items.itemname,
                                colour: items.colour,
                                size: items.size,
                              };
                              setReturnitems(newArr);
                            }}
                          />
                        </FlexboxGrid.Item>
                      </FlexboxGrid>
                    </div>
                  );
                })}
            </FormGroup>

            <FormGroup name='info'>
              <FormControl
                name='email'
                placeholder='Email'
                plaintextDefaultValue='insert name'
              />
              <HelpBlock tooltip>
                This is how we will contact you if needed
              </HelpBlock>
            </FormGroup>

            <FormGroup>
              <FormControl name='name' placeholder='Name' />
              <HelpBlock tooltip>This field is required</HelpBlock>
            </FormGroup>
            {message && (
              <div>
                <small>{message}</small>
              </div>
            )}

            <FormGroup>
              <FlexboxGrid justify='space-around'>
                <Button
                  onClick={handleConfirm}
                  style={{ margin: 7 }}
                  disabled={
                    !returnInfo.name ||
                    !returnInfo.contact ||
                    !returnInfo.items.length ||
                    formError.email
                  }
                >
                  Submit
                </Button>

                {returnData ? (
                  <IconButton
                    style={{ margin: 7 }}
                    onClick={handleNext}
                    icon={<Icon icon='arrow-right' />}
                  >
                    Next
                  </IconButton>
                ) : null}
              </FlexboxGrid>
            </FormGroup>
          </Form>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  activeOrder: state.activeOrder.basket,
  returnData: state.returnOrder.returnNo,
  message: state.returnOrder.message,
});

const mapDispatchToProps = (dispatch) => {
  return {
    postReturn: (returnInfo) => dispatch(PostReturnData(returnInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemSelect);
