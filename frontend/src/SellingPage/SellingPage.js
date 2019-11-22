import React, {Component} from 'react';
import {Form, FormValue} from 'react-forms-processor';
import {renderer, FormButton} from 'react-forms-processor-atlaskit';
import './SellingPage.css';

import HeaderSell from '../Header/HeaderSell.js';

// TODO: Add bundle options in fields

const fields = 
[
    {
      "id": "TYPE",
      "name": "Type",
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
        "id": "OTHERNAME",
        "name": "Other Name",
        "type": "text",
        "label": "Type",
        "description": "",
        "placeholder": "Type",
        "defaultValue": "",
        "visible": false,
        "required": true,
        "disabled": false,
        "visibleWhen": [
          {
            "id": "Add other types",
            "field": "TYPE",
            "is": [
              {
                "value": "Other"
              }
            ]
          }
        ],
        "requiredWhen": [],
        "disabledWhen": []
    },
    {   
      "id": "BEDSIZE",
      "name": "Bed Size",
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
      "required": true,
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
    },
    {
      "id": "SIZE",
      "name": "Size",
      "type": "text",
      "label": "Size (width/height/depth)",
      "description": "",
      "placeholder": "Size",
      "visible": false,
      "required": true,
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
            },
            {
              "value": "Other"
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
      "name": "Color",
      "type": "text",
      "label": "Color",
      "description": "",
      "placeholder": "Color",
      "defaultValue": "",
      "options": [],
      "visible": false,
      "required": true,
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
            },
            {
              "value": "Other"
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
      "label": "Price ($)",
      "description": "",
      "placeholder": "Price",
      "defaultValue": "",
      "visible": false,
      "required": true,
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
            },
            {
              "value": "Other"
            }
          ]
        }
      ],
      "requiredWhen": [],
      "disabledWhen": []
    },
    {
      "id": "ELEVATOR",
      "name": "Elevator",
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
      "required": true,
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
            },
            {
              "value": "Other"
            }
          ]
        }
      ],
      "requiredWhen": [],
      "disabledWhen": []
    },
    {
      "id": "OWNED",
      "name": "Time Owned",
      "type": "text",
      "label": "Years owned (months)?",
      "description": "",
      "placeholder": "#",
      "defaultValue": "",
      "visible": false,
      "required": true,
      "disabled": false,
      "visibleWhen": [
        {
          "id": "Puts in years owned field",
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
            },
            {
              "value": "Other"
            }
          ]
        }
      ],
      "requiredWhen": [],
      "disabledWhen": []
    },
    {
      "id": "DESCRIPTION",
      "name": "Description",
      "type": "textarea",
      "label": "Any other details?",
      "description": "",
      "placeholder": "",
      "defaultValue": "",
      "visible": false,
      "required": false,
      "disabled": false,
      "visibleWhen": [
        {
          "id": "Puts in description",
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
            },
            {
              "value": "Other"
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
                <div className="Landing-Prompt"> What are you selling? </div>
                <div className="columns">
                    <Form renderer={renderer} defaultFields={fields}>
                        <FormButton 
                            onClick={(value: FormValue) => 
                                console.log("Button value", value)
                                // Returns an object and this is a sample
                                // Bed Size: ""
                                // Color: "Black"
                                // Description: "One year old."
                                // Elevator: "Yes"
                                // Other Name: ""
                                // Price: "20"
                                // Size: "8/12/24"
                                // Type: "Desk"
                                // Years Owned: 2
                            }
                        />
                    </Form>
                </div>
            </div>
        );
    }
}