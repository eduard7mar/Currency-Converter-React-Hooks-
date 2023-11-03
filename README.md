# Currency Converter

The "Currency Converter" is a web application developed using React and hooks. This application allows users to convert an amount of money from Ukrainian Hryvnia (UAH) to other currencies based on the current exchange rates.

## How It Works:
- The application fetches currency exchange rate data from the National Bank of Ukraine's website using an API.
- After loading the data, the application displays the user interface, where users can enter the amount in UAH and select the currency for conversion.
- When a currency button is clicked, the application calculates and displays the converted result.
- Users can reset the conversion result by clicking the "Reset" button.

## Technical Details:
- The project is developed using React.
- React hooks, such as `useState` and `useEffect`, are utilized for state management and side effects handling.
- The application fetches data from an external API using the `fetch` function.
- Data received from the API is transformed and presented in a user-friendly format.

## Instructions for Use:
1. Enter an amount in Ukrainian Hryvnia (UAH) in the input field.
2. Select the target currency for conversion by clicking the corresponding currency button.
3. The conversion result will be displayed below in the selected currency.
4. To reset the conversion result, click the "Reset" button.
