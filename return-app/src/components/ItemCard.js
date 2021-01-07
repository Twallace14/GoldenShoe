import React from 'react';
import { Panel, FlexboxGrid } from 'rsuite';

const ItemCard = ({ items }) => {
  return (
    <FlexboxGrid align='middle' justify='center'>
      <FlexboxGrid.Item colspan={16}>
        <img src={`${items.imageurl}`} height='150' alt='juup' />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <Panel header={items.itemname} style={{ height: 250 }}>
          <p>
            <small>Size: {items.size} </small>
          </p>
          <p>
            <small>Colour: {items.colour}</small>
          </p>
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default ItemCard;
