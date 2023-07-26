# countries-table-JS

JS, work with DOM, tables, sorting

## Watch deploy: https://nemesisua.github.io/countries-table-JS/

Screen of implementation:

![image](https://github.com/NemesisUA/countries-table-JS/assets/70847593/4523b8e2-c58d-4fe4-8f2f-2a2f488a3fab)

## TASK

### Application’s header

Application’s header with the title “Countries Search” should be added at the top of the applicationApplication form
Form should consist of two fields
- *“Type of Search” field:*  
  - The first field should consist of two radio buttons with labels (By Region, By Language)
  - Description “Please choose the type of search:” should be added before radio buttons

- *Search query field*:    
  + The second field should be a dropdown (can be used select) component
  + If in the first field was selected “By region” value the expanded select should consist of possible regions otherwise all possible languages.
  + Before the dropdown should be description “Please choose search query:”
  + In case if value is not selected “Select value” should be shown in the dropdown
  + If value from the first field is not chosen the select should be disabled

### List of languages and regions you can receive from externalService object. For instance:

- externalService.getRegionsList(), 
- externalService.getLanguagesList()

### Application table

- If the search query is not selected then the label “No items, please choose search query” should be shown instead of the table
- Once a user choose search query then a table with results should be shown
- Table should consist of 6 columns
  - Country name
  - Capital
  - World region
  - Languages (should be shown all official languages in a 
country)
  - Area
  - Flag (Should be shown a flag of an appropriate country)

You can receive countryList from externaService module
externalService.getCountryListByRegion(query);
externalService.getCountryListByLanguage(query);

### Sorting

- Next to Country Name and Area should be added arrows
- When a user clicks on the arrow then sorting should be applied in the table. 
- When up arrow is shown then the rows should be sorted in ascending order
- When down arrow is shown then rows should be sorted in descendingorder
- In case double-sided arrow the sorting is not applied with column’s criteria

### Table design

- If the cursor on the row then the row should be highlighted

![image](https://github.com/NemesisUA/countries-table-JS/assets/70847593/19054709-f727-4717-98dc-f4f2209dd82d)

- Feel free to use a table’s design that you prefer (colors)
  
When a user clicks on the arrow then sorting should be applied in the table.  
When up arrow is shown then the rows should be sorted in ascending order
When down arrow is shown then rows should be sorted in descending order
In case double-sided arrow the sorting is not applied with column’s criteria
 
### Table design

If the cursor on the row then the row should be highlighted	 
Feel free to use a table’s design that you prefer (colors)
 
### RESTRICTIONS
-	Editing index.html and external-service.js are forbidden.
-	External libraries usage is forbidden
