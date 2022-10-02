export const CONFIRM_DATE_STATE = 0;
export const CONFIRM_AMOUNT_STATE = 1;
export const CONFIRM_ITEM_STATE = 2;
export const CONFIRM_TAG_STATE = 3;
export const CONFIRM_EVENT_STATE = 4;
export const CONFIRM_TABLE_STATE = 5;

export const STATE_KEYS = {
  0: 'date',
  1: 'amount',
  2: 'item',
  3: 'tag',
  4: 'event',
};

export const MESSAGES = {
  0: "Which of these would you like to use for your 'Date' Column?",
  1: "Which of these would you like to use for your 'Amount' Column?",
  2: "Which of these would you like to use for your 'Item' Column?",
  3: "Would you like to use any of these for your 'Tag' Column?",
  4: "Would you like to use any of these for your 'Event' Column?",
  5: 'Please confirm the table below looks correct.',
};

export const DATA_STRUC = {
  date: '',
  item: '',
  amount: '',
  tag: '',
  event: '',
};
