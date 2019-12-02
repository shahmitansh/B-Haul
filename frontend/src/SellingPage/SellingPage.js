import React, {Component} from 'react';
import {Form, FormValue} from 'react-forms-processor';
import {renderer, FormButton} from 'react-forms-processor-atlaskit';
import axios from 'axios';
import './SellingPage.css';

import HeaderSell from '../Header/HeaderSell.js';

const fields = 
[
  {
    "id": "GLOBAL_TYPE",
    "name": "GlobalType",
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
            "label": "Bed",
            "value": "Bed"
          },
          {
            "label": "Table",
            "value": "Table"
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
    "id": "TITLE",
    "name": "Title",
    "type": "text",
    "label": "Title",
    "description": "",
    "placeholder": "Title",
    "defaultValue": "",
    "options": [],
    "visible": false,
    "required": true,
    "disabled": false,
    "visibleWhen": [
      {
        "id": "Puts in title",
        "field": "GLOBAL_TYPE",
        "is": [
          {
            "value": "Seating"
          },
          {
            "value": "Bed"
          },
          {
            "value": "Table"
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
    "id": "DESCRIPTION",
    "name": "Description",
    "type": "text",
    "label": "Description",
    "description": "",
    "placeholder": "Description",
    "defaultValue": "",
    "options": [],
    "visible": false,
    "required": true,
    "disabled": false,
    "visibleWhen": [
      {
        "id": "Puts in description",
        "field": "GLOBAL_TYPE",
        "is": [
          {
            "value": "Seating"
          },
          {
            "value": "Bed"
          },
          {
            "value": "Table"
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
    "id": "BEDS_SIZE",
    "name": "BedSize",
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
            "value": "Bed"
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
            "value": "Bed"
          }
        ]
      }
    ],
    "requiredWhen": [],
    "disabledWhen": []
  },
  {
    "id": "SEATING",
    "name": "SeatingType",
    "type": "select",
    "label": "Category",
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
    "name": "TableType",
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
            "value": "Table"
          }
        ]
      }
    ],
    "requiredWhen": [],
    "disabledWhen": []
  },
  {
    "id": "STORAGE_TYPE",
    "name": "StorageType",
    "type": "select",
    "label": "Category",
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
            "value": "Bed"
          },
          {
            "value": "Table"
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
    "id": "ADDRESS",
    "name": "Address",
    "type": "text",
    "label": "Address",
    "description": "For your own privacy, please use the street address of your building and exclude your apartment/house number. If interested, a customer can contact you for more info.",
    "placeholder": "Address",
    "defaultValue": "",
    "options": [],
    "visible": false,
    "required": true,
    "disabled": false,
    "visibleWhen": [
      {
        "id": "Puts in address",
        "field": "GLOBAL_TYPE",
        "is": [
          {
            "value": "Seating"
          },
          {
            "value": "Bed"
          },
          {
            "value": "Table"
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
    "id": "CITY",
    "name": "City",
    "type": "text",
    "label": "City",
    "description": "",
    "placeholder": "City",
    "defaultValue": "",
    "options": [],
    "visible": false,
    "required": true,
    "disabled": false,
    "visibleWhen": [
      {
        "id": "Puts in city",
        "field": "GLOBAL_TYPE",
        "is": [
          {
            "value": "Seating"
          },
          {
            "value": "Bed"
          },
          {
            "value": "Table"
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
    "id": "ZIPCODE",
    "name": "Zipcode",
    "type": "text",
    "label": "Zipcode",
    "description": "",
    "placeholder": "Zip",
    "defaultValue": "",
    "options": [],
    "visible": false,
    "required": true,
    "disabled": false,
    "visibleWhen": [
      {
        "id": "Puts in zip",
        "field": "GLOBAL_TYPE",
        "is": [
          {
            "value": "Seating"
          },
          {
            "value": "Bed"
          },
          {
            "value": "Table"
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
            "value": "Bed"
          },
          {
            "value": "Table"
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
            "value": "Table"
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
            "value": "Table"
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
            "value": "Table"
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
    computeLatLng = (address, city, zipcode) => {
      const url = 'http://open.mapquestapi.com/geocoding/v1/address?key=aGF9qhMVGLXeMA5UGCdSZt7rIIp600r8&location=' + address + ', ' + city + ', ' + zipcode
      axios.get(url)
        .then(response => 
          {
            console.log(response.data.results[0].locations[0].latLng.lat, 'response lat')
            //returns lat
            console.log(response.data.results[0].locations[0].latLng.lng, 'response lng')
            //returns lng
          }
        )
    }

    render() {
        return (
            <div>
                <HeaderSell />
                <div className="Landing-Prompt"> What are you selling? </div>
                <div className="columns">
                    <Form renderer={renderer} defaultFields={fields}>
                        <FormButton 
                            onClick={(value: FormValue) => 
                              {
                                console.log("Button value", value)
                                this.computeLatLng(value.Address, value.City, value.Zipcode)
                              }
                              // Address: "1470 Via Di Salerno"
                              // BedSize: ""
                              // City: "Pleasanton"
                              // Color: "Green"
                              // Description: "a"
                              // GlobalType: "Seating"
                              // Height: ""
                              // Length: ""
                              // Mattress: ""
                              // Price: "a"
                              // SeatingType: "Chair"
                              // StorageType: ""
                              // TableType: ""
                              // Title: "a"
                              // Width: ""
                              // Zipcode: "94566"

                                  // Example product:
    // {
    //   title: "Small Wooden Dining Table",
    //   description: "A small wooden dining table.",
    //   image: table6,
    //   productID: 13,
    //   sellerID: 15,
    //   location: {
    //     lat: 34.070040,
    //     lng: -118.453400
    //   },
    //   properties: {
    //     color: "Mocha",
    //     distance: "",
    //     size: "2.1 ft x 6.3 ft x 4.2 ft",
    //     elevation: ""
    //   }
    // }
                            }
                        />
                    </Form>
                </div>
            </div>
        );
    }
}