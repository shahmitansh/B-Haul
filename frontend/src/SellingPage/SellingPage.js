import React, {Component} from 'react';
import {Form} from 'react-forms-processor';
import {renderer, FormButton} from 'react-forms-processor-atlaskit';
import './SellingPage.css';

import HeaderSell from '../Header/HeaderSell.js';

// const fields = [
//     {
//         id: "NAME",
//         name: "name",
//         type: "text",
//         label: "Name",
//         defaultValue: "0"
//     }
// ];

const fields = 
[
    {
      "id": "TYPE",
      "name": "type",
      "type": "select",
      "label": "Type of Furniture",
      "description": "",
      "placeholder": "Chair",
      "defaultValue": "",
      "options": [
        {
          "heading": "Furniture",
          "items": [
            {
              "label": "Chair",
              "value": "Chair"
            },
            {
              "label": "Desk",
              "value": "Desk"
            },
            {
              "label": "Table",
              "value": "Table"
            },
            {
              "label": "Bed",
              "value": "Bed"
            },
            {
              "label": "Other",
              "value": "Other"
            }
          ]
        }
      ],
      "visible": true,
      "required": true,
      "disabled": false,
      "visibleWhen": [],
      "requiredWhen": [],
      "disabledWhen": [],
      "shouldMatchRegex": false,
      "hasMinLength": false,
      "hasMaxLength": false,
      "hasNumericalRange": false,
      "shouldCompareTo": false,
      "omitWhenHidden": false,
      "valueDelimiter": "",
      "useChangesAsValues": false
    },
    {
      "id": "SIZE",
      "name": "Size ",
      "type": "textarea",
      "label": "Size",
      "description": "",
      "placeholder": "Enter Size Here",
      "defaultValue": "",
      "visible": false,
      "required": false,
      "disabled": false,
      "visibleWhen": [
        {
          "id": "Puts in color",
          "field": "TYPE",
          "is": [
            {
              "value": "Chair"
            },
            {
              "value": "Desk"
            },
            {
              "value": "Table"
            }
          ]
        }
      ],
      "requiredWhen": [],
      "disabledWhen": [],
      "shouldMatchRegex": false,
      "hasMinLength": false,
      "hasMaxLength": false,
      "hasNumericalRange": false,
      "shouldCompareTo": false
    },
    {
      "id": "COLOR",
      "name": " Color",
      "type": "text",
      "label": "Color",
      "description": "",
      "placeholder": "Brown",
      "defaultValue": "",
      "options": [],
      "visible": false,
      "required": false,
      "disabled": false,
      "visibleWhen": [
        {
          "id": "Puts in color",
          "field": "TYPE",
          "is": [
            {
              "value": "Desk"
            },
            {
              "value": "Table"
            },
            {
              "value": "Chair"
            },
            {
              "value": "Bed"
            }
          ]
        }
      ],
      "requiredWhen": [],
      "disabledWhen": [],
      "shouldMatchRegex": false,
      "hasMinLength": false,
      "hasMaxLength": false,
      "hasNumericalRange": false,
      "shouldCompareTo": false
    },
    {
      "id": "PRICE",
      "name": "Price",
      "type": "text",
      "label": "Price",
      "description": "",
      "placeholder": "Price",
      "defaultValue": "",
      "visible": false,
      "required": false,
      "disabled": false,
      "visibleWhen": [
        {
          "id": "Puts in price",
          "field": "TYPE",
          "is": [
            {
              "value": "Desk"
            },
            {
              "value": "Chair"
            },
            {
              "value": "Table"
            },
            {
              "value": "Bed"
            }
          ]
        }
      ],
      "requiredWhen": [],
      "disabledWhen": []
    },
    {
      "id": "ELEVATOR",
      "name": " Elevator",
      "type": "select",
      "label": "Elevator",
      "description": "",
      "placeholder": "Elevator",
      "defaultValue": "",
      "options": [
        {
          "heading": "",
          "items": [
            {
              "label": "Yes",
              "value": "Yes"
            },
            {
              "label": "No",
              "value": "No"
            }
          ]
        }
      ],
      "visible": false,
      "required": false,
      "disabled": false,
      "visibleWhen": [
        {
          "id": "Puts in elevator",
          "field": "TYPE",
          "is": [
            {
              "value": "Desk"
            },
            {
              "value": "Chair"
            },
            {
              "value": "Table"
            },
            {
              "value": "Bed"
            }
          ]
        }
      ],
      "requiredWhen": [],
      "disabledWhen": []
    },
    {
      "id": "BEDSIZE",
      "name": " Size",
      "type": "select",
      "label": "Size",
      "description": "",
      "placeholder": "Size",
      "defaultValue": "",
      "options": [
        {
          "heading": "Size",
          "items": [
            {
              "label": "California King",
              "value": "California King"
            },
            {
              "label": "King",
              "value": "King"
            },
            {
              "label": "Queen",
              "value": "Queen"
            },
            {
              "label": "Full",
              "value": "Full"
            },
            {
              "label": "Twin",
              "value": "Twin"
            }
          ]
        }
      ],
      "visible": false,
      "required": false,
      "disabled": false,
      "visibleWhen": [
        {
          "id": "Puts in bed size",
          "field": "TYPE",
          "is": [
            {
              "value": "Bed"
            }
          ]
        }
      ],
      "requiredWhen": [],
      "disabledWhen": []
    }
  ];

export default class SellingPage extends Component {
    render() {
        return (
            <div>
                <HeaderSell />
                <Form renderer={renderer} defaultFields={fields}>
                    <FormButton />
                </Form>
            </div>
        );
    }
}