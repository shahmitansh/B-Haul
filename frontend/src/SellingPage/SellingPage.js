import React, {Component} from 'react';
import {Form, FormValue} from 'react-forms-processor';
import {renderer, FormButton} from 'react-forms-processor-atlaskit';
import './SellingPage.css';

import HeaderSell from '../Header/HeaderSell.js';

const fields = 
[
  {
    "id": "GLOBAL_TYPE",
    "name": "Global Type",
    "type": "select",
    "label": "Type",
    "description": "",
    "placeholder": "Type",
    "defaultValue": "",
    "options": [
      {
        "heading": "Type",
        "items": [
          {
            "label": "Seating",
            "value": "Seating"
          },
          {
            "label": "Beds",
            "value": "Beds"
          },
          {
            "label": "Tables",
            "value": "Tables"
          },
          {
            "label": "Storage",
            "value": "Storage"
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
    "id": "BEDS_SIZE",
    "name": " Bed Size",
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
            "label": "Twin",
            "value": "Twin"
          },
          {
            "label": "TwinXL",
            "value": "TwinXL"
          },
          {
            "label": "Full",
            "value": "Full"
          },
          {
            "label": "Queen",
            "value": "Queen"
          },
          {
            "label": "King",
            "value": "King"
          },
          {
            "label": "California King",
            "value": "California King"
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
        "field": "GLOBAL_TYPE",
        "is": [
          {
            "value": "Beds"
          }
        ]
      }
    ],
    "requiredWhen": [],
    "disabledWhen": [],
    "omitWhenHidden": false,
    "valueDelimiter": "",
    "useChangesAsValues": false,
    "shouldMatchRegex": false,
    "hasMinLength": false,
    "hasMaxLength": false,
    "hasNumericalRange": false,
    "shouldCompareTo": false
  },
  {
    "id": "MATTRESS",
    "name": "Mattress",
    "type": "select",
    "label": "Mattress included?",
    "description": "",
    "placeholder": "Mattress",
    "defaultValue": "",
    "options": [
      {
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
        "id": "Puts in mattress",
        "field": "GLOBAL_TYPE",
        "is": [
          {
            "value": "Beds"
          }
        ]
      }
    ],
    "requiredWhen": [],
    "disabledWhen": []
  },
  {
    "id": "SEATING",
    "name": " Seating Type",
    "type": "select",
    "label": "Seating Type",
    "description": "",
    "placeholder": "Type",
    "defaultValue": "",
    "options": [
      {
        "heading": "Seating Type",
        "items": [
          {
            "label": "Chair",
            "value": "Chair"
          },
          {
            "label": "Stool",
            "value": "Stool"
          },
          {
            "label": "Couch",
            "value": "Couch"
          },
          {
            "label": "Bench",
            "value": "Bench"
          },
          {
            "label": "Other",
            "value": "Other"
          }
        ]
      }
    ],
    "visible": false,
    "required": true,
    "disabled": false,
    "visibleWhen": [
      {
        "id": "Puts in seating type ",
        "field": "GLOBAL_TYPE",
        "is": [
          {
            "value": "Seating"
          }
        ]
      }
    ],
    "requiredWhen": [],
    "disabledWhen": []
  },
  {
    "id": "TABLES_TYPE",
    "name": " Table Type",
    "type": "select",
    "label": "Table Type",
    "description": "",
    "placeholder": "Type",
    "defaultValue": "",
    "options": [
      {
        "heading": "Table Type",
        "items": [
          {
            "label": "Desk",
            "value": "Desk"
          },
          {
            "label": "Coffee Table",
            "value": "Coffee Table"
          },
          {
            "label": "Dining Table",
            "value": "Dining Table"
          },
          {
            "label": "Folding Table",
            "value": "Folding Table"
          },
          {
            "label": "TV Table",
            "value": "TV Table"
          },
          {
            "label": "Nightstand",
            "value": "Nightstand"
          },
          {
            "label": "Other",
            "value": "Other"
          }
        ]
      }
    ],
    "visible": false,
    "required": true,
    "disabled": false,
    "visibleWhen": [
      {
        "id": "Puts in table type",
        "field": "GLOBAL_TYPE",
        "is": [
          {
            "value": "Tables"
          }
        ]
      }
    ],
    "requiredWhen": [],
    "disabledWhen": []
  },
  {
    "id": "STORAGE_TYPE",
    "name": "Storage Type",
    "type": "select",
    "label": "Storage Type",
    "description": "",
    "placeholder": "Type",
    "defaultValue": "",
    "options": [
      {
        "heading": "Storage Type",
        "items": [
          {
            "label": "Bookshelf",
            "value": "Bookshelf"
          },
          {
            "label": "Cabinet/Cupboard",
            "value": "Cabinet/Cupboard"
          },
          {
            "label": "Dresser/Drawer",
            "value": "Dresser/Drawer"
          },
          {
            "label": "Wardrobe",
            "value": "Wardrobe"
          },
          {
            "label": "Other",
            "value": "Other"
          }
        ]
      }
    ],
    "visible": false,
    "required": true,
    "disabled": false,
    "visibleWhen": [
      {
        "id": "Puts in storage type",
        "field": "GLOBAL_TYPE",
        "is": [
          {
            "value": "Storage"
          }
        ]
      }
    ],
    "requiredWhen": [],
    "disabledWhen": []
  },
  {
    "id": "PRICE",
    "name": "Price",
    "type": "text",
    "label": "Price",
    "description": "",
    "placeholder": "$",
    "defaultValue": "",
    "options": [],
    "visible": false,
    "required": true,
    "disabled": false,
    "visibleWhen": [
      {
        "id": "Puts in price",
        "field": "GLOBAL_TYPE",
        "is": [
          {
            "value": "Seating"
          },
          {
            "value": "Beds"
          },
          {
            "value": "Tables"
          },
          {
            "value": "Storage"
          }
        ]
      }
    ],
    "requiredWhen": [],
    "disabledWhen": []
  },
  {
    "id": "COLOR",
    "name": "Color",
    "type": "select",
    "label": "Color",
    "description": "",
    "placeholder": "Color",
    "defaultValue": "",
    "options": [
      {
        "heading": "Color",
        "items": [
          {
            "label": "Black",
            "value": "Black"
          },
          {
            "label": "White",
            "value": "White"
          },
          {
            "label": "Brown",
            "value": "Brown"
          },
          {
            "label": "Yellow",
            "value": "Yellow"
          },
          {
            "label": "Red",
            "value": "Red"
          },
          {
            "label": "Green",
            "value": "Green"
          },
          {
            "label": "Blue",
            "value": "Blue"
          },
          {
            "label": "Orange",
            "value": "Orange"
          },
          {
            "label": "Grey",
            "value": "Grey"
          },
          {
            "label": "Purple",
            "value": "Purple"
          },
          {
            "label": "Silver",
            "value": "Silver"
          },
          {
            "label": "Other",
            "value": "Other"
          }
        ]
      }
    ],
    "visible": false,
    "required": true,
    "disabled": false,
    "visibleWhen": [
      {
        "id": "Puts in color",
        "field": "GLOBAL_TYPE",
        "is": [
          {
            "value": "Seating"
          },
          {
            "value": "Beds"
          },
          {
            "value": "Tables"
          },
          {
            "value": "Storage"
          }
        ]
      }
    ],
    "requiredWhen": [],
    "disabledWhen": []
  },
  {
    "id": "LENGTH",
    "name": "Length",
    "type": "text",
    "label": "Length",
    "description": "",
    "placeholder": "#",
    "defaultValue": "",
    "options": [],
    "visible": false,
    "required": true,
    "disabled": false,
    "visibleWhen": [
      {
        "id": "Puts in length",
        "field": "GLOBAL_TYPE",
        "is": [
          {
            "value": "Tables"
          },
          {
            "value": "Storage"
          }
        ]
      }
    ],
    "requiredWhen": [],
    "disabledWhen": []
  },
  {
    "id": "WIDTH",
    "name": "Width",
    "type": "text",
    "label": "Width",
    "description": "",
    "placeholder": "#",
    "defaultValue": "",
    "options": [],
    "visible": false,
    "required": true,
    "disabled": false,
    "visibleWhen": [
      {
        "id": "Puts in width",
        "field": "GLOBAL_TYPE",
        "is": [
          {
            "value": "Tables"
          },
          {
            "value": "Storage"
          }
        ]
      }
    ],
    "requiredWhen": [],
    "disabledWhen": []
  },
  {
    "id": "HEIGHT",
    "name": "Height",
    "type": "text",
    "label": "Height",
    "description": "",
    "placeholder": "#",
    "defaultValue": "",
    "options": [],
    "visible": false,
    "required": true,
    "disabled": false,
    "visibleWhen": [
      {
        "id": "Puts in height",
        "field": "GLOBAL_TYPE",
        "is": [
          {
            "value": "Tables"
          },
          {
            "value": "Storage"
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